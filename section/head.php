<?php
$tittle = 'PT Dinamika Daya Insan Mandiri';

if ($page) {
  //$jsversion=filemtime("module/$page/script.js");
  $cssversion = filemtime("module/$page/style.css");
  $urlserver = "module/" . $page;
} else {
  //$jsversion=filemtime("dashboard/script.js");
  $cssversion = filemtime("dashboard/style.css");
  $urlserver = "dashboard";
}

$jsversion = filemtime("assets/js/scripts.js");
$cssver = filemtime("assets/css/style_eei.css");
$customcss = filemtime("assets/css/custom.css");
$loadingcss = filemtime("assets/css/loading.min.css");
$tPc = "d-none d-md-block d-lg-block";
$tMobile = "d-block d-md-none d-lg-none";

?>

<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
<title><?= $tittle ?></title>

<link rel="icon" href="https://office.katib.id/assets/img/18/DDiM Logo Official.png" sizes="32x32" />
<link rel="icon" href="https://office.katib.id/assets/img/18/DDiM Logo Official.png" sizes="192x192" />

<!-- General CSS Files -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet">

<!-- CSS Libraries -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/summernote@0.8.11/dist/summernote-bs4.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.css">


<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="https://office.katib.id/assets/vendor/datatables/DataTables-1.10.22/css/dataTables.bootstrap4.min.css">

<link rel="stylesheet" href="https://office.katib.id/assets/vendor/select2/dist/css/select2.min.css">
<link rel="stylesheet" href="https://office.katib.id/assets/vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css">
<link rel="stylesheet" href="https://office.katib.id/assets/vendor/jquery-selectric/public/selectric.css">
<link rel="stylesheet" href="https://office.katib.id/assets/vendor/datatables/Select-1.3.1/css/select.bootstrap4.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.min.css">
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet"/>

<!-- Font -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap" rel="stylesheet">

<!-- Template CSS -->
<link rel="stylesheet" href="assets/css/style_eei.css?v=<?= $cssver ?>">
<link rel="stylesheet" href="assets/css/custom.css?v=<?= $customcss ?>">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/loading.min.css?v=<?= $loadingcss ?>">


<!-- Tom Select CSS -->
<link href="https://cdn.jsdelivr.net/npm/tom-select/dist/css/tom-select.bootstrap4.min.css" rel="stylesheet">
<!-- Tom Select CSS (default) as fallback -->
<link href="https://cdn.jsdelivr.net/npm/tom-select/dist/css/tom-select.css" rel="stylesheet">
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<!-- niceScroll -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.6/jquery.nicescroll.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tom-select/dist/js/tom-select.complete.min.js"></script>

<!-- Module Page JS File -->
<link rel="stylesheet" href="<?= $urlserver ?>/style.css?v=<?= $cssversion ?>">

<style type="text/css">
  .ui-autocomplete {
    z-index: 999999;
  }

  .ui-autocomplete-row {
    padding: 8px;
    background-color: #FAFAFA;
    border-bottom: 1px solid #ccc;
  }

  .ui-autocomplete-row:hover {
    background-color: #6777EF;
    color: white;
  }

  .free {
    border: none;
    border-bottom: 3px solid black;
    outline: none;
    width: 4rem;
    text-align: center;
    font-size: 18px;
  }
</style>