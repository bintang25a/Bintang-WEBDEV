import { getComments, saveComment, deleteCommentById, editCommentById } from "https://bintang-webdev-backend-server.vercel.app/mili-milo";

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
    commentSection.innerHTML = "";

    const comments = await getComments();
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

        // fungsi klik untuk edit komentar
        const editBtn = commentDiv.querySelector(".comment-display .edit");
        editBtn.addEventListener("click", () => {
            const newName = prompt("Edit nama:", comment.name);
            const newText = prompt("Edit komentar:", comment.text);

            if (newName !== null && newText !== null) {
                editCommentById(comment.id, { name: newName, text: newText }).then(() => {
                    displayComments();
                });
            }
        });

        // fungsi klik untuk delete komentar
        const deleteBtn = commentDiv.querySelector(".comment-display .delete");
        deleteBtn.addEventListener("click", () => {
            if (confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
                deleteCommentById(comment.id).then(() => {
                    displayComments();
                });
            }
        });

        commentSection.appendChild(commentDiv);
    });

    htmlCommentStyle();
}

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

    await saveComment(newComment);
    nameInput.value = "";
    commentInput.value = "";
    displayComments();
}

// fungsi untuk mengedit komentar
async function editComment(commentId) {
    const comments = await getComments();
    const comment = comments.find((c) => c.id === commentId);

    const newName = prompt("Edit nama:", comment.name);
    const newText = prompt("Edit komentar:", comment.text);

    if (newName !== null && newText !== null) {
        await set(ref(db, `comments/${commentId}`), { name: newName, text: newText });
        displayComments();
    }
}

// fungsi klik untuk uplaod komentar
document.querySelector('.comment-form .tombol').addEventListener('click', function(e) {
    e.preventDefault();
    addComment();
});

// fungsi touch untuk mengecek apakah elemen sudah discroll penuh
const commentSectionScroll = document.getElementById('commentSection');
commentSectionScroll.addEventListener('touchstart', (e) => {
    const { scrollTop, scrollHeight, clientHeight} = commentSectionScroll;

    if (scrollTop === 0) {
         commentSectionScroll.scrollTop = 1;
    }
    else if (scrollTop + clientHeight === scrollHeight) {
        commentSectionScroll.scrollTop -= 1;
    }
});

// fungsi touch untuk mencegah scroll pada halaman utama
commentSectionScroll.addEventListener('touchmove', (e) => {
    if (commentSectionScroll.scrollHeight > commentSectionScroll.clientHeight) {
        e.stopPropagation();
    }
}, {passive: false});

// menampilkan komentar saat halaman dimuat
window.onload = displayComments;
