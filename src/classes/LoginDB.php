<?php
	class LoginDB extends Database {
		public function __construct() {
			parent::__construct("localhost", "login", "loginDB", "123");
		}

		/**
		 * Checks whether a user already exists
		* @return boolean if username already exists
		*/
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

		/**
		* Will append user to the login database 
		* @return boolean if user is sucessfully inserted into database
		*/
		public function insertUser(string $username, string $password) {
			$password = password_hash($password, PASSWORD_DEFAULT);
			if (!$this->isUserExist($username)) {
				$this->insert("users", array("NULL", $username, $password));
				return true;
			}
			return false;
		}

		/**
		* Attempts to log-in the user but checking if provided password matches database
		* @return boolean if password entered matches the user's hashed password
		*/
		public function signIn(string $username, string $password) {
			$hashedPass = $this->select("users", "username", $username, PDO::FETCH_ASSOC)[0]['password'];
			return password_verify($password, $hashedPass);
		}

		public function getUserIDFromUsername(string $username) {
			return $this->select("users", "username", $username, PDO::FETCH_ASSOC)[0]['user_id'];
		}
	}
?>