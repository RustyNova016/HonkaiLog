<?php
// We start the session
session_start();


include "global/connection.php";
include "templates/header.php";
include "templates/menu.php";

if(isset($_GET["p"]))
{
    //echo "p :".$_GET["p"];
    $params = explode("/", $_GET["p"]);
}
else
{
    $params = array("", "");
}

// Debug
//echo "<pre>";
//print_r($params);
//echo "</pre>";

if (!empty($params["0"]))
{
    $controller = $params["0"];
}
else
{
    $controller = "home";
}



if(!empty($params["1"]))
{
    $action = $params["1"];
}
else
{
    $action = "index";
}


$page = "controllers/".$controller."-".$action.".php";
//echo $page;
if(!@include($page))
{
    include("controllers/404-index.php");
}

include "templates/footer.php";
$dbh = null;
?>