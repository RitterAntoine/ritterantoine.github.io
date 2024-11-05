let beforeElement = document.getElementById("before");
const linerElement = document.getElementById("liner");
const commandElement = document.getElementById("typer"); 
const textareaElement = document.getElementById("texter"); 
const terminalElement = document.getElementById("terminal");

var commandIndex = 0;
var isPasswordMode = false;
let isPwdMode = false;
var commandHistory = [];

setTimeout(function() {
  loopLines(banner, "", 80);
  textareaElement.focus();
}, 100);

window.addEventListener("keyup", handleKeyUp);

console.log(
  "%cWelcome to the terminal!",
  "color: Purple; font-weight: bold; font-size: 24px;"
);

//Initialise the terminal
textareaElement.value = "";
commandElement.innerHTML = textareaElement.value;

function handleKeyUp(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  } else if (e.keyCode == 13) {
    commandHistory.push(commandElement.innerHTML);
    commandIndex = commandHistory.length;
    addLine("visitor@lumine.com:~$ " + commandElement.innerHTML, "no-animation", 0);
    executeCommand(commandElement.innerHTML.toLowerCase());
    commandElement.innerHTML = "";
    textareaElement.value = "";
  }

  if (e.keyCode == 38 && commandIndex != 0) {
    commandIndex -= 1;
    textareaElement.value = commandHistory[commandIndex];
    commandElement.innerHTML = textareaElement.value;
  }

  if (e.keyCode == 40 && commandIndex != commandHistory.length) {
    commandIndex += 1;
    if (commandHistory[commandIndex] === undefined) {
      textareaElement.value = "";
    } else {
      textareaElement.value = commandHistory[commandIndex];
    }
    commandElement.innerHTML = textareaElement.value;
  }
}

function executeCommand(cmd) {
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "whois":
      loopLines(whois, "color2 margin", 80);
      break;
    case "video":
      addLine("Opening YouTube...", "color2", 80);
      openNewTab(youtube);
      break;
    case "sudo":
      addLine("Oh no, you're not admin...", "color2", 80);
      setTimeout(function() {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      }, 1000); 
      break;
    case "social":
      loopLines(social, "color2 margin", 80);
      break;
    case "projects":
      loopLines(projects, "color2 margin", 80);
      break;
    case "history":
      addLine("<br>", "", 0);
      loopLines(commandHistory, "color2", 80);
      addLine("<br>", "command", 80 * commandHistory.length + 50);
      break;
    case "email":
      addLine('Opening mailto:<a href="mailto:antoine.ritter@viacesi.fr">antoine.ritter@viacesi.fr</a>...', "color2", 80);
      openNewTab(email);
      break;
    case "clear":
      setTimeout(function() {
        terminalElement.innerHTML = '<a id="before"></a>';
        beforeElement = document.getElementById("before");
      }, 1);
      break;
    case "banner":
      loopLines(banner, "", 80);
      break;
    // socials
    case "github":
      addLine("Opening GitHub...", "color2", 0);
      openNewTab(github);
      break;
    // exit
    case "exit":
      closeTab();
      break;
    default:
      addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
      break;
  }
}

function openNewTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function closeTab() {
  addLine("Closing tab...", "color2", 0);
  setTimeout(function() {
    window.close();
  }, 1000);
}

function addLine(text, style, time) {
  var formattedText = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      formattedText += "&nbsp;&nbsp;";
      i++;
    } else {
      formattedText += text.charAt(i);
    }
  }
  setTimeout(function() {
    var nextElement = document.createElement("p");
    nextElement.innerHTML = formattedText;
    nextElement.className = style;

    beforeElement.parentNode.insertBefore(nextElement, beforeElement);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}