<?php
	require "error_response.php";
	// TODO: SANTIZE THE INPUTS AAAAAAAAAAAAAAAAAAAAAAAAA
	// Consider adding actual classes to the inputs so that class attributes can be santized automatically


	$widgetDB = new WidgetDB();
	$widget_id = $wild_card; // INDEX.PHP VARIABLE
	$user_entity = unserialize($_SESSION['user_entity']);
	$user_id = $user_entity->getUserID();

	if (!$widgetDB->isOwnedByUser($user_id, $widget_id)) {
		http_response_code(403);
		exit;
	}

	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (!isset($data_key) && $data_flag) {
			// If the user didn't have another forward slash:
			// Example: api/widgets/{WIDGET ID}
			// Requesting the base data of the widget
			$widget_info = $widgetDB->getWidgetFromID($widget_id);
		} else {
			// If the user DID have another forward slash:
			// Example: api/widgets/{WIDGET ID}/{DATA KEY}
			// Requesting a piece of data from the widget
			// or all if they added a *
			
			if ($data_key == "*") {
				$widget_info = $widgetDB->getWidgetData($widget_id);
			} else {
				$aggregate_data = $widgetDB->getWidgetData($widget_id);
				foreach ($aggregate_data as $i => $data) {
					foreach($data as $k => $v) {
						if ($k == "widget_key") {
							if ($v == $data_key) {
								$widget_info = $data['widget_value'];
							} else {
								$widget_info = null;
							}
						}
					}
				}
			}
		}

		http_response_code(200);
		header('Content-Type: application/json');
		echo json_encode($widget_info);
		exit;
	}

	if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
		if (isset($_PUT['body'])) {
			$body_data = json_decode($_PUT['body']);
		} else {
			http_response_code(400);
			exit;
		}

		if (array_key_contains('label', $body_data) && array_key_contains('route', $body_data) && array_key_contains('widget_id', $body_data)) {
			$new_defaults = [
				'label'=> $body_data['widget_type'],
				'route'=> $body_data['widget_type'],
				'user_id'=> $user_id
			];
			$widgetDB->updateExistingWidget($new_defaults, $body_data['widget_id']);
		}

		if (array_key_contains('widget_key', $body_data) && array_key_contains('widget_value', $body_data)) {
			$widgetDB->updateWidgetData($widget_id, $body_data['widget_key'], $body_data['widget_value']);
		}
	}

?>