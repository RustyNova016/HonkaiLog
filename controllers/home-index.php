<?php
$date= new DateTime();
$jour = strtolower($date->format('l'));

$SQLrequest = "SELECT * FROM activity 
			   INNER JOIN available_on ON available_on.id = activity.id 
			   WHERE day_name= '".$jour."';";
			   
	var_dump($SQLrequest);
    echo $SQLrequest;
    $sth = $dbh->prepare($SQLrequest);
    $sth -> execute();
	$result=$sth->fetchall();
    var_dump($result);
	
include "vue/home-index.php";

?>