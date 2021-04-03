<nav class="navbar navbar-expand-lg navbar-dark" style="">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Honkai log</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="/honkailog/">Home</a>
                <a class="nav-link" href="/honkailog/bp">Battle pass</a>
                <a class="nav-link" href="/honkailog/materials/explore">Materials</a>
            </div>
        </div>
        <div class="d-flex">
            <?php
                if (empty($_SESSION["user"])){
                
            ?>
                    <a class="nav-link" href="/honkailog/user">Log in</a>
            <?php
                } else {
                    $user = unserialize($_SESSION["user"])
            ?>
                    <a class="nav-link" href="/honkailog/user"><?=$user->get_username() ?></a>
            <?php
                }
            ?>
            
        </div>
    </div>
</nav>

<?php
$json = file_get_contents("img/background/background.json");
$background_array = json_decode($json, true);
$background = $background_array[array_rand($background_array, 1)]   ;
?>

<div class="background-div" style="background-image: url(/honkailog/img/background/<?=$background ?>.png);">
    <div class="background-div">