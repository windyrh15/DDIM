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
  $getDomSales = filemtime("module/" . $page . "/script/sales/getDomSales.js");
  $getTableSales = filemtime("module/" . $page . "/script/sales/getTableSales.js");
  $getClients = filemtime("module/" . $page . "/script/sales/getClients.js");
  $inputSales = filemtime("module/" . $page . "/script/sales/inputSales.js");
  $editSales = filemtime("module/" . $page . "/script/sales/editSales.js");
  $deleteSales = filemtime("module/" . $page . "/script/sales/deleteSales.js");
  $getFilterPeriode = filemtime("module/" . $page . "/script/sales/getFilterPeriode.js");
  $editStatus = filemtime("module/" . $page . "/script/sales/editStatus.js");
  $getTableMarketingRecap = filemtime("module/" . $page . "/script/marketing_recap/getTableMarketingRecap.js");
  $getFilter = filemtime("module/" . $page . "/script/marketing_recap/getFilter.js");
  $getCurve = filemtime("module/" . $page . "/script/marketing_recap/getCurve.js");
  echo "
    <script src='module/$page/script/sales/getDomSales.js?v=$getDomSales'></script>
    <script src='module/$page/script/sales/getTableSales.js?v=$getTableSales'></script>
    <script src='module/$page/script/sales/getClients.js?v=$getClients'></script>
    <script src='module/$page/script/sales/inputSales.js?v=$inputSales'></script>
    <script src='module/$page/script/sales/editSales.js?v=$editSales'></script>
    <script src='module/$page/script/sales/deleteSales.js?v=$deleteSales'></script>
    <script src='module/$page/script/sales/getFilterPeriode.js?v=$getFilterPeriode'></script>
    <script src='module/$page/script/sales/editStatus.js?v=$editStatus'></script>
    <script src='module/$page/script/marketing_recap/getTableMarketingRecap.js?v=$getTableMarketingRecap'></script>
    <script src='module/$page/script/marketing_recap/getFilter.js?v=$getFilter'></script>
    <script src='module/$page/script/marketing_recap/getCurve.js?v=$getCurve'></script>
    ";
}
//   $getDomSales = filemtime("module/" . $page . "/script/sales/getDomSales.js");
//   $getTableSales = filemtime("module/" . $page . "/script/sales/getTableSales.js");
//   $inputSales = filemtime("module/" . $page . "/script/sales/inputSales.js");
//   $deleteSales = filemtime("module/" . $page . "/script/sales/deleteSales.js");
//   $getTableMarketingRecap = filemtime("module/" . $page . "/script/marketing_recap/getTableMarketingRecap.js");
//   $getFilter = filemtime("module/" . $page . "/script/marketing_recap/getFilter.js");
//   $getCurve = filemtime("module/" . $page . "/script/marketing_recap/getCurve.js");
//   echo "
//     <script src='module/$page/script/sales/getDomSales.js?v=$getDomSales'></script>
//     <script src='module/$page/script/sales/getTableSales.js?v=$getTableSales'></script>
//     <script src='module/$page/script/sales/inputSales.js?v=$inputSales'></script>
//     <script src='module/$page/script/sales/deleteSales.js?v=$deleteSales'></script>
//     <script src='module/$page/script/marketing_recap/getTableMarketingRecap.js?v=$getTableMarketingRecap'></script>
//     <script src='module/$page/script/marketing_recap/getFilter.js?v=$getFilter'></script>
//     <script src='module/$page/script/marketing_recap/getCurve.js?v=$getCurve'></script>
//     ";
?>