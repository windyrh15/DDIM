let dataProject;
const urlProject = projectData;
const customTime = new Date().getTime();
const versionProject = `${urlProject}?v=${customTime}`;
const tbodyProject = document.querySelector("#project tbody");
const searchInput = document.querySelector("#search-input");
const pageSize = 10;
let currentPage = 1;

function displayData(
  page,
  searchQuery = "",
  filterUser = "",
  filterType = "",
  filterStatus = "",
  filterBranch = "",
  filterYear = "",
  startDate = "",
  endDate = ""
) {
  currentPage = page; // Update currentPage
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const filteredData = dataProject.dataProject.filter((project) => {
    // Filter data berdasarkan pencarian (jika ada)
    const userMatched =
      filterUser === "" ||
      project.user_project.toLowerCase() === filterUser.toLowerCase();
    const typeMatched =
      filterType === "" ||
      project.project_type.toLowerCase() === filterType.toLowerCase();
    const statusMatched =
      filterStatus === "" ||
      project.status.toString().toLowerCase() ===
        filterStatus.toString().toLowerCase();
    const branchMatched =
      filterBranch === "" ||
      project.branch.toLowerCase() === filterBranch.toLowerCase();
    const yearMatched =
      filterYear === "" ||
      new Date(project.start_date).getFullYear() == filterYear;
    const startDateMatched =
      startDate === "" || new Date(project.start_date) >= new Date(startDate);
    const endDateMatched =
      endDate === "" || new Date(project.finish_date) <= new Date(endDate);
    const searchMatched =
      searchQuery === "" ||
      project.no_project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.project_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.amount.toString().includes(searchQuery) ||
      project.start_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.finish_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.status.toString().includes(searchQuery);

    return (
      userMatched &&
      typeMatched &&
      statusMatched &&
      branchMatched &&
      yearMatched &&
      startDateMatched &&
      endDateMatched &&
      searchMatched
    );
  });
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(startIdx, endIdx);
  tbodyProject.innerHTML = "";
  let i = startIdx + 1;
  paginatedData.forEach((project) => {
    const row = document.createElement("tr");
    row.onclick = function () {
      showDetails(project.project_id);
    };

    const startDate = new Date(project.start_date);
    const startDateTanggal = startDate.getDate().toString().padStart(2, "0");
    const startDatebulan = (startDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const startDatetahun = startDate.getFullYear();
    const startDateProject = `${startDateTanggal}/${startDatebulan}/${startDatetahun}`;

    const finishDate = new Date(project.finish_date);
    const finishDateTanggal = finishDate.getDate().toString().padStart(2, "0");
    const finishDatebulan = (finishDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const finishDatetahun = finishDate.getFullYear();
    const finishDateProject = `${finishDateTanggal}/${finishDatebulan}/${finishDatetahun}`;

    row.innerHTML = `
            <td class="d-none d-md-table-cell ta-center">${i}</td>
            <td class="d-none d-md-table-cell ta-start">${
              project.no_project
            }</td>
            <td class="ta-start">${project.project_name}<br>Project Manager : <b>${project.project_manager} </b><i class="fa-solid fa-user-pen" style="color: #74C0FC;" onclick="EditPm('${project.project_id}'); event.stopPropagation();"></i>
            <div class="d-block d-md-none d-lg-none d-sm-none"><br>
        <div style="display: flex; justify-content: center;">
            <button class="btn btn-success btn-sm mr-2" onclick="showDetailsProject('${
              project.project_id
            }')">
                <i class="fa-solid fa-eye"></i>
            </button>
            <div class="dropdown no-arrow">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Action
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" id="editProjectButton" data-id="${
                  project.project_id
                }">Edit</a>
                  <a class="dropdown-item delete-btn text-danger" onclick="deleteProject(${
                    project.project_id
                  })">Delete</a>
                  <hr>
              <a class="dropdown-item ongoing-btn text-success" onclick="statusOnGoing(${
                project.project_id
              })">On Going</a>
              <a class="dropdown-item won-btn text-warning" onclick="statusDelay(${
                project.project_id
              })">Delay</a>
              <a class="dropdown-item lost-btn text-primary" onclick="statusFinish(${
                project.project_id
              })">Finish</a>
                </div>
            </div>
        </div>
    </div><br>
    </td>
            <td class="d-none d-md-table-cell ta-start">${
              project.project_type
            }</td>
            <td class="d-none d-md-table-cell ta-start">${project.client}</td>
            <td class="d-none d-sm-table-cell ta-end">${project.amount.toLocaleString()}</td>
          <td class="d-none d-md-table-cell ta-center">
  ${
    project.status === 1
      ? '<span class="badge badge-warning">On Going</span>'
      : ""
  }
  ${
    project.status === 2
      ? '<span class="badge badge-danger">Delay</span>'
      : ""
  }
  ${
    project.status === 3
      ? '<span class="badge badge-primary">Finish</span>'
      : ""
  }
  ${
    project.status === 4
      ? '<span class="badge badge-dark">Cancel</span>'
      : ""
  }
</td>
        `;
    tbodyProject.appendChild(row);
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

// function fetchData() {
//   fetch(versionProject, {
//     headers: headers,
//   })
//     .then((response) => response.json())
//     .then((responseData) => {
//       dataProject = responseData;
//       displayData(currentPage);
//     })
//     .catch((error) => console.error("Error fetching data:", error));
// }


function fetchData() {
  // Show loading spinner
  const loadingRow = document.createElement('tr');
  loadingRow.innerHTML = `
    <td colspan="7" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </td>`;
  tbodyProject.innerHTML = ""; 
  tbodyProject.appendChild(loadingRow);

  fetch(versionProject, {
    headers: headers,
  })
    .then((response) => response.json())
    .then((responseData) => {
      tbodyProject.innerHTML = "";
      dataProject = responseData;
      if (dataProject.dataProject.length === 0) {
        // Show "No data available" if no data
        const row = document.createElement("tr");
        row.innerHTML = `
          <td colspan="7" class="text-center">No data available</td>
        `;
        tbodyProject.appendChild(row); 
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
        <td colspan="7" class="text-center">Problems with the API</td>`;
      tbodyProject.appendChild(errorRow);
    });
}

searchInput.addEventListener("input", () => {
  displayData(1, searchInput.value);
});


fetchData();

function showDetailsProject(projectId) {
  var detailDataProject = getDetailDataProject(projectId);

  var modalBodyProject = document.getElementById("detailsModalProjectBody");
  modalBodyProject.innerHTML = `
                <p>Proj# : ${detailDataProject.no_project}</p>
                <p>Project Name : ${detailDataProject.project_name}</p>
                <p>Type : ${detailDataProject.project_type}</p>
                <p>Customer : ${detailDataProject.client}</p>
                <p>Amount : ${detailDataProject.amount.toLocaleString()}</p>
                <p> Status : 
  ${
    detailDataProject.status === 1
      ? '<i class="fa-solid fa-circle text-success" style="font-size:10px;"></i> On Going'
      : ""
  }
  ${
    detailDataProject.status === 2
      ? '<i class="fa-solid fa-circle text-warning" style="font-size:10px;"></i> Delay'
      : ""
  }
  ${
    detailDataProject.status === 3
      ? '<i class="fa-solid fa-circle text-primary" style="font-size:10px;"></i> Finish'
      : ""
  }
</p>
`;

  $("#detailsModalProject").modal("show");
}

function getDetailDataProject(projectId) {
  console.log("All Project:", dataProject.dataProject);
  const foundProject = dataProject.dataProject.find(
    (project) => project.project_id == projectId
  );

  console.log("Found Project", foundProject);
  return foundProject || {};
}


async function projectPm() {
  try {
    const response = await fetch(dataPm, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();

    const selectPic = Swal.getPopup().querySelector("#edit_pm");
    selectPic.innerHTML = '';

    // Tambahkan opsi "Select Project Manager" sebelum daftar project manager
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Project Manager';
    defaultOption.selected = true;
    defaultOption.disabled = true;
    selectPic.appendChild(defaultOption);

    data.data.forEach(user => {
      const option = document.createElement('option');
      option.value = user.project_manager_id;
      option.textContent = user.name;
      selectPic.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
}



async function EditPm (projectId) {
  try {
    const response = await fetch("module/" + page + "/modal/editPm.php");
    const htmlContent = await response.text();

    Swal.fire({
      title: "Edit Project Manager",
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: "Edit",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      didOpen: async () => {
        await projectPm();
        
      },
      preConfirm: async () => {
        const edit_pm = Swal.getPopup().querySelector("#edit_pm").value;

        if (!edit_pm) {
          Swal.showValidationMessage("Please fill in the fields!");
          return;
        }

        try {
          const dataInputProject = {
             project_manager_id: edit_pm,
            };

          console.log(dataInputProject);

          const response = await fetch(`${editPm}/${projectId}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(dataInputProject),
          });

          if (!response.ok) {
            throw new Error("Failed to add data");
          }

          fetchData();
          Swal.fire("Success", "Data added successfully!", "success");
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

let currentProjectId;

function showDetails(Id) {
  detailProject.style.display = "block";
  contentProject.style.display = "none";
  updateDetailProject(Id);
  updateVendor(Id);
  updateDoc(Id);
  updateLogPayment(Id);
  checkProjectFinishDate(Id);
  checkProjectCancel(Id);
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
    <td colspan="3" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </td>`;
  tbody.innerHTML = ""; 
  tbody.appendChild(loadingRow);    

  fetch(`${projectData}/${Id}`, {
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      tbody.innerHTML = "";
      if (data.data.length === 0) {
        // Show "No data available" if no data
        const row = document.createElement("tr");
        row.innerHTML = `
          <td colspan="3" class="text-center">No data available</td>
        `;
        tbody.appendChild(row); 
      } else {
        // Update project details
        const project = data.data[0];
        document.getElementById("project_name").innerText = project.project_name;

        // Append new row with project data
        const newRow = `
          <tr>
            <td>${project.client}</td>
            <td>${project.amount.toLocaleString()}</td>
            <td>${project.working_time}</td>
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
        <td colspan="3" class="text-center">Problems with the API</td>`;
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
    
  fetch(`${getFolderProject}/${Id}`, {
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
    
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

function updateVendor(Id) {
  const tbody = document.querySelector("#vendor tbody");
  
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
  
  // Fetch data
  fetch(`${vendorProjectData}/${Id}`, { 
      headers: headers 
      
  })
    .then(response => response.json())
    .then(data => {
      tbody.innerHTML = ""; // Clear the loading row

      if (data.data.length === 0) {
        // Show "No data available" if no data
        const row = document.createElement("tr");
        row.innerHTML = `
          <td colspan="2" class="text-center">No data available</td>
        `;
        tbody.appendChild(row);
      } else {
        // Append rows for each vendor found
        data.data.forEach(vendor => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${vendor.vendor_name}</td>
            <td>${vendor.amount.toLocaleString()}</td>
          `;
          tbody.appendChild(row);
        });
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


function updateLogPayment(Id) {
    
  const tbody = document.querySelector("#log_payment tbody");
  const loadingRow = document.createElement('tr');
  loadingRow.innerHTML = `
    <td colspan="3" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </td>`;
  tbody.innerHTML = ""; 
  tbody.appendChild(loadingRow); 
    
  fetch(`${getExpensesProject}/${Id}`, {
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      tbody.innerHTML = ""; // Clear the loading row
      
      if (data.data.length === 0) {
        // Show "No data available" if no data
        const row = document.createElement("tr");
        row.innerHTML = `
          <td colspan="3" class="text-center">No data available</td>
        `;
        tbody.appendChild(row);
      } else {
        // Tambahkan baris untuk setiap vendor yang ditemukan
        data.data.forEach((payment) => {
        const dateString = payment.tanggal_transaksi;
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${payment.tanggal_transaksi}</td>
          <td>${payment.jenis_transaksi}</td>
          <td>${payment.nominal.toLocaleString()}</td>
        `;
        tbody.appendChild(row);
      });
      }
    })
    .catch(error => {
      tbody.innerHTML = ""; // Clear the loading row
      console.error("Error fetching data:", error);

      // Show "Problems with the API" if there is an error
      const errorRow = document.createElement('tr');
      errorRow.innerHTML = `
        <td colspan="3" class="text-center">Problems with the API</td>`;
      tbody.appendChild(errorRow);
    });
}


addFolder.addEventListener("click", async function () {
  try {
    const response = await fetch("module/" + page + "/modal/addFolder.php");
    const htmlContent = await response.text();

    Swal.fire({
      title: "Add Folder",
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      didOpen: async () => {
      },
      preConfirm: async () => {
        const folder_name =
          Swal.getPopup().querySelector("#folder_name").value;
        
        if (!folder_name) {
          Swal.showValidationMessage("Please fill the folder name!");
          return;
        }

        try {
          const dataInputFolder = {
            project_id: currentProjectId,
            doc_name: folder_name
          };

          console.log(dataInputFolder);

          const response = await fetch(uploadFolderProject, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(dataInputFolder),
          });

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
});

async function editFolder(Id) {
  try {
    const response = await fetch("module/" + page + "/modal/addFolder.php");
    const htmlContent = await response.text();

    Swal.fire({
      title: "Edit Folder",
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: "Edit",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      didOpen: async () => {
      },
      preConfirm: async () => {
        const folder_name =
          Swal.getPopup().querySelector("#folder_name").value;
        
        if (!folder_name) {
          Swal.showValidationMessage("Please fill the folder name!");
          return;
        }

        try {
          const dataInputFolder = {
            doc_name: folder_name
          };

          console.log(dataInputFolder);

          const response = await fetch(`${editFolderProject}/${Id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(dataInputFolder),
          });

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
};


async function deleteFile(Id) {
  try {

    Swal.fire({
      title: "Delete File",
      icon: "warning",
      text: "Are you sure you want to delete this file?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      didOpen: async () => {
      },
      preConfirm: async () => {

        try {

          const response = await fetch(`${deleteFileProject}/${Id}`, {
            method: "PUT",
            headers: headers
          });

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
};

async function detailAccount() {
  try {
    const response = await fetch(accountFinance, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();
    
    const selectAccount = Swal.getPopup().querySelector("#akun");
    
    selectAccount.innerHTML = '';

    data.data.forEach(account => {
      const option = document.createElement('option');
      option.value = account.nama_akun_pembayaran;
      option.textContent = account.nama_akun_pembayaran;
      selectAccount.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
}

async function detailCategory() {
  try {
    const response = await fetch(categoryFinance, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();
    
    const selectTrx = Swal.getPopup().querySelector("#cat_name");
    
    selectTrx.innerHTML = '';

    data.data.forEach(trx => {
      const option = document.createElement('option');
      option.value = trx.tipe;
      option.textContent = trx.tipe;
      selectTrx.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
}

async function detailDescription(catType) {
  try {
    const response = await fetch(`${categoryFinance}/${catType}`, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();
    
    const selectKategori = Swal.getPopup().querySelector("#keterangan");
    
    selectKategori.innerHTML = '';

    data.data.forEach(kategori => {
      const option = document.createElement('option');
      option.value = kategori.cat_name; // Ubah sesuai dengan nama properti yang sesuai
      option.textContent = kategori.cat_name; // Ubah sesuai dengan nama properti yang sesuai
      selectKategori.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
}

async function formatAmount(){
// Mendengarkan event input pada elemen input amount
document.getElementById("jumlah_transaksi").addEventListener("input", function() {
    // Mengambil nilai input amount
    let amountValue = this.value;
    // Menghapus semua koma dari nilai input
    amountValue = amountValue.replace(/,/g, '');
    // Memformat nilai input dengan koma sebagai pemisah ribuan
    amountValue = Number(amountValue).toLocaleString();
    // Menetapkan nilai input yang diformat kembali ke elemen
    this.value = amountValue;
});
}


addExpenses.addEventListener("click", async function () {
  try {
    const response = await fetch("module/" + page + "/modal/inputExpenses.php");
    const htmlContent = await response.text();

    Swal.fire({
      title: "Add Expenses",
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      didOpen: async () => {
          const selectTrx = Swal.getPopup().querySelector("#cat_name");
          await detailAccount();
          await detailCategory();
          await formatAmount();
  
         // Memanggil detailDescription saat pilihan kategori berubah
         selectTrx.addEventListener('change', async () => {
          const selectedCategory = selectTrx.value;
          await detailDescription(selectedCategory);
         });
      },
      preConfirm: async () => {
        const owner_id = Swal.getPopup().querySelector("#owner_id").value;
        const user_id = Swal.getPopup().querySelector("#user_id").value;
        const akun = Swal.getPopup().querySelector("#akun").value;
        const tanggal_transaksi = Swal.getPopup().querySelector("#tanggal_transaksi").value;
        const tipe = Swal.getPopup().querySelector("#cat_name").value;
        const jenis_transaksi = Swal.getPopup().querySelector("#keterangan").value;
        const no_kwitansi = Swal.getPopup().querySelector("#no_kwitansi").value;
        const nominal = Swal.getPopup().querySelector("#jumlah_transaksi").value;
        const note = Swal.getPopup().querySelector("#note").value;
        const file = Swal.getPopup().querySelector("#file").files[0]; // Ambil file dari input

        // Validasi input
        if (!owner_id || !user_id || !akun || !tanggal_transaksi|| !tipe  || !jenis_transaksi || !no_kwitansi || !nominal || !note || !file) {
                Swal.showValidationMessage(`All fields are required`);
                return;
            }

        // Validasi ekstensi file
        const allowedExtensions = ["jpg", "png", "pdf"];
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
                Swal.showValidationMessage(`Invalid file extension. Only .jpg, .png, and .pdf files are allowed.`);
                return;
        }

        try {
          const formData = new FormData();
          formData.append("owner_id", owner_id);
          formData.append("user_id", user_id);
          formData.append("project_id", currentProjectId);
          formData.append("akun", akun);
          formData.append("tanggal_transaksi", tanggal_transaksi);
          formData.append("nominal", nominal);
          formData.append("jenis_transaksi", jenis_transaksi);
          formData.append("tipe", tipe);
          formData.append("keterangan", note);
          formData.append("no_kwitansi", no_kwitansi);
          formData.append("file", file);
          formData.set("nominal", formData.get("nominal").replace(/,/g, ''));

          console.log(formData);

          const response = await fetch(addExpensesFinance, {
            method: "POST",
             headers: headerFormData,
            body: formData, 
          });

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
});

async function checkProjectCancel(Id) {
  try {
    const response = await fetch(`${projectData}/${Id}`, {
      headers: headers,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch project data");
    }
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const project = data.data[0]; // Ambil objek pertama dari array data
      const cancelButton = document.getElementById("cancelButton");

      if (project.status === "Unknown") {
        cancelButton.style.display = "none"; // Sembunyikan tombol jika statusnya "Cancel"
      } else {
        cancelButton.style.display = "block"; // Tampilkan tombol jika statusnya bukan "Cancel"
      }
    } else {
      console.error("No project data available.");
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
}

async function cancelProjectHandler() {
  Swal.fire({
    title: "Cancel Project",
    text: "Are you sure you want to cancel this project?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, cancel this project",
    cancelButtonText: "No, cancel",
    reverseButtons: true,
  })
    .then(async (result) => {
      if (result.isConfirmed) {
         
        let project_id = currentProjectId;
        const data = {
          project_id: project_id,
        };
        console.log(data);
        try {
          const response = await fetch(
            `${cancelProject}/${project_id}`,
            {
              method: "PUT",
              headers: headers,
              body: JSON.stringify(data),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to change status");
          }
          fetchData();
          Swal.fire("Success", "Successfully changed status!", "success");
          backtotable();
        } catch (error) {
          console.error("Error changing status:", error);
          Swal.fire("Error", "Failed to change status", "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your status is safe :)", "info");
      }
    })
    .catch((error) => {
      console.error("Error sending request:", error);
      Swal.fire("Error", "Failed to send request", "error");
    });
}

async function deleteProjectHandler() {
  Swal.fire({
    title: "Delete Project",
    text: "Are you sure you want to delete this project?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete this project",
    cancelButtonText: "No, cancel",
    reverseButtons: true,
  })
    .then(async (result) => {
      if (result.isConfirmed) {
         
        let project_id = currentProjectId;
        const data = {
          project_id: project_id,
        };
        console.log(data);
        try {
          const response = await fetch(
            `${delProject}/${project_id}`,
            {
              method: "PUT",
              headers: headers,
              body: JSON.stringify(data),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to change status");
          }
          fetchData();
          Swal.fire("Success", "Successfully deleted project!", "success");
          backtotable();
        } catch (error) {
          console.error("Error changing status:", error);
          Swal.fire("Error", "Failed to delete the project!", "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your status is safe :)", "info");
      }
    })
    .catch((error) => {
      console.error("Error sending request:", error);
      Swal.fire("Error", "Failed to send request", "error");
    });
}

async function checkProjectFinishDate(Id) {
  try {
    const response = await fetch(`${projectData}/${Id}`, {
      headers: headers,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch project data");
    }
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const project = data.data[0]; // Ambil objek pertama dari array data
      const finishButton = document.getElementById("finishButton");

      if (project.status === "Finish") {
        finishButton.style.display = "none"; // Sembunyikan tombol jika statusnya "Finish"
      } else {
        finishButton.style.display = "block"; // Tampilkan tombol jika statusnya bukan "Finish"
      }
    } else {
      console.error("No project data available.");
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
}

async function finishProjectHandler() {
  Swal.fire({
    title: "Finish Project",
    text: "Are you sure you want to complete this project?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, finish this project",
    cancelButtonText: "No, cancel",
    reverseButtons: true,
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        let project_id = currentProjectId;
        const data = {
          project_id: project_id,
        };
        console.log(data);
        try {
          const response = await fetch(
            `${finishProject}/${project_id}`,
            {
              method: "PUT",
              headers: headers,
              body: JSON.stringify(data),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to change status");
          }
          fetchData();
          Swal.fire("Success", "Successfully completed the project!", "success");
          backtotable();
        } catch (error) {
          console.error("Error changing status:", error);
          Swal.fire("Error", "Failed to complete the project!", "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your status is safe :)", "info");
      }
    })
    .catch((error) => {
      console.error("Error sending request:", error);
      Swal.fire("Error", "Failed to send request", "error");
    });
}

