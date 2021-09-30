<h1>
    <?php
        if (!isset($_SESSION["iduser"])) {
            echo "Welcome to honkailog !";
        } else {
            echo "Welcome back, [user here]";
        }
    ?>
</h1>
