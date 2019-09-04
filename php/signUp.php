<?php
$id = $_POST['id'];
$pwd = password_hash($_POST['pwd'], PASSWORD_BCRYPT);
//$pwd = password_hash($_POST['pwd'], PASSWORD_BCRYPT, [ "salt" => "tH3_y4NgjUm4n" ]);

include "db_cred.php";
$db = new mysqli($dbcred['host'], $dbcred['user'], $dbcred['pass'], $dbcred['dbname']);
$res = $db->query("SELECT * FROM users WHERE id='".$db->real_escape_string($id)."'");
if ($res->num_rows > 0) {
    // GIT 으로 마저 작업 함.

    die(json_encode(array("success" => false, "message" => "Following ID Already Exists!", "errorCode" => 403)));
}
else {

    $res = $db->query("INSERT INTO users (id, pass) VALUES ('".$db->real_escape_string($id)."','".$db->real_escape_string($pwd)."')");
    if ($res) {
        // DB Connection Success
        
        echo json_encode(array("success" => true, "message" => "password:".$pwd));
    } else {
        // EPIC FAIL
        
        die(json_encode(array("success" => false, "message" => "Database Error!", "errorCode" => 500)));

    }
}

?>