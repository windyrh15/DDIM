<div id="contentProject">
<div class="row">
<div class="col-12">
<div class="card">
<div class="card-header d-flex justify-content-between">
  <form>
    <div class="input-group">
      <input type="text" id="search-input" class="form-control" placeholder="Search">
    </div>
  </form>
<div class="card-header-action">
  <a href='#' id="inputButton" data-bs-toggle="modal" data-bs-target="#inputModal" class='btn btn-danger ml-auto <?= $tPc; ?>'>
    <i class='fas fa-envelope fa-xl text-white-50'></i> Add Official Letter
  </a>
</div>
</div>
<div class="card-body p-4">
<div class="table-responsive">
  <table class="table table-striped table-bordered" id="official_letter">
    <thead class="bg-warna">
      <tr class="ta-center">
        <th class="cl-white">No</th>
        <th class="cl-white">Date</th>
        <th class="cl-white">Letter Code</th>
        <th class="cl-white">Format Number</th>
        <th class="cl-white">Letter Subject</th>
        <th class="cl-white">Beneficiary</th>
        <th class="cl-white">Customer</th>
        <th class="cl-white">Action</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  <!-- pagination pc -->
<div class="d-none d-md-block d-lg-block mb-3">
    <div id="pagination-container-pc" class="pagination-custom">
    </div>
</div>
<!-- pagination mobile -->
<div class="d-block d-md-none d-lg-none mb-3">
    <div id="pagination-container-mobile" class="pagination-custom">
    </div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>