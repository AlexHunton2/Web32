<?php
	require "src/static/templates/login.html";

	if (array_key_exists('user_entity', $_SESSION)) {
		header("Location: home");
	}

	if (isset($_POST['user']) && isset($_POST['pass'])) {
		$alerts = new alerts();
		$sql_user = new sql_user($db);
		$result = $sql_user->signIn($_POST['user'], $_POST['pass']);
		if ($result) {
			$alerts->createAlert('success', 'Success! You are logged in!');
			//TODO: ADD SESSION TIMEOUT SYSTEM. GOOD LUCK <3
			$user_entity = new user_entity($result['username'], $result['user_id']);
			$_SESSION['user_entity'] = serialize($user_entity); //Important to serialize user_entity object
			header("Location: home");
		} else {
			$alerts->createAlert('danger', 'Invalid Login Credentials.');
		}
	}	

	
?>