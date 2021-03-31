<?php
    include "models/user.php";
    
    if (!empty($_POST)){
        $user = new user($db, $_POST["username"]);
        
        $user->login($_POST["password"]);
        
        if($user->isLogged_in()){
            $user->unset_db();
            $_SESSION["user"] = $user;
            //TODO: Confirmation message
        } else {
            //TODO: Message
        }
    }
    
    include "vue/user-index.php"
?>