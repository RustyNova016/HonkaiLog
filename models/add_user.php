<?php
function add_user($dbh, $username)
{
    $SQLrequest = "INSERT INTO user (name) VALUES ('".$username."');";

    echo $SQLrequest;
    $sth = $dbh->prepare($SQLrequest);
    if ($sth->execute())
    {
        $id = $dbh->lastInsertId();
        echo  "Insert of id: ".$id;
    }
    else
    {
        $id = -1;
        echo "Error";
    }
    return $id;
}
?>