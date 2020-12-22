<?php
	class alerts {
		public function createAlert($type, $message) {
			echo <<<_END
				<div class="alert alert-$type alert-trim" role="alert">
					$message
				</div>
			_END;
		}
	}
?>