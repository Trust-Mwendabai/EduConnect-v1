<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; 
include "connection.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input']);
    exit;
}

// Fixed function: Added HTML flag and corrected string quotes
function send_email($recieversAddress, $username, $code){
    $mail = new PHPMailer(true);
    $system_email = "mugwadiinnocent@gmail.com";
    try {
        $mail->isSMTP();                                            
        $mail->Host       = 'smtp.gmail.com';           
        $mail->SMTPAuth   = true;                  
        $mail->Username   = $system_email;     
        $mail->Password   = 'kemz bvyj ectc bife';       
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
        $mail->Port       = 587;                                    

        $mail->setFrom($system_email, 'EduConnect'); 
        $mail->addAddress($recieversAddress, $username);
        $mail->isHTML(true); // Crucial for sending HTML
        $mail->Subject = 'EduConnect - Smart Learning Verification';
        
        // Corrected quotes from backticks to double quotes
        $mail->Body = "
            <div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;'>
                <h1 style='color: #011F5B;'>Verification Code</h1>
                <p>Hello <strong>{$username}</strong>,</p>
                <p>Thank you for signing up on EduConnect. Your verification code is:</p>
                <div style='background: #f4f4f4; padding: 10px; text-align: center; font-size: 28px; font-weight: bold; color: #FF6B35; letter-spacing: 5px;'>
                    {$code}
                </div>
                <p>This code will expire shortly.</p>
            </div>";

        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

// Validation
$required_fields = ['email', 'password', 'first_name', 'last_name', 'role'];
foreach ($required_fields as $field) {
    if (!isset($input[$field]) || empty(trim($input[$field]))) {
        http_response_code(400);
        echo json_encode(['error' => ucfirst($field) . ' is required']);
        exit;
    }
}

$email = trim($input['email']);
$password = $input['password'];
$first_name = trim($input['first_name']);
$last_name = trim($input['last_name']);
$role = trim($input['role']);
$phone = isset($input['phone']) ? trim($input['phone']) : null;

// Check email existence
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    http_response_code(409);
    echo json_encode(['error' => 'Email already registered']);
    exit;
}
$stmt->close();

$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$verification_code = (string)rand(100000, 999999);

// 1. Insert User
$stmt = $conn->prepare("INSERT INTO users (email, password, first_name, last_name, role, phone) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $email, $hashed_password, $first_name, $last_name, $role, $phone);

if ($stmt->execute()) {
    // 2. Insert/Update OTP
    $otp_stmt = $conn->prepare("INSERT INTO otp_codes (email, otp, is_active) VALUES (?, ?, 1) 
                                ON DUPLICATE KEY UPDATE otp = ?, is_active = 1, created_at = CURRENT_TIMESTAMP");
    $otp_stmt->bind_param("sss", $email, $verification_code, $verification_code);
    
    if ($otp_stmt->execute()) {
        $emailSent = send_email($email, $first_name, $verification_code);
        
        http_response_code(201);
        echo json_encode([
            'success' => true, 
            'message' => $emailSent ? 'Registration successful. Check your email for the code.' : 'User registered, but email failed.',
            'email' => $email
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to generate verification code.']);
    }
    $otp_stmt->close();
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Registration failed']);
}

$conn->close();
?>