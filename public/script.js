document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('checkbox-container');
    const socket = io();
    
    function loadCheckboxes(start, end) {
      for (let i = start; i < end; i++) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox-${i}`;
        checkbox.addEventListener('change', handleCheckboxChange);
        container.appendChild(checkbox);
      }
    }
  
    loadCheckboxes(0, 1000);
  
    container.addEventListener('scroll', () => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        loadCheckboxes(container.children.length, container.children.length + 1000);
      }
    });
  
    function handleCheckboxChange(event) {
      const checkboxId = event.target.id;
      const isChecked = event.target.checked;
      socket.emit('checkbox-update', { id: checkboxId, checked: isChecked });
    }
  
    socket.on('checkbox-update', data => {
      const checkbox = document.getElementById(data.id);
      if (checkbox) {
        checkbox.checked = data.checked;
      }
    });
  
    document.getElementById('create-team').addEventListener('click', () => {
      const teamName = document.getElementById('team-name').value;
      const teamColor = document.getElementById('team-color').value;
      socket.emit('join-team', { name: teamName, color: teamColor });
    });
  
    socket.on('team-update', data => {
      // Handle team update
    });
  });
  