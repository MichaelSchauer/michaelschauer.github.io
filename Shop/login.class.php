<?php 
class LoginUser{
	// class properties
	private $username;
	private $password;
	public $error;
	public $success;
	private $storage = "data.json";
	private $stored_users;

	// class methods
	public function __construct($username, $password){
		$this->username = $username;
		$this->password = $password;
		$this->stored_users = json_decode(file_get_contents($this->storage), true);
		$this->login();
	}


	private function login(){
		foreach ($this->stored_users as $user) {
			if($user['username'] == $this->username){
				if(password_verify($this->password, $user['password'])){
					session_start();
					$_SESSION['user'] = $this->username;
					$username = $this->username;

					$time = date("d.m.Y H:i:s"); 
					$ip = $_SERVER['REMOTE_ADDR'];
					//$log = strval($time) + " | " + strval($username) + " | Erfolgreicher Loginversuch";
					$log1 = strval($time)." | ".strval($username)." | Erfolgreicher Loginversuch"." | Client IP: ".$ip.PHP_EOL;

					//open file orders.json and write (overwrite) data into file 
					$file = fopen("log.txt", "a");
					echo fwrite($file, $log1);
					//close stream
					fclose($file);
					header("location: index.php"); exit();

				} else {
					$_SESSION['user'] = $this->username;
					$username = $this->username;

					$time = date("d.m.Y H:i:s"); 
					$ip = $_SERVER['REMOTE_ADDR'];
					//$log = strval($time) + " | " + strval($username) + " | Erfolgreicher Loginversuch";
					$log1 = strval($time)." | ".strval($username)." | Fehlgeschlagener Loginversuch"." | Client IP: ".$ip.PHP_EOL;

					//open file orders.json and write (overwrite) data into file 
					$file = fopen("log.txt", "a");
					fwrite($file, $log1);
					//close stream
					fclose($file);
				}
			}
		}
		$username = "unknown user";
		$time = date("d.m.Y H:i:s"); 
		$ip = $_SERVER['REMOTE_ADDR'];
		//$log = strval($time) + " | " + strval($username) + " | Erfolgreicher Loginversuch";
		$log1 = strval($time)." | ".strval($username)." | Fehlgeschlagener Loginversuch"." | Client IP: ".$ip.PHP_EOL;

		//open file orders.json and write (overwrite) data into file 
		$file = fopen("log.txt", "a");
		fwrite($file, $log1);
		//close stream
		fclose($file);

		return $this->error = "Falscher Benutzername oder Passwort";
	}

}