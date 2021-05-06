<?php
    /**
     * @var PDO      $dbh
     * @var database $db
     */
    
//echo "<pre>";
//print_r($_POST);
//echo "</pre>";
    
    require_once "models/add_user.php";
    require_once "models/other_functions.php";
    
    /**
     * @param string $link
     */
    
    if (!empty($_POST)) {
            var_dump($_POST);
            
            $user = new user($_POST["username"], $_POST["level"]);
            
            $db->add_user($user, $_POST["password"]);
    
            $link = 'user/index';
            redirect($link);
    } else {
        include "vue/user-add.php";
    }
?>