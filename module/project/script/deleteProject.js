async function deleteProject(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You are about to delete this data!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "No, cancel",
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      console.log(id);
      try {
        const response = await fetch(
          `https://api.katib.id/data/del/inventory/${id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete data");
        }
        displayData(currentPage);
        Swal.fire("Success", "Data deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting data:", error);
        Swal.fire("Error", "Failed to delete data", "error");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Your data is safe :)", "success");
    }
  });
}
