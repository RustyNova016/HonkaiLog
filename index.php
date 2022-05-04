<?php
    // We start the session
    session_start();
    //$_SESSION = [];

    require_once "global/connection.php";
    require_once "global/user.php";
    require_once "models/info_message.php";
    require_once "templates/header.php";
    require_once "templates/menu.php";

    if (isset($_GET["p"])) {
        //echo "p :".$_GET["p"];
        $params = explode("/", $_GET["p"]);
    } else {
        $params = array("", "");
    }

    //var_dump($_SESSION);
    // Debug
    //echo "<pre>";
    //print_r($params);
    //echo "</pre>";

    if (!empty($params["0"])) {
        $controller = $params["0"];
    } else {
        $controller = "home";
    }


    if (!empty($params["1"])) {
        $action = $params["1"];
    } else {
        $action = "index";
    }

    $page = "controllers/" . $controller . "-" . $action . ".php";

    // Ugly, but required for actual MVC migration.
    $indexes_list = ["material"];

    if (!empty($params["0"])) {
        if (in_array($params["0"], $indexes_list)) {
            $page = "controllers/" . $controller . "-index.php";
        }
    }


    //echo $page;
    if (!@include($page)) {
        include("vue/404-index.php");
    }

    require_once "templates/footer.php";
    $dbh = null;
?>