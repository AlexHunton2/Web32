<?php
	// Stolen from https://stackoverflow.com/questions/29959986/how-to-handle-php-notices-warnings-and-errors-in-rest-api
	if (!isset($_SESSION['user_entity'])) {
		http_response_code(403);
		exit;
	}


	error_reporting( E_ERROR | E_COMPILE_ERROR | E_WARNING );

	ini_set( 'display_errors', 0 );

	function exception_error_handler( $severity, $message, $file, $line ) 
	{
	    if ( !( error_reporting() & $severity ) ) {
	        // This error code is not included in error_reporting
	        return;
	    }

	    // code for handling errors
	}
	set_error_handler( "exception_error_handler" );

	function fatal_error_shutdown() 
	{
	    $last_error = error_get_last();
	    if ( error_reporting() & $last_error['type'] )
	        call_user_func_array( 'exception_error_handler', $last_error );
	}
	register_shutdown_function( 'fatal_error_shutdown' );

?>