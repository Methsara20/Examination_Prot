<?php

    header("Content-Type: application/json");

    $empId = $_GET['empId'] ?? null;

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

    if($empId)
    {
        $stmt = $conn->prepare("SELECT * FROM Exam WHERE EmpList LIKE ?");
        $likeQuery = "%$empId%";
        $stmt->bind_param('s', $likeQuery);
        $stmt->execute();

        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) 
        {
            $exams = [];
        
            while($row = $result->fetch_assoc()) {
                  $exams[] = [
                              "ExamId" => $row['ExamId'],
                              "QuizData" => $row['QuizData'],
                              "Title" => $row['Title'],
                              "Description" => $row['Description'],
                              "StartDateTime" => $row['StartDateTime'],
                              "EndDateTime" => $row['EndDateTime'],
                             ];
                }
        
            $response = ["success" => true, "message" => "success", "data" => $exams];
        }
        else
        {
            $response = ["success" => false, "error" => "EmpId does not exist in Employee list"];
        }
        $stmt->close();
    }
    else
    {
        $response = ["success" => false, "error" => "EmpId does not exist in any list"];
    }

    echo json_encode($response);
    $conn->close();

?>