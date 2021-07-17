<?php
	class LoginDB extends Database {
		public function __construct() {
			parent::__construct("localhost", "login", "loginDB", "123");
		}

		// Return boolean if username already exists
		public function isUserExist(string $username) {
			try {
				if (!empty($this->select("users", "username", $username, PDO::FETCH_ASSOC))) {
					return true;
				}
			} catch (PDOException $e) {
				return false;
			}
			return false;
		}

		// Return boolean if user is sucessfully inserted into database
		public function insertUser(string $username, string $password) {
			$password = password_hash($password, PASSWORD_DEFAULT);
			if (!$this->isUserExist($username)) {
				$this->insert("users", array("NULL", $username, $password));
				return true;
			}
			return false;
		}

		// Return boolean if password entered matches the user's hashed password
		public function signIn(string $username, string $password) {
			$hashedPass = $this->select("users", "username", $username, PDO::FETCH_ASSOC)[0]['password'];
			return password_verify($password, $hashedPass);
		}
	}
?>