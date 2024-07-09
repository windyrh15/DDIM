async function nameProject() {
  try {
    const response = await fetch(salesData, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();

    console.log(data)

    const selectProject = Swal.getPopup().querySelector("#project_name");
    selectProject.innerHTML = '';

    data.dataSales.forEach(sales => {
      const option = document.createElement('option');
      option.value = sales.pesanan_id;
      option.textContent = sales.project_name;
      selectProject.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
}

async function projectPic() {
  try {
    const response = await fetch(dataPm, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();

    const selectPic = Swal.getPopup().querySelector("#pic");
    selectPic.innerHTML = '';

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

async function fetchTotalOrder(pesanan_id) {
  try {
    const response = await fetch(`${salesData}/${pesanan_id}`, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();
    console.log(data);
    const totalOrder = data.data[0].total_order;

    // Mengisi nilai contract_amount dengan total_order yang diperoleh
    const contractAmountInput = Swal.getPopup().querySelector("#contract_amount");
    contractAmountInput.value = totalOrder.toLocaleString();
  } catch (error) {
    console.error("Error fetching total order:", error);
  }
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

inputProjectButton.addEventListener("click", async function () {
  try {
    const response = await fetch("module/" + page + "/modal/inputProject.php");
    const htmlContent = await response.text();

    Swal.fire({
      title: "Add Project",
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      didOpen: async () => {
        await nameProject();
        await projectPic();
        await formatContractAmount();
        await formatContractAmountTax();
        toggleContractAmountTax();
        
        // Event listener harus ditambahkan di sini setelah elemen dimuat
        const projectNameSelect = Swal.getPopup().querySelector("#project_name");
        projectNameSelect.addEventListener("change", function() {
          const selectedProjectId = this.value;
          fetchTotalOrder(selectedProjectId);
        });
        
      },
      preConfirm: async () => {
        const pesanan_id = Swal.getPopup().querySelector("#project_name").value;
        const project_manager_id = Swal.getPopup().querySelector("#pic").value;
        let contract_amount = Swal.getPopup().querySelector("#contract_amount").value;
        let contract_amount_tax = Swal.getPopup().querySelector("#contract_amount_tax").value;
        const contract_date = Swal.getPopup().querySelector("#contract_date").value;
        const finish_date = Swal.getPopup().querySelector("#finish_date").value;
        const isTaxChecked = document.getElementById("contract_amount_tax_checkbox").checked;

        if (!pesanan_id || !project_manager_id || !contract_date || !finish_date) {
          Swal.showValidationMessage("Harap isi semua kolom!");
          return;
        }

        if (isTaxChecked && !contract_amount_tax) {
          Swal.showValidationMessage("Harap isi 'Contract Amount + PPN'!");
          return;
        }

        if (!isTaxChecked && !contract_amount) {
          Swal.showValidationMessage("Harap isi 'Contract Amount'!");
          return;
        }
        contract_amount: isTaxChecked ? contract_amount_tax : contract_amount,

        // Hapus koma dari nilai input
        contract_amount = contract_amount.replace(/,/g, '');
        contract_amount_tax = contract_amount_tax.replace(/,/g, '');

        try {
          const dataInputProject = {
  pesanan_id: pesanan_id,
  project_manager_id: project_manager_id,
  contract_amount: contract_amount,
  contract_amount_tax: contract_amount_tax ? contract_amount_tax : 0,
  start_date: contract_date,
  finish_date: finish_date,
};



          console.log(dataInputProject);

          const response = await fetch(projectData, {
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
    console.error("Error fetching HTML content:", error);
  }
});
