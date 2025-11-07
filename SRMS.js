let students = JSON.parse(localStorage.getItem("students")) || [];
showStudents();

function addStudent() {
  let name = document.getElementById("name").value;
  let Registration = document.getElementById("Registration").value;
  let marks = document.getElementById("marks").value;

  if (name == "" || Registration == "" || marks == "") {
    alert("Please fill all fields!");
    return;
  }

  students.push({ name: name, Registration: Registration, marks: marks });

  localStorage.setItem("students", JSON.stringify(students));

  document.getElementById("name").value = "";
  document.getElementById("Registration").value = "";
  document.getElementById("marks").value = "";

  showStudents();
}

function showStudents(list = students) {
  let area = document.getElementById("studentList");
  area.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    let box = document.createElement("div");
    box.className = "record";
    box.innerHTML =
      "Name: " + list[i].name +
      " | Reg..No: " + list[i].Registration +
      " | Marks: " + list[i].marks +
      " <button onclick='editStudent(" + i + ")'>Edit</button>" +
      " <button onclick='deleteStudent(" + i + ")'>Delete</button>";
    area.appendChild(box);
  }
}

function editStudent(index) {
  let newName = prompt("Enter new name:", students[index].name);
  let newRegistrationNo = prompt("Enter new registration:", students[index].registration);
  let newMarks = prompt("Enter new marks:", students[index].marks);

  if (newName && newRegistrationNo && newMarks) {
    students[index].name = newName;
    students[index].Registration = newRegistrationNo;
    students[index].marks = newMarks;
    localStorage.setItem("students", JSON.stringify(students));
    showStudents();
  }
}

function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  showStudents();
}

function searchStudent() {
  let text = document.getElementById("search").value.toLowerCase();
  let result = [];

  for (let i = 0; i < students.length; i++) {
    if (
      students[i].name.toLowerCase().includes(text) ||
      students[i].Registration.toLowerCase().includes(text)
    ) {
      result.push(students[i]);
    }
  }

  showStudents(result);
}

function clearAll() {
  if (confirm("Are you sure you want to delete all records?")) {
    students = [];
    localStorage.removeItem("students");
    showStudents();
  }
}