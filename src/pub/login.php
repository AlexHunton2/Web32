<?php
	// If user is already logged in, return them home
	Redirect::redirect_session('home');

	// On submit of form, user and pass will be set in POST
	if (isset($_POST['user']) && isset($_POST['pass'])) {
		$login_db = new LoginDB(); // Login Database Object
		$result = $login_db->signIn($_POST['user'], $_POST['pass']);
		if ($result) {
			Alerts::createAlert('success', 'Success! You are logged in!');
			$user_id = $login_db->getUserIDFromUsername($_POST['user']);
			$user_entity = new User_Entity($_POST['user'], $user_id);
			$_SESSION['user_entity'] = serialize($user_entity); //Important to serialize user_entity object
			Redirect::redirect_page('home');
		} else {
			Alerts::createAlert('danger', 'Invalid Login Credentials.');
		}
	}	

	require "src/static/templates/login.html";
?>