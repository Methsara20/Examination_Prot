<?php
    header("Content-Type: application/json");
    
    // Get data from the request
    $examId        = $_POST['examId'];
    $empId         = $_POST['empId'];
    $score         = $_POST['score'];
    $grade         = $_POST['grade'];


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

    $sql = "INSERT INTO ExamResult (ExamId, EmpId, Score, Grade) VALUES ('$examId', '$empId', '$score', '$grade')";

    if ($conn->query($sql) === TRUE) {
        $response = ["success" => true, "message" => "success"];
    } else {
       $response = ["success" => false, "error" => "Error: " . $conn->error];
    }
   
    echo json_encode($response);
    $conn->close();

?>