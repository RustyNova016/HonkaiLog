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

    function send_to_JS($data, $name){
        $data = strval($data)

        ?>
        <div id="<?=$name?>" style="display: none;">
            <?php
                echo htmlspecialchars($data); /* You have to escape because the result
                                           will not be valid HTML otherwise. */
            ?>
        </div>
        <?php
    }

    function send_to_JS_json($data, $name){
        ?>
        <div id="<?=$name?>" style="display: none;">
            <?php
                echo json_encode($data); /* You have to escape because the result
                                           will not be valid HTML otherwise. */
            ?>
        </div>
        <?php
    }
