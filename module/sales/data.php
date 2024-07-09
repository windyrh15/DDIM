<?php $kasir_id = isset($_GET['kasir_id']) ? $_GET['kasir_id'] : false;    ?>
<div class="section-header">
    <h1>Sales</h1>
    <div class="section-header-breadcrumb">
        <div class="breadcrumb-item active"><a href="index.php" class="warna">DDiM</a></div>
        <div class="breadcrumb-item"><a href="#" class="warna">Sales</a></div>
    </div>
</div>

<div class="card">
    <div class="card-body">
        <div class="row">
            <div class="col-12">

                <!-- Konten header -->
                <?php include 'tabulasi/header.php'; ?>

                <!-- Content -->
                <?php include 'tabulasi/content.php'; ?>

            </div>
        </div>
    </div>
</div>
<!-- div tambahan -->
</div>
<?php
require "module/$page/modal/sales/detailsModal.php";
require "module/$page/modal/marketing_recap/detailsModal.php";
require "module/$page/modal/marketing_recap/detailsPo.php";
require "module/$page/modal/marketing_recap/detailPo.php";
require "module/$page/modal/marketing_recap/detailsProject.php";
require "module/$page/modal/marketing_recap/detailProject.php";
?>