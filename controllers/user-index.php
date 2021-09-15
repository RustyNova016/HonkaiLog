<?php
    require_once "models/info_message.php";
    require_once "models/add_user.php";
    require_once "models/other_functions.php";

    /**
     * @var Database_core $db
     */


    if ($action == "index") {
        if (empty($_SESSION["user"])) {
            $link = "user/login";
        } else {
            include "vue/user-index.php";
        }

    } else if ($action == "add") {
        include "vue/user-add.php";

    } else if ($action == "add_info") {
        $user = new user_class($_POST["username"], $_POST["level"]);

        $db->add_user($user, $_POST["password"]);

        $link = 'user/index';

    } else if ($action == "login") {
        include "vue/user-login.php";

    } else if ($action == "login_info") {
        $user = new user_class($_POST["username"]);

        if ($user->login($db, $_POST["password"])) {
            $_SESSION["user"] = serialize($user);

            $link = "user/index";

        } else {
            info_message("Username or password incorrect. Please try again", "danger");
        }

    } else if ($action == "disconnect") {
        $_SESSION["user"] = "";
        $link = add_redirect("user/login");
    }

    if (!(empty($link))) {
        //var_dump($link);
        redirect($link);
    }