<?php
	class Redirect {
		#Redireccts based on session
		public static function redirect_session($page) {
			if (array_key_exists('user_entity', $_SESSION)) {
				redirect::redirect_page($page);
			}
		}

		public static function redirect_page($page) {
			header("Location: $page");
			exit();
		}
	}
?>
