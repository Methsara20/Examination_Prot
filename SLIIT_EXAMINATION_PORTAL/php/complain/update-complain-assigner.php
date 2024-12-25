<?php
    header("Content-Type: application/json");
    
    // Get data from the request
    $complainId    = $_POST['complainId'];
    $assignerId    = $_POST['assignerId'];

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

    if ($assignerId !== 'null')
        $sql = "UPDATE Complain SET AssignerId = '$assignerId', Status = 'Pending' WHERE ComplainId = '$complainId'";
    else
        $sql = "UPDATE Complain SET AssignerId = NULL, Status = 'Not Assign' WHERE ComplainId = '$complainId'";

    if ($conn->query($sql) === TRUE) {
        $response = ["success" => true, "message" => "success"];
    } else {
       $response = ["success" => false, "error" => "Error: " . $conn->error];
    }

    echo json_encode($response);
    $conn->close();

?>