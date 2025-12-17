<?php
include "connection.php";

// Standard API Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Get the JSON input from React
$input = json_decode(file_get_contents('php://input'), true);
$email = isset($input['email']) ? trim($input['email']) : '';
$otp = isset($input['code']) ? trim($input['code']) : '';

// 1. Basic Validation
if (empty($email) || empty($otp)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Email and 6-digit code are required.']);
    exit;
}

// 2. Check if the OTP is valid and active for this email
$stmt = $conn->prepare("SELECT id FROM otp_codes WHERE email = ? AND otp = ? AND is_active = 1");
$stmt->bind_param("ss", $email, $otp);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // SUCCESS: The code matches. Now we update the database.

    // Start a transaction to ensure both updates happen or none at all
    $conn->begin_transaction();

    try {
        // 3. Set the OTP to inactive so it can't be used again
        $update_otp = $conn->prepare("UPDATE otp_codes SET is_active = 0 WHERE email = ?");
        $update_otp->bind_param("s", $email);
        $update_otp->execute();

        // 4. Set the user to verified in the users table
        $update_user = $conn->prepare("UPDATE users SET is_active = 1 WHERE email = ?");
        $update_user->bind_param("s", $email);
        $update_user->execute();

        // Commit changes
        $conn->commit();

        echo json_encode([
            'success' => true, 
            'message' => 'Your email has been verified successfully!'
        ]);

    } catch (Exception $e) {
        // Rollback if something goes wrong
        $conn->rollback();
        http_response_code(500);
        echo json_encode([
            'success' => false, 
            'error' => 'Database error during verification. Please try again.'
        ]);
    }

} else {
    // 5. Code is wrong, expired, or already used
    http_response_code(401);
    echo json_encode([
        'success' => false, 
        'error' => 'Invalid or expired verification code.'
    ]);
}

$stmt->close();
$conn->close();
?>