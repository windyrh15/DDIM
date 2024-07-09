<?php
$user_sales_id = isset($_GET['user_id']) ? $_GET['user_id'] : false;
$type = isset($_GET['type']) ? $_GET['type'] : false;
$status_order = isset($_GET['status']) ? $_GET['status'] : false;

// if ($view_mode != 'yes') {
//     $position = "";
// } else {
//     $position = "ml-auto";
// }
?>
<div class="dropdown <?= $tPc; ?>">
    <button class="btn btn-primary dropdown-toggle" type="button" id="menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fa-solid fa-filter fa-xl text-white-50"></i> Filter By
    </button>
    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton" style="min-width:10px">
        <li class="dropdown-submenu">
            <a class="dropdown-item dropdown-submenu" data-toggle="dropdown"><i class="fas fa-caret-left"></i> User</a>
            <ul class="dropdown-menu" id="dropdownUser">
            </ul>
        </li>
        <li class="dropdown-submenu">
            <a class="dropdown-item dropdown-submenu" data-toggle="dropdown"><i class="fas fa-caret-left"></i> Type</a>
            <ul class="dropdown-menu" id="dropdownType">
            </ul>
        </li>
        <li class="dropdown-submenu">
            <a class="dropdown-item dropdown-submenu" data-toggle="dropdown"><i class="fas fa-caret-left"></i> Status</a>
            <ul class="dropdown-menu" id="dropdownStatus">
            </ul>
        </li>
        <li class="dropdown-submenu">
            <a class="dropdown-item dropdown-submenu" data-toggle="dropdown"><i class="fas fa-caret-left"></i> Branch</a>
            <ul class="dropdown-menu" id="dropdownBranch">
            </ul>
        </li>
        <li><a class='dropdown-item' id="addPeriode"><i class="fas fa-clock-rotate-left"></i> Periode</a></li>
        <li><a class='dropdown-item' id="addYear"><i class="fas fa-calendar-days"></i> Year</a></li>
        <li><a class='dropdown-item' href='?page=project'><i class="fas fa-list"></i> All</a></li>
    </ul>
</div>