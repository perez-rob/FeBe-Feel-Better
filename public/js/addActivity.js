const addActivity = async (event) => {
  event.preventDefault();

  const activityTitle = document.getElementById("activity-name").value.trim();
  const activityDescription = document
    .getElementById("activity-description")
    .value.trim();

  const res = await fetch("/api/activity", {
    method: "POST",
    body: JSON.stringify({
      title: activityTitle,
      description: activityDescription,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    M.toast({ html: "Activity added to Database" });
    setTimeout(() => document.location.reload(), 1500);
  } else {
    M.toast({ html: "Error adding activity to database" });
  }
};

document
  .getElementById("activity-form")
  .addEventListener("submit", addActivity);
