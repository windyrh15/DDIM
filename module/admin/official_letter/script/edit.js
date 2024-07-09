tbody.addEventListener("click", function (event) {
  if (event.target.id === "editLetterButton") {
    const urlLetter = letterData;
    const idToEdit = event.target.dataset.id;
    
    // Ambil data saat ini dari API
    fetch(`${urlLetter}/${idToEdit}`, {
        headers: headers
    })

      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
          console.log(data);
          const letterDateFromAPI = data.data[0].date;
          const letterDate = new Date(letterDateFromAPI).toISOString().split('T')[0];
          console.log(letterDate);

        fetch("module/admin/official_letter/modal/edit.php")
          .then((response) => response.text())
          .then((htmlContent) => {
              console.log(data);
            Swal.fire({
              title: "Edit Letter",
              html: htmlContent,
              showCancelButton: true,
              confirmButtonText: "Save",
              cancelButtonText: "Cancel",
              focusConfirm: false,
              didOpen: async () => {
                await fillLetterCodeDropdown(data.data[0].classification);
                document
                  .getElementById("client")
                  .addEventListener("input", showClientSuggestions);
                document.getElementById("tanggal").value = letterDate;
                document.getElementById("no_letter").value =
                  data.data[0].no_letter;
                document.getElementById("subject").value = data.data[0].subject;
                document.getElementById("beneficiary").value = data.data[0].beneficiary;
                document.getElementById("client").value = data.data[0].client;

                const letterCodeIdSelect =
                  document.getElementById("id");
                const selectedOption = letterCodeIdSelect.querySelector(
                  `option[value="${letterCode.id}"]`
                );
                if (selectedOption) {
                  selectedOption.selected = true;
                }
              },
              preConfirm: () => {
                const owner_id =
                  Swal.getPopup().querySelector("#owner_id").value;
                const user_id =
                  Swal.getPopup().querySelector("#user_id").value;
                const prefix =
                  Swal.getPopup().querySelector("#prefix").value;  
                const date =
                  Swal.getPopup().querySelector("#tanggal").value;
                const letter_code_id =
                  Swal.getPopup().querySelector("#id").value;
                const no_letter = Swal.getPopup().querySelector("#no_letter").value;
                const subject =
                  Swal.getPopup().querySelector("#subject").value;
                const beneficiary = Swal.getPopup().querySelector("#beneficiary").value;
                const client =
                  Swal.getPopup().querySelector("#client").value;

                const dataInputLatter = {
                   owner_id: owner_id,
                   user_id: user_id,
                   prefix: prefix,
                   date: date,
                   letter_code_id: letter_code_id,
                   no_letter: no_letter,
                   subject: subject,
                   beneficiary: beneficiary,
                   client: client
                };

                console.log(dataInputLatter);

                return fetch(
                  `${letterUpdate}/${idToEdit}`,
                  {
                    method: "PUT",
                    headers: headers,
                    body: JSON.stringify(dataInputLatter),
                  }
                )
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Failed to update data");
                    }
                     fetchData();
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