<?php require("login.class.php") ?>
<?php 
	if(isset($_POST['submit'])){
		$user = new LoginUser($_POST['username'], $_POST['password']);
	}
?>
<!DOCTYPE html>
<html lang="de">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	 <link rel="stylesheet" href="style.css">
	<title>Login</title>
</head>
<body>
	<form action="" method="post" enctype="multipart/form-data" autocomplete="off">
		<h2>Login</h2>

		<label>Benutzername</label>
		<input type="text" name="username">

		<label>Passwort</label>
		<input type="password" name="password">

		<button type="submit" name="submit">Log in</button>

		<p class="error"><?php echo @$user->error ?></p>
		<p class="success"><?php echo @$user->success ?></p>
		<a class="form_link" href="register.php">Registrieren</a>
	</form>

</body>
</html>