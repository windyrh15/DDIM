const bankGuaranteeApp = (() => {
  let dataBg;
  const bgUrl = bgData; // URL dari API untuk bank guarantee
  const bgCustomTime = new Date().getTime();
  const bgVersion = `${bgUrl}?v=${bgCustomTime}`;
  const bgTbody = document.querySelector("#purchase_order tbody");
  const bgSearchInput = document.querySelector("#search-inputGrtee");
  const bgTableContainer = document.getElementById("table-container");
  const bgPageSize = 10;
  let bgCurrentPage = 1;
  
  // Fetch data from API
  async function fetchBgData() {
    try {
      const response = await fetch(bgVersion);
      dataBg = await response.json();
      displayBgData(bgCurrentPage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  function displayBgData(
    page,
    searchQuery = "",
    filterUser = "",
    filterType = "",
    filterStatus = "",
    filterYear = "",
    startDate = "",
    endDate = ""
  ) {
    bgCurrentPage = page;
    const bgStartIdx = (bgCurrentPage - 1) * bgPageSize;
    const bgEndIdx = bgStartIdx + bgPageSize;
    const bgFilteredData = dataBg.data.filter((bgFilter) => {
      // Filter data berdasarkan pencarian (jika ada)
      const userMatched =
        filterUser === "" ||
        (bgFilter.nama && bgFilter.nama.toLowerCase() === filterUser.toLowerCase());
      const typeMatched =
        filterType === "" ||
        (bgFilter.project_type && bgFilter.project_type.toLowerCase() === filterType.toLowerCase());
      const statusMatched =
        filterStatus === "" || bgFilter.status_sales === filterStatus;
      const yearMatched =
        filterYear === "" || new Date(bgFilter.tanggal).getFullYear() == filterYear;
      const startDateMatched =
        startDate === "" || new Date(bgFilter.date) >= new Date(startDate);
      const endDateMatched =
        endDate === "" || new Date(bgFilter.date) <= new Date(endDate);
      const searchMatched =
        searchQuery === "" ||
        (bgFilter.project && bgFilter.project.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (bgFilter.file && bgFilter.file.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (bgFilter.start_date && bgFilter.start_date.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (bgFilter.close_date && bgFilter.close_date.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (bgFilter.bond && bgFilter.bond.toString().includes(searchQuery)) ||
        (bgFilter.bank && bgFilter.bank.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (bgFilter.counter_guarantee && bgFilter.counter_guarantee.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (bgFilter.beneficiary && bgFilter.beneficiary.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (typeof bgFilter.period_days === 'string' && bgFilter.period_days.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (bgFilter.status && bgFilter.status.toLowerCase().includes(searchQuery.toLowerCase()));
  
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
  
    const bgTotalPages = Math.ceil(bgFilteredData.length / bgPageSize);
    const bgPaginatedData = bgFilteredData.slice(bgStartIdx, bgEndIdx);
    bgTbody.innerHTML = "";
    let bgIndex = bgStartIdx + 1;
    bgPaginatedData.forEach((bgDataItem) => {
      const bgRow = document.createElement("tr");
      const bgFilePath = `${bgFile}/${bgDataItem.file}`; // Inisialisasi variabel di luar innerHTML
      bgRow.innerHTML = `
              <td class="d-none d-md-table-cell ta-center">${bgIndex}</td>
              <td class="d-none d-md-table-cell ta-center">${bgDataItem.project}</td>
              <td class="d-none d-md-table-cell ta-center"><a href="${bgFilePath}">${bgDataItem.file}</a></td>
              <td class="d-none d-md-table-cell ta-center">${bgDataItem.start_date}</td>
              <td class="d-none d-md-table-cell ta-center">${bgDataItem.close_date}</td>
              <td class="d-none d-md-table-cell ta-center">${bgDataItem.bond_number}</td>
              <td class="d-none d-md-table-cell ta-center">${bgDataItem.bond}</td>
              <td class="d-none d-md-table-cell ta-center">${bgDataItem.amount}</td>
              <td class="d-none d-md-table-cell ta-center">${bgDataItem.collateral}</td>
              <td class="d-none d-md-table-cell ta-center">${bgDataItem.bank}</td>
              <td class="d-none d-md-table-cell ta-center">${bgDataItem.counter_guarantee}</td>
              <td class="d-none d-md-table-cell ta-center">${bgDataItem.beneficiary}</td>
              <td class="d-none d-md-table-cell ta-center">${bgDataItem.status}</td>
              <td class="d-none d-md-table-cell ta-center">${bgDataItem.period_days}</td>
               <td class="d-none d-sm-table-cell ta-center">
                <center><div class="dropdown no-arrow mb-4">
              <button class="btn btn-primary dropdown-toggle mt-4" type="button" id="bgDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Action
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bgDropdownMenuButton">
                <a class="dropdown-item bg-info-btn text-info" onclick="showUpdateGrtee(${bgDataItem.bg_id})">Edit</a>
                <a class="dropdown-item bg-delete-btn text-danger" onclick="deleteDataGrtee(${bgDataItem.bg_id})">Delete</a>
                <a class="dropdown-item bg-delete-btn text-warning" onclick="updateStatus(${bgDataItem.bg_id})">close</a>
              </div> 
              </div></center>
            </td>
          `;
      bgTbody.appendChild(bgRow);
      bgIndex++;
    });
  
    createBgPaginationButtonsPC(bgTotalPages);
    createBgPaginationButtonsMobile(bgTotalPages);
  }
  
// Initialize fetching of data
// fetchBgData();

  function createBgPaginationButtonsPC(bgTotalPages) {
    const bgPaginationContainer = document.querySelector(
      "#pagination-container-pc-grtee"
    );
    bgPaginationContainer.innerHTML = "";
    const bgPagesToShow = [bgCurrentPage - 1, bgCurrentPage, bgCurrentPage + 1].filter(
      (bgPage) => bgPage > 0 && bgPage <= bgTotalPages
    );

    const bgFirstButton = document.createElement("button");
    bgFirstButton.innerText = "First";
    bgFirstButton.addEventListener("click", () => {
      displayBgData(1, bgSearchInput.value);
    });
    bgPaginationContainer.appendChild(bgFirstButton);

    const bgPreviousButton = document.createElement("button");
    bgPreviousButton.innerText = "Previous";
    bgPreviousButton.addEventListener("click", () => {
      const bgPreviousPage = bgCurrentPage > 1 ? bgCurrentPage - 1 : 1;
      displayBgData(bgPreviousPage, bgSearchInput.value);
    });
    bgPaginationContainer.appendChild(bgPreviousButton);

    bgPagesToShow.forEach((bgPage) => {
      const bgButton = document.createElement("button");
      bgButton.innerText = bgPage;
      if (bgPage === bgCurrentPage) {
        bgButton.classList.add("active");
      }
      bgButton.addEventListener("click", () => {
        displayBgData(bgPage, bgSearchInput.value);
      });
      bgPaginationContainer.appendChild(bgButton);
    });

    const bgNextButton = document.createElement("button");
    bgNextButton.innerText = "Next";
    bgNextButton.addEventListener("click", () => {
      const bgNextPage = bgCurrentPage < bgTotalPages ? bgCurrentPage + 1 : bgTotalPages;
      displayBgData(bgNextPage, bgSearchInput.value);
    });
    bgPaginationContainer.appendChild(bgNextButton);

    const bgLastButton = document.createElement("button");
    bgLastButton.innerText = "Last";
    bgLastButton.addEventListener("click", () => {
      displayBgData(bgTotalPages, bgSearchInput.value);
    });
    bgPaginationContainer.appendChild(bgLastButton);
  }

  function createBgPaginationButtonsMobile(bgTotalPages) {
    const bgPaginationContainer = document.querySelector(
      "#pagination-container-mobile"
    );
    bgPaginationContainer.innerHTML = "";

    const bgPagesToShow = [bgCurrentPage - 1, bgCurrentPage, bgCurrentPage + 1]
      .filter((bgPage) => bgPage > 0 && bgPage <= bgTotalPages)
      .slice(0, 3);

    const bgFirstButton = document.createElement("button");
    bgFirstButton.innerHTML = '<i class="fas fa-angle-double-left"></i>';
    bgFirstButton.addEventListener("click", () => {
      displayBgData(1, bgSearchInput.value);
    });
    bgPaginationContainer.appendChild(bgFirstButton);

    const bgPreviousButton = document.createElement("button");
    bgPreviousButton.innerHTML = '<i class="fas fa-angle-left"></i>';
    bgPreviousButton.addEventListener("click", () => {
      const bgPreviousPage = bgCurrentPage > 1 ? bgCurrentPage - 1 : 1;
      displayBgData(bgPreviousPage, bgSearchInput.value);
    });
    bgPaginationContainer.appendChild(bgPreviousButton);

    bgPagesToShow.forEach((bgPage) => {
      const bgButton = document.createElement("button");
      bgButton.innerText = bgPage;
      if (bgPage === bgCurrentPage) {
        bgButton.classList.add("active");
      }
      bgButton.addEventListener("click", () => {
        displayBgData(bgPage, bgSearchInput.value);
      });
      bgPaginationContainer.appendChild(bgButton);
    });

    const bgNextPageButton = document.createElement("button");
    bgNextPageButton.innerHTML = '<i class="fas fa-angle-right"></i>';
    bgNextPageButton.addEventListener("click", () => {
      const bgNextPage = bgCurrentPage < bgTotalPages ? bgCurrentPage + 1 : bgTotalPages;
      displayBgData(bgNextPage, bgSearchInput.value);
    });
    bgPaginationContainer.appendChild(bgNextPageButton);

    const bgLastButton = document.createElement("button");
    bgLastButton.innerHTML = '<i class="fas fa-angle-double-right"></i>';
    bgLastButton.addEventListener("click", () => {
      displayBgData(bgTotalPages, bgSearchInput.value);
    });
    bgPaginationContainer.appendChild(bgLastButton);
  }

  function fetchBgData() {
    const bgLoadingRow = document.createElement("tr");
    bgLoadingRow.innerHTML = `
      <td colspan="14" class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </td>`;
    bgTbody.innerHTML = "";
    bgTbody.appendChild(bgLoadingRow);

    fetch(bgVersion, {
      headers: headers
    })
      .then((response) => response.json())
      .then((responseData) => {
        bgTbody.innerHTML = "";
        dataBg = responseData;

        if (dataBg.data.length === 0) {
          const bgRow = document.createElement("tr");
          bgRow.innerHTML = `
            <td colspan="14" class="text-center">No data available</td>
          `;
          bgTbody.appendChild(bgRow);
        } else {
          displayBgData(bgCurrentPage);
        }
      })
      .catch((error) => {
        bgTbody.innerHTML = "";
        console.error("Error fetching data:", error);
        const bgErrorRow = document.createElement("tr");
        bgErrorRow.innerHTML = `
          <td colspan="14" class="text-center">Problems with the API</td>`;
        bgTbody.appendChild(bgErrorRow);
      });
  }

  bgSearchInput.addEventListener("input", () => {
    displayBgData(1, bgSearchInput.value);
  });

  fetchBgData();

  return {
    fetchBgData,
    displayBgData,
    createBgPaginationButtonsPC,
    createBgPaginationButtonsMobile
  };
})();
