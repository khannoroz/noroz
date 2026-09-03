<?php
/**
 * contact.php
 * Handles the portfolio contact form: validates input, blocks obvious spam,
 * emails the owner, and keeps a local JSON log as a fallback record —
 * so a message is never lost even if outgoing mail isn't configured yet
 * on the host. No database required.
 *
 * Configure the constants below after upload. See README.md.
 */

declare(strict_types=1);

// ---------------------------------------------------------------------
// Configuration — edit these for your hosting environment
// ---------------------------------------------------------------------
const TO_EMAIL      = "norozk123@gmail.com";   // where messages are delivered
const SITE_NAME     = "Noroz Hussain Portfolio";
const RATE_LIMIT_S  = 20;                       // min seconds between submissions per IP
const LOG_FILE      = __DIR__ . "/../data/messages.json";
const MAX_LOG_BYTES = 2 * 1024 * 1024;          // rotate log past ~2MB

header("Content-Type: application/json; charset=utf-8");

function respond(bool $success, string $message, int $code = 200): void {
    http_response_code($code);
    echo json_encode(["success" => $success, "message" => $message]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    respond(false, "Invalid request method.", 405);
}

// ---------------------------------------------------------------------
// Honeypot — bots fill hidden fields, humans never see them
// ---------------------------------------------------------------------
if (!empty($_POST["company"] ?? "")) {
    // Pretend success so bots don't learn anything, but do nothing.
    respond(true, "Message sent successfully.");
}

// ---------------------------------------------------------------------
// Basic per-IP rate limiting (best effort, file-based, no DB needed)
// ---------------------------------------------------------------------
$ip = $_SERVER["REMOTE_ADDR"] ?? "unknown";
$rateFile = sys_get_temp_dir() . "/noroz_contact_" . md5($ip) . ".txt";
if (is_file($rateFile)) {
    $last = (int) file_get_contents($rateFile);
    if (time() - $last < RATE_LIMIT_S) {
        respond(false, "Please wait a few seconds before sending again.", 429);
    }
}

// ---------------------------------------------------------------------
// Validate + sanitize input
// ---------------------------------------------------------------------
function clean(string $v): string {
    return trim(preg_replace('/[\r\n]+/', ' ', strip_tags($v)));
}

$name    = clean((string) ($_POST["name"] ?? ""));
$email   = trim((string) ($_POST["email"] ?? ""));
$subject = clean((string) ($_POST["subject"] ?? ""));
$message = trim(strip_tags((string) ($_POST["message"] ?? "")));

$errors = [];
if (mb_strlen($name) < 2 || mb_strlen($name) > 80)         $errors[] = "name";
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 160) $errors[] = "email";
if (mb_strlen($subject) < 2 || mb_strlen($subject) > 140)  $errors[] = "subject";
if (mb_strlen($message) < 10 || mb_strlen($message) > 2000) $errors[] = "message";

if (!empty($errors)) {
    respond(false, "Please fix the highlighted fields.", 422);
}

// ---------------------------------------------------------------------
// 1) Always persist to a local JSON log first — this guarantees the
//    message is never lost even if mail() isn't configured yet.
// ---------------------------------------------------------------------
$entry = [
    "id"      => bin2hex(random_bytes(6)),
    "name"    => $name,
    "email"   => $email,
    "subject" => $subject,
    "message" => $message,
    "ip"      => $ip,
    "at"      => date("c"),
];

$logged = save_message_log($entry);

// ---------------------------------------------------------------------
// 2) Best-effort email delivery via PHP's built-in mail()
// ---------------------------------------------------------------------
$mailSent = send_notification_email($entry);

// Mark rate limit regardless of mail outcome (message was captured).
@file_put_contents($rateFile, (string) time());

if ($logged || $mailSent) {
    respond(true, "Message sent successfully. I'll get back to you soon.");
}

respond(false, "Could not deliver your message right now. Please email " . TO_EMAIL . " directly.", 500);


// ===========================================================================
// Helpers
// ===========================================================================

function save_message_log(array $entry): bool {
    $dir = dirname(LOG_FILE);
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    if (!is_dir($dir) || !is_writable($dir)) {
        return false;
    }

    $data = [];
    if (is_file(LOG_FILE) && filesize(LOG_FILE) < MAX_LOG_BYTES) {
        $raw = file_get_contents(LOG_FILE);
        $decoded = json_decode((string) $raw, true);
        if (is_array($decoded)) $data = $decoded;
    }
    $data[] = $entry;

    $fp = fopen(LOG_FILE, "c+");
    if (!$fp) return false;
    $ok = false;
    if (flock($fp, LOCK_EX)) {
        ftruncate($fp, 0);
        rewind($fp);
        $ok = fwrite($fp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)) !== false;
        fflush($fp);
        flock($fp, LOCK_UN);
    }
    fclose($fp);
    return $ok;
}

function send_notification_email(array $entry): bool {
    if (!function_exists("mail")) return false;

    $to = TO_EMAIL;
    $subject = "[" . SITE_NAME . "] " . $entry["subject"];

    $body  = "New message from your portfolio contact form\n";
    $body .= str_repeat("-", 44) . "\n";
    $body .= "Name:    " . $entry["name"] . "\n";
    $body .= "Email:   " . $entry["email"] . "\n";
    $body .= "Subject: " . $entry["subject"] . "\n";
    $body .= "Sent:    " . $entry["at"] . "\n\n";
    $body .= "Message:\n" . $entry["message"] . "\n";

    // Use a safe From on the sending domain; Reply-To carries the visitor's address.
    $hostForFrom = $_SERVER["SERVER_NAME"] ?? "localhost";
    $fromAddr = "no-reply@" . preg_replace('/^www\./', '', $hostForFrom);

    $headers  = "From: " . SITE_NAME . " <" . $fromAddr . ">\r\n";
    $headers .= "Reply-To: " . $entry["name"] . " <" . $entry["email"] . ">\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    return @mail($to, $subject, $body, $headers);
}
