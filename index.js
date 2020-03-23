
let num1;
let num2;
let sig;
let result;
let equal;

const getElement = (id) => {
  return document.getElementById(id);
};

const numbers = () => {
  num1 = Math.floor(Math.random()*101);
  num2 = Math.floor(Math.random()*101);
  while (num1 + num2 >100 || num1 - num2 < 0) {
    num1 = Math.floor(Math.random()*101);
    num2 = Math.floor(Math.random()*101);
  }
};
numbers();

const sign = () => {
  let s = Math.round(Math.random());
  if (s === 0) {
    result = num1 + num2;
    sig = "+";
  } else {
    result = num1 - num2;

    sig  = "-";
  }
}
sign();

const example = () => {
  equal = num1 + ' ' + sig + ' ' + num2;
  let c = getElement("num");
  c.innerHTML = equal;
}
example();

let answ;
let input = getElement("input");
let count = 1;
let total = 0;

document.onkeydown = (event) => {
  if (event.keyCode === 13) {
    comp();
  }
};

const labirint = (hate, width, maze, walls, currentPosition) => {
    hate = hate % 2 == 0 ? hate+1 : hate;
    width = width % 2 == 0 ? width + 1 : width;
  document.getElementById('maze').setAttribute('style','height:'+hate*10+'px; width:'+width*10+'px; display:block');
  for (let y=0; y<hate; y++) {
    maze[y] = [];
    for (var x = 0; x<width; maze[y][x++] = 'wall') {
      var el = document.getElementById('maze').appendChild(document.createElement("div"));
      el.className = 'block wall';
      el.setAttribute('id', y+'-'+x);
    }
  }
  function amaze(y,x,addBlockWalls) {
    maze[y][x] = 'maze';
    document.getElementById(y+'-'+x).className = 'block';
      if (addBlockWalls && valid(y+1,x) && (maze[y+1][x] == 'wall')) walls.push([y+1,  x , [y,x]]);
      if (addBlockWalls && valid(y-1,x) && (maze[y-1][x] == 'wall')) walls.push([y-1,  x , [y,x]]);
      if (addBlockWalls && valid(y,x+1) && (maze[y][x+1] == 'wall')) walls.push([ y , x+1, [y,x]]);
      if (addBlockWalls && valid(y,x-1) && (maze[y][x-1] == 'wall')) walls.push([ y , x-1, [y,x]]);
  }
  function valid(a,b) { return (a<hate && a>=0 && b<width && b>=0) ? true : false; };
  amaze(currentPosition[0],currentPosition[1], true);
  while(walls.length != 0) {
    let randomWall = walls[Math.floor(Math.random() * walls.length)],
        host = randomWall[2],
        opposite = [(host[0] + (randomWall[0]-host[0])*2), (host[1] + (randomWall[1]-host[1])*2)];
    if (valid(opposite[0],opposite[1])) {
      if (maze[opposite[0]][opposite[1]] == 'maze') walls.splice(walls.indexOf(randomWall),1);
      else amaze(randomWall[0],randomWall[1],false), amaze(opposite[0],opposite[1],true);
    }
    else walls.splice(walls.indexOf(randomWall),1);
  }
  document.getElementById('0-0').className = 'block me';
  document.getElementById((parseInt(hate)-1)+'-'+(parseInt(width)-1)).className = 'block finish';
  document.body.onkeydown = (e) => {
    let newPosition = [currentPosition[0] + ((e.keyCode - 39) % 2), currentPosition[1] + ((e.keyCode - 38) % 2)];
    if (valid(newPosition[0],newPosition[1]) && maze[newPosition[0]][newPosition[1]] != 'wall') {
      document.getElementById(currentPosition[0]+'-'+currentPosition[1]).className = 'block';
      currentPosition = newPosition;
      document.getElementById(currentPosition[0]+'-'+currentPosition[1]).className = 'block me';
      if (currentPosition[0] == hate-1 && currentPosition[1] == width-1) {
        setTimeout(() => {
          document.getElementById('fire').setAttribute('style','display:block');
        }, 600);
      }
    }
  }
  document.body.onclick = (e) => {
    let newPosition = [currentPosition[0] + ((e.target.id - 39) % 2), currentPosition[1] + ((e.target.id - 38) % 2)];
    if (valid(newPosition[0],newPosition[1]) && maze[newPosition[0]][newPosition[1]] != 'wall') {
      document.getElementById(currentPosition[0]+'-'+currentPosition[1]).className = 'block';
      currentPosition = newPosition;
      document.getElementById(currentPosition[0]+'-'+currentPosition[1]).className = 'block me';
      if (currentPosition[0] == hate-1 && currentPosition[1] == width-1) {
        setTimeout(() => {
          document.getElementById('fire').setAttribute('style','display:block');
        }, 600);
      }
    }
  }
};


const comp = () => {
  answ = input.value;
  if (answ == result.toString()) {
    getElement("check" + count).classList.remove('none');
    getElement("check" + count).classList.add('yes');
    input.value = "";
    count++;
    total++;
  } else {
    getElement("check" + count).classList.remove('none');
    getElement("check" + count).classList.add('no');
    input.value = "";
    count++;
    const loose = document.getElementById('loose');
    loose.innerHTML = `Ошибка! <br> Ты ответил ${answ}, а правильный ответ ${result}.
                      Можешь продолжать решать примеры, но лабиринт уже не откроется.<br>
                      <button type="button" class="loose-button" onclick="closeMessage()"><strong>OK</strong></button>`
    loose.style.display='block';
  };
  numbers();
  sign();
  example();
  input.focus();

  if (total === 1) {
    let calc = getElement("calc");
    calc.classList.remove('calc');
    calc.classList.add('calc_off');
    setTimeout(() => {
      labirint(parseInt(45), parseInt(45), [], [], [0,0])
    }, 2050);
    setTimeout(() => {
      calc.style.display="none";
    }, 2000);
    setTimeout(() => {
      document.getElementById('reload').style.top = "890px";
      document.getElementById('buttonBlock').style.display = "flex";
    }, 2000)

  }
};

const closeMessage = () => {
  document.getElementById('loose').style.display = "none";
};

const reload = () => {
  location.reload()
};
