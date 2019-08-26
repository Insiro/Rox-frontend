<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_POST['id']) || !isset($_POST['pwd'])) {
    die(json_encode(array("success" => false, "message" => "nope")));
}

$id = $_POST['id'];
$pwd = $_POST['pwd'];

$success = true;

if (!$success) {
    die(json_encode(array("success" => false, "message" => "Your ID or PW was incorrect.")));
} else {
    $_SESSION['login'] = true;
    $_SESSION['id'] = $id;
    echo json_encode(array("success" => true));
}

?>