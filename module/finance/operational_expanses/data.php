<?php $kasir_id = isset($_GET['kasir_id']) ? $_GET['kasir_id'] : false;    ?>
<div class="section-header">
    <h1>Operational Expanses</h1>
    <div class="section-header-breadcrumb">
        <div class="breadcrumb-item active"><a href="index.php" class="warna">DDiM</a></div>
        <div class="breadcrumb-item"><a href="#" class="warna">Finance</a></div>
        <div class="breadcrumb-item"><a href="#" class="warna">Financial Report</a></div>
    </div>
</div>

<div class="card">
    <div class="card-body">
        <div class="row">
            <div class="col-12">

                 <!-- Content -->
                <?php
                include 'content/table.php';
                include 'content/cashReceipts.php';
                include 'content/cashPaidOut.php';
                ?>

            </div>
        </div>
    </div>
</div>
<!-- div tambahan -->
</div>
<?php
require "module/$page/modal/detailsModal.php";
// require "module/$page/modal/marketing_recap/detailsModal.php";
// require "module/$page/modal/marketing_recap/getFilterYear.php";
?>