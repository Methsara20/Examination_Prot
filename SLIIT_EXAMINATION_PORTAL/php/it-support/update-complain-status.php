<?php
    header("Content-Type: application/json");
    
    // Get data from the request
    $complainId    = $_POST['complainId'];
    $status    = $_POST['status'];

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


    $sql = "UPDATE Complain SET Status = '$status' WHERE ComplainId = '$complainId'";


    if ($conn->query($sql) === TRUE) {
        $response = ["success" => true, "message" => "success"];
    } else {
       $response = ["success" => false, "error" => "Error: " . $conn->error];
    }

    echo json_encode($response);
    $conn->close();

?>