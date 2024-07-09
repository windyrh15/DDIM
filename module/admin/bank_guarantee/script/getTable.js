let data;
const url = purchaseOrder;
const customTime = new Date().getTime();
const versionPo = `${url}?v=${customTime}`;
const tbody = document.querySelector("#purchase_order tbody");
const searchInput = document.querySelector("#search-input");
const pageSize = 10;
let currentPage = 1;

function displayData(
  page,
  searchQuery = "",
  filterUser = "",
  filterType = "",
  filterStatus = "",
  filterYear = "",
  startDate = "",
  endDate = ""
) {
  currentPage = page;
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const filteredData = data.data.filter((sales) => {
    // Filter data berdasarkan pencarian (jika ada)
    const userMatched =
      filterUser === "" ||
      sales.nama.toLowerCase() === filterUser.toLowerCase();
    const typeMatched =
      filterType === "" ||
      sales.project_type.toLowerCase() === filterType.toLowerCase();
    const statusMatched =
      filterStatus === "" || sales.status_sales === filterStatus;
    const yearMatched =
      filterYear === "" || new Date(sales.tanggal).getFullYear() == filterYear;
    const startDateMatched =
      startDate === "" || new Date(sales.date) >= new Date(startDate);
    const endDateMatched =
      endDate === "" || new Date(sales.date) <= new Date(endDate);
    const searchMatched =
      searchQuery === "" ||
      sales.no_qtn
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      sales.tanggal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sales.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sales.project_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sales.total_order.toString().includes(searchQuery) ||
      sales.pelanggan_nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sales.status_sales.toString().includes(searchQuery);

    return (
      userMatched &&
      typeMatched &&
      statusMatched &&
      yearMatched &&
      startDateMatched &&
      endDateMatched &&
      searchMatched
    );
  });
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(startIdx, endIdx);
  tbody.innerHTML = "";
  let i = startIdx + 1;
  paginatedData.forEach((data) => {
    const row = document.createElement("tr");
    row.onclick = function () {
      showDetails(data.purchase_id);
    };

    row.innerHTML = `
            <td class="d-none d-md-table-cell ta-center">${i}</td>
            <td class="d-none d-md-table-cell ta-start">${data.date}</td>
            <td class="d-none d-md-table-cell ta-start">${data.no_po}</td>
            <td class="d-none d-md-table-cell ta-start">${data.company}</td>
            <td class="d-none d-md-table-cell ta-end">${data.project_name}</td>
            <td class="d-none d-md-table-cell ta-start">${data.description}</td>
            <td class="d-none d-md-table-cell ta-start">${data.amount.toLocaleString()}</td>
        `;
    tbody.appendChild(row);
    i++;
  });
  createPaginationButtonsPC(totalPages);
  createPaginationButtonsMobile(totalPages);
}

function createPaginationButtonsPC(totalPages) {
  const paginationContainer = document.querySelector(
    "#pagination-container-pc"
  );
  paginationContainer.innerHTML = "";
  const pagesToShow = [currentPage - 1, currentPage, currentPage + 1].filter(
    (page) => page > 0 && page <= totalPages
  );

  const firstButton = document.createElement("button");
  firstButton.innerText = "First";
  firstButton.addEventListener("click", () => {
    displayData(1, searchInput.value);
  });
  paginationContainer.appendChild(firstButton);

  const previousButton = document.createElement("button");
  previousButton.innerText = "Previous";
  previousButton.addEventListener("click", () => {
    const previousPage = currentPage > 1 ? currentPage - 1 : 1;
    displayData(previousPage, searchInput.value);
  });
  paginationContainer.appendChild(previousButton);

  pagesToShow.forEach((page) => {
    const button = document.createElement("button");
    button.innerText = page;
    if (page === currentPage) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      displayData(page, searchInput.value);
    });
    paginationContainer.appendChild(button);
  });

  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.addEventListener("click", () => {
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    displayData(nextPage, searchInput.value);
  });
  paginationContainer.appendChild(nextButton);

  const lastButton = document.createElement("button");
  lastButton.innerText = "Last";
  lastButton.addEventListener("click", () => {
    displayData(totalPages, searchInput.value);
  });
  paginationContainer.appendChild(lastButton);
}

function createPaginationButtonsMobile(totalPages) {
  const paginationContainer = document.querySelector(
    "#pagination-container-mobile"
  );
  paginationContainer.innerHTML = "";

  const pagesToShow = [currentPage - 1, currentPage, currentPage + 1]
    .filter((page) => page > 0 && page <= totalPages)
    .slice(0, 3); 

  const firstButton = document.createElement("button");
  firstButton.innerHTML = '<i class="fas fa-angle-double-left"></i>';
  firstButton.addEventListener("click", () => {
    displayData(1, searchInput.value);
  });
  paginationContainer.appendChild(firstButton);

  const previousButton = document.createElement("button");
  previousButton.innerHTML = '<i class="fas fa-angle-left"></i>';
  previousButton.addEventListener("click", () => {
    const previousPage = currentPage > 1 ? currentPage - 1 : 1;
    displayData(previousPage, searchInput.value);
  });
  paginationContainer.appendChild(previousButton);

  pagesToShow.forEach((page) => {
    const button = document.createElement("button");
    button.innerText = page;
    if (page === currentPage) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      displayData(page, searchInput.value);
    });
    paginationContainer.appendChild(button);
  });

  const nextPageButton = document.createElement("button");
  nextPageButton.innerHTML = '<i class="fas fa-angle-right"></i>';
  nextPageButton.addEventListener("click", () => {
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    displayData(nextPage, searchInput.value);
  });
  paginationContainer.appendChild(nextPageButton);

  const lastButton = document.createElement("button");
  lastButton.innerHTML = '<i class="fas fa-angle-double-right"></i>';
  lastButton.addEventListener("click", () => {
    displayData(totalPages, searchInput.value);
  });
  paginationContainer.appendChild(lastButton);
}

function fetchData() {
  // Show loading spinner
  const loadingRow = document.createElement('tr');
  loadingRow.innerHTML = `
    <td colspan="6" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </td>`;
  tbody.innerHTML = ""; 
  tbody.appendChild(loadingRow); 

  fetch(versionPo, {
    headers: headers
  })
    .then((response) => response.json())
    .then((responseData) => {
      tbody.innerHTML = ""; // Clear the loading row
      data = responseData;
      if (data.data.length === 0) {
        // Show "No data available" if no data
        const row = document.createElement("tr");
        row.innerHTML = `
          <td colspan="6" class="text-center">No data available</td>
        `;
        tbody.appendChild(row);
      } else {
        displayData(currentPage);
      }
    })
    .catch((error) => {
      tbody.innerHTML = ""; // Clear the loading row
      console.error("Error fetching data:", error);

      // Show "Problems with the API" if there is an error
      const errorRow = document.createElement('tr');
      errorRow.innerHTML = `
        <td colspan="6" class="text-center">Problems with the API</td>`;
      tbody.appendChild(errorRow);
    });
}


searchInput.addEventListener("input", () => {
  displayData(1, searchInput.value);
});

fetchData();

function showDetailsSales(salesId) {
  var detailDataSales = getDetailDataSales(salesId);

  var modalBodySales = document.getElementById("detailsModalSalesBody");
  modalBodySales.innerHTML = `
                <p>Date : ${detailDataSales.tanggal}</p>
                <p>Sales# : <br>${detailDataSales.no_qtn}<br>${
    detailDataSales.project_name
  }<br>Created by <b>${detailDataSales.nama}</b></p>
  <br>Calculation File: ${sales.file}
                <p>Type : ${detailDataSales.project_type}</p>
                <p>Amount : ${detailDataSales.total_order.toLocaleString()}</p>
                <p>Client : ${detailDataSales.pelanggan_nama}</p>
                <p> Status : ${detailDataSales.status}</p>
`;

  $("#detailsModalSales").modal("show");
}

function getDetailDataSales(salesId) {
  console.log("All Sales:", dataSales.dataSales);
  const foundSales = dataSales.dataSales.find(
    (sales) => sales.pesanan_id == salesId
  );

  console.log("Found Sales", foundSales);
  return foundSales || {};
}

let currentProjectId;

function showDetails(Id) {
  detailProject.style.display = "block";
  contentProject.style.display = "none";
  updateDetailProject(Id);
//   updateVendor(Id);
  updateDoc(Id);
//   updateLogPayment(Id);
//   checkProjectFinishDate(Id);
//   checkProjectCancel(Id);
  currentProjectId = Id;
}
// Control Perpindahan Halaman
function backtotable() {
  detailProject.style.display = "none";
  contentProject.style.display = "block";
}

function updateDetailProject(Id) {
    
  const tbody = document.querySelector("#tableDetailProject tbody");
  
  // Show loading spinner
  const loadingRow = document.createElement('tr');
  loadingRow.innerHTML = `
    <td colspan="2" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </td>`;
  tbody.innerHTML = ""; 
  tbody.appendChild(loadingRow);    

  fetch(`${purchaseOrder}/${Id}`, {
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      tbody.innerHTML = "";
      console.log(Id);
      console.log(data);
      if (data.data.length === 0) {
        // Show "No data available" if no data
        const row = document.createElement("tr");
        row.innerHTML = `
          <td colspan="2" class="text-center">No data available</td>
        `;
        tbody.appendChild(row); 
      } else {
        // Update project details
        const project = data.data[0];
        document.getElementById("project_name").innerText = project.project_name;

        // Append new row with project data
        const newRow = `
          <tr>
            <td>${project.company}</td>
            <td>${project.amount.toLocaleString()}</td>
          </tr>`;
        tbody.innerHTML = newRow;
      }
      
    })
    .catch(error => {
      tbody.innerHTML = ""; // Clear the loading row
      console.error("Error fetching data:", error);

      // Show "Problems with the API" if there is an error
      const errorRow = document.createElement('tr');
      errorRow.innerHTML = `
        <td colspan="2" class="text-center">Problems with the API</td>`;
      tbody.appendChild(errorRow);
    });
}

function updateDoc(Id) {

  const cardBody = document.querySelector(".document");
  
  // Show loading spinner
  const loadingRow = document.createElement('div');
  loadingRow.innerHTML = `
    <divclass="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>`;
  cardBody.innerHTML = ""; 
  cardBody.appendChild(loadingRow); 
    
//   fetch(`${getFolderProject}/${Id}`, {
//     headers: headers,
//   })
  fetch(`api/admin/detail_po_${Id}.json`, {
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
        
     console.log(Id);
     console.log(data);
      cardBody.innerHTML = ""; // Kosongkan konten sebelumnya

      // Cek apakah ada data folder
      const hasFolders = data.data.some(item => item.doc_type === "folder");

      // Jika tidak ada folder, tampilkan pesan "Belum ada folder"
      if (!hasFolders) {
        const noFolderMessage = document.createElement("div");
        noFolderMessage.classList.add("text-center");
        // noFolderMessage.style.backgroundColor = "#FAFAFA";
        noFolderMessage.innerHTML = "<b>No data available</b>";
        cardBody.appendChild(noFolderMessage);
      } else {
        // Iterasi melalui data JSON
        data.data.forEach((item) => {
          // Buat elemen list untuk folder
          if (item.doc_type === "folder") {
            const folderItem = document.createElement("div");
            folderItem.classList.add("folder");
            folderItem.dataset.folderId = item.folder_id; // Menyimpan ID folder untuk pengaitan dengan file
            folderItem.innerHTML = `
              <div class="d-flex justify-content-between align-items-center">
                <span class="folder-name" id="folder-${item.doc_id}">${item.doc_name}</span>
                <i class="fa-solid fa-square-caret-down ml-auto"></i>
                <i class="fa-solid fa-file-pen ml-2" onclick="editFolder(${item.doc_id}); event.stopPropagation();"></i>
                <i class="fa-solid fa-plus-circle ml-1"></i>
              </div>
              <ul class="file-list" style="display: none;"></ul> <!-- Awalnya disembunyikan -->
            `;
            cardBody.appendChild(folderItem);

            // Tambahkan event listener untuk ikon plus
            const uploadIcon = folderItem.querySelector(".fa-plus-circle");
            if (uploadIcon) {
              uploadIcon.addEventListener("click", (event) => {
                event.stopPropagation(); // Hentikan penyebaran peristiwa klik
                const projectId = currentProjectId;
                const folderId = item.folder_id;
                uploadFile(projectId, folderId);
              });
            }
          }
          // Buat elemen list untuk file
          else if (item.doc_type === "files") {
          const fileItem = document.createElement("li");
          const fileLink = document.createElement("a");
          fileLink.textContent = item.doc_name;
          fileLink.href = `${getFileProject}/${item.doc_name}`;
          fileLink.target = "_blank"; // Buka tautan di tab baru
          
          // Tambahkan ikon minus
            const deleteIcon = document.createElement("i");
            deleteIcon.classList.add("fa-solid", "fa-minus-circle", "ml-2");
            deleteIcon.addEventListener("click", (event) => {
              event.stopPropagation();
              deleteFile(item.doc_id);
            });

            fileItem.appendChild(fileLink);
            fileItem.appendChild(deleteIcon);
          const parentFolder = document.querySelector(
            `.folder[data-folder-id="${item.folder_id}"] .file-list`
          );
          if (parentFolder) parentFolder.appendChild(fileItem);
          }
        });

        // Tambahkan event listener untuk toggle folder
        const folders = document.querySelectorAll(".folder");
        folders.forEach((folder) => {
          folder.addEventListener("click", () => {
            const fileList = folder.querySelector(".file-list");
            if (fileList) {
              fileList.style.display =
                fileList.style.display === "none" ? "block" : "none"; // Toggle display file-list
              folder.querySelector("i").classList.toggle("fa-square-caret-down");
              folder.querySelector("i").classList.toggle("fa-square-caret-up");
            }
          });
        });
      }
    })
    .catch(error => {
      cardBody.innerHTML = ""; // Clear the loading row
      console.error("Error fetching data:", error);

      // Show "Problems with the API" if there is an error
      const errorRow = document.createElement('div');
      errorRow.classList.add("text-center");
      errorRow.innerHTML = `
        <b>Problems with the API</b>`;
      cardBody.appendChild(errorRow);
    });
}


async function uploadFile(projectId, folderId) {
  // Tampilkan sweet alert untuk mengunggah file
  const data = `Upload File Project ID: ${projectId}, Folder ID: ${folderId}, info`;
  console.log(data);

  try {
    const response = await fetch("module/" + page + "/modal/uploadFile.php");
    const htmlContent = await response.text();

    Swal.fire({
      title: "Upload Document",
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      didOpen: async () => {
        // Tidak perlu ada kode di sini
      },
      preConfirm: async () => {
        const file = Swal.getPopup().querySelector("#fileInput").files[0];

        if (!file) {
          Swal.showValidationMessage("Harap upload document!");
          return;
        }
        
        // Validasi ekstensi file
        const allowedExtensions = ["pdf"];
        const fileExtension = file.name.split(".").pop();
        if (!allowedExtensions.includes(fileExtension)) {
                Swal.showValidationMessage(`Invalid file extension. Only .pdf files are allowed.`);
                return;
            }

        try {
          const formData = new FormData();
          formData.append("project_id", projectId);
          formData.append("folder_id", folderId);
          formData.append("file", file)

          const response = await fetch(
            uploadFileProject,
            {
              method: "POST",
              headers: headerFormData,
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error("Failed to add data");
          }
          Swal.fire("Success", "Data added successfully!", "success");
          updateDoc(currentProjectId);
          updateLogPayment(currentProjectId);
        } catch (error) {
          console.error("Error adding data:", error);
          Swal.fire("Error", "Failed to add data", "error");
        }
      },
    });
  } catch (error) {
    console.error("Error fetching HTML content:", error);
  }
}