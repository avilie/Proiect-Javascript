function startGame(size, mines){
var countie = 0;
var countir = 0;
var mem = [];
var vecRet = [];
var myVar;
var myForm;
var flag = 0;
var tast;

function make2DArray(size){
  arr = new Array(size);
  for(let i = 0; i < arr.length; i++){
    arr[i] = new Array(size);
  }
  return arr;
}

var cellVec = make2DArray(size);

function Map(size){
  this.size = size;
}

Map.prototype.show = function(){
  var i, j,
    //linieHeght = parseInt(window.innerHeight / this.size) - this.size + "px",
    colHeght = 25 + "px",
    colWidth = 25 + "px";
    //linieWidth = parseInt(window.innerWidth / this.size) - this.size + "px";

  var bigDiv = document.createElement("div");
  bigDiv.setAttribute("class", "bigBig");
  for(i = 0; i < this.size; i++){
    var lin = document.createElement("div");
    lin.setAttribute("class", "Linia" + i);
    //lin.style.backgroundColor = "red";
    //lin.style.height = linieHeght;
    //lin.style.width = linieWidth;
     for(j = 0; j < this.size; j++){
       var col = document.createElement("div");
       col.setAttribute("class", "Coloana" + j);
       col.style.height = colHeght;
       col.style.width = colWidth;

       var butt = document.createElement("button");
       butt.setAttribute("class", "designButton");
       butt.style.height = colHeght;
       butt.style.width = colWidth;
       col.appendChild(butt);

       lin.appendChild(col);
    }
    bigDiv.appendChild(lin);
  }
   document.body.appendChild(bigDiv);
}

function Cell(i, j){
  this.letsFlag = 0;
  this.countNeigh = 0;
  this.i = i;
  this.j = j;
  this.mine = false;

  this.revealed = false;
}

Cell.prototype.show = function(){
    var x = document.getElementsByClassName("Linia" + this.i)[0].childNodes;
       if(this.revealed){
         if(this.mine){
        x.item(this.j).textContent = 'B';
        }
           else{
             if(this.countNeigh > 0){
                x.item(this.j).textContent = this.countNeigh;
              } else {
		x.item(this.j).style.backgroundColor = "#829595";
   		x.item(this.j).textContent = "";
   }
  }
 }
}

Cell.prototype.addFlag = function(){
	if(this.letsFlag == 0){
	var x = document.getElementsByClassName("Linia" + this.i)[0].childNodes;
	var y = x.item(this.j).childNodes;
	y[0].textContent = 'F';
	this.letsFlag = 1;}
	else if(this.letsFlag == 1){
	var x = document.getElementsByClassName("Linia" + this.i)[0].childNodes;
	var y = x.item(this.j).childNodes;
	y[0].textContent = '';
	this.letsFlag = 0;}
}

Cell.prototype.flood = function(){
  for(let i = -1; i <= 1; i++){
    for(let j = -1; j <= 1; j++){
      let to = this.i + i;
      let po = this.j + j;
      if( to > -1 && to < size && po > -1 && po < size ){
        var neigh = cellVec[to][po];
          if(!neigh.mine && !neigh.revealed){
            neigh.revealed = true;
	    neigh.show();
	    if(neigh.countNeigh == 0){
	    neigh.flood();
	    }
          }
      }
    }
  }
}

Cell.prototype.neigh = function(){
  if(this.mine){
    this.countNeigh = -1;
    return;
  }
  var nrVec = 0;
  for(let i = -1; i <= 1; i++){
    for(let j = -1; j <= 1; j++){
      let to = this.i + i;
      let po = this.j + j;
      if( to > -1 && to < size && po > -1 && po < size ){
      var neigh = cellVec[to][po];
      if(neigh.mine){
        nrVec++;
      }
    }
  }
}this.countNeigh = nrVec;}

function gameOver(){
	for(let i = 0; i < size; i++){
		for(let j = 0; j < size; j++){
			cellVec[i][j].revealed = true;
			cellVec[i][j].show();
		}
  }
  console.log("Nume: " + document.getElementById("name").value);
  console.log("Numar mine: " + mines);
  console.log("Dimensiune: " + size);
  console.log("Timp: " + catelusi[0] + ":" + catelusi[1] + ":" + catelusi[2]);
    window.alert("Ai pierdut!");
    buttNeFin.disabled = false;
		clearInterval(myVar);
		clearInterval(tast);
}

function gameWon(){
	let check = 0;
	let calcul = size * size - mines;
	//console.log("Calcul: " + calcul);
	for(let i = 0; i < size; i++){
		for(let j = 0; j < size; j++){
			if(cellVec[i][j].revealed && !cellVec[i][j].mine)
			     check++;
		}
	}
	//console.log("Check: " + check);
	if(check == calcul){
		for(let i = 0; i < size; i++){
			for(let j = 0; j < size; j++){
				cellVec[i][j].revealed = true;
				cellVec[i][j].show();
		}
  }
    let sizei = size + "x" + size;
    let timeri = catelusi[0] + ":" + catelusi[1] + ":" + catelusi[2];
    console.log("Nume: " + document.getElementById("name").value);
    console.log("Numar mine: " + mines);
    console.log("Dimensiune: " + size + "x" + size);
    console.log("Timp: " + catelusi[0] + ":" + catelusi[1] + ":" + catelusi[2]);
    window.alert("Ai castigat!");
		clearInterval(myVar);
    clearInterval(tast);
    buttNeFin.disabled = false;
 
    fetch('http://localhost:3000/Users', {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        //"Content-type": "application/json; raw"
      },
      body: "Nume=" + document.getElementById("name").value 
      + "&" + "Mine=" + mines + "&" + "Dimensiune=" + sizei + "&"
      + "Timp=" + timeri
      //body: {"name": "namePost", "image": "imagePost", "id": 102}
      //body: 'name=ss&image=bb'
                                          })
      .then(function (data) {
                console.log('Request succeeded with JSON response', data);
                            })
      .catch(function (error) {
                console.log('Request failed', error);
                              });


		return;
	}
}


var newMap = new Map(size);
newMap.show();

for(let i = 0; i < size; i++){
  for(let j = 0; j < size; j++){
    cellVec[i][j] = new Cell(i, j);
    mem.push([i, j]);
  }
}

for(let n = 0; n < mines; n++){
  let temp = Math.floor(Math.random() * (mem.length - 1));
  let temp1 = mem[temp];
  let i = temp1[0];
  let j = temp1[1];
  cellVec[i][j].mine = true;
  mem.splice(temp, 1);
}

for(let i = 0; i < size; i++){
  for(let j = 0; j < size; j++){
    cellVec[i][j].neigh();
  }
}

for(let i = 0; i < size; i++){
  for(let j = 0; j < size; j++){
    cellVec[i][j].show();
  }
}

for(let i = 0; i < size; i++){
  var x = document.getElementsByClassName("Linia" + i)[0].childNodes;
  for(let j = 0; j < size; j++){
    var y = x.item(j).childNodes;
    y[0].addEventListener("mousedown", function(event){
	    if(event.button == 0){
			if(flag == 0) {tast = setInterval(reallyTimer, 1000); flag = 1;}
		cellVec[i][j].revealed = true;
      if(cellVec[i][j].countNeigh == 0){
        cellVec[i][j].flood();
      }
      if(cellVec[i][j].mine == true){
      	gameOver();}


	} else if(event.button == 1){
		cellVec[i][j].addFlag();
		event.preventDefault();
	}
    });

    y[0].addEventListener("mousedown", function(event){
        if(event.button == 0){
			if(flag == 0) {tast = setInterval(reallyTimer, 1000); flag = 1;}
	cellVec[i][j].show();}
    });
  }
}

myVar = setInterval(gameWon, 0);

var hh = 0, mm = 0, ss = 0;
var catelusi = [];
catelusi[0] = hh;
catelusi[1] = mm;
catelusi[2] = ss;

/*
function myFunction() {
    var txt;
    var person = prompt("Introduceti-va numele:", "Harry Potter");
    while (person == null || person == "") {
        txt = "Nu v-ati introdus numele.";
		var person = prompt("Introduceti-va numele:", "Harry Potter");
    }
	txt = "Nume: " + person;
    
	return txt;
}
*/

//try form
//document.getElementById("start-button").disabled = false;

function Timer(hh, mm, ss){
	ss++;
	if(ss == 60){
		mm++;
		ss = 0;
	}
	if(mm == 60){
		hh++;
		mm = 0;
	}
	catelusi[0] = hh;
	catelusi[1] = mm;
	catelusi[2] = ss;
	return catelusi;
}

function reallyTimer(){
	arr = Timer(catelusi[0], catelusi[1], catelusi[2]);
	d.innerHTML = "Timer: " + arr[0] + ":" + arr[1] + ":" + arr[2]; 
}

}

var size, mines, buttNeFin, butonApasat = 0;

function myFormVerif(){
  let zup = document.getElementById("name");
  //let puf = document.getElementById("nrMine");
  let firstRad = document.getElementById("Expert");
  let puf = document.getElementById("Custom");
  let secRad = document.getElementById("Mediu");
  let thirdRad = document.getElementById("Usor");
  let butty = document.getElementById("buttFin");
  if(zup.value == "" || 
  ( puf.checked == false && firstRad.checked == false && secRad.checked == false && thirdRad.checked == false ))
  {
    butty.disabled = true;
    /*
    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        let x = document.getElementsByClassName("Linia" + i)[0].childNodes;
        let y = x.item(j).childNodes;
        y[0].disabled = true;
      }
    }
    */
  } else {
    butty.disabled = false;
    if(firstRad.checked){
    size = parseInt(firstRad.value);
    mines = 170;
    if(mines > size * size){ mines = size * size; }
    } else if(secRad.checked){
      size = parseInt(secRad.value);
      mines = 120;
    if(mines > size * size){ mines = size * size; }
    } else if(thirdRad){
      size = parseInt(thirdRad.value);
      mines = 50;
    } if(puf.checked){
    let x = document.getElementById("custDim");
      x.disabled = false;
    let y = document.getElementById("custMines");
      y.disabled = false;

      size = parseInt(document.getElementById("custDim").value);
      mines = parseInt(document.getElementById("custMines").value);
    }
      }
}


function myFunction(){
  //Cream hugeDiv - div care este pe acelasi nivel de vizibilitate ca div-ul matricii
  var hugeDiv = document.createElement("div");
  hugeDiv.setAttribute("class", "hugeForm");
  //Cream firstForm - el are butoanele radio ''Dimensiune x' + Custom
  //mai are si divIn1 in care se regaseste Inputul din dreapta lui 'Nume: '
    var firstForm = document.createElement("form");
    var divIn1 = document.createElement("div");
    divIn1.textContent = "Nume: ";
    var x = document.createElement("input");
    x.setAttribute("type", "text");
    x.setAttribute("id", "name");

    //x.value = "Alex";

    divIn1.appendChild(x);
  
    //Primul buton radio
    var firstRadio = document.createElement("div");
    var y1 = document.createElement("input");
    y1.setAttribute("type", "radio");
    y1.setAttribute("name", "radio");
    y1.setAttribute("id", "Expert");
    y1.setAttribute("value", 25);

    //y1.checked = true;

    firstRadio.innerHTML = "Dimensiune 25 x 25 & 170 mine";
    firstRadio.appendChild(y1);

    //Al doilea buton radio
    var secRadio = document.createElement("div");
    var y2 = document.createElement("input");
    y2.setAttribute("type", "radio");
    y2.setAttribute("name", "radio");
    y2.setAttribute("id", "Mediu");
    y2.setAttribute("value", 20);
    secRadio.innerHTML = "Dimensiune 20 x 20 & 120 mine";
    secRadio.appendChild(y2);

    //Al treilea buton radio
    var thirdRadio = document.createElement("div");
    var y3 = document.createElement("input");
    y3.setAttribute("type", "radio");
    y3.setAttribute("name", "radio");
    y3.setAttribute("id", "Usor");
    y3.setAttribute("value", 15);
    thirdRadio.innerHTML = "Dimensiune 15 x 15 & 50 mine";
    thirdRadio.appendChild(y3);

    //customRadio este div. Are primul radio "Custom" si cele 2 div-uri
    //'Dimensiune' si 'Numar mine' care cate 1 input fiecare
    var customRadio = document.createElement("div");
    customRadio.setAttribute("id", "customRadio");
    var y4 = document.createElement("input");
    y4.setAttribute("type", "radio");
    y4.setAttribute("name", "radio");
    y4.setAttribute("id", "Custom");

    customRadio.innerHTML = "Custom";
    customRadio.appendChild(y4);

    let yNerv = document.createElement("div");
    yNerv.setAttribute('class', 'yNerv');
    let ya = document.createElement("input");
        ya.setAttribute("type", "number");
        ya.setAttribute("id", "custDim");
        ya.disabled = true;
      yNerv.textContent = "Dimensiune ";
      yNerv.appendChild(ya);
      customRadio.appendChild(yNerv);
    
    let yNervu = document.createElement("div");
    yNervu.setAttribute('class', 'yNervu');
    let yu = document.createElement("input");
        yu.setAttribute("type", "number");
        yu.setAttribute("id", "custMines");
        yu.disabled = true;
      yNervu.textContent = "Numar mine ";
      yNervu.appendChild(yu);
      customRadio.appendChild(yNervu);

    //var divIn3 = document.createElement("div");
    //divIn3.textContent = "Numar mine: ";
    //var z = document.createElement("input");
    //z.setAttribute("type", "text");
    //z.setAttribute("id", "nrMine");
    
    //z.value = 6;

    //divIn3.appendChild(z);

    //butonul incepe joc
    var buttFin = document.createElement("button");
    buttFin.setAttribute("id", "buttFin");
    buttFin.textContent = "Incepe joc!";

    //butonul din nou
    buttNeFin = document.createElement("button");
    buttNeFin.setAttribute("id", "buttNeFin");
    buttNeFin.textContent = "Din nou?";
    //buttNeFin.disabled = false;

    //butonul afiseaza scoruri
    var buttScor = document.createElement("button");
    buttScor.setAttribute("id", "buttScor");
    buttScor.textContent = "Afiseaza scoruri";

    //div care are alte 3 div-uri, primele 2 avand cate un input radio si un buton normal
    //al treilea este cel cu ID user -> input text
    var functionalitate = document.createElement("div");

    //div pentru sterge user
    var funcDel = document.createElement("div");
    funcDel.innerHTML = "Sterge user";
    //input sterge user
    var buttDelete = document.createElement("input");
    buttDelete.setAttribute("type", "radio");
    buttDelete.setAttribute("name", "radio");
    buttDelete.setAttribute("id", "buttDelete");

    //buton sterge user
    var rlyButtDel = document.createElement("button");
    rlyButtDel.setAttribute("id", "rlyButtDel");
    rlyButtDel.textContent = "Sterge user";
    rlyButtDel.disabled = true;
    funcDel.appendChild(buttDelete);
    funcDel.appendChild(rlyButtDel);

    //div pentru update user
    var funcPut = document.createElement("div");
    funcPut.innerHTML = "Updateaza user";
    //input update user
    var buttPut = document.createElement("input");
    buttPut.setAttribute("type", "radio");
    buttPut.setAttribute("name", "radio");
    buttPut.setAttribute("id", "buttPut");

    //buton update user
    var rlyButtPut = document.createElement("button");
    rlyButtPut.setAttribute("id", "rlyButtPut");
    rlyButtPut.textContent = "Updateaza user";
    rlyButtPut.disabled = true;

    //definim cele 4 input-uri id, nume, numar mine, dimensiune, timp
    //mai intai cate un div pentru fiecare
    var idPut = document.createElement("div");
    idPut.innerHTML = "ID: ";
    var numePut = document.createElement("div");
    numePut.innerHTML = "Nume: ";
    var minePut = document.createElement("div");
    minePut.innerHTML = "Mine: ";
    var dimPut = document.createElement("div");
    dimPut.innerHTML = "Dimensiune: ";
    var timpPut = document.createElement("div");
    timpPut.innerHTML = "Timp: ";

    //cate un input pentru fiecare
    let idPutIn = document.createElement("input");
    idPutIn.setAttribute("type", "text");
    idPutIn.setAttribute("id", "idPutIn");
    idPutIn.disabled = true;
    idPut.appendChild(idPutIn);

    let numPutIn = document.createElement("input");
    numPutIn.setAttribute("type", "test");
    numPutIn.setAttribute("id", "numPutIn");
    numPutIn.disabled = true;
    numePut.appendChild(numPutIn);

    let minePutIn = document.createElement("input");
    minePutIn.setAttribute("type", "test");
    minePutIn.setAttribute("id", "minePutIn");
    minePutIn.disabled = true;
    minePut.appendChild(minePutIn);

    let timpPutIn = document.createElement("input");
    timpPutIn.setAttribute("type", "test");
    timpPutIn.setAttribute("id", "timpPutIn");
    timpPutIn.disabled = true;
    timpPut.appendChild(timpPutIn);

    let dimPutIn = document.createElement("input");
    dimPutIn.setAttribute("type", "test");
    dimPutIn.setAttribute("id", "dimPutIn");
    dimPutIn.disabled = true;
    dimPut.appendChild(dimPutIn);

    //un buton pentru alegerea userului
    var fetchUser = document.createElement("button");
    fetchUser.setAttribute("id", "fetchUser");
    fetchUser.textContent = "Fetch user ";
    fetchUser.disabled = true;

    //legam div-ul 'Updateaza user' -> radio si butonul 'Updateaza user'
    funcPut.appendChild(buttPut);
    funcPut.appendChild(rlyButtPut);
    //legam celelalte input-uri
    funcPut.appendChild(idPut);
    funcPut.appendChild(numePut);
    funcPut.appendChild(minePut);
    funcPut.appendChild(dimPut);
    funcPut.appendChild(timpPut);
    funcPut.appendChild(fetchUser);


    //legam primele 2 div-uri la div-ul mare
    functionalitate.appendChild(funcPut);
    functionalitate.appendChild(funcDel);

    //cream ultimul div ( 'ID user' -> input text )
    let fericire1 = document.createElement("div");
    fericire1.setAttribute('class', 'fericire1');
    let yb = document.createElement("input");
        yb.setAttribute("type", "text");
        yb.setAttribute("id", "buttDelPutIn");
        yb.disabled = true;
      fericire1.textContent = "ID user ";
      fericire1.appendChild(yb);
    //il legam la div-ul mare
    functionalitate.appendChild(fericire1);

    /*
    let fericire2 = document.createElement("div");
    fericire2.setAttribute('class', 'fericire2');
    let yc = document.createElement("input");
        yc.setAttribute("type", "text");
        yc.setAttribute("id", "buttPutIn");
        yc.disabled = true;
      fericire2.textContent = "ID user ";
      fericire2.appendChild(yc);
    functionalitate.appendChild(fericire2);
    */

    //la firstForm(primul form) legam primul div (cel cu 'Nume' -> input text)
    //primele 3 radio-uri si div-ul 'Custom' care are 2 input-uri 
    firstForm.appendChild(divIn1);
    //firstForm.appendChild(divIn3);
    firstForm.appendChild(firstRadio);
    firstForm.appendChild(secRadio);
    firstForm.appendChild(thirdRadio);
    firstForm.appendChild(customRadio);

    //butoanele Incepe joc, Din nou? si Afiseaza sunt legate la div-ul care contine si form-ul de sus
    //(cel mai apropiat de matricea de mine)
    //form
    hugeDiv.appendChild(firstForm);
    //buton Incepe joc (ce nume lol)
    hugeDiv.appendChild(buttFin);
    //buton Din nou? (idem)
    hugeDiv.appendChild(buttNeFin);
    //buton afiseaza scor
    hugeDiv.appendChild(buttScor);
    //div-ul de jos cu 'Updateaza user' etc..
    hugeDiv.appendChild(functionalitate);
    //hugeDiv.appendChild(funcDel);

    document.body.appendChild(hugeDiv);
}


myFunction();

myForm = setInterval(myFormVerif, 1000);

function funcInutil(){
  let x1 = document.getElementById("buttDelete");
  let y1 = document.getElementById("buttPut");

  let x = document.getElementById("buttDelPutIn");
  if(x1.checked || y1.checked){
    x.disabled = false;
  } else {
    x.disabled = true;
  }

  if(x1.checked && x.value != ""){
    document.getElementById("rlyButtDel").disabled = false;
  }

  if(y1.checked && x.value != ""){
    document.getElementById("fetchUser").disabled = false;

  } else if(y1.checked && x.value == "") {
    document.getElementById("idPutIn").disabled = true;
    document.getElementById("numPutIn").disabled = true;
    document.getElementById("minePutIn").disabled = true;
    document.getElementById("dimPutIn").disabled = true;
    document.getElementById("timpPutIn").disabled = true;

    document.getElementById("idPutIn").value = "";
    document.getElementById("numPutIn").value = "";
    document.getElementById("minePutIn").value = "";
    document.getElementById("dimPutIn").value = "";
    document.getElementById("timpPutIn").value = "";
  }

}

myInutil = setInterval(funcInutil, 1000);

document.getElementById("buttFin").addEventListener("click", function(){
  clearInterval(myForm);
  document.getElementById("name").disabled = true;
  //document.getElementById("nrMine").disabled = true;
  document.getElementById("Expert").disabled = true;
  document.getElementById("Mediu").disabled = true;
  document.getElementById("Usor").disabled = true;
  document.getElementById("buttFin").disabled = true;
  //console.log(size + " " + mines);
  startGame(size, mines);

});

document.getElementById("buttNeFin").addEventListener("click", function(){
  location.reload();
})

document.getElementById("buttScor").addEventListener("click", function(){
  if(butonApasat == 0){
  let elem = document.getElementsByClassName("hugeForm")[0];
  let divNou = document.createElement("div");

  fetch('http://localhost:3000/Users', {
    method: 'get',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  }).then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        var A = [];
        A = data;
        console.log(A);
        //divNou.innerHTML += "Nume " + " Numar mine " + "Dimensiune " + "Timp";
        //let x = document.createElement("br");
        //divNou.appendChild(x);
        for(let i = 0; i < A.length; i++){
            let x = document.createElement("br");
            let y = document.createElement("br");
            divNou.innerHTML += "ID: " + A[i].id + " " + "Nume: " +  A[i].Nume + " " + "Numar mine: " + A[i].Mine + " " + 
            "Dimensiune: " + A[i].Dimensiune + " " + "Timp: " + A[i].Timp;
            divNou.appendChild(x);
            divNou.appendChild(y);
        }

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

  elem.appendChild(divNou);
  butonApasat = 1;
  } else {
    let elem = document.getElementsByClassName("hugeForm")[0];
    //console.log(elem.childNodes);
    elem.removeChild(elem.childNodes[6]);
    butonApasat = 0;
  }
})

document.getElementById("rlyButtDel").addEventListener("click", function(){
  let x = document.getElementById("buttDelPutIn").value;
  console.log(x);
  //Delete fetch
  fetch('http://localhost:3000/Users/' + x, {
      method: 'delete',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      //ody: "id=6"
      //body: 'name=ss&image=bb'
                                          })
      .then(function (data) {
                console.log('Request succeeded with JSON response', data);
                            })
      .catch(function (error) {
                console.log('Request failed', error);
                              });
})

document.getElementById("rlyButtPut").addEventListener("click", function(){
  //let x = document.getElementById("buttDelPutIn").value;

  let x1 = document.getElementById("idPutIn").value;
  let x2 = document.getElementById("numPutIn").value;
  let x3 = document.getElementById("minePutIn").value;
  let x4 = document.getElementById("dimPutIn").value;
  let x5 = document.getElementById("timpPutIn").value;
  //console.log(x1 + " " + x2 + " " + x3 + " " + x4 + " " + x5);
  //Get pe valoarea din x
  //Pe urma Put
          fetch('http://localhost:3000/Users/' + x1, {
            method: 'put',
            headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            //ody: "id=6"
            body: "id=" + x1 + '&' + 
                  'Nume=' + x2 + '&' +
                  'Mine=' + x3 + '&' + 
                  'Dimensiune=' + x4 + '&' +
                  'Timp=' + x5
                                                })
            .then(function (data) {
                      console.log('Request succeeded with JSON response', data);
                                  })
            .catch(function (error) {
                      console.log('Request failed', error);
                                    });

})

document.getElementById("fetchUser").addEventListener("click", function(){
  let x = document.getElementById("buttDelPutIn");
  
  document.getElementById("rlyButtPut").disabled = false;
  //activam viitoare input-uri
  document.getElementById("idPutIn").disabled = false;
  document.getElementById("numPutIn").disabled = false;
  document.getElementById("minePutIn").disabled = false;
  document.getElementById("dimPutIn").disabled = false;
  document.getElementById("timpPutIn").disabled = false;
  //GET si incercam sa introducem valorile
  fetch('http://localhost:3000/Users', {
  method: 'get',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
  }
  }).then(
  function(response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }

    // Examine the text in the response
    response.json().then(function(data) {
      var A = [];
      A = data;
      for(let i = 0; i < A.length; i++){
        if(A[i].id == x.value){
          document.getElementById("idPutIn").value = A[i].id;
          document.getElementById("numPutIn").value = A[i].Nume;
          document.getElementById("minePutIn").value = A[i].Mine;
          document.getElementById("dimPutIn").value = A[i].Dimensiune;
          document.getElementById("timpPutIn").value = A[i].Timp;
        }
      }
    
    });
  }
 )
 .catch(function(err) {
  console.log('Fetch Error :-S', err);
 });
})

//myForm = setInterval(myFunction, 1000); 
//var a = document.createElement("div");
//a.setAttribute("class", "textPrompt");
//var c = myFunction();
//a.innerHTML += c;

var d = document.createElement("div");
var oop = document.getElementsByClassName("hugeForm")[0];
oop.appendChild(d);
//a.appendChild(d);



