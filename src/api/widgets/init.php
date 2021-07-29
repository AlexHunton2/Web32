<?php
	require "error_response.php";
	
	$widgetDB = new WidgetDB();
	$user_entity = unserialize($_SESSION['user_entity']);
	$user_id = $user_entity->getUserID();

	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		// CREATE NEW WIDGET
		$raw = file_get_contents('php://input');
		$body_data = json_decode($raw, true);

		try {
			$widget_type = $body_data['widget_type'];
			$label = $body_data['label'];
			$route = $body_data['route'];

			$widgetDB->addNewWidget($user_id, $widget_type, $label, $route);

			http_response_code(204);
			exit;
		} catch (Exception $e) {}

	}

	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		// GET WIDGET INFO
		try {
			$widget_info = null;
			if (isset($_GET['widget_id'])) {
				$widget_id = $_GET['widget_id'];
				if ($widgetDB->isOwnedByUser($user_id, $widget_id)) {
					$widget_info = $widgetDB->getWidgetFromID($widget_id);
				} else {
					http_response_code(403);
					exit;
				}
			} else {
				$widget_info = $widgetDB->getWidgetsFromUser($user_id);
			}

			http_response_code(200);
			header('Content-Type: application/json');
			echo json_encode($widget_info);
			exit;
		} catch (Exception $e) {}
	}

?>