// const urlProjectType = dataType;
// const versionProjectType = `${urlProjectType}?v=${customTime}`;
const dropdownNamaProjectType = document.getElementById("project_id");

const urlLastNumber = lastNumberPo;
// const versionLastNumber = `${urlLastNumber}?v=${customTime}`;

async function getProjectType() {
  try {
    const response = await fetch(projectData, {
      method: "GET",
       headers: headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Project Type");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching Project Type:", error);
    throw error;
  }
}

async function fillProjectTypeDropdown(selectedTypeId) {
  var dropdownNamaProjectType = $("#project_id");
  dropdownNamaProjectType.empty();
  dropdownNamaProjectType.append(
    "<option value='' selected disabled>Select The Project</option>"
  );

  try {
    const projectTypeResponse = await getProjectType();
    const projectType = projectTypeResponse.dataProject;

    projectType.forEach(function (item) {
      let option = `<option value='${item.project_id}' data-kode-type='${item.no_project}'>${item.project_name}</option>`;
      if (selectedTypeId && item.project_name === selectedTypeId) {
        option = `<option value='${item.project_id}' data-kode-type='${item.no_project}' selected>${item.project_name}</option>`;
      }
      dropdownNamaProjectType.append(option);
    });
  } catch (error) {
    console.error("Error filling ProjectType dropdown:", error);
  }
}

async function getLastNumber() {
    
  try {
   const response = await fetch(urlLastNumber, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();
    const last = data.dataNomor[0].terakhir;
    const lastNumber = (last + 1).toString().padStart(3, '0');
    return lastNumber;
  } catch (error) {
    console.error("Error fetching last number:", error);
    throw error;
  }
}

async function createUniqueNumber() {
  try {
    const lastNumber = await getLastNumber();
    const prefix = document.getElementById("prefix").value;
    const projectTypeSelect = document.getElementById("project_id");
    const selectedType =
      projectTypeSelect.options[projectTypeSelect.selectedIndex];
    const type_id = selectedType.value;
    const project_number = selectedType.dataset.kodeType;

    if (!project_number) {
      throw new Error("Selected project name not found");
    }

    const currentYear = new Date().getFullYear();
    const currentMonthRoman = romanize(new Date().getMonth() + 1);

    const no_po = `${lastNumber}/${prefix}/${project_number}/${currentMonthRoman}.${currentYear}`;
    document.getElementById("no_po").value = no_po;

    return no_po;
  } catch (error) {
    console.error("Error creating unique number:", error);
    throw error;
  }
}

function romanize(num) {
  if (isNaN(num)) return NaN;
  var digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman = "",
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

function clientKapital(){
document.getElementById("client").addEventListener("input", function() {
    // Mengambil nilai input client
    let clientValue = this.value;
    // Mengubah nilai input menjadi huruf besar
    this.value = clientValue.toUpperCase();
});
}

async function formatCurrency(){
  document.getElementById("currency").addEventListener("input", function() {
    let amountValue = this.value;
    amountValue = amountValue.replace(/,/g, '');
    amountValue = Number(amountValue).toLocaleString();
    this.value = amountValue;
  });
}

async function formatContractAmount(){
  document.getElementById("contract_amount").addEventListener("input", function() {
    let amountValue = this.value;
    amountValue = amountValue.replace(/,/g, '');
    amountValue = Number(amountValue).toLocaleString();
    this.value = amountValue;
  });
}

async function formatContractAmountTax(){
  document.getElementById("contract_amount_tax").addEventListener("input", function() {
    let amountValue = this.value;
    amountValue = amountValue.replace(/,/g, '');
    amountValue = Number(amountValue).toLocaleString();
    this.value = amountValue;
  });
}

function toggleContractAmountTax() {
  const checkbox = document.getElementById("contract_amount_tax_checkbox");
  const container = document.getElementById("contract_amount_tax_container");

  checkbox.addEventListener("change", () => {
    container.style.display = checkbox.checked ? "block" : "none";
  });
}


// Mendengarkan klik pada tombol untuk menambahkan data penjualan
inputSalesButton.addEventListener("click", async function () {
    try {
        const response = await fetch("module/" + page + "/modal/inputPo.php");
        const htmlContent = await response.text();

        Swal.fire({
            title: "Add Purchase Order",
            html: htmlContent,
            showCancelButton: true,
            confirmButtonText: "Add",
            cancelButtonText: "Cancel",
            focusConfirm: false,
            didOpen: async () => {
                await fillProjectTypeDropdown();
                document
                    .getElementById("client")
                    .addEventListener("input", showClientSuggestions);
                clientKapital();
                await formatCurrency();
                await formatContractAmount();
                await formatContractAmountTax();
                toggleContractAmountTax();
                
            },
            preConfirm: async () => {
                // Mendapatkan nilai input dari elemen-elemen form
                const owner_id = Swal.getPopup().querySelector("#owner_id").value;
                const user_id = Swal.getPopup().querySelector("#user_id").value;
                const tanggal = Swal.getPopup().querySelector("#tanggal").value;
                const project_id = Swal.getPopup().querySelector("#project_id").value;
                const prefix = Swal.getPopup().querySelector("#prefix").value;
                const no_po = Swal.getPopup().querySelector("#no_po").value;
                const currency = Swal.getPopup().querySelector("#currency").value;
                const isTaxChecked = document.getElementById("contract_amount_tax_checkbox").checked;
                let contract_amount = Swal.getPopup().querySelector("#contract_amount").value;
                let contract_amount_tax = Swal.getPopup().querySelector("#contract_amount_tax").value;
                const client = Swal.getPopup().querySelector("#client").value;
                const description = Swal.getPopup().querySelector("#description").value;
                
                if (!tanggal || !project_id || !prefix || !no_po || !currency || !client || !contract_amount) {
                        Swal.showValidationMessage("All fields are required!");
                        return;
                    }

                if (isTaxChecked) {
                    if(!contract_amount_tax) {
                        Swal.showValidationMessage("Please fill in 'Contract Amount + PPN'!");
                        return;
                       }
                    }

                // if (!isTaxChecked && ) {
                //         Swal.showValidationMessage("Please fill in 'Contract Amount'!");
                //         return;
                //     }

                    // Hapus koma dari nilai input
                    contract_currency = currency.replace(/,/g, '');
                    contract_amount = contract_amount.replace(/,/g, '');
                    contract_amount_tax = contract_amount_tax.replace(/,/g, '');

                try {
                    const dataInputProject = {
                    owner_id: owner_id,
                    user_id: user_id,
                    project_id: project_id,
                    date: tanggal,
                    vendor: client,
                    prefix: prefix,
                    no_po: no_po,
                    currency: currency,
                    contract_amount: contract_amount,
                    contract_amount_tax: contract_amount_tax ? contract_amount_tax : 0,
                    description: description,
                    };

                console.log(dataInputProject);

                const response = await fetch(purchaseOrder, {
                method: "POST",
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
        console.error("Error:", error);
        // Lakukan penanganan kesalahan
    }
});