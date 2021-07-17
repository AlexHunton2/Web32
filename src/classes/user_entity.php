<?php
	class User_Entity {
		private $username;
		private $user_id;

		function __construct($user, $id) {
			$this->username = $user;
			$this->user_id = $id;
		}

		public function testPrint() {
			echo $this->username;
			echo $this->user_id;
		}

		public function getUsername() {
			return $this->username; 
		}
	}
?>