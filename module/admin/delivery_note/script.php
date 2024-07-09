<?php
$general = filemtime("api/general.js");
?>
<script src="api/general.js?v=<?= $general ?>"></script>

<?php
if ($detail) {
  // $getProduct=filemtime("module/$page/script/getProduct.js");
  // $getDetail=filemtime("module/$page/script/getDetail.js");
  // $getVariant=filemtime("module/$page/script/getVariant.js");
  // $carousel=filemtime("module/$page/script/carousel.js");
  // $addCart=filemtime("module/$page/script/addCart.js");
  // echo "
  //   <script src='module/$page/script/getProduct.js?v=$getProduct'></script>
  //   <script src='module/$page/script/getDetail.js?v=$getDetail'></script>
  //   <script src='module/$page/script/getVariant.js?v=$getVariant'></script>
  //   <script src='module/$page/script/carousel.js?v=$carousel'></script>
  //   <script src='module/$page/script/addCart.js?v=$addCart'></script>
  //   ";
} else {
  $getTable = filemtime("module/" . $page . "/script/getTable.js");
  $getVendor = filemtime("module/" . $page . "/script/getVendor.js");
  $input = filemtime("module/" . $page . "/script/input.js");
  $update = filemtime("module/" . $page . "/script/update.js");
  $delete = filemtime("module/" . $page . "/script/delete.js");

  echo "
    <script src='module/$page/script/getTable.js?v=$getTable'></script>
    <script src='module/$page/script/getVendor.js?v=$getVendor'></script>
    <script src='module/$page/script/input.js?v=$input'></script>
    <script src='module/$page/script/update.js?v=$update'></script>
    <script src='module/$page/script/delete.js?v=$delete'></script>
    ";
}