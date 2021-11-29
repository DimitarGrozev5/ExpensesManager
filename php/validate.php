<?php
/*
Validate.php receives a GET request with an email and a token
If the token is valid and no expired the user is redirected to the login page
The cases where the token is invalid will be dissmised which is a very bad UX
but for the goals of this project it's fine
*/

/*----------Retreiving GET data----------*/
$email = $_GET["email"];
$token = $_GET["token"];

/*----------Retreving relevant data from DB----------*/
$db = new SQLite3('./expensesmanager.db');

$stmt = $db->prepare('SELECT token, token_expiration FROM users WHERE email=:email');
$stmt->bindValue(':email', $email, SQLITE3_TEXT);
$results = $stmt->execute();

$result = $results->fetchArray();
if ($token == $result["token"] && time() < $result["token_expiration"]) {
    echo "ok";
} else {
    echo "no";
}

/*----------Updating user data----------*/
$stmt = $db->prepare("UPDATE users SET validated='yes', token='' WHERE email=:email");
$stmt->bindValue(':email', $email, SQLITE3_TEXT);
$results = $stmt->execute();

header('Location: ../login.htm');

?>