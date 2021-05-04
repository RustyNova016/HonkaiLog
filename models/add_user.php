<?php
    function add_user($dbh, $username, $level, $mot_de_passe) {
        $SQLrequest = "INSERT INTO user (name, level, mot_de_passe) VALUES ('" . $username . "'," . $level . ",SHA1('" . $mot_de_passe . "'));";
        
        var_dump($SQLrequest);
        //echo $SQLrequest;
        $sth = $dbh->prepare($SQLrequest);
        if ($sth->execute()) {
            $id = $dbh->lastInsertId();
            echo "Insert of id: " . $id;
        } else {
            $id = -1;
            echo "Error";
        }
        return $id;
    }

?>