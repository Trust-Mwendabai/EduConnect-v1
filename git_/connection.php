<?php
// Database connection configuration
$servername = "localhost";
$username = "root";  // Default XAMPP MySQL username
$password = "";      // Default XAMPP MySQL password (leave empty if not set)
$dbname = "educonnect";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Optional: Set charset to utf8mb4 for better Unicode support
$conn->set_charset("utf8mb4");
?>