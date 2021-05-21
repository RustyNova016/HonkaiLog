<div class="bg">
    <div class="container bg">
        <?php
        /**
         * @var user_class $usera
         */
            $usera = unserialize($_SESSION["user"]);

        ?>
        <h1><?=$usera?> logged in </h1>
        <a href="/honkailog/user/disconnect" class="btn btn-danger">Disconnect</a>
    </div>
</div>