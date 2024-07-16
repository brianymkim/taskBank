document.addEventListener("DOMContentLoaded", async function() {
    let request = new Request('http://localhost:3000/tasks/today')
    const response = await fetch(request);
    if (response.ok) {
      const tasks = await response.json();
      const taskList = document.getElementById("taskList");
      tasks.forEach(task => {
  
        const taskEl = document.createElement('div');
        taskEl.className = 'task';
  
        let taskcheck = document.createElement('img');
        taskcheck.src = './assets/task check.svg';
        taskcheck.className = 'check';
  
        let taskname = document.createElement('p');
        taskname.textContent = task.taskName;
  
        taskEl.appendChild(taskcheck);
        taskEl.appendChild(taskname);
  
        taskList.appendChild(taskEl);
      });
    } else {
      console.error("Failed to fetch tasks");
    }
  });