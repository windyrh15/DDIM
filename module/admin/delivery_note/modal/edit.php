<?php
session_start();
?>

<input type="hidden" value="Dn" class="swal2-input form-add" name="prefix" id="prefix"> 
<input type="text" name="pelanggan_id" id="pelanggan_id" autocomplete="off" class="swal2-input form-add">
<input type="text" name="pelanggan_id_old" id="pelanggan_id_old" autocomplete="off" class="swal2-input form-add">
<input type="text" name="projects_id_old" id="project_id_old" autocomplete="off" class="swal2-input form-add">

<input type="text" name="old_pic" id="old_pic" autocomplete="off" class="swal2-input form-add">
<input type="text" name="old_pic_phone" id="old_pic_phone" autocomplete="off" class="swal2-input form-add">

<!-- input tanggal -->
<input type="date" class="swal2-input form-add" name="tanggal" id="tanggal" max="<?= date_default_timezone_set('Asia/Jakarta'); echo date("Y-m-d"); ?>" required>


<input type="text" name="oldProjectName" id="oldProjectName" autocomplete="off" class="swal2-input form-add" required readonly>

<!-- pilih project -->
<select class="swal2-input form-control" name="project" id="project" required>
    <option value="">Select Project or Search Project</option>
</select> 


<!-- DeliverTo -->
<input type="text" name="deliverTo" id="deliverTo" autocomplete="off" placeholder="Delivery To" class="swal2-input form-add" required readonly>

<!-- FormatNo -->
<input type="text" name="formatNo" id="formatNo" autocomplete="off" class="swal2-input form-add" placeholder="FormatNo" required readonly>

<!-- Bagian PIC dan Phone harus punya sugest ----------------------------------------------------------------------------------------- -->

<input type="text" name="old_picView" id="old_picView" autocomplete="off" class="swal2-input form-add" readonly>

<div class="mb-3 position-relative">
    <input type="text" id="pic" class="form-control" placeholder="Search or Add new PIC">
    <div id="suggestions"></div>
</div>
<div class="mb-3">
    <input type="text" id="phone" class="form-control" placeholder="Enter phone number">
</div>

<!-- <select class="form-control" name="pic" id="pic" required>
    <option value="">Select PIC or Search PIC</option>
</select> -->
<!-- Phone (Manual Input) -->
<!-- <input type="text" name="phone" id="phone" autocomplete="off" class="swal2-input form-add" placeholder="Telepon" required> -->

<!-- Button material -->
<button type="button" class="btn btn-outline-primary mt-2 mb-4" id="materialButton">Tambah detail material</button>

<!-- material -->
<div id="materialContainer" class="container"></div>

<ul id="clientList" class="client-list scrollable-card-body" style="list-style-type: none; text-align: left;"></ul>
