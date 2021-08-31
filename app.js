
// global variabla 
const errText = document.getElementById('err-text2');
const parent = document.getElementById('player-parent');
const inputField = document.getElementById('search-input');
const loader = document.getElementById('loader');

const players = ['Lionel Messi', 'Neymar', 'Mohamed Salah', 'ristiano Ronaldo','Kylian Mbappé', 'Angel Di Maria','Antoine Griezmann','Zlatan Ibrahimovic','Paul Pogba','Mesut Ozil'];
players.forEach(player => {
    loadData(player);
})

// loader controling function 

window.addEventListener('load', () => {
    loader.style.display = 'none';
})
  
// search with press enter button 
inputField.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        searchTextReady()
    }
})

// search text validation function 
function searchTextReady() {
    const searchText = inputField.value;
    const errP = document.getElementById('err-text');
    if (searchText) {
        loadData(searchText);
        inputField.style.border = 'none'
        errP.classList.add('d-none');
    }
    else {
        inputField.style.border = '2px solid red'
        errP.classList.remove('d-none');
        errText.classList.add('d-none')
    }
    inputField.value = ""
    parent.innerHTML = '';
}

// load data function 
function loadData(playername) {
    loader.style.display = 'block';
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${playername}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.player === null) {
                loader.style.display = 'none'
                errText.classList.remove('d-none');
            } else {
                displayPlayer(data.player)
                errText.classList.add('d-none');
            }
        })
        .catch(err=>{})
}

// displey player 
function displayPlayer(players) {
    loader.style.display = 'none';
    players.forEach(player => {
        if (player.strGender === "Male" && player.strSport === "Soccer" &&  player.strCutout !== null) {
            createPlayer(player)
        }    
    });
}

// create player div 
function createPlayer(player) {
    const div = document.createElement('div');
    div.className = 'col player';
    const img = document.createElement('img');
    img.className = 'img-fluid';
    img.style.maxHeight = '300px';
    img.src = player.strCutout ? player.strCutout : "./img/img.jpg";
    
    const h3 = document.createElement('h3');
    h3.innerText = player.strPlayer;
    h3.className = 'mt-3 mb-2';

    const p = document.createElement('p');
    p.innerText = player.strNationality;

    const btn = document.createElement('button');
    btn.innerText = 'see more...';
    btn.className = 'btn btn-outline-secondary';

    btn.setAttribute('data-bs-toggle', 'modal');
    btn.setAttribute('data-bs-target', '#modal');
    btn.setAttribute('type', 'button')
    const jsonData = JSON.stringify(player);
    btn.setAttribute('onclick', `showDetails(${jsonData})`)

    div.appendChild(img);
    div.appendChild(h3)
    div.appendChild(p)
    div.appendChild(btn)
    parent.appendChild(div);
}

// show deatail function 
function showDetails(player) {
    document.querySelector('.modal-title').innerText = player.strPlayer;
    const modalImg = document.getElementById('modal-img');
    if (player.strCutout == null) {
            modalImg.src = "./img/img.jpg";
    } else {
            modalImg.src = player.strCutout;
    }
    document.getElementById('player-info').innerHTML = `
    <h3>Name : ${player.strPlayer}</h3>
    <h5>Country : ${player.strNationality}</h5>

    <p>Location : ${player.strBirthLocation}</p>
    <p>Date of Birth : ${player.dateBorn ? player.dateBorn : 'NO' }</p>
    <p>National Team : ${player.strNationality}</p>
    <p>Club Team : ${player.strTeam ? player.strTeam : 'No Team Found'}</p>
    <p>Sport type: ${player.strSport ? player.strSport : 'Not Found'}</p>
    <p>Jersi Number : ${player.strNumber ? player.strNumber : '00'}</p>
    <p>Height: ${player.strHeight}</p>
    <p>Weight: ${player.strWeight?player.strWeight:'not found'}</p>
    <p>Gender: ${player.strGender}</p>

    <a class="btn btn-primary" target="_blank" href=https://${player.strFacebook}>Facebook</a>
    <a class="btn btn-primary" target="_blank" href=https://${player.strInstagram}>Instagram</a>
    `;
}


