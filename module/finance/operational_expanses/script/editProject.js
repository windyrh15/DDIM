tbodyProject.addEventListener("click", function (event) {
  if (event.target.id === "editProjectButton") {
    const idToEdit = event.target.dataset.id;

    // Ambil data saat ini dari API
    // fetch(`https://api.katib.id/data/inventory/${idToEdit}`, {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // })

    fetch(versionProject)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const projectData = data.dataProject.find(
          (item) => item.project_id === parseInt(idToEdit)
        );

        if (!projectData) {
          throw new Error("Project data not found");
        }

        fetch("module/" + page + "/modal/inputProject.php")
          .then((response) => response.text())
          .then((htmlContent) => {
            Swal.fire({
              title: "Edit Data",
              html: htmlContent,
              showCancelButton: true,
              confirmButtonText: "Save",
              cancelButtonText: "Cancel",
              focusConfirm: false,
              didOpen: async () => {
                document
                  .getElementById("project_name")
                  .addEventListener("input", showProjectSuggestions);
                document.getElementById("project_name").value =
                  projectData.project_name;
                document.getElementById("location").value =
                  projectData.location;
                document.getElementById("vendor").value = projectData.client;
                document.getElementById("execution_date").value =
                  projectData.start_date;
                document.getElementById("finish_date").value =
                  projectData.finish_date;
                document.getElementById("project_name_id").value =
                  projectData.project_name_id;
              },
              preConfirm: async () => {
                const project_name_id =
                  Swal.getPopup().querySelector("#project_name_id").value;
                const location =
                  Swal.getPopup().querySelector("#location").value;
                const project_name =
                  Swal.getPopup().querySelector("#project_name").value;
                const vendor = Swal.getPopup().querySelector("#vendor").value;
                const execution_date =
                  Swal.getPopup().querySelector("#execution_date").value;
                const finish_date =
                  Swal.getPopup().querySelector("#finish_date").value;
                  
                if (!project_name_id || !location || !project_name || !execution_date || !finish_date) {
                    Swal.showValidationMessage("Harap isi semua kolom!");
                    return;
                }

                const dataInputProject = {
                  project_name_id: project_name_id,
                  location: location,
                  project_name: project_name,
                  vendor: vendor,
                  execution_date: execution_date,
                  finish_date: finish_date,
                };

                console.log(dataInputProject);

                return fetch(
                  `https://api.katib.id/data/inventory/${idToEdit}`,
                  {
                    method: "PUT",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataInputSales),
                  }
                )
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Failed to update data");
                    }
                    displayData(currentPage);
                    Swal.fire(
                      "Success",
                      "Data updated successfully!",
                      "success"
                    );
                  })
                  .catch((error) => {
                    console.error("Error updating data:", error);
                    Swal.fire("Error", "Failed to update data", "error");
                  });
              },
            });
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        Swal.fire("Error", "Failed to fetch data", "error");
      });
  }
});
