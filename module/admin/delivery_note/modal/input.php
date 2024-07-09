<?
session_start();
?>

<input type="hidden" value="Dn" class="swal2-input form-add" name="prefix" id="prefix">
<input type="hidden" value="<?= isset($_SESSION['owner_id']) ? $_SESSION['owner_id'] : '' ?>" class="swal2-input form-add" name="owner_id" id="owner_id">
<input type="hidden" value="<?= isset($_SESSION['user_id']) ? $_SESSION['user_id'] : '' ?>" class="swal2-input form-add" name="user_id" id="user_id">
<input type="hidden" name="pelanggan_id" id="pelanggan_id" autocomplete="off" class="swal2-input form-add">

<!-- input tanggal -->
<input type="date" class="swal2-input form-add" name="tanggal" id="tanggal" max="<?= date_default_timezone_set('Asia/Jakarta');
                                                                                    echo date("Y-m-d"); ?>" required>

<!-- pilih project -->
<select class="swal2-input form-add" name="project" id="project" required>
    <option value="">Select Project</option>
</select>

<!-- DeliverTo -->
<input type="text" name="deliverTo" id="deliverTo" autocomplete="off" placeholder="Delivery To" class="swal2-input form-add" required readonly>

<!-- FormatNo -->
<input type="text" name="formatNo" id="formatNo" autocomplete="off" class="swal2-input form-add" placeholder="FormatNo" required readonly>


<!-- Bagian PIC dan Phone harus punya sugest ----------------------------------------------------------------------------------------- -->
<!-- PIC (manual Input) -->
<input type="text" name="pic" id="pic" autocomplete="off" class="swal2-input form-add" placeholder="PIC" required>
<div id="picList" class="list-group position-absolute"></div>

<!-- Phone (Manual Input) -->
<input type="text" name="phone" id="phone" autocomplete="off" class="swal2-input form-add" placeholder="Telepon" required>
<div id="phoneList" class="list-group position-absolute"></div>
<!-- --------------------------------------------------------------------------------------------------------------------------------- -->


<!-- Button material -->
<button type="button" class="btn btn-outline-primary mt-2 mb-4" id="materialButton">Tambah detail material</button>

<!-- material -->
<div id="materialContainer" class="container">
    <div class="row mb-2">
        <div class="col">
            <input type="text" class="form-control" name="material[]" placeholder="Material" required>
        </div>
        <div class="col">
            <input type="number" class="form-control" name="quantity[]" placeholder="Quantity" required>
        </div>
        <div class="col-auto">
            <div class="btn btn-info" role="button" id="customButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
            </div>
        </div>
    </div>
</div>

<ul id="clientList" class="client-list scrollable-card-body" style="list-style-type: none; text-align: left;"></ul>