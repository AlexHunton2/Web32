<?php
	class sql_user extends sql {
		function __construct($db) {
			parent::__construct($db);
		}

		function __destruct() {
			parent::__destruct();
		}

		private function isUserExist($username) {
			$row = $this->getRow('login', 'users', 'username', $username);
			return !empty($row) ? $row : False;
		}

		public function hashPassword($password) {
			$presalt = "b1W^";
			$postsalt = "Cv!0";
			$password = $presalt . $password . $postsalt;
			return hash('ripemd128', $password);
		}

		public function insertUser($username, $password) {
			$alerts = new alerts();
			$user = $this->santaizeInput($this->connections['login'], $username);
			$pass = $this->hashPassword($this->santaizeInput($this->connections['login'], $password));
			if ($this->isUserExist($user)) { //If User exists
				$alerts->createAlert('danger','Oops! That username is already used, please choose a different one!');
			} else { //IF User doesn't exist
				$this->insertRow('login', 'users', array('NULL', $user, $pass));
				return True;
			}
			return False;
		}

		public function signIn($username, $password) {
			$user = $this->santaizeInput($this->connections['login'], $username);
			$pass = $this->hashPassword($this->santaizeInput($this->connections['login'], $password));
			$row = $this->isUserExist($user);
			if ($row) { 
				if ($row['password'] == $pass) {
					return $row;
				}
			}
			return False;
		}
	}
?>