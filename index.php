<?php
  session_start();
  $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : false;
  require 'helper/koneksi.php';

  if ($user_id) {
    $nama = isset($_SESSION['nama']) ? $_SESSION['nama'] : false;
    $inisial_nama = isset($_SESSION['inisial_nama']) ? $_SESSION['inisial_nama'] : false;
    $owner_id = isset($_SESSION['owner_id']) ? $_SESSION['owner_id'] : false;
    $page = isset($_GET['page']) ? $_GET['page'] : false;
    $action = isset($_GET['action']) ? $_GET['action'] : false;
    $detail = isset($_GET['detail']) ? $_GET['detail'] : false;
  } else {
    header("location: login.php");
  }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php require 'section/head.php'; ?>
</head>
<!-- <body class="sidebar-mini"> -->

<body onload="hide_loading()" class="sidebar-mini">
    <!-- loading -->
    <div class="loading overlay">
        <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <!-- akhir loading -->
    <div id="app">
        <div class="main-wrapper main-wrapper-1">
            <!-- Content Here -->
            <?php
            require 'section/top-navbar.php';
            require 'section/side-navbar.php';
            require 'section/content.php';
            require 'section/footer.php';
            ?>
        </div>
    </div>
    <?php require 'section/scripts.php'; ?>
</body>

</html>