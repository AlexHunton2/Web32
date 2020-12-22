<?php
	class redirect {
		#Redireccts based on session
		public static function redirect_session($page) {
			if (!array_key_exists('user_entity', $_SESSION)) {
				header("Location: ?p=$page");
			}
		}
	}
?>
