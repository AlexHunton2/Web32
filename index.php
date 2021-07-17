<?php
	ob_start();
	
	if (session_status() === PHP_SESSION_NONE){session_start();}

	if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 1800)) {
		    // last request was more than 30 minutes ago
		    session_unset();     // unset $_SESSION variable for the run-time 
		    session_destroy();   // destroy session data in storage
	}
	if (isset($_SESSION['user_entity'])) {
		$_SESSION['LAST_ACTIVITY'] = time();
	}


	$pages = [
	    "" => "pub/main.php", 
	    "/" => "pub/main.php",
	    "/main" => "pub/main.php",
	    "/login" => "pub/login.php", 
	    "/register" => "pub/register.php",
	    "/logout" => "priv/logout.php",
	    "/home" => "priv/home.php",
	    "/settings" => "priv/settings.php",
	    "/transmit" => "priv/transmit.php"
	];
	
	function BasicAutoLoad($className) {
		include_once('src/classes/' . $className . '.php');
	}


	spl_autoload_register('BasicAutoLoad');
	
	require "src/static/header.html";

	if (array_key_exists('user_entity', $_SESSION)) {
		require "src/static/templates/header-in.php";
	} else {
		require "src/static/templates/header-out.html";
	}

	require "src/config.php";

	$root = "User-root/AAC/";
	$request = substr($_SERVER['REQUEST_URI'], strlen($root));

	$found = false;
	foreach ($pages as $key => $val) {
		if ($key == $request) {
			// Safe Guard: If they aren't logged in, they can't access priv
			if (str_contains($val, 'priv') && !isset($_SESSION['user_entity'])) {
				Redirect::redirect_page('main');
			}

			$found = true;
			require "src/$val";
		}

	}
	if (!$found) { require "src/pub/404.php"; }

	//Does a buffer thing in order to keep seperate files in output stream
	ob_end_flush();
?>

