// Fungsi untuk mengambil komentar dari localStorage
function getComments() {
    const comments = localStorage.getItem('comments');
    return comments ? JSON.parse(comments) : [];
}

// Fungsi untuk menyimpan komentar ke localStorage
function saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function htmlCommentStyle() {
    const comments = getComments();
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

// Fungsi untuk menampilkan komentar di halaman
function displayComments() {
    const commentSection = document.getElementById('commentSection');
    commentSection.innerHTML = '';

    const comments = getComments();

    comments.forEach((comment, index) => {
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment-display');

      commentDiv.innerHTML = `
        <h3>${comment.name}</h3>
        <p>${comment.text}</p>
        <div class="actions">
          <button onclick="editComment(${index})"><i class="fas fa-edit"></i></button>
          <button onclick="deleteComment(${index})"><i class="fas fa-trash-alt"></i></button>
        </div>
      `;

      htmlCommentStyle()
      commentSection.appendChild(commentDiv);
    });
}

// Fungsi untuk menambahkan komentar baru
function addComment() {
    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');

    const name = nameInput.value.trim();
    const text = commentInput.value.trim();

    if (!name || !text) {
        alert('Nama dan komentar harus diisi!');
        return;
    }

    const comments = getComments();
    comments.push({ name, text });
    saveComments(comments);

    nameInput.value = '';
    commentInput.value = '';

    displayComments();
}

// Fungsi untuk mengedit komentar
function editComment(index) {
    const comments = getComments();
    const comment = comments[index];

    const newName = prompt('Edit nama:', comment.name);
    const newText = prompt('Edit komentar:', comment.text);

    if (newName !== null && newText !== null) {
      comments[index] = { name: newName, text: newText };
      saveComments(comments);
      displayComments();
    }
}

// Fungsi untuk menghapus komentar
function deleteComment(index) {
    const comments = getComments();
    comments.splice(index, 1);
    saveComments(comments);
    displayComments();
    htmlCommentStyle()
}

  // Tampilkan komentar saat halaman dimuat
window.onload = displayComments;
htmlCommentStyle();