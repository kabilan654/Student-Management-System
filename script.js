// Redirect to login if not logged in
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

// Add logout functionality (optional)
const logoutBtn = document.createElement('button');
logoutBtn.textContent = 'Logout';
logoutBtn.style.float = 'right';
logoutBtn.style.marginBottom = '10px';
logoutBtn.onclick = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
};
document.querySelector('.container').prepend(logoutBtn);

let students = JSON.parse(localStorage.getItem('students')) || [];

const studentTable = document.querySelector('#student-table tbody');
const submitBtn = document.getElementById('submit-btn');
const searchInput = document.getElementById('search');

// Render students in table
function renderStudents(data) {
    studentTable.innerHTML = '';
    data.forEach((student, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>${student.email}</td>
            <td class="actions">
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        studentTable.appendChild(row);
    });
}

// Add or update student
submitBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const course = document.getElementById('course').value.trim();
    const email = document.getElementById('email').value.trim();
    const id = document.getElementById('student-id').value;

    if (!name || !age || !course || !email) return alert('Please fill all fields');

    const studentData = { name, age, course, email };

    if (id) {
        students[id] = studentData; // Update existing
        submitBtn.textContent = 'Add Student';
    } else {
        students.push(studentData); // Add new
    }

    localStorage.setItem('students', JSON.stringify(students));
    renderStudents(students);
    clearForm();
});

// Edit student
function editStudent(index) {
    const student = students[index];
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('course').value = student.course;
    document.getElementById('email').value = student.email;
    document.getElementById('student-id').value = index;
    submitBtn.textContent = 'Update Student';
}

// Delete student
function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents(students);
    }
}

// Clear form
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('course').value = '';
    document.getElementById('email').value = '';
    document.getElementById('student-id').value = '';
}

// Search students
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = students.filter(
        s => s.name.toLowerCase().includes(term) || s.course.toLowerCase().includes(term)
    );
    renderStudents(filtered);
});

// Initial render
renderStudents(students);