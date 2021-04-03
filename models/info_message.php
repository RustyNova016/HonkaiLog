<?php
    /**
     * @param      $message
     * @param null $color
     * @param bool $dismissible
     */
    function info_message($message, $color = null, $dismissible = true) {
        if ($color == null) {
            $b_color = "alert-success";
        } else if ($color = "error" or $color = "danger") {
            $b_color = "alert-danger";
        } else {
            $b_color = "";
            $color_css = $color;
        }
        
        if ($dismissible) {
            $dismissible_css = "alert-dismissible";
        } else {
            $dismissible_css = "";
        }
        ?>
        <div class="container">
            <div class="alert <?=$b_color?> <?=$dismissible_css?> fade show" role="alert" style=" margin: 25px 0px;
        <?=$color_css?>">
                <?=$message?>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
            </div>
        </div>
        
        <?php
    }

?>