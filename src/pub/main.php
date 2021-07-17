<?php
	// TODO: Welcome main page with text about what the functionality, register, and login

	//$db = new Database("localhost", "login", "login_DB", "a78das08d");
	//$db->insert('users', array('NULL', 'test123456', '555'));

	//print_r($db->select('users', 'username', 'newBETTERuser', PDO::FETCH_ASSOC));

	$widgetDB = new WidgetDB();
	//$widgetDB->addNewWidgetData(1, "rotate", "left");
	$widgetDB->addNewWidgetData(2, "rotation", "90");
	//print_r($widgetDB->getWidgetData(1));

	echo 'This is Main!';
	echo <<<_END
		<br>
		TEMP PAGE.
	_END;
?>