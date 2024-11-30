const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const addButton = document.getElementById("addButton");
const userList = document.getElementById("userList");
const noData = document.getElementById("noData");

let users = JSON.parse(localStorage.getItem("users")) || [];

// تحديث واجهة المستخدم
function renderUsers() {
  userList.innerHTML = "";
  if (users.length === 0) {
    noData.style.display = "block";
  } else {
    noData.style.display = "none";
    users.forEach((user, index) => {
      const li = document.createElement("li");
      li.classList.add("user");
      li.innerHTML = `
        <span>${user.name}</span>
        <span>${user.email}</span>
        <button onclick="editUser(${index})">تعديل</button>
        <button onclick="deleteUser(${index})">حذف</button>
      `;
      userList.appendChild(li);
    });
  }
}

// إضافة مستخدم جديد
addButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (name === "" || email === "") {
    alert("الاسم والإيميل مطلوبان!");
    return;
  }

  if (addButton.textContent === "تعديل") {
    const index = addButton.getAttribute("data-index");
    users[index] = { name, email };
    addButton.textContent = "إضافة";
    addButton.removeAttribute("data-index");
  } else {
    users.push({ name, email });
  }

  localStorage.setItem("users", JSON.stringify(users));
  nameInput.value = "";
  emailInput.value = "";
  renderUsers();
});

// تعديل مستخدم
function editUser(index) {
  nameInput.value = users[index].name;
  emailInput.value = users[index].email;
  addButton.textContent = "تعديل";
  addButton.setAttribute("data-index", index);
}

// حذف مستخدم
function deleteUser(index) {
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  renderUsers();
}

// تحميل البيانات عند فتح الصفحة
renderUsers();
