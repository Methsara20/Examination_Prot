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

    $sql = "SELECT * FROM Employee WHERE Designation NOT IN ('Department Head', 'HR Manager', 'IT Support Officer', 'Complain Officer')";
    $result = $conn->query($sql);

    if ($result->num_rows > 0)
    {
        $employees = [];
        while($row = $result->fetch_assoc())
        {
            $employees[] = [
                            "EmpId" => $row['EmpId'],
                            "UserName" => $row['UserName'],
                            "Password" => $row['Password'],
                            "DateOfBirth" => $row['DateOfBirth'],
                            "Gender" => $row['Gender'],
                            "Designation" => $row['Designation'],
                            "Type" => $row['Type']
                            ];
        }
        $response = ["success" => true, "message" => "success", "data" => $employees];
    }
    else
    {
        $response = ["success" => false, "error" => "No employees found"];
    }

    echo json_encode($response);
    $conn->close();
?>