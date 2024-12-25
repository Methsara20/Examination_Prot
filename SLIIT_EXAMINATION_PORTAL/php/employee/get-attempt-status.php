<?php
    header("Content-Type: application/json");
    
    // Get data from the request
    $examId        = $_POST['examId'];
    $empId         = $_POST['empId'];

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

    $sql = "SELECT * FROM ExamResult WHERE EmpId = ? AND ExamId = ?";

    $stmt = $conn->prepare($sql);

    if ($stmt)
    {
        $stmt->bind_param("ss", $empId, $examId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0)
        {
            $response = ["success" => true, "message" => "exam found", "data" => [
                         "ExamId" => $examId,
                         "EmpId" => $empId]];
        }
        else
        {
            $response = ["success" => true, "message" => "exam not found", "data" => [
                         "ExamId" => $examId,
                         "EmpId" => $empId]];
        }
    }

    echo json_encode($response);
    $conn->close();

?>