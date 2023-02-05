<?php require("register.class.php") ?>
<?php
	if(isset($_POST['submit'])){
		$user = new RegisterUser($_POST['username'], $_POST['password'], $_POST['name'], $_POST['surname'], $_POST['password2']);
	}
?>

<!DOCTYPE html>
<html lang="de">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, content='viewport-fit=cover, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <title>Shop</title>
    <link rel="icon" href="res/favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="resources/favicon.ico" type="image/x-icon"/>
    <link rel="apple-touch-startup-image" href="res/icon.png">
    <link rel="apple-touch-icon-precomposed" href="res/icon.png"/>
    <link rel="apple-touch-icon" href="res/icon.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="res/72.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="res/114.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="res/144.png" /> 
    <link rel="manifest" href="res/manifest.webmanifest">
	<link rel="stylesheet" href="lib/css/style.css">
</head>
<body>

	<form action="" method="post" enctype="multipart/form-data" autocomplete="off">
		<img src="res/icons/account.svg">
		<h2>Registrieren</h2>
		<input type="text" name="username" placeholder="Benutzername">
		<input type="text" name="name" placeholder="Vorname">
		<input type="text" name="surname" placeholder="Nachname">
		<input type="password" name="password" placeholder="Passwort">
		<input type="password" name="password2" placeholder="Passwort wiederholen">

		<button type="submit" name="submit">Registrieren</button>
		<p class="error"><?php echo @$user->error ?></p>
		<p class="success"><?php echo @$user->success ?></p>
		<a class="form_link" href="login.php">Schon registriert?</a>
	</form>

</body>
</html>