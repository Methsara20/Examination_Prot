<?php
header("Content-Type: application/json");

// Get data from the request
$empId = $_POST['empId'];
$password = $_POST['password'];

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

$stmt = $conn->prepare("SELECT * FROM employee WHERE EmpId = ?");
$stmt->bind_param("s", $empId);
$stmt->execute();

$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    
    if($password == $row['Password'])
    {

        $response = ["success" => true, "message" => "success", 
                     "data" => [
                     "EmpId" => $row['EmpId'],
                     "Name" => $row['UserName'], 
                     "Designation" => $row['Designation'],
                     ]];
    }
    else
    {
        $response = ["success" => false, "error" => "Invalid Password"];
    }
}
else
{
    $response = ["success" => false, "error" => "Invalid Employee ID"];
}

echo json_encode($response);
$stmt->close();
$conn->close();

?>