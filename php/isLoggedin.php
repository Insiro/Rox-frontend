<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
} 

session_start();
if ($_SESSION['login'] == true) {
    echo json_encode(array("login" => true, "id" => $_SESSION['id']));
} else {
    die(json_encode(array("login" => false)));   
}


?>