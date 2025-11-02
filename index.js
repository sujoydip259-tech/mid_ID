document.getElementById('activityForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const activityName = document.getElementById('activityName').value;
  const activityDate = document.getElementById('activityDate').value;
  const activityTime = document.getElementById('activityTime').value;
  const activityDescription = document.getElementById('activityDescription').value;


  const activity = {
    name: activityName,
    date: activityDate,
    time: activityTime,
    description: activityDescription
  };

  
  const activities = JSON.parse(localStorage.getItem('activities')) || [];
  activities.push(activity);
  localStorage.setItem('activities', JSON.stringify(activities));


  renderActivities();
  e.target.reset(); 
});

function renderActivities() {
  const activities = JSON.parse(localStorage.getItem('activities')) || [];
  const activityList = document.querySelector('.activity-list');
  activityList.innerHTML = '';

  activities.forEach((activity, index) => {
    const activityElement = document.createElement('div');
    activityElement.classList.add('activity', 'p-4', 'border', 'border-gray-300', 'rounded');
    activityElement.innerHTML = `
      <h4 class="font-bold">${activity.name}</h4>
      <p>${activity.date} | ${activity.time}</p>
      <p>${activity.description}</p>
      <button onclick="deleteActivity(${index})" class="bg-red-500 text-white p-2 mt-2 rounded">Delete</button>
    `;
    activityList.appendChild(activityElement);
  });
}

function deleteActivity(index) {
  const activities = JSON.parse(localStorage.getItem('activities')) || [];
  activities.splice(index, 1); // Remove activity
  localStorage.setItem('activities', JSON.stringify(activities));

  
  renderActivities();
}

renderActivities();
