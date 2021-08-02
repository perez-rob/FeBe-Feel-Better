function mOver(description) {
  let descriptionDiv = document.createElement("div");
  descriptionDiv.innerText = description;
  descriptionDiv.setAttribute("style", "padding:1.3rem");
  document.getElementById("for-mood-description").appendChild(descriptionDiv);
}

function mOut() {
  let divHolder = document.getElementById("for-mood-description");
  divHolder.removeChild(divHolder.lastElementChild);
}
