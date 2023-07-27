//Carrousel utils

var isAnimating = false;

function scrollLeftAnimate(elem, unit) {

    if (!elem || isAnimating) {
        return;
    }

    var time = 300;
    var from = elem.scrollLeft;
    var aframe = 10;
    isAnimating = true;

    var start = new Date().getTime(),
        timer = setInterval(function () {
            var step = Math.min(1, (new Date().getTime() - start) / time);
            elem.scrollLeft = ((step * unit) + from);
            if (step === 1) {
                clearInterval(timer);
                isAnimating = false;
            }
        }, aframe);
}

function initDealCarrousel(dealCarrouselID) {
    var target = document.querySelector("#" + dealCarrouselID + " .va-carrousel-flexbox");
    var cardOutterWidth;
    var maxCarrouselScroll;

    function updateUpaCarrouselInfo() {
        cardOutterWidth = document.querySelector("#" + dealCarrouselID + " .va-card").offsetWidth; //you can define how far the scroll
        maxCarrouselScroll = (document.querySelectorAll("#" + dealCarrouselID + " .va-card").length *
                cardOutterWidth) - document.querySelector("#" + dealCarrouselID + " .va-carrousel-flexbox")
            .clientWidth;
    }

    document.querySelector("#" + dealCarrouselID + " .deals-scroll-left").addEventListener("click",
        function () {
            updateUpaCarrouselInfo();
            if (target.scrollLeft > 0) {
                scrollLeftAnimate(target, -cardOutterWidth * 2);
            }
        }
    );

    document.querySelector("#" + dealCarrouselID + " .deals-scroll-right").addEventListener("click",
        function () {
            updateUpaCarrouselInfo();
            if (target.scrollLeft < maxCarrouselScroll) {
                scrollLeftAnimate(target, cardOutterWidth * 2);
            }
        }
    );
}

//Get ressources utils

async function getMovie(endpoint) {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const item = data.results[0];
        createItem(item);
    } catch (error) {
        console.error(error);
    }
}

async function getMovieList(endpoint, theme) {
    try {
        const response_one = await fetch(endpoint);
        const data_one = await response_one.json();
        const items_one = data_one.results;
        createCarouselItems(items_one, theme);

        const response_two = await fetch(endpoint + "&page=2");
        const data_two = await response_two.json();
        const items_two = data_two.results;
        createCarouselItems(items_two, theme);
    } catch (error) {
        console.error(error);
    }
}

//Insert data utils

function createItem(product) {
    const container_img = document.getElementById("best_movie_img");
    const container_data = document.getElementById("best_movie_data");
    
    const link = document.createElement('a');
    const img = document.createElement('img');
    link.classList.add('link-plain');
    img.classList.add('best-movie');
    img.src = product.image_url;
    link.appendChild(img);
    img.alt = product.title;
    container_img.appendChild(link);
    
    const title = document.createElement('h1');
    title.textContent = product.title;

    const bouton = document.createElement('bouton');
    bouton.textContent = product.title;
    
    const directors = document.createElement('p');
    directors.textContent = "Directors : " + product.directors;
    
    const year = document.createElement('p');
    year.textContent = "Year : " + product.year;

    const score = document.createElement('p');
    score.textContent = "Score : " + product.imdb_score;
    
    const votes = document.createElement('p');
    votes.textContent = "Votes : " + product.votes;

    const actors = document.createElement('p');
    actors.textContent = "Actors : " + product.actors;
    
    const writers = document.createElement('p');
    writers.textContent = "Writers : " + product.writers;
    
    const genres = document.createElement('p');
    genres.textContent = "Genres : " + product.genres;
    
    container_data.appendChild(title);
    container_data.appendChild(bouton);
    container_data.appendChild(directors);
    container_data.appendChild(year);
    container_data.appendChild(score);
    container_data.appendChild(votes);
    container_data.appendChild(actors);
    container_data.appendChild(writers);
    container_data.appendChild(genres);
}

function createCarouselItems(products, theme) {
    const container = document.getElementById("va-carrousel-flexbox-" + theme);

    for (let product of products) {
        const cardDiv = document.createElement('div');
        const img = document.createElement('img');

        cardDiv.classList.add('va-card');
        img.classList.add('va-thumbnail');
        img.src = product.image_url;
        img.alt = product.title;

        img.addEventListener('click', () => openModal(product));

        cardDiv.appendChild(img);
        container.appendChild(cardDiv);
    }
}

function openModal(product) {
    const dialog = document.getElementById('dialog');
    const modale = document.getElementById('modale');
    
    const title = document.getElementById("modal-title");
    title.textContent = product.title;
    
    const directors = document.getElementById("modal-directors");
    directors.textContent = "Directors : " + product.directors;
    
    const year = document.getElementById("modal-year");
    year.textContent = "Year : " + product.year;

    const imdb_score = document.getElementById("modal-imdb_score");
    imdb_score.textContent = "Score : " + product.imdb_score;

    const votes = document.getElementById('modal-votes');
    votes.textContent = "Votes : " + product.votes;

    const actors = document.getElementById('modal-actors');
    actors.textContent = "Actors : " + product.actors;

    const writers = document.getElementById('modal-writers');
    writers.textContent = "Writers : " + product.writers;

    const genres = document.getElementById('modal-genres');
    genres.textContent = "Genres : " + product.genres;
    
    // Répétez pour les autres détails du produit...

    dialog.showModal();

    const hideDialog = document.getElementById('close-dialog');
    hideDialog.addEventListener('click', () => {
        dialog.close();
    });

    dialog.addEventListener('click', ( e ) => {
        if ( e.target.tagName === 'DIALOG' ) {
            dialog.close();
        }
    });
}


// main script

initDealCarrousel('va_container_best_movies');
initDealCarrousel('va_container_adventure');
initDealCarrousel('va_container_animation');
initDealCarrousel('va_container_action');

const best_movie = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score';
const movie_list_adventure = 'http://localhost:8000/api/v1/titles/?genre=Adventure&sort_by=-imdb_score';
const movie_list_animation = 'http://localhost:8000/api/v1/titles/?genre=Animation&sort_by=-imdb_score';
const movie_list_action = 'http://localhost:8000/api/v1/titles/?genre=Action&sort_by=-imdb_score';

getMovie(best_movie);
getMovieList(best_movie, "best-movies");
getMovieList(movie_list_adventure, "adventure");
getMovieList(movie_list_animation, "animation");
getMovieList(movie_list_action, "action");
