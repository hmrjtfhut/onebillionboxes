document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('checkbox-container');
  const totalCheckboxes = 1000000000; // Total checkboxes (just a reference, not used in this demo)
  const batchSize = 1500; // Number of checkboxes to load at a time

  let teamColor = localStorage.getItem('team-color') || '#ddd'; // Default color

  function loadCheckboxes(start, end) {
    for (let i = start; i < end; i++) {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `checkbox-${i}`;
      checkbox.checked = localStorage.getItem(`checkbox-${i}`) === 'true';
      checkbox.style.backgroundColor = localStorage.getItem(`checkbox-color-${i}`) || teamColor;
      checkbox.addEventListener('change', handleCheckboxChange);
      container.appendChild(checkbox);
    }
  }

  function handleCheckboxChange(event) {
    const checkboxId = event.target.id;
    const isChecked = event.target.checked;
    localStorage.setItem(checkboxId, isChecked);
    if (isChecked) {
      localStorage.setItem(`checkbox-color-${checkboxId}`, teamColor);
      event.target.style.backgroundColor = teamColor;
    } else {
      localStorage.removeItem(`checkbox-color-${checkboxId}`);
      event.target.style.backgroundColor = '';
    }
  }

  function updateTeamColors(color) {
    teamColor = color;
    localStorage.setItem('team-color', color);
    Array.from(container.children).forEach(checkbox => {
      if (checkbox.checked) {
        checkbox.style.backgroundColor = color;
      }
    });
  }

  document.getElementById('create-team').addEventListener('click', () => {
    const color = document.getElementById('team-color').value;
    updateTeamColors(color);
  });

  function loadVisibleCheckboxes() {
    const containerRect = container.getBoundingClientRect();
    Array.from(container.children).forEach(checkbox => {
      const checkboxRect = checkbox.getBoundingClientRect();
      if (checkboxRect.top >= containerRect.top && checkboxRect.bottom <= containerRect.bottom) {
        checkbox.style.display = 'block';
      } else {
        checkbox.style.display = 'none';
      }
    });
  }

  loadCheckboxes(0, batchSize);

  container.addEventListener('scroll', () => {
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      const loadedCheckboxes = container.children.length;
      if (loadedCheckboxes < totalCheckboxes) {
        loadCheckboxes(loadedCheckboxes, loadedCheckboxes + batchSize);
      }
    }
    loadVisibleCheckboxes();
  });

  window.addEventListener('resize', loadVisibleCheckboxes);
});
