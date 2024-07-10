// Props -----------------------------------------------------------------------------------------------------
document.querySelector("#inputButton").addEventListener("click", showInputForm);

// Function Generate -----------------------------------------------------------------------------------------

async function getLastNumber() {
  try {
    const response = await fetch(lastNumberDelivery, {
      method: "GET",
      headers: headersTes,
    });
    const data = await response.json();
    console.log(data);
    const last = data.dataNomor[0].terakhir;
    const lastNumber = (last + 1).toString().padStart(3, "0");
    return lastNumber;
  } catch (error) {
    console.error("Error fetching last number:", error);
    throw error;
  }
}

function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000); // 6 digit number
}

function getRomanMonth(month) {
  const romanMonths = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];
  return romanMonths[month - 1];
}

async function generateFormatNo() {
  try {
    const lastNumber = await getLastNumber();
    const prefix = "DN";
    const randomNumber = generateRandomNumber();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Bulan dimulai dari 0 di JavaScript
    const romanMonth = getRomanMonth(month);

    const formattedCount = String(lastNumber).padStart(3, "0"); // Pad dengan 0 jika kurang dari 3 digit

    return `${formattedCount}.${prefix}/${randomNumber}/${romanMonth}/${year}`;
  } catch (error) {
    console.error("Error generating format number:", error);
    return null;
  }
}

// tambahMaterial --------------------------------------------------------------------------------------------------
function tambahMaterial() {
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

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
</svg>`;

  deleteButton.addEventListener("click", () => {
    container.removeChild(materialFormInput);
  });

  deleteButtonCol.appendChild(deleteButton);

  materialFormInput.appendChild(inputMaterialCol);
  materialFormInput.appendChild(inputQuantityCol);
  materialFormInput.appendChild(deleteButtonCol);

  container.appendChild(materialFormInput);
}

// Cek Material Form ---------------------------------------------------------------------------------------

// Fungsi untuk memastikan setidaknya ada satu input material dan quantity yang terisi
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

// PopulateSelect (selectOption) Dropdown ----------------------------------------------------------------------------
async function populateSelect() {
  const formatNo = await generateFormatNo(); // Generate formatNo
  try {
      const response = await fetch(projectData, {
          method: "GET",
          headers: headers,
      });
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const projects = data.dataProject;

      const select = document.getElementById("project");
      if (!select) {
          throw new Error('Element with ID "project" not found');
      }

      projects.forEach((project) => {
          const option = document.createElement("option");
          option.value = project.project_id;
          option.textContent = project.project_name;
          select.appendChild(option);
      });

      // Initialize Tom Select
      new TomSelect('#project');

      select.addEventListener("change", () => {
          const selectedProject = projects.find(
              (project) => project.project_id == select.value
          );
          if (selectedProject) {
              document.getElementById("pelanggan_id").value = selectedProject.pelanggan_id;
              document.getElementById("deliverTo").value = selectedProject.client;
              document.getElementById("formatNo").value = formatNo;
          } else {
              document.getElementById("pelanggan_id").value = "";
              document.getElementById("deliverTo").value = "";
              document.getElementById("formatNo").value = "";
          }
      });
  } catch (error) {
      console.error("Error loading JSON data:", error);
  }
}

// Panggil fungsi populateSelect saat halaman dimuat
document.addEventListener("DOMContentLoaded", populateSelect);

// Initialize niceScroll (example usage)
$(document).ready(function() {
  $("body").niceScroll({
      cursorcolor: "#424242",
      cursorwidth: "6px",
      background: "#ddd",
      cursorborder: "none",
      cursorborderradius: "5px"
  });
});

// PIC Dropdown---------------------------------------------------------------------------------------------------------

async function populateSelectPIC() {
  try {
      const response = await fetch(picData, {
          method: "GET",
          headers: headersTes,
      });
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const pic = data.data;

      const select = document.getElementById("pic");
      if (!select) {
          throw new Error('Element with ID "pic" not found');
      }

      pic.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.pic;
          option.textContent = item.pic;
          select.appendChild(option);
      });

      // Initialize Tom Select
      new TomSelect('#pic', {
          // create: true, //Jika ingin menginputkan data pic baru
      });

      select.addEventListener("change", () => {
          const selectedPIC = pic.find(
              (item) => item.pic == select.value
          );
          if (selectedPIC) {
              document.getElementById("phone").value = selectedPIC.pic_phone;
          } else {
              document.getElementById("phone").value = "";
          }
      });
  } catch (error) {
      console.error("Error loading JSON data:", error);
  }
}

// Panggil fungsi populateSelectPIC saat halaman dimuat
document.addEventListener("DOMContentLoaded", populateSelectPIC);

// Initialize niceScroll (example usage)
$(document).ready(function() {
  $("body").niceScroll({
      cursorcolor: "#424242",
      cursorwidth: "6px",
      background: "#ddd",
      cursorborder: "none",
      cursorborderradius: "5px"
  });
});


// ShowInputForm -----------------------------------------------------------------------------------------------
async function showInputForm() {
  try {
    const response = await fetch("module/" + page + "/modal/input.php");
    if (!response.ok) throw new Error("Network response was not ok");
    const htmlContent = await response.text();

    Swal.fire({
      title: "Add New Delivery Note",
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      didOpen: async () => {
        await populateSelect(); // Panggil fungsi untuk mengisi select setelah elemen Project dibuat
        await populateSelectPIC(); // Panggil fungsi untuk mengisi select setelah elemen PIC dibuat

        // Tambahkan event listener ke tombol "Add Material"
        document
          .getElementById("materialButton")
          .addEventListener("click", tambahMaterial);
      },
      preConfirm: async () => {
        const owner = Swal.getPopup().querySelector("#owner_id").value;
        const user = Swal.getPopup().querySelector("#user_id").value;
        const projectId = Swal.getPopup().querySelector("#project").value;
        const pelangganId =
          Swal.getPopup().querySelector("#pelanggan_id").value;
        const prefix = Swal.getPopup().querySelector("#prefix").value;
        const tanggal = Swal.getPopup().querySelector("#tanggal").value;
        const formatNo = Swal.getPopup().querySelector("#formatNo").value;
        const pic = Swal.getPopup().querySelector("#pic").value;
        const phone = Swal.getPopup().querySelector("#phone").value;

        // Ini yang jangan di hapus soalnya harusnya ini di pake tapi gua kaga ngarti heheh -------------
        // ------------------------------------------------------------------------------------------------------------------------------------------------
        // if (
        //   !projectId ||
        //   !pelangganId ||
        //   !prefix ||
        //   !tanggal ||
        //   !formatNo ||
        //   !pic ||
        //   !phone
        // ) {
        //   Swal.showValidationMessage("All fields are required!");
        //   return false; // Prevent closing
        // }
        // ------------------------------------------------------------------------------------------------------------------------------------------------

        if (!validateMaterials()) {
          Swal.showValidationMessage(
            "At least one material and quantity must be filled out."
          );
          return false; // Prevent closing
        }

        // const project = document.querySelector(`#project option[value="${projectId}"]`).textContent;

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

        const newData = {
          owner_id: owner,
          user_id: user,
          project_id: projectId,
          pelanggan_id: pelangganId,
          prefix: prefix,
          date: tanggal,
          no_dn: formatNo,
          pic: pic,
          pic_phone: phone,
          material_detail: materialDetails,
        };

        try {
          const res = await fetch(addDeliveryNote, {
            method: "POST",
            headers: headersTes,
            body: JSON.stringify(newData),
          });

          const result = await res.json();
          if (res.ok) {
            Swal.fire({
              title: "Success",
              text: result.message,
              icon: "success",
            }).then(() => {
              location.reload();
            });
          } else {
            Swal.fire("Error", result.error, "error");
          }
        } catch (error) {
          console.error("Error adding data:", error);
          Swal.fire("Error", "Failed to add data", "error");
        }
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
// Panggil fungsi populateSelect saat halaman dimuat
document.addEventListener("DOMContentLoaded", populateSelect);
