var bet = {
  month: "",
  day: "",
  nameList: [],
};

let betList = JSON.parse(localStorage.getItem("betList")) || [{month:9,day:12,nameList:["Genice C","Sara DAgostini","Hugo "]},{month:9,day:19,nameList:["Jinny","Chris zucc"]},{month:9,day:13,nameList:["Jessica ekasalim","Jimmy T."]},{month:9,day:17,nameList:["Julia","AT T"]},{month:9,day:9,nameList:["Michael w","Sofia D"]},{month:9,day:11,nameList:["Nick","Robby"]},{month:9,day:27,nameList:["Geoff r"]},{month:9,day:18,nameList:["Stef AJ","Paula zucc","Eva W","Alan L","Fifi"]},{month:9,day:10,nameList:["Gloria","Stephanie "]},{month:9,day:15,nameList:["Aana strozo","Eddy M","Lie tjie","Mei ling c."]},{month:9,day:16,nameList:["Jashinta M.","Matteo d"]},{month:9,day:8,nameList:["Sarina H"]},{month:9,day:14,nameList:["Audrina W","Hoei"]},{month:9,day:7,nameList:["Aveline W"]},{month:9,day:24,nameList:["Elisabeth"]}
];

const listNames = document.getElementById("list-of-names");
const inputName = document.getElementById("Guest");

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let currentDate = new Date();
let selectedCell = null;
let selectedMonth;
let selectedDay;

const monthYearDisplay = document.getElementById("month-year-display");
const daysContainer = document.getElementById("days-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const form = document.getElementById('my-form');
const success_msg = document.getElementById('success-msg');

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  currentDate.getMonth();
  // Set month header text
  monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

  // Clear previous grid blocks
  daysContainer.innerHTML = "";

  // First day index of the targeted month (0 = Sunday, 1 = Monday...)
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Max day counts for current and previous month
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevTotalDays = new Date(year, month, 0).getDate();

  // 1. Generate padding cells from the previous month
  for (let i = firstDayIndex; i > 0; i--) {
      const dayNum = prevTotalDays - i + 1;
      createDayCell(dayNum, "adjacent-month");
  }

  // 2. Generate current month active days
  const today = new Date();
  for (let day = 1; day <= totalDays; day++) {
      let className = "";
      
      // Check if rendering the actual current day
      if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
          className = "today";
      }

      // Check if rendering a date before yesterday
      if (day < today.getDate() && month == today.getMonth()) {
        className = "empty";
      }
      
      createDayCell(day, className);
  }

  // 3. Generate trailing padding cells to round out the grid rows (7-column layout)
  const totalRenderedCells = firstDayIndex + totalDays;
  const remainingCells = (7 - (totalRenderedCells % 7)) % 7;
  for (let day = 1; day <= remainingCells; day++) {
      createDayCell(day, "adjacent-month");
  }

  // Prevent from going before current month and no more than September
  if (currentDate.getMonth() == today.getMonth()) {
    prevBtn.disabled = true;
    nextBtn.disabled = false;
  } else if (currentDate.getMonth() >= 9) {
    nextBtn.disabled = true;
    prevBtn.disabled = false;
  } else {
    nextBtn.disabled = false;
    prevBtn.disabled = false;

  }
}

function createDayCell(dayNumber, baseClass) {
    const cell = document.createElement("div");
    cell.classList.add("day-cell");
    if (baseClass) cell.classList.add(baseClass);
    cell.textContent = dayNumber;

    cell.appendChild(listBetsCalendar(dayNumber, currentDate.getMonth() + 1));

    console.log("month ", currentDate.getMonth());

    // Interaction event listener only for dates in this month
    if (!cell.classList.contains("adjacent-month")) {
      console.log("day after today");
        cell.addEventListener("click", () => {
            if (selectedCell) {
              selectedCell.classList.remove("selected");
            }
            cell.classList.add("selected");
            
            $('#myModal').modal('show');
            selectedCell = cell;
            selectedMonth = currentDate.getMonth() + 1;
            selectedDay = dayNumber;

            showBetModal(selectedMonth, dayNumber);
            
            // Logging selected values for easy tracking
            console.log(`Selected Date: ${currentDate.getFullYear()}-${selectedMonth}-${dayNumber}`);
        });
    }
    
    console.log("cell ", cell);

    daysContainer.appendChild(cell);
}

function listBetsCalendar(dayNumber, monthNumber) {
  const existingBetList = document.createElement("div");
  existingBetList.classList.add("existing-bet-container");
  const match = betList.filter(b => 
    b && b.month === monthNumber && b.day === dayNumber,
  );

  if (match.length > 0) {
    for (let index = 0; index < match[0].nameList.length; index++) {
      console.log(match[0].nameList);
      const hex = '#' + Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
      const existingBet = document.createElement("span");
      existingBet.classList.add("existing-bet");
      existingBet.style.backgroundColor = hex;

      existingBetList.appendChild(existingBet);
    }
  }
  return existingBetList;
}

// Navigation Controls
prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

function showBetModal() {
  $('#myModal').modal('show');
  const heading = document.getElementById("bet-heading");
  heading.innerHTML = "Guesses for " + monthNames[selectedMonth-1] + " " + selectedDay + ", 2026";
  listBets(selectedMonth, selectedDay);
}

function listBets(selectedMonth, selectedDay) {
  // clear existing list
  listNames.innerHTML = "";

  // find match for month and date
  const match = betList.filter(b => 
    b && b.month === selectedMonth && b.day === selectedDay,
  );
  
  if (match.length > 0) {
    // create list item for each name
    for (let index = 0; index < match[0].nameList.length; index++) {
      const newListItem = document.createElement("li");
      newListItem.innerHTML = match[0].nameList[index];
      listNames.appendChild(newListItem);
    }
  }
}

function addBet() {
  event.preventDefault(); 

  const name = inputName.value;

  if (name) {
    // Add name to array
    const match = betList.filter(b => 
      b.month === selectedMonth &&
      b.day === selectedDay,
    );

    if (match.length == 0) {
      betList.push(
        {
          month: selectedMonth,
          day: selectedDay,
          nameList: [name],
        }
      )
    } else {
      match[0].nameList.push(name);
    }

    // Update list
    listBets(selectedMonth, selectedDay);

    // Save to localStorage
    localStorage.setItem(
      "betList",
      JSON.stringify(betList)
    );

    showSuccessMessage(name);
  } else {
    inputName.reportValidity();
  }
}

function showSuccessMessage(name) {
  success_msg.style.display = "block";
  
  const guessName = document.getElementById("guesser");
  guessName.innerHTML = name;

  window.setTimeout(() => {
    success_msg.style.display = "none";
  }, 5000);
}


$(document).ready(function () {
  renderCalendar();
  $('[data-dismiss="modal"]').on('click', function () {
    $('#myModal').modal('hide');
  });
});