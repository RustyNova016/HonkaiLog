<nav class="navbar navbar-expand-lg navbar-dark" style="">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Honkai log</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="/honkailog/">Home</a>
                <a class="nav-link" href="/honkailog/user">Users</a>
                <a class="nav-link" href="/honkailog/currency">Currencies</a>
            </div>
        </div>
    </div>
</nav>

<?php
$json = file_get_contents("img/background/background.json");
$background_array = json_decode($json, true);
$background = $background_array[array_rand($background_array, 1)]   ;
?>

<div class="background-div" style="background-image: url(img/background/<?=$background ?>.png);">
    <div class="background-div">