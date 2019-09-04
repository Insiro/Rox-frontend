<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_POST['id']) || !isset($_POST['pwd'])) {
    die(json_encode(array("success" => false, "message" => "nope")));
}

$id = $_POST['id'];
$pwd = $_POST['pwd'];

$success = false;

include "db_cred.php";

$db = new mysqli($dbcred['host'], $dbcred['user'], $dbcred['pass'], $dbcred['dbname']);
$res = $db->query("SELECT * FROM users WHERE id='".$db->real_escape_string($id)."'");

if ($res->num_rows > 0) {
    $row = $res->fetch_assoc();
    if (password_verify($pwd, $row['pass'])) {
        $success = true;
    }
    
} else {
    die(json_encode(array("success" => false, "message" => "The following ID has no account.")));
}

if (!$success) {
    die(json_encode(array("success" => false, "message" => "Your ID or PW was incorrect.")));
} else {
    $_SESSION['login'] = true;
    $_SESSION['id'] = $id;
    echo json_encode(array("success" => true));
}

?>