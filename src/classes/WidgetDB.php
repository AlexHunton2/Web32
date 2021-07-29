<?php
	class WidgetDB extends Database {
		public function __construct() {
			parent::__construct("localhost", "widget", "widgetDB", "123");
		}

		// Adds Widget to the database
		public function addNewWidget(int $user_id, string $widget_type, string $label, string $route) {
			$this->insert("widgets", array('NULL', $widget_type, $label, $route, $user_id));
		}

		// Adds a Key and it's Value and ties it to a specific widget
		public function addNewWidgetData(int $widget_id, string $widget_key, string $widget_value) {
			$this->insert("widgets_data", array($widget_id, $widget_key, $widget_value));
		}

		// Returns array of the default data from all the widgets that the user has
		public function getWidgetsFromUser(int $user_id) {
			return $this->select("widgets", "user_id", $user_id, PDO::FETCH_ASSOC);
		}

		// Returns the specific widget defaults using it's widget_id
		public function getWidgetFromID(int $widget_id) {
			return $this->select("widgets", "widget_id", $widget_id, PDO::FETCH_ASSOC)[0];
		}

		// Returns all the extra data of the widget (all of it's keys and values)
		public function getWidgetData(int $widget_id) {
			return $this->select("widgets_data", "widget_id", $widget_id, PDO::FETCH_ASSOC);
		}

		// Updates the defaults of an existing widget
		// Takes an array of the widget data, array's keys should be the names of the columns
		// Column Names: widget_type, label, route, user_id
		public function updateExistingWidget(int $widget_id, array $widget_defaults) {
			if (array_key_exists('widget_id', $widget_defaults)) {
				unset($widget_defaults['widget_id']);
			}
			$this->update("widgets", $widget_defaults, array('widget_id'=>$widget_id));
		}

		// Updates an key-value pair in the widgets_data table given a certain widget_id
		public function updateWidgetData(int $widget_id, string $widget_key, string $widget_new_value) {
			$possible_widgets = $this->getWidgetData($widget_id);
			foreach ($possible_widgets as $i => $widget) {
				if ($widget['widget_key'] == $widget_key) {
					$this->update('widgets_data', array('widget_value'=>$widget_new_value), array('widget_id'=>$widget_id, 'widget_key'=>$widget_key));
				}
			}

		}

		public function deleteWidget(int $widget_id) {
			$this->delete('widgets', 'widget_id', $widget_id);
		}

		// Checks if a widget_id is associated with a user
		public function isOwnedByUser(int $user_id, int $widget_id) {
			$widgets_of_user = $this->getWidgetsFromUser($user_id);
			foreach ($widgets_of_user as $i => $widget_info) {
				if ($widget_info['widget_id'] == $widget_id) {
					return true;
				}
			}
			return false;
		}
	}
?>