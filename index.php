<?php
    // We start the session
    session_start();
    //$_SESSION = []; // Manual reset
    
    // Dispatcher
    define("WEBROOT", str_replace("index.php", "", $_SERVER["REQUEST_URI"]));
    define("ROOT", str_replace("index.php", "", $_SERVER["SCRIPT_FILENAME"]));
    
    //require_once ROOT . 'config/conf.php';
    //require_once ROOT . 'core/model.php';
    require_once ROOT . 'core/URL_Tools.php';
    require_once ROOT . 'core/controller.php';
    
    $path = explode("/", URL_Tools::get_path(WEBROOT));
    
    if (empty($path[2])) {
        $controller = "home";
    } else {
        $controller = $path[2];
    }
    
    if (empty($path[3])) {
        $action = "index";
    } else {
        $action = $path[3];
    }
    
    $controller_path = ROOT . 'controllers/' . $controller . '.php';
    
    if (file_exists($controller_path)){
        require_once $controller_path;
    } else {
        echo "404: ".$controller." doesn't exist";
        die();
    }
    
    // Create the controller
    $controller = new $controller();
    
    // We check if the action exist
    if (method_exists($controller, $action)) {
        $controller->$action();
    } else {
        echo "404: ".$action." doesn't exist";
        die();
    }

?>