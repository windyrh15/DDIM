<?php
    $redirect_to = $_SERVER['HTTP_REFERER'];

	session_start();
	session_destroy();
	unset($_SESSION['user_id']);
	unset($_SESSION['nama']);
	unset($_SESSION['level']);
	unset($_SESSION['photo']);
	unset($_SESSION['owner_id']);
	
	header("location: login.php");


?>