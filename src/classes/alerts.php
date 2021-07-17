<?php
	class Alerts {
		public static function createAlert($type, $message) {
			echo <<<_END
				<div class="alert alert-$type alert-trim" role="alert">
					$message
				</div>
			_END;
		}
	}
?>