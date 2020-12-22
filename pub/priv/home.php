<?php
	$user_entity = unserialize($_SESSION['user_entity']);
	$user_entity->testPrint();

	echo <<<_END
		<br>
		<div id="like_button_container"></div>
	_END;
?>