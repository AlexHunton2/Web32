<?php
	require "src/static/templates/register.html";

	$alerts = new alerts();
	if (isset($_POST['user']) && isset($_POST['pass']) && isset($_POST['confirm-pass'])) {
		if (validation::validate_username($_POST['user']) == "" && validation::validate_password($_POST['pass']) == "") {
			if ($_POST['pass'] == $_POST['confirm-pass']) {
				$sql_user = new sql_user($db);
				$result = $sql_user->insertUser($_POST['user'], $_POST['pass']);
				if ($result) {
					$alerts->createAlert('success', 'Success! You are registered!');
				}
			} else {
				$alerts->createAlert('danger', "Oops! Passwords don't match. Please retry.");
			}
		} else {
			$error = validation::validate_username($_POST['user']);
			if ($error == "") $error = validation::validate_password($_POST['pass']);
			$alerts->createAlert('danger', "Oops! $error");
		}
	}
?>