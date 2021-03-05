<?php
$server = "localhost";
$user = "root";
$pass = "";
$database = "honkailog";
try {
    $dbh = new PDO('mysql:host='.$server.';dbname='.$database, $user, $pass);
    

} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
?>