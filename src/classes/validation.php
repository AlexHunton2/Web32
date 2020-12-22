<?php
	class validation {
		static public function validate_username($field) {
			if ($field == "") return "No username entered";
			else if (strlen($field) < 5)
				return "Usernames must be atleast 5 letters";
			else if (preg_match("/[^a-zA-Z0-9_-]/", $field))
				return "Only letters, numbers, - and _, are allowed in usernames";
			return "";
		}

		static public function validate_password($field) {
			if ($field == "") return "No Password was entered";
			else if (strlen($field) < 6)
				return "Passwords must be longer than 6 letters";
			else if (!preg_match("/[a-z]/", $field) || !preg_match("/[A-Z]/", $field) || !preg_match("/[0-9]/", $field))
				return "Passswords require one lowercase letter, one uppercase letter, and one number";
			return "";	
		}

	}
?>