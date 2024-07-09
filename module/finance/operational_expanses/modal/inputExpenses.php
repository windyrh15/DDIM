<?
session_start();
?>

<div style="display: flex; justify-content: space-between;">
    <div style="flex: 1; margin-right: 10px;">
        <!--<label for="akun" class="swal2-label">Account<small class="text-danger pl-1">*</small></label>-->
        <select class="swal2-select" name="akun" id="akun" required></select>
    </div>
    <div style="flex: 1;">
        <!--<label for="tanggal_transaksi" class="swal2-label">Transaction Date<small class="text-danger pl-1">*</small></label>-->
        <input type="date" class="swal2-input" name="tanggal_transaksi" id="tanggal_transaksi" min="1" required>
    </div>
</div>

<div style="display: flex; justify-content: space-between;">
    <div style="flex: 1; margin-right: 10px;">
        <!--<label for="cat_name" class="swal2-label">Transaction Category<small class="text-danger pl-1">*</small></label>-->
        <select class="swal2-select" name="cat_name" id="cat_name" required></select>
    </div>
    <div style="flex: 1;">
        <!--<label for="keterangan" class="swal2-label">Description<small class="text-danger pl-1">*</small></label>-->
        <select class="swal2-select" name="keterangan" id="keterangan" required></select>
    </div>
</div>
<input type="hidden" value="<?= isset($_SESSION['owner_id']) ? $_SESSION['owner_id'] : '' ?>" class="swal2-input form-add" name="owner_id" id="owner_id">
<input type="hidden" value="<?= isset($_SESSION['user_id']) ? $_SESSION['user_id'] : '' ?>" class="swal2-input form-add" name="user_id" id="user_id">
<!--<label for="no_kwitansi" class="swal2-label">Receipt Number<small class="text-danger pl-1">*</small></label>-->
<input type="text" class="swal2-input" name="no_kwitansi" id="no_kwitansi" placeholder="Receipt Number" required>
<!--<label for="jumlah_transaksi" class="swal2-label">Total<small class="text-danger pl-1">*</small></label>-->
<input type="text" class="swal2-input" name="jumlah_transaksi" id="jumlah_transaksi" placeholder="Transaction Amount" required>
<!--<label for="note" class="swal2-label">Note<small class="text-danger pl-1">*</small></label>-->
<input type="text" class="swal2-input" name="note" id="note" placeholder="Note" required>
<!--<label for="file" class="swal2-label">Support File<small class="text-danger pl-1">*</small></label>-->
<small class="text-danger"><i>Hanya boleh upload file dgn Ekstensi .png, .jpg dan .pdf</i></small>
<input type="file" class="swal2-input" name="file" id="file" placeholder="Support File" required>
