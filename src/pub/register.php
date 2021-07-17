<?php
	require "src/static/templates/register.html";

	$Alerts = new alerts();
	if (isset($_POST['user']) && isset($_POST['pass']) && isset($_POST['confirm-pass'])) {
		if (Validation::validate_username($_POST['user']) == "" && Validation::validate_password($_POST['pass']) == "") {
			if ($_POST['pass'] == $_POST['confirm-pass']) {
				$login_db = new LoginDB();
				$result = $login_db->insertUser($_POST['user'], $_POST['pass']);
				if ($result) {
					$Alerts->createAlert('success', 'Success! You are registered!');
				}
			} else {
				$Alerts->createAlert('danger', "Oops! Passwords don't match. Please retry.");
			}
		} else {
			$error = Validation::validate_username($_POST['user']);
			if ($error == "") $error = Validation::validate_password($_POST['pass']);
			$Alerts->createAlert('danger', "Oops! $error");
		}
	}
?>