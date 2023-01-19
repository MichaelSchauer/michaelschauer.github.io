<?php require("register.class.php") ?>
<?php
	if(isset($_POST['submit'])){
		$user = new RegisterUser($_POST['username'], $_POST['password'], $_POST['name'], $_POST['surname']);
	}
?>

<!DOCTYPE html>
<html lang="de">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	 <link rel="stylesheet" href="style.css">
	<title>Registrieren</title>
</head>
<body>

	<form action="" method="post" enctype="multipart/form-data" autocomplete="off">
		<h2>Registrieren</h2>

		<label>Benutzername</label>
		<input type="text" name="username">

		<label>Vorname</label>
		<input type="text" name="name">

		<label>Nachname</label>
		<input type="text" name="surname">

		<label>Passwort</label>
		<input type="password" name="password">

		<button type="submit" name="submit">Registrieren</button>
		<p class="error"><?php echo @$user->error ?></p>
		<p class="success"><?php echo @$user->success ?></p>
		<a class="form_link" href="login.php">Login</a>
	</form>

</body>
</html>