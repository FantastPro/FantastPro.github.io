$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    })
})

function getMovies( searchText ) {
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=17163020&s=' + searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                <div class="col-lg-3">
                    <div class="well text-center">
                      <img src="${movie.Poster}">
                      <h5>${movie.Title}</h5>
                      <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Подробнее</a>
                    </div>
                </div>
                `;
            });

            $('#movies').html(output);

        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com/?&apikey=17163020&i=' + movieId)
        .then((response) => {
            console.log(response);
            let movie = response.data

            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Жанр:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Год выпуска:</strong> ${movie.Released}</li>
                            <li class="list-group-item"><strong>Возраст:</strong> ${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Рейтинг:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Режиссер:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Сценарий:</strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>Актеры:</strong> ${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Сюжет</h3>
                        ${movie.Plot}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Посмотреть на imDB</a>
                        <a href="index.html" class="btn btn-secondary">Обратно на страницу поиска</a>
                    </div>
                </div>
            `;

            $('#movie').html(output);

        })
        .catch((err) => {
            console.log(err);
        });
}