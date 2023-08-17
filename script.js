$(document).ready(function() {
  
  function handleSaveButtonClick(event) {
    var clickedButton = event.target;
    var timeBlock = clickedButton.closest('.time-block');
    var timeBlockId = timeBlock.id;
    var descriptionInput = timeBlock.querySelector('.description');
    var taskDescription = descriptionInput.value;
    localStorage.setItem(timeBlockId, taskDescription);
  }
  function generateTimeBlocks() {
    var container = document.querySelector('.container-fluid');

    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = document.createElement('div');
      timeBlock.classList.add('row', 'time-block');
      timeBlock.id = 'hour-' + hour;

      var hourColumn = document.createElement('div');
      hourColumn.classList.add('col-2', 'col-md-1', 'hour', 'text-center', 'py-3');
      hourColumn.textContent = `${hour % 12} ${hour >= 12 ? 'PM' : 'AM'}`;

      var descriptionTextarea = document.createElement('textarea');
      descriptionTextarea.classList.add('col-8', 'col-md-10', 'description');
      descriptionTextarea.rows = 3;
  var saveButton = document.createElement('button');
  saveButton.classList.add('btn', 'saveBtn', 'col-2', 'col-md-1');
  saveButton.setAttribute('aria-label', 'save');
  saveButton.innerHTML = '<i class="fas fa-save" aria-hidden="true"></i>';

  timeBlock.appendChild(hourColumn);
  timeBlock.appendChild(descriptionTextarea);
  timeBlock.appendChild(saveButton);

  container.appendChild(timeBlock);
}
}

  generateTimeBlocks(); 

  var saveButtons = document.querySelectorAll('.saveBtn');
  saveButtons.forEach(button => {
    button.addEventListener('click', handleSaveButtonClick);
  });

  var currentHour = dayjs().hour();

  var timeBlocks = document.querySelectorAll('.time-block');
  timeBlocks.forEach(timeBlock => {
    var timeBlockHour = parseInt(timeBlock.id.split('-')[1]);
    if (timeBlockHour < currentHour) {
      timeBlock.classList.add('past');
      timeBlock.classList.remove('present', 'future');
    } else if (timeBlockHour === currentHour) {
      timeBlock.classList.add('present');
      timeBlock.classList.remove('past', 'future');
    } else {
      timeBlock.classList.add('future');
      timeBlock.classList.remove('past', 'present');
    }
  });

  function loadSavedTasks() {
    var timeBlocks = document.querySelectorAll('.time-block');
    timeBlocks.forEach(timeBlock => {
      var timeBlockId = timeBlock.id;
      var descriptionInput = timeBlock.querySelector('.description');
      var savedTask = localStorage.getItem(timeBlockId);
      descriptionInput.value = savedTask || '';
    });
  }
 
  loadSavedTasks();

  var currentDayElement = document.getElementById('currentDay');
  var currentDate = dayjs().format('MMMM D, YYYY');
  currentDayElement.textContent = `Today is ${currentDate}`;
});
