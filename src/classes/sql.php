<?php
	class sql {
		protected $connections;
		protected $tables = array(
					'login' => array('users' => array('user_id' => 'INT AUTO_INCREMENT PRIMARY KEY', 
													'username' => 'VARCHAR(256) NOT NULL UNIQUE', 
													'password' => 'VARCHAR(32) NOT NULL'
													),
									),
					//'user_data' => array('widgets')
				);
		
		function __construct($db) {
			foreach ($db as $name => $info) {
				$conn = new mysqli($info['host'], $info['user'], $info['pass'], $name);
				if ($conn->connect_error) die($conn->connect_error);
				$this->connections[$name] = $conn;	
			}			
			//$this->generateTables();
		}

		function __destruct() {
			//Close Connections
			foreach ($this->connections as $dbname => $conn) {
				$conn->close();
			}
		}

		private function generateTables() {
			foreach ($this->tables as $dbname => $tbs) {
				$conn = $this->connections[$dbname];
				foreach ($tbs as $tbname => $cols) {
					$tbdata = "";
					foreach ($cols as $colname => $coldata) {
						//Dumb way of making sure a comma doesn't get added to the end.
						$i = array_search($colname, array_keys($cols));
						if ((count($cols) - 1) != $i) {
							$tbdata = $tbdata . $colname . " " . $coldata . ", ";
						} else {
							$tbdata = $tbdata . $colname . " " . $coldata;
						}
					} 
					$result = $conn->query("CREATE TABLE IF NOT EXISTS $tbname ($tbdata)");
					if (!$result) echo 'Database Access Failed, could not perform creation query: ' . $conn->error;
				}
			}
		}

		private function formatValues($array) {
			$final = "";
			for ($i = 0; $i < count($array); $i++) {
				if ($i == (count($array) - 1)) {
					$final = $final . "'" . $array[$i] . "'";
				} else {
					$final = $final . "'" . $array[$i] . "'" . ", ";
				}
			}
			return $final;
		}

		protected function santaizeInput($conn, $string) {
			if (get_magic_quotes_gpc()) $string = stripslashes($string);
			return htmlentities($conn->real_escape_string($string));
		}

		//Returns an array for a specific row in a table, can retuurn the raw result object if flag is set.
		protected function getRow($dbname, $tbname, $keyname, $key, $raw=False) {
			$conn = $this->connections[$dbname];
			$result = $conn->query("SELECT * FROM $tbname WHERE $keyname = '$key';");
			if (!$result) die('Database Access Failed: ' . $conn->error);
			if ($raw) return $result;
			$keys = array_keys($this->tables[$dbname][$tbname]);
			$values = $result->fetch_array(MYSQLI_NUM);
			if ($values == NULL) return False;
			return array_combine($keys, $values);
		}

		protected function insertRow($dbname, $tbname, $data) {
			$conn = $this->connections[$dbname];
			$cols = array_keys($this->tables[$dbname][$tbname]);
			$values = $this->formatValues($data);
			$result = $conn->query("INSERT INTO $tbname VALUES ($values)");
			if (!$result) echo 'Database Insertion Failed: ' . $conn->error;
		}

		//TODO: UPDATE ROW FUNCTION

	}
?>