const userId = document
  .getElementById("dash-container")
  .getAttribute("data-user");

const getActivity = async (event) => {
  console.log("MAIN");
  const id = event.target.getAttribute("data-id");
  // console.log(id);
  const res = await fetch(`api/aum/activityByMood/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  let activity;
  let randNumLen;
  if (res.ok) {
    activity = await res.json();
    randNumLen = Math.floor(Math.random() * activity.length);
    console.log(randNumLen);
    console.log("this is", activity);
    console.log("this is", activity[randNumLen].activity.title);
    const instance = M.Modal.getInstance(document.getElementById("modal1"));
    instance.close();
  } else {
    console.log("FETCH FAILED");
  }

  const newActivity = document.createElement("div");
  newActivity.innerText = activity[randNumLen].activity.title;

  document.getElementById("suggested-activity").appendChild(newActivity);
};

const getActivityRand = async (event) => {
  console.log("RANDOM");
  const id = event.target.getAttribute("data-id");
  // console.log(id);
  const res = await fetch(`api/aum/activityExUser/${id}/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  let activity;
  let randNumLen;
  if (res.ok) {
    activity = await res.json();
    randNumLen = Math.floor(Math.random() * activity.length);
    console.log(randNumLen);
    console.log("RANDOM", activity);
    console.log("RANDOM", activity[randNumLen].activity.title);
    const instance = M.Modal.getInstance(document.getElementById("modal1"));
    instance.close();
  } else {
    console.log("FETCH FAILED");
  }

  const newActivity = document.createElement("div");
  newActivity.innerText = activity[randNumLen].activity.title;

  document.getElementById("suggested-activity").appendChild(newActivity);
};

const shuffleFunctions = (event) => {
  const randSelect = Math.floor(Math.random() * 10);
  if (randSelect === 5) {
    getActivityRand(event);
    return;
  } else {
    getActivity(event);
    return;
  }
};

document.querySelectorAll(".moodbtn").forEach((btn) => {
  btn.addEventListener("click", shuffleFunctions);
});
