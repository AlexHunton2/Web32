<body class="text-center">	
	<div class="user-box">
		<br>
		<form class="form-signin" action="" method="post">
			<h1 class="h3 mb-3 font-weight-normal">Sign In!</h1>
			<input placeholder="Username" id="inputUserName" class="form-control" type="text" name="user" required>
			<input placeholder="Password" id="inputPassword" class="form-control" type="password" name="pass" autocomplete="new-password" required> <br>
			<input type="submit" class="btn btn-lg btn-secondary btn-block" value="Login">
		</form>
	</div>
</body>

<?php
	if (array_key_exists('user_entity', $_SESSION)) {
		header("Location: ?p=home");
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
			header("Location: ?p=home");
		} else {
			$alerts->createAlert('danger', 'Invalid Login Credentials.');
		}
	}	

	
?>