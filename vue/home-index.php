<div class="container">
    <div class="container bg">
        <br>
        <h1>
        <?php
        if (!isset($_SESSION["iduser"])){
            echo "Welcome to honkailog!";
        } else {
            echo "Welcome back, [username]";
        }
        ?>
        </h1>
		<table border="1">
			<tr><th>Nom activite</th><th>Statut</th></tr>
			<?php
			foreach($result as $ligne)
			{
				$activityname = $ligne['name'];
				echo "<tr><td>".$activityname."</td></tr>";
				// echo "<tr><td></td><td></td><td></td></tr>";
			}
			?>
		</table>

    </div>
</div>