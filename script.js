// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbCh3uo0q_YxrE8HkvJDL2_GioRKe-xBA",
  authDomain: "one-billion-boxes-3361f.firebaseapp.com",
  databaseURL: "https://one-billion-boxes-3361f-default-rtdb.firebaseio.com",
  projectId: "one-billion-boxes-3361f",
  storageBucket: "one-billion-boxes-3361f.appspot.com",
  messagingSenderId: "900867848426",
  appId: "1:900867848426:web:134940ee585625e8a0bf93",
  measurementId: "G-E5WQVJST2J"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('checkbox-container');
  const batchSize = 1500; // Number of checkboxes to load at a time
  let teamColor = '#ffffff';

  // Function to load checkboxes
  function loadCheckboxes(start, end) {
    for (let i = start; i < end; i++) {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `checkbox-${i}`;

      // Get checkbox state from Firebase
      database.ref(`checkboxes/${i}`).once('value').then(snapshot => {
        const isChecked = snapshot.val();
        checkbox.checked = isChecked;
        checkbox.style.backgroundColor = teamColor;
      });

      checkbox.addEventListener('change', handleCheckboxChange);
      container.appendChild(checkbox);

      // Use IntersectionObserver to unload checkboxes
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            container.removeChild(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: [0] });
      observer.observe(checkbox);
    }
    console.log(`Loaded checkboxes from ${start} to ${end}`);
  }

  // Handle checkbox change
  function handleCheckboxChange(event) {
    const checkboxId = event.target.id.replace('checkbox-', '');
    const isChecked = event.target.checked;

    // Update checkbox state in Firebase
    database.ref(`checkboxes/${checkboxId}`).set(isChecked);

    // Update the background color
    event.target.style.backgroundColor = teamColor;
  }

  // Load initial checkboxes
  loadCheckboxes(0, batchSize);

  // Handle scrolling to load more checkboxes
  container.addEventListener('scroll', () => {
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      const loadedCheckboxes = container.children.length;
      loadCheckboxes(loadedCheckboxes, loadedCheckboxes + batchSize);
    }
  });

  // Team creation and joining
  document.getElementById('create-team').addEventListener('click', () => {
    teamColor = document.getElementById('team-color').value;
    database.ref('team-color').set(teamColor);
    console.log(`Created/Joined team with color: ${teamColor}`);
    updateTeamColors(teamColor);
  });

  // Update checkbox colors based on team color
  function updateTeamColors(color) {
    Array.from(container.children).forEach(checkbox => {
      if (checkbox.checked) {
        checkbox.style.backgroundColor = color;
      }
    });
  }

  // Apply team color on page load
  database.ref('team-color').on('value', snapshot => {
    teamColor = snapshot.val() || '#ffffff';
    updateTeamColors(teamColor);
  });
});
