<?php
function id_user($dbh, $username, $mot_de_passe)
{
    $SQLrequest = "SELECT id_user, name, level FROM user WHERE name = '".$username."' AND mot_de_passe = SHA1('".$mot_de_passe."');";
	

	var_dump($SQLrequest);
    //echo $SQLrequest;
    $sth = $dbh->prepare($SQLrequest);
    $sth -> execute();
	$result=$sth->fetchall();
    return $result;
}
?>