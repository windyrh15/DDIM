// Tambah material update ------------------------------------------------------------------------------------------------------------------------------------------------------
function tambahMaterialUpdate() {
  const container = document.querySelector("#materialContainer");

  const materialFormInput = document.createElement("div");
  materialFormInput.classList.add("row", "mb-2");

  const inputMaterialCol = document.createElement("div");
  inputMaterialCol.classList.add("col");

  const inputMaterial = document.createElement("input");
  inputMaterial.type = "text";
  inputMaterial.name = "material[]";
  inputMaterial.placeholder = "Material";
  inputMaterial.classList.add("form-control");
  inputMaterial.required = true;

  inputMaterialCol.appendChild(inputMaterial);

  const inputQuantityCol = document.createElement("div");
  inputQuantityCol.classList.add("col");

  const inputQuantity = document.createElement("input");
  inputQuantity.type = "number";
  inputQuantity.name = "quantity[]";
  inputQuantity.placeholder = "Quantity";
  inputQuantity.classList.add("form-control");
  inputQuantity.required = true;

  inputQuantityCol.appendChild(inputQuantity);

  const deleteButtonCol = document.createElement("div");
  deleteButtonCol.classList.add("col-auto");

  const deleteButton = document.createElement("div");
  deleteButton.classList.add("btn", "btn-danger"); // Mengubah warna tombol menjadi merah
  deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
        </svg>`;

  deleteButton.addEventListener("click", () => {
    container.removeChild(materialFormInput);
    updateDeleteButtons();
  });

  deleteButtonCol.appendChild(deleteButton);

  materialFormInput.appendChild(inputMaterialCol);
  materialFormInput.appendChild(inputQuantityCol);
  materialFormInput.appendChild(deleteButtonCol);

  container.appendChild(materialFormInput);

  updateDeleteButtons();
}

// Update Delete Button ------------------------------------------------------------------------------------------------------------------------------------------------

function updateDeleteButtons() {
  const deleteButtons = document.querySelectorAll(
    "#materialContainer .btn.btn-danger"
  );
  if (deleteButtons.length === 1) {
    deleteButtons[0].style.display = "none";
  } else {
    deleteButtons.forEach((button) => {
      button.style.display = "block";
    });
  }
}

// Cek Material Form ---------------------------------------------------------------------------------------------------------------------------------------------------
function validateMaterials() {
  const materials = document.querySelectorAll('input[name="material[]"]');
  const quantities = document.querySelectorAll('input[name="quantity[]"]');

  for (let i = 0; i < materials.length; i++) {
    if (materials[i].value && quantities[i].value) {
      return true;
    }
  }

  return false;
}

// Cek Project Name ----------------------------------------------------------------------------------------------------------------------------------------------------
async function cekProjectName(projectName) {
  try {
    // Fetch data proyek dari API
    const response = await fetch(projectData, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch project data");
    }

    const data = await response.json(); // Parsing respons JSON
    const projects = data.dataProject; // Asumsikan properti ini menyimpan daftar proyek

    // Logging data proyek untuk debugging
    console.log("Projects data from API:", projects);

    // Filter proyek berdasarkan nama proyek yang diberikan
    const filteredProject = projects.find(
      (project) => project.project_name === projectName
    );

    if (filteredProject) {
      console.log("Project found:", filteredProject);
      // Lakukan sesuatu dengan data proyek yang ditemukan
      return filteredProject;
    } else {
      console.log("Project not found for name:", projectName);
      return null;
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
    return null;
  }
}

async function populateProjectFields(projectName) {
  const project = await cekProjectName(projectName);
  if (project) {
    document.getElementById("project_id_old").value = project.project_id;
    document.getElementById("pelanggan_id_old").value = project.pelanggan_id;
  } else {
    console.log("Project not found");
  }
}

// Edit modal form -------------------------------------------------------------------------------------------------------------------------------------------------------
async function showEditForm(deliveryId) {
  try {
    const urlDeliveryNote = `${deliveryNote}${deliveryId}`;

    // Fetch current data from API
    const response = await fetch(urlDeliveryNote, {
      headers: headersTes,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    const deliveryDateFromAPI = data.data[0].date;

    // Parse date from "dd/MM/yyyy" format
    const [day, month, year] = deliveryDateFromAPI.split("/");
    const deliveryDate = new Date(`${year}-${month}-${day}`);

    if (isNaN(deliveryDate.getTime())) {
      throw new Error("Invalid date value");
    }
    const formattedDate = deliveryDate.toISOString().split("T")[0];

    const materialDetails = data.data[0].material_detail;

    // Fetch HTML content for the edit form
    const formResponse = await fetch("module/" + page + "/modal/edit.php");
    const htmlContent = await formResponse.text();

    Swal.fire({
      title: "Edit Delivery Note",
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      didOpen: async () => {
        await populateSelect(); // Populate select options
        await populateSelectPIC()

        document.getElementById("tanggal").value = formattedDate;
        document.getElementById("formatNo").value = data.data[0].no_dn;
        document.getElementById("old_picView").value = `${data.data[0].pic} - (PIC Sebelumnya )`;
        document.getElementById("old_pic").value = data.data[0].pic;
        document.getElementById("old_pic_phone").value = data.data[0].pic_phone;
        document.getElementById(
          "oldProjectName"
        ).value = `${data.data[0].project_name} - (Project Sebelumnya)`;

        // Sebelum datanya di tampilkan harus cek dulu value project_name
        await populateProjectFields(data.data[0].project_name);

        materialDetails.forEach((detail) => {
          tambahMaterialUpdate();
          const materials = document.querySelectorAll(
            'input[name="material[]"]'
          );
          const quantities = document.querySelectorAll(
            'input[name="quantity[]"]'
          );
          materials[materials.length - 1].value = detail.material;
          quantities[quantities.length - 1].value = detail.quantity;
        });

        const projectSelect = document.getElementById("project");
        const selectedOption = projectSelect.querySelector(
          `option[value="${data.data[0].project_id}"]`
        );
        if (selectedOption) {
          selectedOption.selected = true;
        }

        // Add event listener to the "Add Material" button
        document
          .getElementById("materialButton")
          .addEventListener("click", tambahMaterialUpdate);

        // Update delete button visibility based on number of material items
        updateDeleteButtons();
      },
      preConfirm: async () => {
        // Buat pengkondisian Project ---------------------------------------------------------------
        const projectId = Swal.getPopup().querySelector("#project").value;
        const pelangganId =
          Swal.getPopup().querySelector("#pelanggan_id").value;
        const project_id_old =
          Swal.getPopup().querySelector("#project_id_old").value;
        const pelanggan_id_old =
          Swal.getPopup().querySelector("#pelanggan_id_old").value;
        // -----------------------------------------------------------------------------------

        // Buat pengkondisian Pic ---------------------------------------------------------------
        const pic = Swal.getPopup().querySelector("#pic").value;
        const phone =
          Swal.getPopup().querySelector("#phone").value;
        const oldPic =
          Swal.getPopup().querySelector("#old_pic").value;
        const oldPhone =
          Swal.getPopup().querySelector("#old_pic_phone").value;
        // -----------------------------------------------------------------------------------

        const prefix = Swal.getPopup().querySelector("#prefix").value;
        const tanggal = Swal.getPopup().querySelector("#tanggal").value;
        const formatNo = Swal.getPopup().querySelector("#formatNo").value;
        const deliverTo = Swal.getPopup().querySelector("#deliverTo").value;

        if (!validateMaterials()) {
          Swal.showValidationMessage(
            "At least one material and quantity must be filled out."
          );
          return false; // Prevent closing
        }

        const materials = Swal.getPopup().querySelectorAll(
          'input[name="material[]"]'
        );
        const quantities = Swal.getPopup().querySelectorAll(
          'input[name="quantity[]"]'
        );

        const materialDetails = [];
        for (let i = 0; i < materials.length; i++) {
          if (materials[i].value && quantities[i].value) {
            materialDetails.push({
              material: materials[i].value,
              quantity: quantities[i].value,
            });
          }
        }

        // Pengkondisian untuk updatedData
        const updatedData = {
          project_id: projectId || project_id_old,
          pelanggan_id: pelangganId || pelanggan_id_old,
          prefix: prefix,
          date: tanggal,
          no_dn: formatNo,
          pic: pic || oldPic,
          pic_phone: phone || oldPhone,
          client: deliverTo || data.data[0].client,
          material_detail: materialDetails,
        };

        try {
          const updateResponse = await fetch(
            `${updateDeliveryNote}${deliveryId}`,
            {
              method: "PUT",
              headers: headersTes,
              body: JSON.stringify(updatedData),
            }
          );

          if (!updateResponse.ok) {
            throw new Error("Failed to update data");
          }

          Swal.fire({
            title: "Success",
            text: "Data updated successfully!",
            icon: "success",
          }).then(() => {
            location.reload();
          });
        } catch (error) {
          console.error("Error updating data:", error);
          Swal.fire("Error", "Failed to update data", "error");
        }
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    Swal.fire("Error", "Failed to fetch data", "error");
  }
}

// Event listener for the edit button
document.querySelectorAll(".edit-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const deliveryId = event.target.dataset.id;
    showEditForm(deliveryId);
  });
});
