<?php
	$user_entity = unserialize($_SESSION['user_entity']);
	$user_entity->testPrint();

	echo <<<_END
		<br>
		<div id="led_button_container"></div>
		
		<div id="content"></div>
		<script src="./dist/dist/bundle.js"></script>
	_END;
?>