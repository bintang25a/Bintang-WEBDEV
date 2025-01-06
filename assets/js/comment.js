import { getComments, saveComment, deleteCommentById, editCommentById } from "https://bintang-webdev-backend-server.vercel.app/private-backend/api-bridge.js";

const SECRET_KEY = 'katty-momo-owen';  // Replace with your actual secret key

// fungsi untuk menambahkan komentar baru
async function addComment() {
    const nameInput = document.getElementById("name");
    const commentInput = document.getElementById("comment");

    const name = nameInput.value.trim();
    const text = commentInput.value.trim();

    if (!name || !text) {
        alert("Nama dan komentar harus diisi!");
        return;
    }

    const newComment = { name, text };

    // Kirim request dengan Authorization header
    await fetch('https://bintang-webdev-backend-server.vercel.app/private-backend/api-bridge.js', {
        method: 'POST',  // Atur metode request (POST untuk menambahkan data)
        headers: {
            'Authorization': `Bearer ${SECRET_KEY}`,  // Tambahkan header Authorization
            'Content-Type': 'application/json'  // Set content type sebagai JSON
        },
        body: JSON.stringify(newComment)  // Body yang berisi data komentar dalam format JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Gagal menambahkan komentar');
        }
        return response.json();
    })
    .then(() => {
        nameInput.value = "";  // Reset form setelah komentar ditambahkan
        commentInput.value = "";
        displayComments();  // Panggil fungsi untuk menampilkan komentar terbaru
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat menambahkan komentar");
    });
}

// fungsi untuk toggle on/off area komentar
async function htmlCommentStyle() {
    const comments = await getComments();
    const commentSection = document.getElementById('commentSection');
    const commentForm = document.querySelector('.comment-form');
    const textArea = commentForm.querySelector('textarea');
  
    if (comments.length == 0) {
        commentSection.style.display = "none";
        commentForm.style.minWidth = "100%";
        textArea.style.minWidth = "100%";
    }
    else {
        commentSection.style.display = "flex";
        commentForm.style.minWidth = "200px";
        textArea.style.minWidth = "200px";
    }
}

// fungsi untuk menampilkan komentar di halaman
async function displayComments() {
    const commentSection = document.getElementById("commentSection");
    commentSection.innerHTML = "";  // Clear existing comments

    // Fetch komentar dari backend API dengan Authorization header
    const response = await fetch('https://bintang-webdev-backend-server.vercel.app/private-backend/api-bridge.js', {
        method: 'GET',  // Atur metode request untuk mengambil data
        headers: {
            'Authorization': `Bearer ${SECRET_KEY}`  // Tambahkan Authorization header
        }
    });

    if (!response.ok) {
        console.error('Gagal mengambil komentar');
        return;
    }

    const comments = await response.json();  // Ambil data komentar dari response

    comments.forEach((comment) => {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment-display");

        commentDiv.innerHTML = `
            <h3>${comment.name}</h3>
            <p>${comment.text}</p>
            <div class="actions">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;

        // Fungsi klik untuk edit komentar
        const editBtn = commentDiv.querySelector(".edit");
        editBtn.addEventListener("click", () => {
            const newName = prompt("Edit nama:", comment.name);
            const newText = prompt("Edit komentar:", comment.text);

            if (newName !== null && newText !== null) {
                // Kirim request untuk mengedit komentar dengan Authorization header
                fetch(`https://bintang-webdev-backend-server.vercel.app/private-backend/api-bridge.js/${comment.id}`, {
                    method: 'PUT',  // PUT untuk update data
                    headers: {
                        'Authorization': `Bearer ${SECRET_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: newName, text: newText })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Gagal mengedit komentar');
                    }
                    return response.json();
                })
                .then(() => {
                    displayComments();  // Refresh komentar setelah berhasil diedit
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Terjadi kesalahan saat mengedit komentar");
                });
            }
        });

        // Fungsi klik untuk delete komentar
        const deleteBtn = commentDiv.querySelector(".delete");
        deleteBtn.addEventListener("click", () => {
            if (confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
                // Kirim request untuk menghapus komentar dengan Authorization header
                fetch(`/private-backend/api-bridge.js/${comment.id}`, {
                    method: 'DELETE',  // DELETE untuk menghapus data
                    headers: {
                        'Authorization': `Bearer ${SECRET_KEY}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Gagal menghapus komentar');
                    }
                    return response.json();
                })
                .then(() => {
                    displayComments();  // Refresh komentar setelah berhasil dihapus
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Terjadi kesalahan saat menghapus komentar");
                });
            }
        });

        commentSection.appendChild(commentDiv);
    });
}

// Event listener untuk menambah komentar
document.querySelector('.comment-form .tombol').addEventListener('click', function(e) {
    e.preventDefault();
    addComment();  // Panggil fungsi untuk menambah komentar
});

// Menampilkan komentar saat halaman dimuat
window.onload = displayComments;
