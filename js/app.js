(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $title.tooltip({ delay: 50 }).text(movie.Title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.imdbID}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.imdbID
    );
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.Title);
      const $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
      const $modalText = $('<p>').text(movie.Plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
    console.log(movies[0]);
  };

 

  // ADD YOUR CODE HERE

const keyURL = "https://omdb-api.now.sh/?s=";
let searchButton = document.getElementById("search-button");
searchButton.addEventListener('click', function fetchMovies(event) {
  event.preventDefault();
  while(movies.length > 0) {
    movies.pop();
}
  let searchInput = document.getElementById('search').value;
  let searchString = keyURL + searchInput;
  let movie;
  if (searchInput) {
    fetch(searchString)
    .then((response) => response.json())
    .then((data)=> {movie = data;
      console.log(movie);
      console.log(movie.length);
      for (let i = 0; i < movie.Search.length; i++) {
        movies.push(movie.Search[i]);
      }
      // for (let i in movie.Search) {
        
      // };
      console.log(movies);
      renderMovies()})
  }
   
    
});
  
})();
