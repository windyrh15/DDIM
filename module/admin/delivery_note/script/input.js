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


// Fungsi untuk memfilter input hanya berupa angka ----------------------------------------------------------------------------------------
async function populateSelectPIC() {
  var people = [];
  var nameInput = document.getElementById('pic');
  var phoneInput = document.getElementById('phone');
  var suggestions = document.getElementById('suggestions');

  try {
      const response = await fetch('https://apiddim.booq.id/data/pic', {
          headers: {
              'Authorization': 'Bearer DpacnJf3uEQeM7HN'
          }
      });
      const data = await response.json();
      people = data.data.map(person => ({
          name: person.pic,
          phone: person.pic_phone
      }));
  } catch (error) {
      console.error('Error fetching data:', error);
  }

  nameInput.addEventListener('input', function() {
      var query = nameInput.value.toLowerCase();
      suggestions.innerHTML = '';
      if (query) {
          var filteredPeople = people.filter(function(person) {
              return person.name.toLowerCase().includes(query);
          });
          filteredPeople.forEach(function(person) {
              var div = document.createElement('div');
              div.className = 'suggestion-item';
              div.textContent = person.name + " (" + person.phone + ")";
              div.addEventListener('click', function() {
                  nameInput.value = person.name;
                  phoneInput.value = person.phone;
                  suggestions.innerHTML = '';
              });
              suggestions.appendChild(div);
          });
      }
  });

  document.getElementById('searchForm').addEventListener('submit', function(event) {
      event.preventDefault();
      var selectedName = nameInput.value;
      var phoneNumber = phoneInput.value;
      Swal.fire({
          title: 'Are you sure?',
          text: `Selected or Added Name: ${selectedName}, Phone Number: ${phoneNumber}`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Submit',
          cancelButtonText: 'Cancel'
      }).then((result) => {
          if (result.isConfirmed) {
              var personExists = people.some(function(person) {
                  return person.name === selectedName;
              });
              if (!personExists) {
                  people.push({name: selectedName, phone: phoneNumber});
              }
              Swal.fire('Submitted!', `Name: ${selectedName}, Phone: ${phoneNumber}`, 'success');
              nameInput.value = '';
              phoneInput.value = '';
              suggestions.innerHTML = '';
          }
      });
  });

  document.addEventListener('click', function(event) {
      if (!event.target.closest('#pic') && !event.target.closest('#suggestions')) {
          suggestions.innerHTML = '';
      }
  });
}

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
              await populateSelect(); 
              await new Promise(resolve => setTimeout(resolve, 0)); 
              await populateSelectPIC(); 

              document.getElementById("materialButton").addEventListener("click", tambahMaterial);
          },
          preConfirm: async () => {
              const owner = Swal.getPopup().querySelector("#owner_id").value;
              const user = Swal.getPopup().querySelector("#user_id").value;
              const projectId = Swal.getPopup().querySelector("#project").value;
              const pelangganId = Swal.getPopup().querySelector("#pelanggan_id").value;
              const prefix = Swal.getPopup().querySelector("#prefix").value;
              const tanggal = Swal.getPopup().querySelector("#tanggal").value;
              const formatNo = Swal.getPopup().querySelector("#formatNo").value;
              const pic = Swal.getPopup().querySelector("#pic").value;
              const phone = Swal.getPopup().querySelector("#phone").value;

              if (!validateMaterials()) {
                  Swal.showValidationMessage("At least one material and quantity must be filled out.");
                  return false; 
              }

              const materials = Swal.getPopup().querySelectorAll('input[name="material[]"]');
              const quantities = Swal.getPopup().querySelectorAll('input[name="quantity[]"]');

              const materialDetails = [];
              for (let i = 0; i < materials.length; i++) {
                  if (materials[i].value && quantities[i].value) {
                      materialDetails.push({
                          material: materials[i].value,
                          quantity: quantities[i].value,
                      });
                  }
              }

              if (!projectId) {
                  Swal.showValidationMessage("Project is required");
                  return false;
              }
              if (!tanggal) {
                  Swal.showValidationMessage("Date is required");
                  return false;
              }
              if (!pic) {
                  Swal.showValidationMessage("PIC is required");
                  return false;
              }
              if (!phone) {
                  Swal.showValidationMessage("Phone is required");
                  return false;
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

function validateMaterials() {
  const materials = document.querySelectorAll('input[name="material[]"]');
  const quantities = document.querySelectorAll('input[name="quantity[]"]');
  
  for (let i = 0; i < materials.length; i++) {
      if (!materials[i].value || !quantities[i].value) {
          return false;
      }
  }
  return true;
}