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

    $sql = "SELECT Complain.*, Employee.UserName FROM Complain 
            JOIN Employee ON Complain.EmpId = Employee.EmpId";
            
    $result = $conn->query($sql);

    if($result->num_rows > 0)
    {
        $complains = [];
        while($row = $result->fetch_assoc())
        {
            

            $complains[] = [
                        "ComplainId" => $row['ComplainId'],
                        "EmpId" => $row['EmpId'],
                        "UserName" => $row['UserName'],
                        "AssignerId" => $row['AssignerId'],
                        "Title" => $row['Title'],
                        "Description" => $row['Description'],
                        "Status" => $row['Status']
                        ];
        }
        $response = ["success" => true, "message" => "success", "data" => $complains];
    }
    else
    {
        $response = ["success" => false, "error" => "Not found any complain"];
    }

    echo json_encode($response);
    $conn->close();
?>