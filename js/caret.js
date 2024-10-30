function getElementById(elementId) {
  return document.getElementById(elementId);
}

var cursorElement;
window.onload = initializeCursor;

function initializeCursor() {
  cursorElement = getElementById("cursor_id");
  cursorElement.style.left = "0px";
}

function replaceNewlinesWithSpaces(text) {
  return text.replace(/\n/g, '');
}

function updateTyperContent(sourceElement, event) {
  event = event || window.event;
  var typerElement = getElementById("typer");
  var sourceText = sourceElement.value;
  if (!isPasswordMode) {
      typerElement.innerHTML = replaceNewlinesWithSpaces(sourceText);
  }
}

function moveCursor(count, event) {
  event = event || window.event;
  var keycode = event.keyCode || event.which;
  if (keycode == 37 && parseInt(cursorElement.style.left) >= (0 - ((count - 1) * 10))) {
      cursorElement.style.left = parseInt(cursorElement.style.left) - 10 + "px";
  } else if (keycode == 39 && (parseInt(cursorElement.style.left) + 10) <= 0) {
      cursorElement.style.left = parseInt(cursorElement.style.left) + 10 + "px";
  }
}

function logMessage(message) {
  console.log(message);
}