<?php
/*
Register receives a registration request
It validates the data and it creates database entry for the newa account
It then sends an email, requesting a validation
*/

/*----------Parsing POST data----------*/
$name = $_POST["name"];
$email = $_POST["email"];
$pass = $_POST["pass"];

$validated = "no";

/*----------Validating Data----------*/
if (strlen($name) < 1) {
    echo "not ok";
}
if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "not ok";
}
if (strlen($pass) < 6) {
    echo "not ok";
}

/*----------Creating a token----------*/
$tokenText = $name . $pass . $email . $pass . time();
$token = hash("md5", $tokenText, false);
//The expiration time will be saved as a UNIX timestamp
//The expiration period will be 24 hours, which is equal to 86 400 seconds
$tokenExpirationDate = time() + 24 * 60 * 60;

/*----------Inserting the new user in the database----------*/
//Отваряне на връзка към БД
$db = new SQLite3('./expensesmanager.db');

$stmt = $db->prepare('INSERT INTO users (name, email, pass, validated, token, token_expiration) VALUES (:name, :email, :pass, :validated, :token, :token_expiration)');
$stmt->bindValue(':name', $name, SQLITE3_TEXT);
$stmt->bindValue(':email', $email, SQLITE3_TEXT);
$stmt->bindValue(':pass', $pass, SQLITE3_TEXT);
$stmt->bindValue(':validated', $validated, SQLITE3_TEXT);
$stmt->bindValue(':token', $token, SQLITE3_TEXT);
$stmt->bindValue(':token_expiration', $tokenExpirationDate, SQLITE3_INTEGER);

$result = $stmt->execute();

echo "ok";

?>