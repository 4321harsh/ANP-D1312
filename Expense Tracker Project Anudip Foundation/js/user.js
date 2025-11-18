function loginUser() {
    const username = document.getElementById("username").value.trim();
    if (username === "") {
      alert("Please enter your username.");
      return;
    }
    localStorage.setItem("username", username);
    window.location.href = "dashboard.htm";
  }
  
  function logout() {
    localStorage.removeItem("username");
    window.location.href = "index.htm";
  }