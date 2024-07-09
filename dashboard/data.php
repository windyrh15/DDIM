<?php
$location = "dashboard";
?>

<?php 
$kasir_id = isset($_GET['kasir_id']) ? $_GET['kasir_id'] : false;    
$nama = isset($_SESSION['nama']) ? $_SESSION['nama']: false;    
?>
<section class="section">
<div class="section-header">
    <h1>Dashboard</h1>
    <div class="section-header-breadcrumb">
        <div class="breadcrumb-item active"><a href="#" class="warna">EEI</a></div>
        <div class="breadcrumb-item"><a href="#" class="warna"><?= $location ?></a></div>
    </div>
</div>

<div class="section-body">
    
            <div class="row">
              <div class="col-12 mb-4">
                <div class="hero bg-primary text-white">
                  <div class="hero-inner">
                    <h2>Welcome Back, <?= $nama; ?>!</h2>
                    <p class="lead">Let's make today productive...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
</section>
          
       