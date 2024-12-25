<?php

    header("Content-Type: application/json");

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

    $sql = "SELECT * FROM Exam";
    $result = $conn->query($sql);

    if($result->num_rows > 0)
    {
        $exams = [];
        while($row = $result->fetch_assoc())
        {
            $empListArray = explode(',', $row['EmpList']);

            $exams[] = [
                        "ExamId" => $row['ExamId'],
                        "QuizData" => $row['QuizData'],
                        "Title" => $row['Title'],
                        "Description" => $row['Description'],
                        "StartDateTime" => $row['StartDateTime'],
                        "EndDateTime" => $row['EndDateTime'],
                        "EmpList" => $empListArray
                        ];
        }
        $response = ["success" => true, "message" => "success", "data" => $exams];
    }
    else
    {
        $response = ["success" => false, "error" => "No exams found"];
    }

    echo json_encode($response);
    $conn->close();
?>