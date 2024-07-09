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
    $getDom = filemtime("module/" . $page . "/script/getDom.js");
    $getProject = filemtime("module/" . $page . "/script/getProject.js");
    $inputProject = filemtime("module/" . $page . "/script/inputProject.js");
    $editProject = filemtime("module/" . $page . "/script/editProject.js");
    $deleteProject = filemtime("module/" . $page . "/script/deleteProject.js");
    $getFilterPeriode = filemtime("module/" . $page . "/script/getFilterPeriode.js");
    $editStatus = filemtime("module/" . $page . "/script/editStatus.js");
    echo "
    <script src='module/$page/script/getTable.js?v=$getTable'></script>
    <script src='module/$page/script/getDom.js?v=$getDom'></script>
    <script src='module/$page/script/getProject.js?v=$getProject'></script>
    <script src='module/$page/script/inputProject.js?v=$inputProject'></script>
    <script src='module/$page/script/editProject.js?v=$editProject'></script>
    <script src='module/$page/script/deleteProject.js?v=$deleteProject'></script>
    <script src='module/$page/script/getFilterPeriode.js?v=$getFilterPeriode'></script>
    <script src='module/$page/script/editStatus.js?v=$editStatus'></script>
    ";
}
?>