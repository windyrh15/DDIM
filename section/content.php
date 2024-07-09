<!-- Main Content -->
<div class="main-content" style="min-height: 850px;">
  <section class="section">
    <!-- Your Content Here -->
    <?php

    if ($action) {
      $filename = "module/$page/$action.php";
    } else if ($detail) {
      $filename = "module/$page/$detail.php";
    } else {
      if ($page) {
        $filename = "module/$page/data.php";
      } else {
        $filename = "";
      }
    }

    if (file_exists($filename)) {
      include_once($filename);
    } else {
      include 'dashboard/data.php';
    }



    ?>
  </section>
</div>