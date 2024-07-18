async function updateStatus(bgId) {
    try {
        const confirmation = await Swal.fire({
            title: "Apakah anda yakin ingin memperbarui status?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        });

        if (!confirmation.isConfirmed) {
            return;
        }

        const response = await fetch(`${bgData}/${bgId}`, {
            headers: headers
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const bankGrteeData = data.data[0].status_id;

        // Check status
        if (bankGrteeData === 2) {
            await Swal.fire({
                title: "Gagal",
                text: "Data sudah close",
                icon: "error",
            });
        } else {
            const updateResponse = await fetch(`https://apiddim.booq.id/update/status/bank/guarantee/${bgId}`, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify({ status_id: 2 }) // atau data yang diperlukan untuk pembaruan
            });

            if (!updateResponse.ok) {
                throw new Error("Failed to update status");
            }

            const result = await updateResponse.json();

            await Swal.fire({
                title: "Success",
                text: result.message,
                icon: "success",
            });

            location.reload();
        }
    } catch (error) {
        console.error("Error:", error);
        await Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
        });
    }
}
