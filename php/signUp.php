<?php
$id = $_POST['id'];
$pwd = password_hash($_POST['pwd']);

$db = new mysqli($dbcred['host'], $dbcred['user']. $dbcred['pass'], $dbcred['dbname']);
$res = $db->query("SELECT * FROM users WHERE id='".$db->real_escape_string($id)."'");
if ($res->num_rows > 0) {
    // GIT 으로 마저 작업 함.

    die(json_encode(array("success" => false, "message" => "Following ID Already Exists!")));
}
else {

    $res = $db->query("INSERT INTO (id, pass) VALUES (".$db->real_escape_string($id).",".$pwd.")");
    if ($res) {
        // DB Connection Success
        echo json_encode(array("success" => true));
    } else {
        // EPIC FAIL
        die(json_encode(array("success" => false, "message" => "Following ID Already Exists!")));

    }
}

?>