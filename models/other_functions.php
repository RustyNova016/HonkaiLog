<?php
    function end_no_cursor($array) {
        return end($array);
    }
    
    function redirect(string $link): void {
        $host = $_SERVER['HTTP_HOST'];
        $uri = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
        
        $str = "http://$host$uri/$link";
        
        echo '<meta http-equiv="refresh" content="0;url=' . $str . '" >';
        die();
    }

    function login_redirect(string $current_page_link) : void {
        redirect("user?redirect=".$current_page_link);
    }

    function add_redirect(string $link){
        if (!(empty($_REQUEST["redirect"]))){
            $link .= "&redirect=".$_REQUEST["redirect"];
        }
        return $link;
    }
