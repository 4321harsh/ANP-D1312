// Run only after the HTML page is loaded
window.addEventListener("DOMContentLoaded", () => {
    // Get user info
    const userDisplay = document.getElementById("userName");
    const username = localStorage.getItem("loggedInUser");
  
    // Redirect to login page if not logged in
    if (!username) {
      window.location.href = "index.htm";
      return;
    }
  
    // Display username
    userDisplay.textContent = username;
  
    // Expense input fields
    const expenseName = document.getElementById("expenseName");
    const expenseAmount = document.getElementById("expenseAmount");
    const expenseDate = document.getElementById("expenseDate");
    const addExpenseBtn = document.getElementById("addExpenseBtn");
    const expenseBody = document.getElementById("expenseBody");
  
    // Load existing expenses for this user
    let expenses = JSON.parse(localStorage.getItem(username + "_expenses")) || [];
  
    // Function to render expenses in the table
    function renderExpenses() {
      expenseBody.innerHTML = "";
  
      expenses.forEach((exp, index) => {
        const row = document.createElement("tr");
  
        row.innerHTML = `
          <td>${exp.name}</td>
          <td>₹${exp.amount}</td>
          <td>${exp.date}</td>
          <td>
            <button class="editBtn" data-index="${index}">Edit</button>
            <button class="deleteBtn" data-index="${index}">Delete</button>
          </td>
        `;
        expenseBody.appendChild(row);
      });
  
      // Save to localStorage
      localStorage.setItem(username + "_expenses", JSON.stringify(expenses));
    }
  
    // Add expense
    addExpenseBtn.addEventListener("click", () => {
      const name = expenseName.value.trim();
      const amount = expenseAmount.value.trim();
      const date = expenseDate.value;
  
      if (name === "" || amount === "" || date === "") {
        alert("Please fill in all fields!");
        return;
      }
  
      expenses.push({ name, amount, date });
      renderExpenses();
  
      // Clear inputs
      expenseName.value = "";
      expenseAmount.value = "";
      expenseDate.value = "";
    });
  
    // Handle edit/delete actions
    expenseBody.addEventListener("click", (e) => {
      if (e.target.classList.contains("deleteBtn")) {
        const index = e.target.dataset.index;
        expenses.splice(index, 1);
        renderExpenses();
      } else if (e.target.classList.contains("editBtn")) {
        const index = e.target.dataset.index;
        const exp = expenses[index];
        expenseName.value = exp.name;
        expenseAmount.value = exp.amount;
        expenseDate.value = exp.date;
  
        // Update button label
        addExpenseBtn.textContent = "Update Expense";
        addExpenseBtn.onclick = () => {
          expenses[index] = {
            name: expenseName.value.trim(),
            amount: expenseAmount.value.trim(),
            date: expenseDate.value
          };
          renderExpenses();
          addExpenseBtn.textContent = "Add Expense";
          addExpenseBtn.onclick = null;
          addExpenseBtn.addEventListener("click", addExpense);
          expenseName.value = "";
          expenseAmount.value = "";
          expenseDate.value = "";
        };
      }
    });
  
    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.htm";
    });
  
    // Initial render
    renderExpenses();
  });  