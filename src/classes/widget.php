<?php
	class widget {
		private $type;
		private $label;

		function __construct($type, $label) {
			$this->type = $type;
			$this->label = $label;
		}

		function getLabel() {
			return $this->label;
		}

		function getType() {
			return $this->type;
		}
	}
?>
