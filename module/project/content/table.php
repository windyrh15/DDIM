<div id="contentProject">
    <div class="section">
        <div class='row'>
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center">
                        <input type="text" id="search-input" class="style-input" placeholder="Search...">
                        <div class="d-flex align-items-center justify-content-center flex-grow-1">
                            <b class="text-primary" id="filter"></b>
                        </div>

                        <!-- awal tampilan pc-->
                        <a href='#' id="inputProjectButton" class='btn btn-danger ml-auto <?= $tPc; ?>'>
                            <i class='fas fa-shopping-cart fa-xl text-white-50'></i> Add New Project
                        </a>
                        <?php include "module/$page/modal/filter-by.php"; ?>
                        <!-- awal tampilan pc-->

                        <!-- awal tampilan mobile-->
                        <!-- <div class="dropdown no-arrow ml-auto <?= $tMobile; ?>">
                        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-bars fa-xl text-white-50"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <li><a id="inputProjectButton" class="dropdown-item">Add Sales</a></li>
                        </div>
                    </div> -->
                        <!-- akhir tampilan mobile -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <table class="table table-striped table-bordered" id="project" width="100%" cellspacing="0">
        <thead class="bg-warna">
            <tr class="ta-center">
                <th class="d-none d-md-table-cell cl-white">No</th>
                <th class="d-none d-md-table-cell cl-white">Proj#</th>
                <th class="cl-white">Project Name</th>
                <th class="d-none d-md-table-cell cl-white">Type</th>
                <th class="d-none d-md-table-cell cl-white">Customer</th>
                <th class="d-none d-sm-table-cell cl-white">Amout</th>
                <th class="d-none d-md-table-cell cl-white">Status</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    <!-- pagination pc -->
    <div class="d-none d-md-block d-lg-block">
        <div id="pagination-container-pc" class="pagination-custom">
        </div>
    </div>
    <!-- pagination mobile -->
    <div class="d-block d-md-none d-lg-none">
        <div id="pagination-container-mobile" class="pagination-custom">
        </div>
    </div>
</div>