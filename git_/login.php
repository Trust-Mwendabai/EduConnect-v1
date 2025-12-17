<?php
include "connection.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);
$email = isset($input['email']) ? trim($input['email']) : '';
$password = isset($input['password']) ? $input['password'] : '';

if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email and password are required']);
    exit;
}

// 1. Fetch the user by email
$stmt = $conn->prepare("SELECT id, email, password, first_name, last_name, role, is_active FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        
        if ($user['is_active'] == 0) {
            http_response_code(403);
            echo json_encode([
                'success' => false,
                'error' => 'Your email is not verified.',
                'not_verified' => true, 
                'email' => $user['email']
            ]);
            exit;
        }

        unset($user['password']);
        
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => $user
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid email or password']);
    }
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid email or password']);
}

$stmt->close();
$conn->close();
?>