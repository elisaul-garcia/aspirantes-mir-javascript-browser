(function () {

    const todoForm = document.getElementById('nueva-tarea-form');
    const todoInput = document.getElementById('nueva-tarea-input');
    const todoList = document.getElementById('lista-tareas');
    const todoDeleteDoneBtn = document.getElementById('borrar-tareas-completadas');
    const todoFilterBtn = document.querySelectorAll('.filter-btn');
    
    let todos = [];
    
    function handleSubmit(event) {
      event.preventDefault(); // no deja que se envie el formulario 
      const todoText = todoInput.value.trim(); // recibe la informacion del input
      
      if (todoText.length === 0) {
        return; // si esta vacio no deja hacer nada
      }
      
      const nuevaTarea = createTasks(todoText); // crea una nueva tarea
      addTaskToList(nuevaTarea);  // agrega la tarea al array de tareas 
      todoInput.value = '';
  
      todoFilterBtn[0].click();
    }
    
    function createTasks(texto) {
      return {
        id: Date.now(),
        title: texto,
        completed: false,
      };
    }
    
    function addTaskToList(task) {
      todos.push(task);
  
      const listItem = createListItem(task);
      todoList?.appendChild(listItem);
    }
  
    function createListItem(task) {
      const listItem = document.createElement('li');
      listItem.classList.add('tarea-item');
      listItem.setAttribute('id', `task-item-${task.id}`);
      
      const label = document.createElement('label');
      label.classList.add('tarea-label');
  
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('name', 'tareas');
      checkbox.setAttribute('value', task.id);
      checkbox.setAttribute('id', `tarea-checkbox-${task.id}`);
      checkbox.classList.add('tarea-checkbox');
  
      checkbox.addEventListener('change', handleCheckTask);
  
      const span = document.createElement('span');
      span.classList.add('tarea-title');
      span.textContent = task.title;
  
    
      label.appendChild(checkbox);
      label.appendChild(span);
      listItem.appendChild(label);
      return listItem;
    }
  
    function handleCheckTask(event) {
      const checkbox = event.target;
      const id = checkbox.value;
  
      const listItem = document.querySelector(`#task-item-${id}`);
  
      if (checkbox.checked) {
        listItem.classList.add('is-completed');
      } else {
        listItem.classList.remove('is-completed');
      }
  
      setTaskCompletion(id, checkbox.checked);
    }
  
    function setTaskCompletion(id, completed) {
      const task = todos.find(task => task.id === Number(id));
      task.completed = completed;
    }
  
    function handleDelete(event) {
      const completedTasks = todos.filter(task => task.completed === true);
      for(let task of completedTasks) {
        const listItem = document.querySelector(`#task-item-${task.id}`);
        todoList?.removeChild(listItem);
      }
      todos = todos.filter((task) => !task.completed);
    }
  
    function handleFilter(event) {
      const filterBtn = event.target;
      const filterId = filterBtn.id;
      const allTasks = document.querySelectorAll(".tarea-item");
  
      for (let todoFilter of todoFilterBtn) {
        todoFilter.classList.remove('active');
      }
      filterBtn.classList.add('active');
  
      if (filterId === "show-all") {
        for (let task of allTasks) {
          task.classList.remove('is-hidden');
        }
      } else if (filterId === "show-completed") {
        for (let task of allTasks) {
            task.classList.remove('is-hidden');
            if (!task.classList.contains('is-completed')) {
              task.classList.add('is-hidden');
            }
        }
      } else if (filterId === "show-pending") {
        for (let task of allTasks) {
            task.classList.remove('is-hidden');
            if (task.classList.contains('is-completed')) {
              task.classList.add('is-hidden');
            }
        }
      }
    }
  
    todoForm?.addEventListener('submit', handleSubmit);
    todoDeleteDoneBtn?.addEventListener('click', handleDelete);
  
    for (let todoFilter of todoFilterBtn) {
      todoFilter.addEventListener('click', handleFilter);
    }
  })();