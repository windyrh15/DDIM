<?php
$tahun = date('Y');
?>

<!-- awal tampilan pc -->
<footer class="main-footer <?= $tPc; ?>">
  <div class="footer-left">
    Copyright © <?= $tahun; ?> <div class="bullet"></div><a href="#" class="warna">PT. Energi Entelemi Indonesia</a> <div class="bullet"></div>powered by<a href="https://katib.id" style="color: #03989E !important"> KATiB.id</a>
  </div>
  <div class="footer-right">
    ver 2.0
  </div>
</footer>
<!-- akhir tampilan pc -->

<!-- awal tampilan mobile -->
<footer class="main-footer <?= $tMobile; ?>">
  <div class="footer-left">
    <a href="#" class="warna">PT. Energi Entelemi Indonesia</a>
  </div>
  <div class="footer-right">
    ver 2.0
  </div>
</footer>
<!-- awal tampilan mobile -->