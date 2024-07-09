<div id="detailProject" style="display: none;">
    <div class="card">
        <div class="card-header">
            <h4><span id="project_name" style="color: black;"></span></h4>
            <div class="card-header-action">
                <a href="" class="btn btn-danger" onclick="backtotable()">X</a>
            </div>
        </div>

        <div class="card-body">
            <table class="table table-striped table-bordered" id="tableDetailProject" width="100%" cellspacing="0">
                <thead class="bg-warna">
                    <tr class="ta-center">
                        <th class="cl-white">Client Name</th>
                        <th class="cl-white">Contract Amount</th>
                        <th class="cl-white">Working Time</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="d-flex justify-content-between">
    <div>
        <button id="cancelButton" class="btn btn-success btn-icon icon-left" onclick="cancelProjectHandler()"><i class="fas fa-times"></i> Cancel Project</button>
    </div>
    <div>
        <button id="finishButton" class="btn btn-icon icon-left btn-primary" onclick="finishProjectHandler()"><i class="fa-solid fa-flag-checkered"></i> Finish the Project</button>
    </div>
    <div>
        <button class="btn btn-danger btn-icon icon-left" onclick="deleteProjectHandler()"><i class="fa-solid fa-trash"></i> Delete Project</button>
    </div>
</div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4"><?php include "document.php"; ?></div>
        <div class="col-md-4"><?php include "vendor.php"; ?></div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">
                    <h4 style="color: black;">Project Expenses</h4>
                    <div class="card-header-action">
                        <button class="btn btn-primary" id="addExpenses"><i class="fa-solid fa-wallet"></i> Add Expenses</button>
                    </div>
                </div>
                <div class="card-body" style="overflow: auto; max-height: 500px;">
                    <table class="table table-striped table-bordered" id="log_payment" width="100%" cellspacing="0">
                        <thead class="bg-warna">
                            <tr class="ta-center">
                                <th class="cl-white">Date</th>
                                <th class="cl-white">Description</th>
                                <th class="cl-white">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>