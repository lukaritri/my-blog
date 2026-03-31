const jsonStr = localStorage.getItem("messages");
let messages = jsonStr ? JSON.parse(jsonStr) : [];
const username = localStorage.getItem("username")

window.onload = displayPosts;

function postMessage() {

  // get text input
  const txt = document.getElementById("post").value;

  // do nothing if blank
  if (txt === "") {
    alert("You must write something!");
    return;
  }

  // get timestamp
  const now = new Date();
  const ts = now.toLocaleString();

  // get username
  const displayName = username ? username : "anon";

  // construct message
  const msgFull = ts + " [" + displayName + "] : " + txt;

  // add to list of messages
  messages.push(msgFull);

  // add to localStorage too
  localStorage.setItem("messages", JSON.stringify(messages))

  // clear text input box
  document.getElementById("post").value = "";

  // display the posts
  displayPosts();
}

function displayPosts() {
  const anchor = document.getElementById("anchor");
  
  if (messages.length === 0) {
    const newMsg = document.createElement("li");
    newMsg.setAttribute("id", "nothing");
    const content = document.createTextNode("Nothing to see here...");
    newMsg.appendChild(content);
    anchor.appendChild(newMsg);

  } else {
    // first clear anchor
    anchor.innerHTML = "";

    // display messages
    const msgReverse = messages.toReversed();
    for (const msg of msgReverse) {
      const newMsg = document.createElement("li");
      const content = document.createTextNode(msg);
      newMsg.appendChild(content);
      anchor.appendChild(newMsg);
    }
  }
}

function deletePosts() {

  // if no posts then do nothing
  if (messages.length === 0) {
    return;
  }

  // delete all posts
  if (confirm("Delete all posts?")) {
    if (confirm("Are you sure? This action cannot be undone.")) {
      document.getElementById("anchor").innerHTML = "";
      messages = [];
      localStorage.removeItem("messages");
    }
  }

  // re-display the nothing
  displayPosts();
}
