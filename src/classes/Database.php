<?php
	// abstract class Database {
	class Database {
		protected $DBH;
		protected $tables;
		protected $dbname;


		public function __construct(string $host, string $dbname, string $user, string $pass) {
			$this->dbname = $dbname;

			// Generate PDO Object to be used to access database
			try {
				$this->DBH = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
			} catch (PDOException $e) {
				echo $e->getMessage();
			}

			$this->performTableQuery();
		}

		// Create an array for all the tables in the database and returns it
		protected function performTableQuery() { 
			$this->tables = array();
			$table_names = array();
			try {
				// Get tables names
				$STH = $this->DBH->query("SELECT table_name FROM information_schema.tables WHERE table_schema = '$this->dbname'");
				$STH->setFetchMode(PDO::FETCH_NUM);
				$table_names = $STH->fetchAll();


				$temp = array();
				foreach($table_names as $i => $x) {
					foreach($x as $j => $table_name) {
						// Get column names for each table, put them in $temp array
						$STH = $this->DBH->query("SELECT COLUMN_NAME FROM information_schema.columns WHERE table_schema = '$this->dbname' AND table_name = '$table_name' ORDER BY table_name,ordinal_position;");
						$STH->setFetchMode(PDO::FETCH_NUM);
						$temp = $STH->fetchAll();

						// Hacky fix for problem where query outputs each column in it's own array
						$columns = array();
						foreach($temp as $n => $m) {
							foreach($m as $b => $f) {
								array_push($columns, $f);
							}
						}

						// Add table to table array
						$this->tables[$table_name] = $columns;
					}
				}

			} catch (PDOException $e) {
				echo $e->getMessage();
			}
		}

		// Insert a new row into a table
		// $tbname = The name of the table
		// $values = An array of the values for the inserted row *IN ORDER* 
		protected function insert(string $tbname, array $values) {
			// Hacky Solution: Create an array with "?" per column then implode it to work with PDOs
			$keys = $this->tables[$tbname];
			$format_keys = array();
			foreach($keys as $i => $key) {
				array_push($format_keys, "?");
			}
			$format_keys = implode(", ", $format_keys);

			// Acutal Insert Block
			try {
				$STH = $this->DBH->prepare("INSERT INTO $tbname VALUES ($format_keys)");
				$STH->execute($values);
			} catch(PDOException $e) {
				echo $e->getMessage();
			}

		}

		// Update an existing row for a table
		// $tbname = The name of the table
		// $values = An arry of the values, KEYS MUST BE COLUMN NAMES
		// $tb_id = An array with a size of 1, contains key and value for an unique id to the row(s)
		protected function update(string $tbname, array $values, array $tb_id) {
			// Unique key and value
			$identifier = array();
			foreach ($tb_id as $k => $v) {
				array_push($identifier, "$k= '$v'");
			}
			$identifier = implode('AND ', $identifier);

			// Hacky solution to getting the format correct for the setting the row
			$temp = array();
			$updates = array();
			foreach($values as $column => $value) {
				array_push($temp, "$column= ?");
				array_push($updates, $value);
			}
			$temp = implode(", ", $temp);

			// Acutal Update Block
			try {
				$STH = $this->DBH->prepare("UPDATE $tbname SET $temp WHERE $identifier");
				$STH->execute($updates);
			} catch(PDOException $e) {
				echo $e->getMessage();
			}
		}

		// Select an existing row from a table
		// $tbname = Table name
		// $key_name = The column name for the key
		// $key_value = The value of the row for that column
		// $pdo_fetch = Which type of fetch for the resulting row
		protected function select(string $tbname, string $key_name, string $key_value, $pdo_fetch) {
			try {
				$STH = $this->DBH->query("SELECT * FROM $tbname WHERE $key_name= '$key_value'");
				$STH->setFetchMode($pdo_fetch);
				return $STH->fetchAll();
			} catch(PDOException $e) {
				echo $e->getMessage();
			}
		}

		protected function delete(string $tbname, string $key_name, string $key_value) {
			try {
				$STH = $this->DBH->query("DELETE FROM $tbname WHERE $key_name= '$key_value'");
			} catch(PDOException $e) {
				echo $e->getMessage();
			}
		}
	}
?>