<?php
    if (WEBROOT != "/honkailog/failpage/page_404") {
        ?>
        <div class="row">
            <div class="container">
                <br>
                <h1 style="font-size: 100px">
                    404 :(
                </h1>
                <h2 style="font-size: 30px; margin-top: 20px">
                    <?=WEBROOT?> isn't available. Are you sure it's a correct page?
                </h2>
                <br>
                <a class="btn btn-primary btn-lg" style="margin-bottom: 20px" href="/honkailog/">Return home</a>
            </div>
        </div>
        <?php
    } else {
        ?>
        <div class="row">
            <div class="container">
                <br>
                <h1 style="font-size: 100px">
                    404...?
                </h1>
                <h2 style="font-size: 30px; margin-top: 20px">
                    Congratulations! You found the 404 page!
                </h2>
                <br>
                <a class="btn btn-primary btn-lg" style="margin-bottom: 20px" href="/honkailog/">Return home</a>
            </div>
        </div>
        <?php
    }
?>
