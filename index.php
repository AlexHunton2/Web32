<?php
	if (session_status() === PHP_SESSION_NONE){session_start();}
	$pages = [
	    "" => "main.php",
	    "login" => "login.php", 
	    "register" => "register.php",
	    "logout" => "priv/logout.php",
	    "home" => "priv/home.php",
	    "settings" => "priv/settings.php",
	    "transmit" => "priv/transmit.php"
	];
	
	$page = @$_GET['p'];
	$page = @$pages[$page] ?: "main.php";

	$classes = scandir('src/classes');
	foreach(array_diff($classes, array('.', '..')) as $i) {
		require "src/classes/". $i;
	}

	if (array_key_exists('user_entity', $_SESSION)) {
		require "src/static/templates/header-in.php";
	} else {
		require "src/static/templates/header-out.html";
	}

	#Safe guard for any files within priv. All priv files require a session.
	if (strpos($page, 'priv') !== false) {
		redirect::redirect_session("login");
	}

	require "src/config.php";
	require "pub/$page";
	
	require "src/static/header.html";
?>

