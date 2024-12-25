<?php
    header("Content-Type: application/json");
    
    // Get data from the request
    $empId         = $_POST['empId'];
    $title         = $_POST['title'];
    $description   = $_POST['description'];

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

    $sql = "INSERT INTO Complain (EmpId, Title, Description) VALUES ('$empId', '$title', '$description')";

    if ($conn->query($sql) === TRUE) {
        $response = ["success" => true, "message" => "success"];
    } else {
       $response = ["success" => false, "error" => "Error: " . $conn->error];
    }

    echo json_encode($response);
    $conn->close();

?>