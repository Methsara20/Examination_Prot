<?php
header("Content-Type: application/json");

// Get data from the request
$examId        = $_POST['examId'];
$quizData      = $_POST['quizData'];
$title         = $_POST['title'];
$description   = $_POST['description'];
$startDateTime = $_POST['startDateTime'];
$endDateTime   = $_POST['endDateTime'];

//Database configuration
$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "examination_portal";

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
$response = [];

if ($conn->connect_error) {
    $response = ["success" => false, "error" => "Login Failed"];
}

$sql = "INSERT INTO Exam (ExamId, QuizData, Title, Description, StartDateTime, EndDateTime, EmpList)
        VALUES ('$examId', '$quizData', '$title', '$description', '$startDateTime', '$endDateTime', '')";


if ($conn->query($sql) === TRUE) {
     $response = ["success" => true, "message" => "success"];
} else {
    $response = ["success" => false, "error" => "Error: " . $conn->error];
}

echo json_encode($response);
$conn->close();

?>