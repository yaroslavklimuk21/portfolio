import shuffle from './shuffle';

let cellSize = 100;
let cellSize4x4 = 100;
let cellSize3x3 = 133;
let cellSize5x5 = 80;
let cellSize6x6 = 67;
let cellSize7x7 = 57;
let cellSize8x8 = 50;

if (
  document.querySelector('body').offsetWidth > 320 && document.querySelector('body').offsetWidth < 400
) {
  cellSize = 80;
  cellSize4x4 = 80;
  cellSize3x3 = 107;
  cellSize5x5 = 64;
  cellSize6x6 = 53;
  cellSize7x7 = 46;
  cellSize8x8 = 40;
}
document.body.innerHTML = '<h1 class="title animate__animated animate__bounceInDown" id="title" ><img class="logo" src="assets/logo.png">Gem Puzzle</h1>';
const container = document.createElement('div');
const wrapper = document.createElement('div');
const field = document.createElement('div');
const menu = document.createElement('div');
const counter = document.createElement('div');
const popup = document.createElement('div');
const audio = document.createElement('audio');
const recordWindow = document.createElement('div');
const burgerWrapper = document.createElement('div');
const burger = document.createElement('div');
const title = document.getElementById('title');
const mainPopup = document.createElement('div');
burgerWrapper.id = 'burgerWrapper';
burger.id = 'burger';
mainPopup.className = 'mainPopup';
document.body.append(container);
document.body.append(audio);
document.body.append(recordWindow);
document.body.append(mainPopup);

title.append(burgerWrapper);
burgerWrapper.append(burger);
container.append(wrapper);
wrapper.append(counter);
wrapper.append(field);
container.append(menu);

container.className = 'container';
wrapper.className = 'wrapper';
field.className = 'field animate__animated animate__bounceInLeft';
menu.className = 'menu animate__animated animate__bounceInRight';
counter.className = 'counter animate__animated animate__flipInX';
recordWindow.className = 'record-table';
audio.id = 'audio';
audio.src = 'assets/1.mp3';
menu.innerHTML = ('<button class="btn" id="newGame">New game</button><button class="btn" id="pause">Pause</button><button class="btn" id="score">Score</button><div id="changeSize">Size<ul class="options" id="options"><li class="option">Classic</li><li class="option">3x3</li><li class="option">4x4</li><li class="option">5x5</li><li class="option">6x6</li><li class="option">7x7</li><li class="option">8x8</li></ul></div><button class="btn sound-btn" id="sound"></button>');
counter.innerHTML = ('<p class="time" id="time">Time: 00:00</p><p class="move">Move: 0</p>');
const soundBtn = document.getElementById('sound');
recordWindow.innerHTML = ('<h2 class="score-title">Score</h2><div class="score-table"></div>');
soundBtn.innerHTML = ('<img src="assets/sound.png" class="sound-img">');
field.append(popup);
popup.className = 'popup';
popup.innerHTML = ('<h2>Click "New game"</h2>');

const classic = localStorage.getItem('classic') ? JSON.parse(localStorage.getItem('classic')) : ['00:25', '00:27', '00:32', '00:37', '00:38', '00:40', '00:43', '00:45', '00:55', '01:20'];
const record3x3 = localStorage.getItem('record3x3') ? JSON.parse(localStorage.getItem('record3x3')) : ['00:05', '00:10', '00:12', '00:20', '00:27', '00:30', '00:31', '00:32', '00:35', '00:45'];
const record4x4 = localStorage.getItem('record4x4') ? JSON.parse(localStorage.getItem('record4x4')) : ['00:25', '00:27', '00:32', '00:37', '00:38', '00:40', '00:43', '00:45', '00:55', '01:20'];
const record5x5 = localStorage.getItem('record5x5') ? JSON.parse(localStorage.getItem('record5x5')) : ['01:20', '01:27', '01:32', '01:37', '01:38', '01:40', '01:42', '01:45', '01:48', '01:55'];
const record6x6 = localStorage.getItem('record6x6') ? JSON.parse(localStorage.getItem('record6x6')) : ['02:10', '02:28', '02:31', '02:37', '02:41', '02:42', '02:45', '02:55', '03:20', '03:45'];
const record7x7 = localStorage.getItem('record7x7') ? JSON.parse(localStorage.getItem('record7x7')) : ['04:12', '04:25', '04:53', '05:10', '05:37', '05:41', '05:41', '05:45', '05:55', '06:20'];
const record8x8 = localStorage.getItem('record8x8') ? JSON.parse(localStorage.getItem('record8x8')) : ['06:10', '06:12', '06:37', '06:41', '06:45', '06:49', '06:53', '07:20', '07:55', '08:25'];

localStorage.setItem('classic', JSON.stringify(classic));
localStorage.setItem('record3x3', JSON.stringify(record3x3));
localStorage.setItem('record4x4', JSON.stringify(record4x4));
localStorage.setItem('record5x5', JSON.stringify(record5x5));
localStorage.setItem('record6x6', JSON.stringify(record6x6));
localStorage.setItem('record7x7', JSON.stringify(record7x7));
localStorage.setItem('record8x8', JSON.stringify(record8x8));

const recordsName = {
  nameClassic: 'classic',
  name3x3: 'record3x3',
  name4x4: 'record4x4',
  name5x5: 'record5x5',
  name6x6: 'record6x6',
  name7x7: 'record7x7',
  name8x8: 'record8x8',
};
let empty = {
  value: 16,
  left: 3,
  top: 3,
};
let cells = [];
cells.push(empty);

let count = 0;
let game = false;
let timerOn = false;
let currentTime = 0;
let soundToggle = true;
let size = 'classic';

soundBtn.addEventListener('click', () => {
  if (!soundToggle) {
    soundToggle = true;
    soundBtn.innerHTML = ('<img src="assets/sound.png" class="sound-img">');
  } else {
    soundToggle = false;
    soundBtn.innerHTML = ('<img src="assets/sound2.png" class="sound-img">');
  }
});
const timer = document.getElementById('time');
const newGame = document.getElementById('newGame');
const pause = document.getElementById('pause');
const score = document.getElementById('score');

function StopWatch() {
  let time = 0;
  let interval;
  let offset;
  function delta() {
    const now = Date.now();
    const timePassed = now - offset;
    offset = now;
    return timePassed;
  }

  function timeFormatter(timeIn) {
    const date = new Date(timeIn);
    let minutes = date.getMinutes().toString();
    let seconds = date.getSeconds().toString();
    if (minutes.length < 2) {
      minutes = `0${minutes}`;
    }
    if (seconds.length < 2) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }
  function update() {
    if (timerOn) {
      time += delta();
    }
    const formattedTime = timeFormatter(time);
    timer.textContent = `Time: ${formattedTime}`;
    currentTime = formattedTime;
  }

  this.start = function startTimer() {
    if (!timerOn) {
      interval = setInterval(update.bind(this), 10);
      offset = Date.now();
      timerOn = true;
    }
  };
  this.stop = function stopTimer() {
    if (timerOn) {
      clearInterval(interval);
      interval = null;
      timerOn = false;
    }
  };
  this.reset = function resetTimer() {
    if (timerOn) {
      time = 0;
      update();
    } else {
      time = 0;
      update();
    }
  };
}
const watch = new StopWatch(timer);
const scoreTable = document.querySelector('.score-table');
const column = document.createElement('div');
const recordList = document.createElement('ul');
column.className = 'column';
recordList.className = 'recordList';
scoreTable.append(column);
column.append(recordList);
for (let e = 0; e < 10; e += 1) {
  const recordListItem = document.createElement('li');
  recordListItem.className = 'recordListItem';
  recordList.append(recordListItem);
}
const updateScore = () => {
  const listItem = document.querySelectorAll('.recordListItem');
  for (let i = 0; i < listItem.length; i += 1) {
    switch (size) {
      case 'classic':
        listItem[i].innerText = '';
        classic.sort();
        listItem[i].innerText = `${classic[i]}`;
        break;
      case '3x3':
        listItem[i].innerText = '';
        record3x3.sort();
        listItem[i].innerText = `${record3x3[i]}`;
        break;
      case '4x4':
        listItem[i].innerText = '';
        record4x4.sort();
        listItem[i].innerText = `${record4x4[i]}`;
        break;
      case '5x5':
        listItem[i].innerText = '';
        record5x5.sort();
        listItem[i].innerText = `${record5x5[i]}`;
        break;
      case '6x6':
        listItem[i].innerText = '';
        record6x6.sort();
        listItem[i].innerText = `${record6x6[i]}`;
        break;
      case '7x7':
        listItem[i].innerText = '';
        record7x7.sort();
        listItem[i].innerText = `${record7x7[i]}`;
        break;
      case '8x8':
        listItem[i].innerText = '';
        record8x8.sort();
        listItem[i].innerText = `${record8x8[i]}`;
        break;
      default:
        listItem[i].innerText = '';
        classic.sort();
        listItem[i].innerText = `${classic[i]}`;
        break;
    }
  }
};
updateScore();
function move(i, sizeCell, sizeForRecord, array) {
  count += 1;
  const cell = cells[i + 1];
  const leftDiff = Math.abs(empty.left - cell.left);
  const topDiff = Math.abs(empty.top - cell.top);
  if (leftDiff + topDiff > 1) {
    return;
  }
  document.querySelector('.move').innerHTML = `Move: ${count}`;
  cell.element.style.left = `${empty.left * sizeCell}px`;
  cell.element.style.top = `${empty.top * sizeCell}px`;

  const emptyLeft = empty.left;
  const emptyTop = empty.top;
  empty.left = cell.left;
  empty.top = cell.top;
  cell.left = emptyLeft;
  cell.top = emptyTop;

  const isFinished = cells.every((el) => el.position === `${el.left}${el.top}`);

  if (isFinished) {
    document.querySelector('.popup').classList.remove('popup-inactive');
    popup.innerHTML = (`<h2>You Win!<br>With: ${currentTime} and ${count} moves</h2>}`);
    field.className = 'field animate__animated animate__rubberBand';
    watch.stop();
    game = false;

    const record = (sizeMode, arrayForSort) => {
      const even = (element) => currentTime < element;
      if (arrayForSort.some(even)) {
        if (arrayForSort.every((el) => currentTime !== el)) {
          arrayForSort.push(currentTime);
        }
      }
      arrayForSort.sort();
      arrayForSort.splice(10);
      switch (sizeMode) {
        case 'classic':
          localStorage.setItem('classic', JSON.stringify(arrayForSort));
          break;
        case 'record3x3':
          localStorage.setItem('record3x3', JSON.stringify(arrayForSort));
          break;
        case 'record4x4':
          localStorage.setItem('record4x4', JSON.stringify(arrayForSort));
          break;
        case 'record5x5':
          localStorage.setItem('record5x6', JSON.stringify(arrayForSort));
          break;
        case 'record6x6':
          localStorage.setItem('record6x6', JSON.stringify(arrayForSort));
          break;
        case 'record7x7':
          localStorage.setItem('record7x8', JSON.stringify(arrayForSort));
          break;
        case 'record8x8':
          localStorage.setItem('record8x8', JSON.stringify(arrayForSort));
          break;
        default:
          localStorage.setItem(sizeMode, JSON.stringify(arrayForSort));
          break;
      }
    };
    record(sizeForRecord, array);
    updateScore();
  }
  if (soundToggle) {
    audio.play();
  } else {
    audio.pause();
  }
}
const numbers = [...Array(15).keys()];
const numbers3x3 = [...Array(8).keys()];
const numbers5x5 = [...Array(24).keys()];
const numbers6x6 = [...Array(35).keys()];
const numbers7x7 = [...Array(48).keys()];
const numbers8x8 = [...Array(63).keys()];
function Create() {
  this.classic = function createCells() {
    cells = [];
    empty = {
      value: 16,
      position: '33',
      left: 3,
      top: 3,
    };
    cells.push(empty);

    for (let i = 0; i <= 14; i += 1) {
      const cell = document.createElement('div');
      field.append(cell);
      cell.className = 'cell';
      cell.setAttribute('draggable', true);
      const value = numbers[i] + 1;
      cell.innerHTML = value;
      const left = i % 4;
      const top = (i - left) / 4;
      const leftPos = (value - 1) % 4;
      const topPos = ((value - 1) - leftPos) / 4;
      const position = `${leftPos}${topPos}`;
      cells.push({
        value,
        position,
        left,
        top,
        element: cell,
      });

      cell.style.left = `${left * cellSize}px`;
      cell.style.top = `${top * cellSize}px`;
      cell.addEventListener('click', () => {
        move(i, cellSize, recordsName.nameClassic, classic);
      });
    }
  };
  this.create3x3 = function create3x3() {
    cells = [];
    empty = {
      value: 9,
      position: '22',
      left: 2,
      top: 2,
    };
    cells.push(empty);

    for (let i = 0; i <= 7; i += 1) {
      const cell = document.createElement('div');
      field.append(cell);
      cell.className = 'cell cell3x3';
      cell.setAttribute('draggable', true);
      cell.style.border = 'none';
      cell.style.backgroundImage = `url("./assets/photo3x3/${numbers3x3[i]}.jpg")`;
      const value = numbers3x3[i] + 1;
      const left = i % 3;
      const top = (i - left) / 3;
      const leftPos = (value - 1) % 3;
      const topPos = ((value - 1) - leftPos) / 3;
      const position = `${leftPos}${topPos}`;

      cells.push({
        value,
        position,
        left,
        top,
        element: cell,
      });

      cell.style.left = `${left * cellSize3x3}px`;
      cell.style.top = `${top * cellSize3x3}px`;
      cell.addEventListener('click', () => {
        move(i, cellSize3x3, recordsName.name3x3, record3x3);
      });
    }
  };
  this.create4x4 = function create4x4() {
    cells = [];
    empty = {
      value: 16,
      position: '33',
      left: 3,
      top: 3,
    };
    cells.push(empty);

    for (let i = 0; i <= 14; i += 1) {
      const cell = document.createElement('div');
      field.append(cell);
      cell.className = 'cell';
      cell.setAttribute('draggable', true);
      cell.style.border = 'none';
      const value = numbers[i] + 1;
      cell.style.backgroundImage = `url("./assets/photo4x4/${numbers[i]}.jpg")`;

      const left = i % 4;
      const top = (i - left) / 4;
      const leftPos = (value - 1) % 4;
      const topPos = ((value - 1) - leftPos) / 4;
      const position = `${leftPos}${topPos}`;
      cells.push({
        value,
        position,
        left,
        top,
        element: cell,
      });

      cell.style.left = `${left * cellSize4x4}px`;
      cell.style.top = `${top * cellSize4x4}px`;
      cell.addEventListener('click', () => {
        move(i, cellSize4x4, recordsName.name4x4, record4x4);
      });
    }
  };
  this.create5x5 = function create5x5() {
    cells = [];
    empty = {
      value: 25,
      position: '44',
      left: 4,
      top: 4,
    };
    cells.push(empty);

    for (let i = 0; i <= 23; i += 1) {
      const cell = document.createElement('div');
      field.append(cell);
      cell.className = 'cell cell5x5';
      cell.setAttribute('draggable', true);
      cell.style.border = 'none';
      cell.style.backgroundImage = `url("./assets/photo5x5/${numbers5x5[i]}.jpg")`;

      const value = numbers5x5[i] + 1;

      const left = i % 5;
      const top = (i - left) / 5;
      const leftPos = (value - 1) % 5;
      const topPos = ((value - 1) - leftPos) / 5;
      const position = `${leftPos}${topPos}`;
      cells.push({
        value,
        position,
        left,
        top,
        element: cell,
      });

      cell.style.left = `${left * cellSize5x5}px`;
      cell.style.top = `${top * cellSize5x5}px`;
      cell.addEventListener('click', () => {
        move(i, cellSize5x5, recordsName.name5x5, record5x5);
      });
    }
  };
  this.create6x6 = function create6x6() {
    cells = [];
    empty = {
      value: 36,
      position: '55',
      left: 5,
      top: 5,
    };
    cells.push(empty);

    for (let i = 0; i <= 34; i += 1) {
      const cell = document.createElement('div');
      field.append(cell);
      cell.className = 'cell cell6x6';
      cell.setAttribute('draggable', true);
      cell.style.border = 'none';
      cell.style.backgroundImage = `url("./assets/photo6x6/${numbers6x6[i]}.jpg")`;
      const value = numbers6x6[i] + 1;

      const left = i % 6;
      const top = (i - left) / 6;
      const leftPos = (value - 1) % 6;
      const topPos = ((value - 1) - leftPos) / 6;
      const position = `${leftPos}${topPos}`;
      cells.push({
        value,
        position,
        left,
        top,
        element: cell,
      });

      cell.style.left = `${left * cellSize6x6}px`;
      cell.style.top = `${top * cellSize6x6}px`;
      cell.addEventListener('click', () => {
        move(i, cellSize6x6, recordsName.name6x6, record6x6);
      });
    }
  };
  this.create7x7 = function create7x7() {
    cells = [];
    empty = {
      value: 49,
      position: '66',
      left: 6,
      top: 6,
    };
    cells.push(empty);

    for (let i = 0; i <= 47; i += 1) {
      const cell = document.createElement('div');
      field.append(cell);
      cell.className = 'cell cell7x7';
      cell.setAttribute('draggable', true);
      cell.style.border = 'none';
      cell.style.backgroundImage = `url("./assets/photo7x7/${numbers7x7[i]}.jpg")`;
      const value = numbers7x7[i] + 1;

      const left = i % 7;
      const top = (i - left) / 7;
      const leftPos = (value - 1) % 7;
      const topPos = ((value - 1) - leftPos) / 7;
      const position = `${leftPos}${topPos}`;
      cells.push({
        value,
        position,
        left,
        top,
        element: cell,
      });

      cell.style.left = `${left * cellSize7x7}px`;
      cell.style.top = `${top * cellSize7x7}px`;
      cell.addEventListener('click', () => {
        move(i, cellSize7x7, recordsName.name7x7, record7x7);
      });
    }
  };
  this.create8x8 = function create8x8() {
    cells = [];
    empty = {
      value: 64,
      position: '77',
      left: 7,
      top: 7,
    };
    cells.push(empty);

    for (let i = 0; i <= 62; i += 1) {
      const cell = document.createElement('div');
      field.append(cell);
      cell.className = 'cell cell8x8';
      cell.setAttribute('draggable', true);
      cell.style.border = 'none';
      cell.style.backgroundImage = `url("./assets/photo8x8/${numbers8x8[i]}.jpg")`;
      const value = numbers8x8[i] + 1;
      const left = i % 8;
      const top = (i - left) / 8;
      const leftPos = (value - 1) % 8;
      const topPos = ((value - 1) - leftPos) / 8;
      const position = `${leftPos}${topPos}`;
      cells.push({
        value,
        position,
        left,
        top,
        element: cell,
      });

      cell.style.left = `${left * cellSize8x8}px`;
      cell.style.top = `${top * cellSize8x8}px`;
      cell.addEventListener('click', () => {
        move(i, cellSize8x8, recordsName.name8x8, record8x8);
      });
    }
  };
}
const createSize = new Create();
const changeSize = document.getElementById('changeSize');
const options = document.getElementById('options');
changeSize.addEventListener('click', () => {
  options.classList.toggle('options-active');
});
changeSize.onmouseleave = function mouseLeave() {
  options.classList.remove('options-active');
};

updateScore();
options.addEventListener('click', (e) => {
  const { target } = e;
  switch (target.textContent) {
    case 'classic':
      size = 'classic';
      newGame.click();
      updateScore();
      break;
    case '3x3':
      size = '3x3';
      newGame.click();
      updateScore();
      break;
    case '4x4':
      size = '4x4';
      newGame.click();
      updateScore();
      break;
    case '5x5':
      size = '5x5';
      newGame.click();
      updateScore();
      break;
    case '6x6':
      size = '6x6';
      newGame.click();
      updateScore();
      break;
    case '7x7':
      size = '7x7';
      newGame.click();
      updateScore();
      break;
    case '8x8':
      size = '8x8';
      newGame.click();
      updateScore();
      break;
    default:
      size = 'classic';
      newGame.click();
      updateScore();
      break;
  }
});
const dragAndDrop = () => {
  let c = 0;
  const dragElements = document.querySelectorAll('.cell');
  const dragStart = function addHide() {
    setTimeout(() => {
      this.classList.add('hide');
    }, 0);
  };
  const dragEnd = function removeHide() {
    this.classList.remove('hide');
    this.click();
  };
  const dragOver = function prevent(e) {
    e.preventDefault();
  };
  const dragDrop = function callMove() {

  };
  for (c = 0; c < dragElements.length; c += 1) {
    dragElements[c].addEventListener('dragstart', dragStart);
    dragElements[c].addEventListener('dragend', dragEnd);
  }
  field.addEventListener('dragover', dragOver);
  field.addEventListener('drop', dragDrop);
};
createSize.classic();
function clickForClose() {
  document.addEventListener('click', (event) => {
    if (!recordWindow.contains(event.target) && recordWindow.classList.contains('window-active') && !score.contains(event.target)) {
      recordWindow.classList.remove('window-active');
    }
  });
}
pause.addEventListener('click', () => {
  if (game === false) {
    return;
  }
  if (timerOn) {
    watch.stop();
    pause.textContent = 'Resume';
    document.querySelector('.popup').classList.remove('popup-inactive');
    popup.innerHTML = ('<h2>Pause</h2>');
  } else {
    watch.start();
    pause.textContent = 'Pause';
    document.querySelector('.popup').classList.add('popup-inactive');
  }
  menu.classList.remove('menu-active');
  mainPopup.classList.remove('mainPopup-active');
});
newGame.addEventListener('click', () => {
  document.querySelector('.popup').classList.add('popup-inactive');
  menu.classList.remove('menu-active');
  mainPopup.classList.remove('mainPopup-active');
  field.className = 'field animate__animated ';
  watch.reset();
  field.innerHTML = '';
  field.append(popup);
  switch (size) {
    case 'classic':
      shuffle(numbers);
      createSize.classic();
      break;
    case '3x3':
      shuffle(numbers3x3);
      createSize.create3x3();
      break;
    case '4x4':
      shuffle(numbers);
      createSize.create4x4();
      break;
    case '5x5':
      shuffle(numbers5x5);
      createSize.create5x5();
      break;
    case '6x6':
      shuffle(numbers6x6);
      createSize.create6x6();
      break;
    case '7x7':
      shuffle(numbers7x7);
      createSize.create7x7();
      break;
    case '8x8':
      shuffle(numbers8x8);
      createSize.create8x8();
      break;
    default:
      shuffle(numbers);
      createSize.classic();
      break;
  }
  dragAndDrop();
  count = 0;
  document.querySelector('.move').innerHTML = `Move: ${count}`;
  pause.textContent = 'Pause';
  game = true;
  if (!timerOn) {
    watch.start();
    timerOn = true;
  } else {
    watch.reset();
    pause.textContent = 'Pause';
  }
});
score.addEventListener('click', () => {
  recordWindow.classList.toggle('window-active');
  clickForClose();
  menu.classList.remove('menu-active');
  mainPopup.classList.remove('mainPopup-active');
});
burgerWrapper.addEventListener('click', () => {
  menu.classList.toggle('menu-active');
  mainPopup.classList.toggle('mainPopup-active');
});
mainPopup.addEventListener('click', () => {
  menu.classList.remove('menu-active');
  mainPopup.classList.remove('mainPopup-active');
});
