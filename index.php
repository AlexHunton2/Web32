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
	    "/transmit" => "priv/transmit.php",
	    "/api/widgets" => "api/widgets/init.php",
	    "/api/widgets/*" => "api/widgets/existing.php",
	    "/api/widgets/*/*" => "api/widgets/existing.php"
	];

	// A list of all the routes that will not send the header
	$header_blackisted_routes = ["api"];
	
	$root = "Web32/";
	$request = substr($_SERVER['REQUEST_URI'], strlen($root));

	if (str_contains($request, "?")) {
		$request = substr($request, 0, strpos($request, "?"));
	}

	function BasicAutoLoad($className) {
		include_once('src/classes/' . $className . '.php');
	}

	spl_autoload_register('BasicAutoLoad');

	$header_blacklisted = false;
	foreach ($header_blackisted_routes as $b) {
		if (str_contains($request, $b)) {
			$header_blacklisted = true;
		}
	}
	
	if (!$header_blacklisted) {
		require "src/static/header.html";

		if (array_key_exists('user_entity', $_SESSION)) {
			require "src/static/templates/header-in.php";
		} else {
			require "src/static/templates/header-out.html";
		}

		require "src/config.php";
	}

	$found = false;
	$data_flag = false;
	foreach ($pages as $key => $val) {
		if ($key == $request) {
			// Safe Guard: If they aren't logged in, they can't access priv
			if (str_contains($val, 'priv') && !isset($_SESSION['user_entity'])) {
				Redirect::redirect_page('main');
			}

			$found = true;
			require "src/$val";
		}

		if (fnmatch($key, $request)) {
			// API Wiget Card Wild Card
			if ($key == "/api/widgets/*") {
				$wild_card = substr($request, strlen($key) - 1);

				if (str_contains($wild_card, "/")) {
					$sub = substr($request, strpos($wild_card, "/") - 1);
					$wild_card = substr($wild_card, 0, strpos($wild_card, "/"));
					if (fnmatch("/api/widgets/$wild_card/*", $sub)) {
						$data_key = substr($sub, strlen("/api/widgets/$wild_card/"));
						$data_flag = true;
					}
				}

				
				require "src/$val";
			}

			$found = true;
		}
	}
	if (!$found) { require "src/pub/404.php"; }

	//Does a buffer thing in order to keep seperate files in output stream
	ob_end_flush();
?>

