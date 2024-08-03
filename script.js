document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('checkbox-container');
  const totalCheckboxes = 1000000000;
  const batchSize = 1500;

  // Function to load checkboxes
  function loadCheckboxes(start, end) {
    for (let i = start; i < end; i++) {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `checkbox-${i}`;
      checkbox.checked = localStorage.getItem(`checkbox-${i}`) === 'true';
      checkbox.addEventListener('change', handleCheckboxChange);
      container.appendChild(checkbox);
    }
    console.log(`Loaded checkboxes from ${start} to ${end}`);
  }

  // Handle checkbox change
  function handleCheckboxChange(event) {
    const checkboxId = event.target.id;
    const isChecked = event.target.checked;
    localStorage.setItem(checkboxId, isChecked);
    console.log(`Checkbox ${checkboxId} changed to ${isChecked}`);
  }

  // Load initial checkboxes
  loadCheckboxes(0, batchSize);

  // Handle scrolling to load more checkboxes
  container.addEventListener('scroll', () => {
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      const loadedCheckboxes = container.children.length;
      if (loadedCheckboxes < totalCheckboxes) {
        loadCheckboxes(loadedCheckboxes, loadedCheckboxes + batchSize);
      }
    }
  });

  // Team creation and joining
  document.getElementById('create-team').addEventListener('click', () => {
    const teamName = document.getElementById('team-name').value;
    const teamColor = document.getElementById('team-color').value;
    localStorage.setItem('team-color', teamColor);
    console.log(`Created/Joined team: ${teamName}, color: ${teamColor}`);
    updateTeamColors(teamColor);
  });

  // Update checkbox colors based on team color
  function updateTeamColors(color) {
    Array.from(container.children).forEach(checkbox => {
      checkbox.style.backgroundColor = color;
    });
  }

  // Apply team color on page load if available
  const savedColor = localStorage.getItem('team-color');
  if (savedColor) {
    updateTeamColors(savedColor);
  }
});
