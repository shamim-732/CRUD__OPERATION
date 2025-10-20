const userForm = document.getElementById("userForm");
const newUserBtn = document.getElementById("newUser");
const form = document.getElementById("myForm");
const dataBody = document.getElementById("data");
const imgInput = document.getElementById("imgInput");
const previewImg = document.getElementById("previewImg");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");

let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = null;

// Show users
function showUsers() {
  dataBody.innerHTML = "";
  users.forEach((u, i) => {
    dataBody.innerHTML += `
      <tr>
        <td class="py-2 border">${i + 1}</td>
        <td class="py-2 border">
          <img src="${u.picture}" class="w-12 h-12 rounded-full mx-auto"/>
        </td>
        <td class="py-2 border">${u.name}</td>
        <td class="py-2 border">${u.age}</td>
        <td class="py-2 border">${u.city}</td>
        <td class="py-2 border">${u.email}</td>
        <td class="py-2 border">${u.phone}</td>
        <td class="py-2 border">${u.post}</td>
        <td class="py-2 border">${u.date}</td>
        <td class="py-2 border flex justify-center gap-2">
          <button onclick="editUser(${i})" class="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600">UPDAET</button>
          <button onclick="deleteUser(${i})" class="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600">DELETE</button>
        </td>
      </tr>
    `;
  });
}
showUsers();

// Add new user
newUserBtn.addEventListener("click", () => {
  userForm.classList.remove("hidden");
  formTitle.textContent = "Add New User";
  submitBtn.textContent = "Submit";
  editIndex = null;
  previewImg.src = "./image/Profile Icon.webp";
  form.reset();
});

// Image Preview
imgInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.size < 1024 * 1024) {
    const reader = new FileReader();
    reader.onload = () => (previewImg.src = reader.result);
    reader.readAsDataURL(file);
  } else {
    alert("Image too large (max 1MB)");
  }
});

// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = {
    picture: previewImg.src,
    name: form.name.value,
    age: form.age.value,
    city: form.city.value,
    email: form.email.value,
    phone: form.phone.value,
    post: form.post.value,
    date: form.sDate.value,
  };

  if (editIndex !== null) {
    users[editIndex] = user;
  } else {
    users.push(user);
  }

  localStorage.setItem("users", JSON.stringify(users));
  showUsers();
  closeForm();
});

// Edit user
function editUser(i) {
  const u = users[i];
  userForm.classList.remove("hidden");
  formTitle.textContent = "Edit User";
  submitBtn.textContent = "Update";
  editIndex = i;

  previewImg.src = u.picture;
  form.name.value = u.name;
  form.age.value = u.age;
  form.city.value = u.city;
  form.email.value = u.email;
  form.phone.value = u.phone;
  form.post.value = u.post;
  form.sDate.value = u.date;
}

// Delete user
function deleteUser(i) {
  if (confirm("Are you sure?")) {
    users.splice(i, 1);
    localStorage.setItem("users", JSON.stringify(users));
    showUsers();
  }
}

// Close modal
function closeForm() {
  userForm.classList.add("hidden");
}
