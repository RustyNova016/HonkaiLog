<?php
    $server = "localhost";
    $user = "root";
    $pass = "";
    $database = "honkailog";
    include "models/database.php";
    try {
        $dbh = new PDO('mysql:host=' . $server . ';dbname=' . $database, $user, $pass);
        $dbh->query("SET CHARACTER SET utf8");
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db = new database($dbh);
        
    } catch (PDOException $e) {
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }
?>