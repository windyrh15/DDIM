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
              <i class='fas fa-shopping-cart fa-xl text-white-50'></i> Add Delivery Note
            </a>
          </div>
        </div>
        <div class="card-body p-4">
          <div class="table-responsive">
            <table class="table table-striped table-bordered" id="deliveryNote">
              <thead class="bg-warna">
                <tr class="ta-center">
                  <th class="cl-white">No</th>
                  <th class="cl-white">Date</th>
                  <th class="cl-white">Material Name</th>
                  <th class="cl-white">Project Name</th>
                  <th class="cl-white">Deliver To</th>
                  <th class="cl-white">Format No</th>
                  <th class="cl-white">PIC</th>
                  <th class="cl-white">Phone</th>
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