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

// Create connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
$response = [];

// Check connection
if ($conn->connect_error) {
    $response = ["success" => false, "error" => "Login Failed"];
}
    // The SQL query to update an existing record, make sure to update these fields and conditions as per your requirements
    $sql = "UPDATE Exam SET QuizData = '$quizData', Title = '$title', Description = '$description', StartDateTime = '$startDateTime', EndDateTime = '$endDateTime' WHERE ExamId = '$examId'";

    if ($conn->query($sql) === TRUE) {
        $response = ["success" => true, "message" => "Record updated successfully"];
   } else {
       $response = ["success" => false, "error" => "Error: " . $conn->error];
   }

// Send back the response in JSON format
echo json_encode($response);
$conn->close();
?>
