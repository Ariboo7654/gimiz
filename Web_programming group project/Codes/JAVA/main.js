function ShowUserFrequency() {
    const data = JSON.parse(localStorage.getItem("RegisterData")) || [];
  
    const genderCount = { Male: 0, Female: 0, Other: 0 };
    const ageGroupCount = {
      "18-25": 0,
      "26-35": 0,
      "36-50": 0,
      "50+": 0,
    };
  
    data.forEach(user => {
      if (user.gender === "Male") genderCount.Male++;
      else if (user.gender === "Female") genderCount.Female++;
      else genderCount.Other++;
  
      const age = parseInt(user.age);
      if (age >= 18 && age <= 25) ageGroupCount["18-25"]++;
      else if (age >= 26 && age <= 35) ageGroupCount["26-35"]++;
      else if (age >= 36 && age <= 50) ageGroupCount["36-50"]++;
      else if (age > 50) ageGroupCount["50+"]++;
    });
  
    // Chart for Gender
    const genderCtx = document.getElementById('totalUserGenderChart').getContext('2d');
    new Chart(genderCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(genderCount),
        datasets: [{
          label: 'Gender Distribution',
          data: Object.values(genderCount),
          backgroundColor: ['#3498db', '#e74c3c', '#9b59b6']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  
    // Chart for Age Groups
    const ageCtx = document.getElementById('userAgeGroupChart').getContext('2d');
    new Chart(ageCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(ageGroupCount),
        datasets: [{
          label: 'Age Group Distribution',
          data: Object.values(ageGroupCount),
          backgroundColor: '#2ecc71'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  
  // Call it when the page loads
  window.addEventListener("DOMContentLoaded", ShowUserFrequency);
  