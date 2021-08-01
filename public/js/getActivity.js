const getActivity = async (event) => {
  const id = event.target.getAttribute("data-id");
  console.log(id);
  const res = await fetch(`api/aum/activityByMood/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  let activity;
  if (res.ok) {
    activity = await res.json();
    console.log("this is", activity);
    console.log("this is", activity[0].activity.title);
    const instance = M.Modal.getInstance(document.getElementById("modal1"));
    instance.close();
  } else {
    console.log("FETCH FAILED");
  }

  const newActivity = document.createElement("div");
  newActivity.innerText = activity[0].activity.title;

  document.getElementById("suggested-activity").appendChild(newActivity);
};

document.querySelectorAll(".moodbtn").forEach((btn) => {
  btn.addEventListener("click", getActivity);
});
