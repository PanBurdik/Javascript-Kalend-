var listprojekt = [];
var listprehled = [];
var prehled = document.querySelector('a#a1');
var projekty = document.querySelector('a#a2');
let table2 = document.querySelector('table#table2');
var projekt_body = document.querySelector('#projekt_body');
var prehled_body = document.querySelector('#prehled_body');
var select = document.querySelector('#selecter')
var start = document.querySelector('#start')
var stop = document.querySelector('#stop')
var h1 = document.querySelector('#h1')

let intervalId="0";


prehled.addEventListener('click', function(e) {
    document.getElementById('page2').style.display = 'none';
    document.getElementById('a2').style.backgroundColor = 'yellow';
    document.getElementById('a1').style.backgroundColor = 'darkorange';
    document.getElementById('page1').style.removeProperty('display');
});

projekty.addEventListener('click', function(e) {
    document.getElementById('page1').style.display = 'none';
    document.getElementById('a1').style.backgroundColor = 'yellow';
    document.getElementById('a2').style.backgroundColor = 'darkorange';
    document.getElementById('page2').style.removeProperty('display');
});

var novyzaz1 = document.querySelector('a#novyzaz1');
var novyzaz2 = document.querySelector('a#novyzaz2');

novyzaz2.addEventListener('click',function () {
    var nazev2 = prompt("Přidej název projektu:", "Projekt");
    if(nazev2 !== ""){
        listprojekt.push(nazev2)
    }
    redraw();
});

function CreateStringDateTime(date){
    let monthSet = Number(date.getMonth() + 1);

    let returnedString = date.getDate() + "." + monthSet + "." + date.getFullYear();
    returnedString += CreateStringTime(date);
    return returnedString;
}

function CreateStringTime(date){
    let returnedString = "";
    let hou = date.getHours()-1;

    if(hou.toString().length === 1){
        returnedString += "  0" + hou + ":";
    }
    else{
        returnedString += "  " + hou + ":";
    }
    if(date.getMinutes().toString().length === 1){
        returnedString += "0" + date.getMinutes() + ":"
    }
    else{
        returnedString += date.getMinutes() + ":"
    }
    if(date.getSeconds().toString().length === 1){
        returnedString += "0" + date.getSeconds();
    }
    else{
        returnedString += date.getSeconds()
    }

    return returnedString;
}

function redraw() {
    let index = 0;
    projekt_body.innerHTML = "";
    select.innerHTML = "";
    listprojekt.forEach(function (dat){
        let celkemcas = 0;
        listprehled.forEach(function (pre){
            if(dat === pre.projekt)
            {
                celkemcas += pre.konec - pre.zacatek;
            }
        })
        let newtr = document.createElement('tr');
        let tdname = document.createElement('td');
        let tdtime = document.createElement('td');
        let tdnevim = document.createElement('td');
        let selecto = document.createElement('option');
        tdname.innerHTML=dat;
        tdtime.innerHTML=CreateStringTime(new Date(celkemcas));
        tdnevim.innerHTML="<a id='smazat'>Smazat</a>";
        selecto.innerHTML=dat;
        let index2 = index;
        newtr.appendChild(tdname);
        newtr.appendChild(tdtime);
        newtr.appendChild(tdnevim);
        newtr.querySelector('#smazat').addEventListener('click', function () {
            deleteprojekt(index2);
        })
        select.appendChild(selecto);
        projekt_body.appendChild(newtr);
        index++;
    })
}

function redraw2(){
    let index = 0;
    prehled_body.innerHTML = "";
    listprehled.forEach(function (dat){
        let newtr = document.createElement('tr');
        let tdukol = document.createElement('td');
        let tdprojekt = document.createElement('td');
        let tdstart = document.createElement('td');
        let tdstop = document.createElement('td');
        let tdcelekem = document.createElement('td');
        let tdakce = document.createElement('td');
        tdukol.innerHTML=dat.nazev;
        tdprojekt.innerHTML=dat.projekt;
        tdstart.innerHTML=CreateStringDateTime(dat.zacatek);
        tdstop.innerHTML=CreateStringDateTime(dat.konec);
        tdcelekem.innerHTML= CreateStringTime(new Date(dat.konec - dat.zacatek));
        tdakce.innerHTML="Odstranit";
        let index2 = index;
        newtr.appendChild(tdukol);
        newtr.appendChild(tdprojekt);
        newtr.appendChild(tdstart);
        newtr.appendChild(tdstop);
        newtr.appendChild(tdcelekem);
        newtr.appendChild(tdakce);
        //newtr.querySelector('#smazat').addEventListener('click', function () {
          //  deleteprojekt(index2);
        //})
        prehled_body.appendChild(newtr);
        index++;

    })
    redraw();
}

function deleteprojekt(index2) {
    let newpole = [];
    let indexer = 0;
    listprojekt.forEach(function (pro) {
        if(index2 !== indexer){
            newpole.push(pro);
        }
        indexer++;
    })
    listprojekt = newpole;
    redraw();
}

let counterText = document.querySelector('#h1');

let startDate = null;
let counterIntervalId = 0;

start.addEventListener('click', function () {
    startDate = new Date();

    counterIntervalId = setInterval(function () {
        let now = new Date();
        stop.disabled = false;

        let rozdil = Date.now() - startDate.getTime();
        let rozdilData = new Date(rozdil);

        refreshCounter(rozdilData);

    }, 10);

});

stop.addEventListener('click', function () {
    let end = new Date();
    clearInterval(counterIntervalId);
    stop.disabled = true;
    h1.innerHTML="00:00:00";
    let prehled = {
        nazev: text.value,
        projekt: select.value,
        zacatek: startDate,
        konec: end
    }
    listprehled.push(prehled);
    redraw2();
});

function refreshCounter(d) {
    counterText.innerHTML = '';
    counterText.innerHTML += d.getUTCHours();
    counterText.innerHTML += ':';
    counterText.innerHTML += d.getMinutes();
    counterText.innerHTML += ':';
    counterText.innerHTML += d.getSeconds();

}
