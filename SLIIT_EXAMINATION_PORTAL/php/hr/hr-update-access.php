<?php

    header("Content-Type: application/json");

    $examId = $_POST['examId'];
    $empList = $_POST['empList'];

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

    $updateStmt = $conn->prepare("UPDATE Exam SET EmpList = ? WHERE ExamId = ?");
    $updateStmt->bind_param('ss', $empList, $examId);
    $updateStmt->execute();

    // Fetch the details of the updated exam
    $sql = "SELECT * FROM Exam WHERE ExamId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $examId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) 
    {
        $row = $result->fetch_assoc();
        $empListArray = explode(',', $row['EmpList']);
        $examData = [
                      "ExamId" => $row['ExamId'],
                      "QuizData" => $row['QuizData'],
                      "Title" => $row['Title'],
                      "Description" => $row['Description'],
                      "StartDateTime" => $row['StartDateTime'],
                      "EndDateTime" => $row['EndDateTime'],
                      "EmpList" => $empListArray
                    ];

        $response = ["success" => true, "message" => "success", "data" => $examData];
    } 
    else 
    {
        $response = ["success" => false, "error" => "No such exam found"];
    }

    echo json_encode($response);
    $conn->close();
   
?>