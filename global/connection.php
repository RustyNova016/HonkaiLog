<?php
$server = "localhost";
$user = "root";
$pass = "";
$database = "honkailog";
try {
    $dbh = new PDO('mysql:host='.$server.';dbname='.$database, $user, $pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
?>