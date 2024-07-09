<!--<label for="project_name" class="swal2-label">Project Name<small class="text-danger pl-1">*</small></label>-->
<select class="swal2-select" name="project_name" id="project_name" required></select>
<!--<label for="pic" class="swal2-label">PIC<small class="text-danger pl-1">*</small></label>-->
<select class="swal2-select" name="pic" id="pic" required></select>
<!--<label for="contract_amount" class="swal2-label">Contract Amount<small class="text-danger pl-1">*</small></label>-->
<input type="text" class="swal2-input" name="contract_amount" id="contract_amount" placeholder="What is the contract amount?" min="1">
<label>
  <input type="checkbox" id="contract_amount_tax_checkbox"> Include Contract Amount + PPN
</label>
<div id="contract_amount_tax_container" style="display: none;">
  <!--<label for="contract_amount_tax" class="swal2-label">Contract Amount + PPN</label>-->
  <input type="text" class="swal2-input" name="contract_amount_tax" id="contract_amount_tax" placeholder="What is the contract amount + ppn?" min="1">
</div>
<div style="display: flex; justify-content: space-between;">
  <div style="width: 48%;">
    <label for="contract_date" class="swal2-label">Contract Date<small class="text-danger pl-1">*</small></label>
    <input type="date" class="swal2-input" name="contract_date" id="contract_date" required>
  </div>
  <div style="width: 48%;">
    <label for="finish_date" class="swal2-label">Finish Date<small class="text-danger pl-1">*</small></label>
    <input type="date" class="swal2-input" name="finish_date" id="finish_date" required>
  </div>
</div>
