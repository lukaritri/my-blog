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
  const nameMatches = localStorage.getItem("username");

  if (nameMatches === inputVal || (nameMatches === null && inputVal === "anon")) {
    window.location.href = "./index.html";
  } else {
    if (confirm("You will lose unsaved changes.")) {
      window.location.href = "./index.html";
    }
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