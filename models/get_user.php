<?php
function get_user($dbh){
    $SQLrequest = "SELECT * FROM captain";


    //echo $SQLrequest;
    $sth = $dbh->prepare($SQLrequest);
    $sth->execute();
    $result = $sth->fetchall();
    return $result;
}
?>