let dataFilterUser;

const urlFilterUser = "api/" + sales + dataUser;
const versionFilterUser = `${urlFilterUser}?v=${customTime}`;
const dropdownNamaFilterUser = document.getElementById("dropdownUser");

fetch(versionFilterUser)
  .then((response) => response.json())
  .then((responseData) => {
    dataFilterUser = responseData;

    dataFilterUser.dataUser.forEach(function (filterUser) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const nama = filterUser.nama_user;
      a.textContent = filterUser.nama_user;
      a.classList.add("dropdown-item");
      a.href = "#";
      a.addEventListener("click", () => {
        displayData(1, searchInput.value, filterUser.nama_user);
        $("#filter").text("Filtered by user: " + nama);
      });
      li.appendChild(a);
      dropdownNamaFilterUser.appendChild(li);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

let dataFilterType;

const urlFilterType = "api/" + sales + dataType;
const versionFilterType = `${urlFilterType}?v=${customTime}`;
const dropdownNamaFilterType = document.getElementById("dropdownType");

fetch(versionFilterType)
  .then((response) => response.json())
  .then((responseData) => {
    dataFilterType = responseData;

    dataFilterType.dataType.forEach(function (filterType) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const type = filterType.nama_type;
      a.textContent = filterType.nama_type;
      a.classList.add("dropdown-item");
      a.href = "#";
      a.addEventListener("click", () => {
        displayData(1, searchInput.value, "", filterType.nama_type);
        $("#filter").text("Filtered by type: " + type);
      });
      li.appendChild(a);
      dropdownNamaFilterType.appendChild(li);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

let dataFilterStatus;

const urlFilterStatus = "api/" + project + dataStatus;
const versionFilterStatus = `${urlFilterStatus}?v=${customTime}`;
const dropdownNamaFilterStatus = document.getElementById("dropdownStatus");

fetch(versionFilterStatus)
  .then((response) => response.json())
  .then((responseData) => {
    dataFilterStatus = responseData;

    dataFilterStatus.dataStatus.forEach(function (filterStatus) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const status = filterStatus.status_id;
      a.textContent = filterStatus.nama_status;
      a.classList.add("dropdown-item");
      a.href = "#";
      a.addEventListener("click", () => {
        displayData(1, searchInput.value, "", "", filterStatus.status_id);
        $("#filter").text("Filtered by status: " + status);
      });
      li.appendChild(a);
      dropdownNamaFilterStatus.appendChild(li);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

let dataFilterBranch;

const urlFilterBranch = "api/" + project + dataBranch;
const versionFilterBranch = `${urlFilterBranch}?v=${customTime}`;
const dropdownNamaFilterBranch = document.getElementById("dropdownBranch");

fetch(versionFilterBranch)
  .then((response) => response.json())
  .then((responseData) => {
    dataFilterBranch = responseData;

    dataFilterBranch.dataBranch.forEach(function (filterBranch) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const branch = filterBranch.nama_branch;
      a.textContent = filterBranch.nama_branch;
      a.classList.add("dropdown-item");
      a.href = "#";
      a.addEventListener("click", () => {
        displayData(1, searchInput.value, "", "", "", filterBranch.nama_branch);
        $("#filter").text("Filtered by branch: " + branch);
      });
      li.appendChild(a);
      dropdownNamaFilterBranch.appendChild(li);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

function filterByYear() {
  const currentYear = new Date().getFullYear();
  displayData(1, searchInput.value, "", "", "", "", currentYear, "", "");
}

addYear.addEventListener("click", function () {
  fetch("module/" + page + "/modal/getFilter.php")
    .then((response) => response.text())
    .then((htmlContent) => {
      Swal.fire({
        title: "Filter Data",
        html: htmlContent,
        showCancelButton: true,
        confirmButtonText: "Filter",
        cancelButtonText: "Cancel",
        focusConfirm: false,
        preConfirm: async () => {
          const filterYear = Swal.getPopup().querySelector("#filterYear").value;

          if (!filterYear) {
            Swal.showValidationMessage("Please select a year");
          } else {
            displayData(
              1,
              searchInput.value,
              "",
              "",
              "",
              "",
              filterYear,
              "",
              ""
            );
            $("#filter").text("Filtered by year: " + filterYear);
          }
        },
      });
    });
});
