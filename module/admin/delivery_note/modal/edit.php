<?php
session_start();
?>

<input type="hidden" value="Dn" class="swal2-input form-add" name="prefix" id="prefix"> 
<input type="hidden" name="pelanggan_id" id="pelanggan_id" autocomplete="off" class="swal2-input form-add">
<input type="hidden" name="pelanggan_id_old" id="pelanggan_id_old" autocomplete="off" class="swal2-input form-add">
<input type="hidden" name="projects_id_old" id="project_id_old" autocomplete="off" class="swal2-input form-add">

<!-- input tanggal -->
<input type="date" class="swal2-input form-add" name="tanggal" id="tanggal" max="<?= date_default_timezone_set('Asia/Jakarta'); echo date("Y-m-d"); ?>" required>


<input type="text" name="oldProjectName" id="oldProjectName" autocomplete="off" class="swal2-input form-add" required readonly>

<!-- pilih project -->
<select class="swal2-input form-add" name="project" id="project" required>
    <option value="">Select Project</option>
</select>

<!-- DeliverTo -->
<input type="text" name="deliverTo" id="deliverTo" autocomplete="off" placeholder="Delivery To" class="swal2-input form-add" required readonly>

<!-- FormatNo -->
<input type="text" name="formatNo" id="formatNo" autocomplete="off" class="swal2-input form-add" placeholder="FormatNo" required readonly>

<!-- Bagian PIC dan Phone harus punya sugest -->
<input type="text" name="pic" id="pic" autocomplete="off" class="swal2-input form-add" placeholder="PIC" required>
<div id="picList" class="list-group position-absolute"></div>

<input type="text" name="phone" id="phone" autocomplete="off" class="swal2-input form-add" placeholder="Telepon" required>
<div id="phoneList" class="list-group position-absolute"></div>

<!-- Button material -->
<button type="button" class="btn btn-outline-primary mt-2 mb-4" id="materialButton">Tambah detail material</button>

<!-- material -->
<div id="materialContainer" class="container"></div>

<ul id="clientList" class="client-list scrollable-card-body" style="list-style-type: none; text-align: left;"></ul>
