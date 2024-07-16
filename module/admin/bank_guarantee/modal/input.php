<?
session_start();
?>
<!--<label for="tanggal" class="swal2-label">Purchase Order Date<small class="text-danger pl-1">*</small></label>-->
<input type="date" class="swal2-input form-add" name="tanggal" id="tanggal" max="<?= date_default_timezone_set('Asia/Jakarta'); echo date("Y-m-d"); ?>" required>
<!--<label for="project_type" class="swal2-label">Project<small class="text-danger pl-1">*</small></label>-->
<select class="swal2-input form-add" name="project_id" id="project_id" onchange="createUniqueNumber(this.value)" required>
    <option value="">Select The Project</option>
</select>
<!--<label for="vendor" class="swal2-label">Company Name<small class="text-danger pl-1">*</small></label>-->
<!--<select class="swal2-input form-add" name="vendor" id="vendor" required>-->
<!--    <option value="">Select Vendor</option>-->
<!--</select>-->
<!--<label for="client" class="swal2-label">Client<small class="text-danger pl-1">*</small></label>-->
<input type="text" class="swal2-input form-add custom-input" name="client" id="client" placeholder="Who's The Vendor?" required>
<input type="hidden" name="client" id="client" class="swal2-input form-add">
<ul id="clientList" class="client-list scrollable-card-body" style="list-style-type: none; text-align: left;"></ul>
<input type="hidden" value="PO" class="swal2-input form-add" name="prefix" id="prefix">
<input type="hidden" value="<?= isset($_SESSION['owner_id']) ? $_SESSION['owner_id'] : '' ?>" class="swal2-input form-add" name="owner_id" id="owner_id">
<input type="hidden" value="<?= isset($_SESSION['user_id']) ? $_SESSION['user_id'] : '' ?>" class="swal2-input form-add" name="user_id" id="user_id">
<!--<label for="no_po" class="swal2-label">PO Number<small class="text-danger pl-1">*</small></label>-->
<input type="text" name="no_po" id="no_po" autocomplete="off" placeholder="Generate PO Number" class="swal2-input form-add" readonly required>
<!--<label for="currency" class="swal2-label">Currency<small class="text-danger pl-1">*</small></label>-->
<input type="text" name="currency" id="currency" autocomplete="off" class="swal2-input form-add" placeholder="Currency" required>
<!--<label for="contract_amount" class="swal2-label">Contract Amount<small class="text-danger pl-1">*</small></label>-->
<input type="text" class="swal2-input form-add" name="contract_amount" id="contract_amount" placeholder="What is the contract amount?" min="1">
<label>
  <input type="checkbox" id="contract_amount_tax_checkbox"> Include Contract Amount + PPN
</label>
<div id="contract_amount_tax_container" style="display: none;">
  <!--<label for="contract_amount_tax" class="swal2-label">Contract Amount + PPN</label>-->
  <input type="text" class="swal2-input form-add" name="contract_amount_tax" id="contract_amount_tax" placeholder="What is the contract amount + ppn?" min="1">
</div>
 <textarea type="text" class="swal2-input form-add" placeholder="Add your additional Description here" name="description" id="description"></textarea>
