const getActivity = async () => {
  const randomNum = Math.floor(Math.random() * (10 - 1) + 1);

  const res = await fetch(`/api/activity/${randomNum}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  let activity;
  if (res.ok) {
    activity = await res.json();
    console.log(activity);
  } else {
    console.log("FETCH FAILED");
  }

  const newActivity = document.createElement("div");
  newActivity.innerText = activity.title;

  document.getElementById("suggested-activity").appendChild(newActivity);
};

document.getElementById("get-activity").addEventListener("click", getActivity);
