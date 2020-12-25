<?php
	if (session_status() === PHP_SESSION_NONE){session_start();}
	$pages = [
	    "" => "main.php",
	    "/" => "main.php",
	    "/main" => "main.php",
	    "/login" => "login.php", 
	    "/register" => "register.php",
	    "/logout" => "priv/logout.php",
	    "/home" => "priv/home.php",
	    "/settings" => "priv/settings.php",
	    "/transmit" => "priv/transmit.php"
	];
	

	$classes = scandir('src/classes');
	foreach(array_diff($classes, array('.', '..')) as $i) {
		require "src/classes/". $i;
	}

	if (array_key_exists('user_entity', $_SESSION)) {
		require "src/static/templates/header-in.php";
	} else {
		require "src/static/templates/header-out.html";
	}

	require "src/config.php";
	
	#TODO: Safe guard for any files within priv. All priv files require a session.
	$root = "User-root/AAC/";
	$request = substr($_SERVER['REQUEST_URI'], strlen($root));

	$found = false;
	foreach ($pages as $key => $val) {
		if ($key == $request) {
			$found = true;
			require "pub/$val";
		}

	}
	if (!$found) { require "pub/404.php"; }

	require "src/static/header.html";
?>

