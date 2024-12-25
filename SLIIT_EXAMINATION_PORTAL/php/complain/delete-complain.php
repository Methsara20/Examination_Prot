<?php
    header("Content-Type: application/json");
    
    // Get data from the request
    $complainId    = $_POST['complainId'];

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

    $sql = "DELETE FROM Complain WHERE ComplainId = ?";

    $stmt = $conn->prepare($sql);

    if($stmt)
    {
        $stmt->bind_param("i", $complainId);

        if ($stmt->execute()) {
            $response = ["success" => true, "message" => "success"];
        } else {
            $response = ["success" => false, "error" => "Error: " . $conn->error];
        }

        $stmt->close();
    }
    else 
    {
        $response = ["success" => false, "error" => "SQL statement preparation failed."];
    }

    

    echo json_encode($response);
    $conn->close();

?>