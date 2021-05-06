<?php
    require_once "models/info_message.php";
    require_once "models/other_functions.php";
    
    /**
     * @var database $db
     */
    
    if (!empty($_POST)) {
        $user = new user($_POST["username"]);
        
        
        if ($user->login($db, $_POST["password"])) {
            $_SESSION["user"] = serialize($user);
            $link = '';
            redirect($link);
        } else {
            info_message("Username or password incorrect. Please try again", "danger");
        }
    }
    
    include "vue/user-index.php";