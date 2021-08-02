let backupMoodId;

const processStoredAum = async (storedAum) => {
  const resMood = await fetch(`/api/mood/${storedAum.mood_id}`);
  if (resMood.ok) {
    const currentMood = await resMood.json();
    document.getElementById("mood-button").innerText = currentMood.name;
  } else {
    console.log("ERROR RETRIEVING CURRENT MOOD DATA");
    document.getElementById("mood-button").innerText = storedAum.mood_id;
  }

  const resAct = await fetch(`/api/activity/${storedAum.activity_id}`);
  if (resAct.ok) {
    const currentAct = await resAct.json();
    const newActivity = document.createElement("div");
    const newActivityTitle = document.createElement("div");
    const newActivityDescription = document.createElement("div");
    newActivity.setAttribute("id", "suggested-activity");
    newActivityTitle.setAttribute("id", "suggested-activity-title");
    newActivityDescription.setAttribute("id", "suggested-activity-description");

    newActivityTitle.innerText = currentAct.title;
    newActivityDescription.innerText = currentAct.description;
    newActivity.appendChild(newActivityTitle);
    newActivity.appendChild(newActivityDescription);

    const activityResultCaption = document.createElement("h5");
    const resultBtnDiv = document.createElement("div");
    resultBtnDiv.setAttribute("id", "result-btn-div");
    const goodBtn = document.createElement("button");
    const badBtn = document.createElement("button");
    activityResultCaption.innerText =
      "How did that activity work with your current mood?";
    activityResultCaption.setAttribute("id", "activity-result-caption");
    goodBtn.setAttribute("class", "waves-effect waves-light btn");
    badBtn.setAttribute("class", "waves-effect waves-light btn");
    goodBtn.setAttribute("id", "good-btn");
    badBtn.setAttribute("id", "bad-btn");
    goodBtn.innerText = "Great!";
    badBtn.innerText = "Not so good...";

    const jsScript = document.createElement("script");
    jsScript.setAttribute("src", "/js/activityResult.js");

    document.getElementById("suggested-activity-div").appendChild(newActivity);
    document
      .getElementById("suggested-activity-div")
      .appendChild(activityResultCaption);
    resultBtnDiv.appendChild(goodBtn);
    resultBtnDiv.appendChild(badBtn);
    document.getElementById("suggested-activity-div").appendChild(resultBtnDiv);
    document.getElementById("suggested-activity-div").appendChild(jsScript);
  } else {
    console.log("ERROR RETRIEVING CURRENT ACTIVITY DATA");
    const newActivity = document.createElement("div");
    const newActivityTitle = document.createElement("div");
    const newActivityDescription = document.createElement("div");
    newActivity.setAttribute("id", "suggested-activity");
    newActivityTitle.setAttribute("id", "suggested-activity-title");
    newActivityDescription.setAttribute("id", "suggested-activity-description");

    newActivityTitle.innerText = storedAum.activity_id;
    newActivityDescription.innerText = storedAum.activity_id;
    newActivity.appendChild(newActivityTitle);
    newActivity.appendChild(newActivityDescription);

    const activityResultCaption = document.createElement("h5");
    const resultBtnDiv = document.createElement("div");
    resultBtnDiv.setAttribute("id", "result-btn-div");
    const goodBtn = document.createElement("button");
    const badBtn = document.createElement("button");
    activityResultCaption.innerText =
      "How did that activity work with your current mood?";
    activityResultCaption.setAttribute("id", "activity-result-caption");
    goodBtn.setAttribute("class", "waves-effect waves-light btn");
    badBtn.setAttribute("class", "waves-effect waves-light btn");
    goodBtn.setAttribute("id", "good-btn");
    badBtn.setAttribute("id", "bad-btn");
    goodBtn.innerText = "Great!";
    badBtn.innerText = "Not so good...";

    const jsScript = document.createElement("script");
    jsScript.setAttribute("src", "/js/activityResult.js");

    document.getElementById("suggested-activity-div").appendChild(newActivity);
    document
      .getElementById("suggested-activity-div")
      .appendChild(activityResultCaption);
    resultBtnDiv.appendChild(goodBtn);
    resultBtnDiv.appendChild(badBtn);
    document.getElementById("suggested-activity-div").appendChild(resultBtnDiv);
    document.getElementById("suggested-activity-div").appendChild(jsScript);
  }
};

const currentUser = document
  .getElementById("dash-container")
  .getAttribute("data-user");
const storedAum = JSON.parse(
  localStorage.getItem(`my_activity-${currentUser}`)
);
if (storedAum !== null) {
  document.getElementById("mood-button").classList.remove("modal-trigger");
  processStoredAum(storedAum);
} else {
  const saPlaceholder = document.createElement("h6");
  saPlaceholder.innerText = "(Select a mood to receive an activity suggestion)";
  saPlaceholder.setAttribute("style", "font-weight:900");
  document.getElementById("suggested-activity-div").appendChild(saPlaceholder);
}

const addToAUM = async (moodId, activityId) => {
  if (moodId === null) {
    moodId = backupMoodId;
  }
  const userId = document
    .getElementById("dash-container")
    .getAttribute("data-user");

  const res = await fetch("/api/aum", {
    method: "POST",
    body: JSON.stringify({
      user_id: userId,
      mood_id: moodId,
      activity_id: activityId,
      result: null,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const myActivity = await res.json();
    localStorage.setItem(`my_activity-${userId}`, JSON.stringify(myActivity));
  } else {
    console.log("POST FAILED");
  }
};

const getActivityRand = async (event) => {
  backupMoodId = event.target.getAttribute("data-id");
  console.log("RANDOM");
  const userId = document
    .getElementById("dash-container")
    .getAttribute("data-user");
  const id = await event.target.getAttribute("data-id");
  const res = await fetch(`api/aum/activityExUser/${id}/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  let activity;
  let randNumLen;
  if (res.ok) {
    activity = await res.json();
    randNumLen = Math.floor(Math.random() * activity.length);
    console.log("RANDOM", activity);
    // console.log("RANDOM", activity[randNumLen].title);
    const instance = M.Modal.getInstance(document.getElementById("modal1"));
    instance.close();
  } else {
    console.log("FETCH FAILED");
  }

  document.getElementById("suggested-activity-div").innerHTML = "";

  const newActivity = document.createElement("div");
  const newActivityTitle = document.createElement("div");
  const newActivityDescription = document.createElement("div");
  newActivity.setAttribute("id", "suggested-activity");
  newActivityTitle.setAttribute("id", "suggested-activity-title");
  newActivityDescription.setAttribute("id", "suggested-activity-description");

  newActivityTitle.innerText = activity[randNumLen].title;
  newActivityDescription.innerText = activity[randNumLen].description;
  newActivity.appendChild(newActivityTitle);
  newActivity.appendChild(newActivityDescription);

  const activityResultCaption = document.createElement("h5");
  const resultBtnDiv = document.createElement("div");
  resultBtnDiv.setAttribute("id", "result-btn-div");
  const goodBtn = document.createElement("button");
  const badBtn = document.createElement("button");
  activityResultCaption.innerText =
    "How did that activity work with your current mood?";
  activityResultCaption.setAttribute("id", "activity-result-caption");
  goodBtn.setAttribute("class", "waves-effect waves-light btn");
  badBtn.setAttribute("class", "waves-effect waves-light btn");
  goodBtn.setAttribute("id", "good-btn");
  badBtn.setAttribute("id", "bad-btn");
  goodBtn.innerText = "Great!";
  badBtn.innerText = "Not so good...";

  const jsScript = document.createElement("script");
  jsScript.setAttribute("src", "/js/activityResult.js");

  document.getElementById("mood-button").innerText =
    event.target.getAttribute("data-name");
  document.getElementById("mood-button").classList.remove("modal-trigger");

  document.getElementById("suggested-activity-div").appendChild(newActivity);
  document
    .getElementById("suggested-activity-div")
    .appendChild(activityResultCaption);
  resultBtnDiv.appendChild(goodBtn);
  resultBtnDiv.appendChild(badBtn);
  document.getElementById("suggested-activity-div").appendChild(resultBtnDiv);
  document.getElementById("suggested-activity-div").appendChild(jsScript);

  addToAUM(id, activity[randNumLen].id);
};

const getActivity = async (event) => {
  backupMoodId = event.target.getAttribute("data-id");
  console.log("MAIN");
  const userId = document
    .getElementById("dash-container")
    .getAttribute("data-user");
  const id = await event.target.getAttribute("data-id");
  // console.log(id);
  const res = await fetch(`api/aum/activityByMood/${id}/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  let activity;
  let randNumLen;
  if (res.ok) {
    activity = await res.json();
    // console.log(activity);
    if (activity.length === 0) {
      console.log("EMPTY");
      getActivityRand(event);
      return;
    }
    randNumLen = Math.floor(Math.random() * activity.length);

    console.log("this is", activity);
    // console.log("this is", activity[randNumLen].activity.title);
    const instance = M.Modal.getInstance(document.getElementById("modal1"));
    instance.close();
  } else {
    console.log("FETCH FAILED");
  }

  document.getElementById("suggested-activity-div").innerHTML = "";

  const newActivity = document.createElement("div");
  const newActivityTitle = document.createElement("div");
  const newActivityDescription = document.createElement("div");
  newActivity.setAttribute("id", "suggested-activity");
  newActivityTitle.setAttribute("id", "suggested-activity-title");
  newActivityDescription.setAttribute("id", "suggested-activity-description");

  newActivityTitle.innerText = activity[randNumLen].activity.title;
  newActivityDescription.innerText = activity[randNumLen].activity.description;
  newActivity.appendChild(newActivityTitle);
  newActivity.appendChild(newActivityDescription);

  const activityResultCaption = document.createElement("h5");
  const resultBtnDiv = document.createElement("div");
  resultBtnDiv.setAttribute("id", "result-btn-div");

  const goodBtn = document.createElement("button");
  const badBtn = document.createElement("button");
  activityResultCaption.innerText =
    "How did that activity work with your current mood?";
  activityResultCaption.setAttribute("id", "activity-result-caption");
  goodBtn.setAttribute("class", "waves-effect waves-light btn");
  badBtn.setAttribute("class", "waves-effect waves-light btn");
  goodBtn.setAttribute("id", "good-btn");
  badBtn.setAttribute("id", "bad-btn");
  goodBtn.innerText = "Great!";
  badBtn.innerText = "Not so good...";

  const jsScript = document.createElement("script");
  jsScript.setAttribute("src", "/js/activityResult.js");

  document.getElementById("mood-button").innerText =
    event.target.getAttribute("data-name");
  document.getElementById("mood-button").classList.remove("modal-trigger");

  document.getElementById("suggested-activity-div").appendChild(newActivity);
  document
    .getElementById("suggested-activity-div")
    .appendChild(activityResultCaption);
  resultBtnDiv.appendChild(goodBtn);
  resultBtnDiv.appendChild(badBtn);
  document.getElementById("suggested-activity-div").appendChild(resultBtnDiv);
  document.getElementById("suggested-activity-div").appendChild(jsScript);

  addToAUM(id, activity[randNumLen].activity.id);
};

const shuffleFunctions = (event) => {
  const randSelect = Math.floor(Math.random() * 4);
  if (randSelect === 3) {
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
