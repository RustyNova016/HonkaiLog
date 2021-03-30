<div class="bg">
    <div class="container bg">

		<div id="contenu" >
			<h2>Identification utilisateur</h2>
			<form method="POST"> <!--action ="index1.php?page=ControlerAct&param=validConnexion">-->
			<p>
				login : <input type="text" name="login" value ="" size="50"/><br/>
				mdp :   <input type="password" name="mdp" value ="" size="50"><br/>
				<input type="submit" value="valider" name="valider">
				<input type="reset" value="annuler" name="annuler">
			</p>
			</form>
		</div>

		<div class="bg">
			<div class="container">
				<h1 style="padding: 10px 0px">Users</h1>

				<table class="table table-striped table-hover table-dark">
					<tr>
						<th class="type">Username</th>
						<th class="numero">level</th>
						<th class="type"></th>
					</tr>

					<?php
					  foreach ($captains as $cap)
					{
						$id = $cap["id_user"];
						$username = $cap['name'];
						$level = $cap['level'];

						if ($id == $_SESSION["iduser"]){
							$username = "<i class=\"bi bi-check\"></i> ".$username;
						}
					?>
					<tr>
						<td><?php echo $username ?></td>
						<td><?php echo $level ?></td>
						<td>
							<a href= <?php echo "/honkailog/user/index/".$id  ?>>Switch to this account</a>
							<a href= <?php echo "#".$id ?>> | <i class="bi bi-trash-fill"></i></a>
						</td>
					</tr>
					<?php
					  }
					?>
				</table>
			</div>
		</div>
	</div>
</div>
