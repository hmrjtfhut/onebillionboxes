document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('checkbox-container');

  // Function to load checkboxes
  function loadCheckboxes(start, end) {
    for (let i = start; i < end; i++) {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `checkbox-${i}`;
      checkbox.addEventListener('change', handleCheckboxChange);
      container.appendChild(checkbox);
    }
    console.log(`Loaded checkboxes from ${start} to ${end}`);
  }

  // Load initial checkboxes
  loadCheckboxes(0, 100000);

  // Handle scrolling to load more checkboxes
  container.addEventListener('scroll', () => {
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      loadCheckboxes(container.children.length, container.children.length + 1000);
    }
  });

  // Handle checkbox change
  function handleCheckboxChange(event) {
    const checkboxId = event.target.id;
    const isChecked = event.target.checked;
    console.log(`Checkbox ${checkboxId} changed to ${isChecked}`);
    // Here you would typically emit a socket event to sync the change with other users
  }

  // Team creation and joining
  document.getElementById('create-team').addEventListener('click', () => {
    const teamName = document.getElementById('team-name').value;
    const teamColor = document.getElementById('team-color').value;
    console.log(`Creating or joining team: ${teamName}, ${teamColor}`);
    // Here you would typically emit a socket event to create or join a team
  });
});
