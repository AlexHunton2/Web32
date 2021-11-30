<?php
	abstract class Database {
		protected $DBH;
		protected $tables;
		protected $dbname;

		/**
		 * Establishes a connection to a database
		 */
		public function __construct(string $host, string $dbname, string $user, string $pass) {
			$this->dbname = $dbname;

			// Generate PDO Object to be used to access database
			try {
				$this->DBH = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
			} catch (PDOException $e) {
				echo $e->getMessage();
				$this->__destruct();
			}

			$this->performTableQuery();
		}

		/**
		 * Destructs the database object: closes connections
		 */
		public function __destruct(){
			if ($this->DBH != null) {
				$this->DBH = null;
			}
		}

		/**
		 * Static function creates the database if it not already created
		 * @param host The hostname for the database server
		 * @param root The root username
		 * @param root_password The associated password for root
		 * @param user The username to be created to access the newly created database
		 * @param pass The password for the user that can access the database
		 * @param dbname The name of the newly created database
		 */
		public static function create($host, $root, $root_password, $user, $pass, $dbname) {
			try {
				$dbh = new PDO("mysql:host=$host", $root, $root_password);
		
				$dbh->exec("CREATE DATABASE IF NOT EXISTS `$dbname`;
						CREATE USER IF NOT EXISTS '$user'@'localhost' IDENTIFIED BY '$pass';
						GRANT ALL ON `$dbname`.* TO '$user'@'localhost';
						FLUSH PRIVILEGES;")
				or die(print_r($dbh->errorInfo(), true));
		
			}
			catch (PDOException $e) {
				die("DB ERROR: " . $e->getMessage());
			}
		}
		
		/** 
		 * Create an array for all the tables in the database and returns it
		 * @return Array of all the tables in the connected database
		 */
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

		/** Insert a new row into a table
		* @param tbname = The name of the table
		* @param values = An array of the values for the inserted row *IN ORDER* 
		*/
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

		/** Update an existing row for a table
		* @param tbname = The name of the table
		* @param values = An arry of the values, KEYS MUST BE COLUMN NAMES
		* @param tb_id = An array with a size of 1, contains key and value for an unique id to the row(s)
		*/
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

		/** 
		* Select an existing row from a table
		* @param tbname = Table name
		* @param key_name = The column name for the key
		* @param key_value = The value of the row for that column
		* @param pdo_fetch = Which type of fetch for the resulting row
		* @return Array of the data selected
		*/
		protected function select(string $tbname, string $key_name, string $key_value, $pdo_fetch) {
			try {
				$STH = $this->DBH->query("SELECT * FROM $tbname WHERE $key_name= '$key_value'");
				$STH->setFetchMode($pdo_fetch);
				return $STH->fetchAll();
			} catch(PDOException $e) {
				echo $e->getMessage();
			}
		}


		/**
		 * Deletes a key,value pair from a table
		 * @param tbname = Table name
		 * @param key_name = The column name for the key
		 * @param key_value = The actual value of the key
		 */
		protected function delete(string $tbname, string $key_name, string $key_value) {
			try {
				$STH = $this->DBH->query("DELETE FROM $tbname WHERE $key_name= '$key_value'");
			} catch(PDOException $e) {
				echo $e->getMessage();
			}
		}
	}
?>