function showDocument(letterId) {
    tableContainer.style.display = 'none';
    documentDetailsContainer.style.display = 'block';
    searchAddContainer.style.display = 'none';
    console.log(letterId)
    currentLetterId = letterId;

    const addFolderBtn = document.getElementById("addFolderBtn");
      if (addFolderBtn) {
      addFolderBtn.addEventListener('click', function() {
          addFolder(currentLetterId);
      });
      }

    // Fetch untuk format nomor dokumen
    fetch(`${letterData}/${letterId}`, {
      headers: headers
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.data.length === 0) {
        formatNum.innerHTML = `Data tidak ditemukan`;
      } else {
        formatNum.innerHTML = `Document : ${responseData.data[0].no_letter}`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      formatNum.innerHTML = `Error fetching data`;
    });

    // Fetch untuk folder dan file dari dokumen
    fetch(`${letterGetDoc}/${letterId}`, {
      headers: headers
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.data.length === 0) {
        folderList.innerHTML = `<h6>No folders or files available</h6>`;
      } else {
        // Clear the existing folder list
        folderList.innerHTML = '';
        const folders = {};
        responseData.data.forEach(item => {
          if (item.doc_type === 'folder') {
            if (!folders[item.folder_id]) {
              folders[item.folder_id] = {
                name: item.doc_name,
                files: []
              };
            }
          } else if (item.doc_type === 'files') {
            if (folders[item.folder_id]) {
              folders[item.folder_id].files.push(item);
            }
          }
        });
        
        // Mengubah folders menjadi array dan menggunakan map
    Object.entries(folders).map(([folderId, folder]) => {
      const folderItem = document.createElement('li');
      folderItem.classList.add('list-group-item');
      folderItem.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
              <span>${folder.name}</span>
              <div class="btn-group">
                  <button class="btn btn-outline-secondary btn-sm" onclick="addFiles('${letterId}', '${folderId}')"><i class="fas fa-file-medical"></i></button>
                  <button class="btn btn-outline-secondary btn-sm" onclick="toggleFiles('${folderId}')"><i class="fas fa-folder"></i></button>
                  <button class="btn btn-outline-secondary btn-sm" onclick="updateFolder('${letterId}', '${folderId}')"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-outline-secondary btn-sm" onclick="deleteFolder('${letterId}', '${folderId}')"><i class="fas fa-trash"></i></button>
              </div>
          </div>
          <ul class="list-group mt-2 d-none" id="folder-${folderId}">
              ${folder.files.map(file => `
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                      ${file.doc_name}
                      <div class="btn-group">
                          <button class="btn btn-outline-secondary btn-sm"><i class="fas fa-download"></i></button>
                          <button class="btn btn-outline-secondary btn-sm" onclick="deleteFile('${file.doc_id}')"><i class="fas fa-trash"></i></button>
                      </div>
                  </li>
              `).join('')}
          </ul>
      `;
      folderList.appendChild(folderItem);
    });
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      folderList.innerHTML = `<h6>Problems with the API</h6>`;
    });
  }

  // Folders --------------------------------------------------------------------------------------------------------------------
  // AddFolder -----------------------------------
  async function addFolder(letterId) {
    try {
      const htmlResponse = await fetch("module/" + page + "/modal/official_latter/addFolOffLatter.php");
      if (!htmlResponse.ok) throw new Error("Failed to load modal content");
  
      const htmlContent = await htmlResponse.text();
  
      Swal.fire({
        title: "Add Folder Official Latter",
        html: htmlContent,
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        focusConfirm: false,
      
        preConfirm: async () => {
          const folderName = Swal.getPopup().querySelector("#folderName").value;
  
          if (!folderName) {
            Swal.showValidationMessage("Folder name is required");
            return;
          }
  
          const addData = {
            latter_id: letterId,
            doc_name: folderName,
          };
  
          try {
            const Response = await fetch(letterAddFolder, {
              method: "POST",
              headers: headers,
              body: JSON.stringify(addData),
            });
  
            if (!Response.ok) {
              const errorText = await Response.text();
              throw new Error(`Failed to add folder: ${errorText}`);
            }
  
            Swal.fire({
              title: "Success",
              text: "Folder successfully Added!",
              icon: "success",
            }).then(() => {
              location.reload();
            });
          } catch (error) {
            console.error("Error add folder:", error);
            Swal.fire("Error", "Failed to update data", "error");
          }
        },
      });
    } catch (error) {
      console.error("Error loading modal content:", error);
      Swal.fire("Error", "Failed to load modal content", "error");
    }
  }
  
    // UpdateFolder ----------------------------------------------
    async function updateFolder(letterId, folderId) {
        try {
          const projectResponse = await fetch(`${letterGetDoc}/${letterId}`, {
              headers: headers
          });
          const projectResponseData = await projectResponse.json();

          // Memetakan data dan mencetak setiap objek
          const docData = projectResponseData.data.map(dData => ({
              letterIdData: dData.letter_id,
              folderIdData: dData.folder_id,
              folderName: dData.doc_name
          }));

          // Mencari folder_id yang sesuai dengan parameter folderId
          const matchedFolder = docData.find(dData => dData.folderIdData == folderId);

          console.log(matchedFolder)

          if (!matchedFolder) {
              console.log('Folder not found');
              return;
          }

          const htmlResponse = await fetch("module/" + page + "/modal/official_latter/updateFolOffLatter.php");
          const htmlContent = await htmlResponse.text();

          Swal.fire({
              title: "Update Folder Official Latter",
              html: htmlContent,
              showCancelButton: true,
              confirmButtonText: "Save",
              cancelButtonText: "Cancel",
              focusConfirm: false,

              didOpen: async () => {
                document.querySelector('#folderNameUpdate').value = matchedFolder.folderName;
              },

              preConfirm: async () => {
                const doc_name = Swal.getPopup().querySelector("#folderNameUpdate").value;

                  const addData = {
                      doc_name: doc_name,
                  };

                  try {
                      const response = await fetch(`${letterUpdateFolder}/${letterId}`, {
                          method: "PUT",
                          headers:headers,
                          body: addData,
                      });

                      if (!response.ok) {
                          throw new Error("Failed to update folder");
                      }

                      Swal.fire({
                          title: "Success",
                          text: "Folder successfully Updated!",
                          icon: "success",
                      }).then(() => {
                          location.reload();
                      });
                  } catch (error) {
                      console.error("Error update folder:", error);
                      Swal.fire("Error", "Failed to update folder", "error");
                  }
              },
          });
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    }

    // Soon ...
    // DeleteFolder ------------------------------------------------------
    async function deleteFolder(letterId, folderId) {

    }


    // Files -----------------------------------------------------------------------------------------------------------------
    // AddFiles ----------------------------------------------
    async function addFiles(letterId, folderId) {
      try {
          const projectResponse = await fetch(`${letterGetDoc}/${letterId}`, {
              headers: headers
          });
          const projectResponseData = await projectResponse.json();
  
          // Memetakan data dan mencetak setiap objek
          const docData = projectResponseData.data.map(dData => ({
              letterIdData: dData.letter_id,
              folderIdData: dData.folder_id
          }));
  
          // Mencari folder_id yang sesuai dengan parameter folderId
          const matchedFolder = docData.find(dData => dData.folderIdData == folderId);
  
          if (!matchedFolder) {
              console.log('Folder not found');
              return;
          }
  
          const htmlResponse = await fetch("module/" + page + "/modal/official_latter/addFileOffLatter.php");
          const htmlContent = await htmlResponse.text();
  
          Swal.fire({
              title: "Add File Official Latter",
              html: htmlContent,
              showCancelButton: true,
              confirmButtonText: "Save",
              cancelButtonText: "Cancel",
              focusConfirm: false,
  
              preConfirm: async () => {
                  const fileInputOL = Swal.getPopup().querySelector("#fileInputOL");
                  const file = fileInputOL.files[0];
  
                  if (!file || file.type !== "application/pdf") {
                      Swal.showValidationMessage("Please upload a PDF file");
                      return;
                  }
  
                  const addData = {
                      latter_id: matchedFolder.letterIdData,
                      folder_id: matchedFolder.folderIdData,
                  };
  
                  // Menggunakan FormData untuk menambahkan file dan data lainnya
                  const formData = new FormData();
                  formData.append("latter_id", addData.latter_id);
                  formData.append("folder_id", addData.folder_id);
                  formData.append("file", file);
  
                  try {
                      const response = await fetch(letterAddFile, {
                          method: "POST",
                          headers:headers,
                          body: formData,
                      });
  
                      if (!response.ok) {
                          throw new Error("Failed to add folder");
                      }
  
                      Swal.fire({
                          title: "Success",
                          text: "Folder successfully Added!",
                          icon: "success",
                      }).then(() => {
                          location.reload();
                      });
                  } catch (error) {
                      console.error("Error add folder:", error);
                      Swal.fire("Error", "Failed to update data", "error");
                  }
              },
          });
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
    
    if (addLetterFolder) {
      addFolderBtn.addEventListener('click', function() {
        addFolder(currentLetterId);
      });
    }


    // Delete Letter File --------------------
    // Soon ...
    async function deleteLetterFile() {

    }