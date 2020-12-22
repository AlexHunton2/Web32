<body class="text-center">	
	<div class="user-box">
		<br>
		<form class="form-signin" action="" method="post">
			<h1 class="h3 mb-3 font-weight-normal">Register</h1>
			<input placeholder="Username" id="inputUserName" class="form-control" type="text" name="user" required>
			<input placeholder="Password" id="inputPassword" class="form-control" type="password" name="pass" autocomplete="new-password" required>
			<input placeholder="Confirm Password" id="inputPassword" class="form-control" type="password" name="confirm-pass" autocomplete="new-password" required> <br>
			<input type="submit" class="btn btn-lg btn-secondary btn-block" value="Register">
		</form>
	</div>
</body>

<?php
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