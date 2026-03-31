window.onload = (() => {
  const username = localStorage.getItem("username");
  document.getElementById("username").value = username ? username : "anon";
})

function changeUsername() {
  const newName = document.getElementById("username").value;
  localStorage.setItem("username", newName);
  alert("Username changed successfully!");
}

function goBack() {
  // check if user has unsaved changes
  const inputVal = document.getElementById("username").value;
  const nameMatches = inputVal === localStorage.getItem("username");

  // if name does not match but user is happy then go back
  if (!nameMatches) {
    if (confirm("You will lose unsaved changes.")) {
      window.location.href = "./index.html";
    }
  } else {
    window.location.href = "./index.html";
  }
}

function exportPosts() {
  const exported = window.open("");
  const jsonStr = localStorage.getItem("messages");
  const messages = jsonStr ? JSON.parse(jsonStr) : ["null"];

  for (const msg of messages) {
    exported.document.writeln(msg);
    exported.document.writeln("<br>")
  }
}