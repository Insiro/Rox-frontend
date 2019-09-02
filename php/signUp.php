<?php
$id = $_POST['id'];
$pwd = password_hash($_POST['pwd']);

$db = new mysqli($dbcred['host'], $dbcred['user']. $dbcred['pass'], $dbcred['dbname']);
$res = $db->query("SELECT * FROM users WHERE id='".$db->real_escape_string($id)."'");
if ($res->num_rows > 0) {
    //THERE ARE
}
else {
    $db = new mysqli("INSERT INTO (id, pass)VALUES("+$db->real_escape_string($id), $pwd+")");
}

?>