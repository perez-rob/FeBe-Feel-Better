const handleUpdate = async (state) => {
  console.log("TESTING");
  const currentUser = document
    .getElementById("dash-container")
    .getAttribute("data-user");
  const storedAum = JSON.parse(
    localStorage.getItem(`my_activity-${currentUser}`)
  );

  const res = await fetch(`api/aum/${storedAum.id}`, {
    method: "PUT",
    body: JSON.stringify({
      result: state,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    document.getElementById("mood-button").classList.add("modal-trigger");
    document.getElementById("mood-button").innerHTML =
      '<i class="material-icons right">cloud</i>Moods';
    localStorage.removeItem(`my_activity-${currentUser}`);
    document.getElementById("suggested-activity-div").innerHTML = "";
    document.location.reload();
  } else {
    console.log("ERROR UPDATING");
  }
};

// if (document.getElementById("good-btn")) {
document
  .getElementById("good-btn")
  .addEventListener("click", () => handleUpdate(true));
document
  .getElementById("bad-btn")
  .addEventListener("click", () => handleUpdate(false));
// }
