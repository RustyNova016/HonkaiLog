<?php
    require_once "models/info_message.php";
    
    /**
     * @var database $db
     */
    
    if (!empty($_POST)) {
        $user = new user($db, $_POST["username"]);
        
        $user->login($_POST["password"]);
        
        if ($user->isLogged_in()) {
            $user->unset_db();
            $_SESSION["user"] = serialize($user);
            info_message("Successfully logged as " . $user->get_username());
        } else {
            info_message("Username or password incorrect. Please try again", "danger");
        }
    }
    
    include "vue/user-index.php";