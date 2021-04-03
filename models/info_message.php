<?php
    function info_message($message, $color=null, $dismissible=true){
        if ($color == null){
            $color_css = "color: #383d41;
                            background-color: #e2e3e5;
                            border-color: #d6d8db;";
        } else{
            $color_css = $color;
        }
        
        if ($dismissible){
            $dismissible_css = "alert-dismissible";
        } else{
            $dismissible_css = "";
        }
        ?>
        
        <div class="alert <?=$dismissible_css?> fade show" role="alert" style=" margin: 25px 0px; <?=$color_css?>">
            <?=$message?>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
        </div>
        
        <?php
    }
?>