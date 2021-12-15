const key = "130168a9939546c99e335768f420c8d5";
const SEARCH_API = 'https://api.rawg.io/api/games?key=130168a9939546c99e335768f420c8d5&videogameAutocomplete?q='

let today, threeMA, nextYear = "";

const InitializeDate = () => {

    //Todays Date
    today = new Date().toISOString().slice(0, 10);


    // Calculate Three months ago, so we later can get more newly released games
    let arrToday = today.split(/[--]/);
    let minusthreeM = parseInt(arrToday[1]) - 2;

    if (parseInt(arrToday[2]) > 28) arrToday[2] = parseInt(arrToday[2]) - 2;
    if (minusthreeM.toString().length === 1)
        minusthreeM = `0${minusthreeM}`;

    arrToday[1] = minusthreeM;
    threeMA = arrToday.join("-");


    // Calculate 12 Months forward, so we later can get more upcoming games
    arrToday = today.split(/[--]/);
    if (parseInt(arrToday[2]) > 28) arrToday[2] = parseInt(arrToday[2]) - 3;
    const plusOneYear = parseInt(arrToday[0]) + 1;
    arrToday[0] = plusOneYear;
    nextYear = arrToday.join("-");
};


InitializeDate();


const fetchNewGames = async () => {

    const response = await fetch(
        `https://api.rawg.io/api/games?key=${key}&dates=${threeMA},${today}&ordering=-rating`
    );
    const data = await response.json();
    console.log(data)
    fetchGamesList(data);
};

const fetchTrendGames = async () => {

    const response = await fetch(
        `https://api.rawg.io/api/games?key=${key}&movies&ordering=-rating`
    );
    const data = await response.json();
    console.log(data)
    fetchGamesList(data);
};



const fetchTopGames = async () => {
    const response = await fetch(
        `https://api.rawg.io/api/games?key=${key}&ordering=-added`
    );
    const data = await response.json();
    console.log(data)
    fetchGamesList(data);
};

const fetchUpcomingGames = async () => {
    const response = await fetch(
        `https://api.rawg.io/api/games?key=${key}&dates=${today},${nextYear}&ordering=-added`
    );
    const data = await response.json();
    console.log(data)
    fetchGamesList(data);
};

// // DOM
const buttons = document.querySelectorAll(".btn");
const movieList = document.querySelector(".games");

const handleUpdate = (e) => {
    if (!e.target.classList.contains("selected")) {
        // styling
        movieList.innerHTML = "";
        for (let i = 0; i < buttons.length; i++)
            buttons[i].classList.remove("selected");
        e.target.classList.add("selected");

        // fetch data
        if (e.target.dataset.name === "top-games") {
            fetchTopGames();
        } else if (e.target.dataset.name === "upcoming-games") {
            fetchUpcomingGames();
        } else if (e.target.dataset.name === "trending-games") {
            fetchTrendGames();
        } else {
            fetchNewGames();
        }
    }
};

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", handleUpdate);
}

const fetchGamesList = (data) => {
    const e = data.results; // Each "e" is an object containing information of a game
    for (let i = 0; i < e.length; i++) {
        movieList.innerHTML += `
        <div class="game">
        <img class="screenshot" src="${e[i].short_screenshots[0].image}" alt="screenshot of game" />
      <div class="game-info">
            <h4 class="game-name">${e[i].name}</h4>
            <h4 class="released">Release: ${e[i].released}</h4>
            <h4 class="released">Release: ${e[i].genres[0].name}</h4>
            <h4 class="score">Score: ${e[i].rating}</h4>
      </div>
      </div>
      `;
    }
};

fetchNewGames();

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})