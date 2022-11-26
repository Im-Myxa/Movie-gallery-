//Функция отрисовки карточки фильма
export function renderFilmCard(film, targetContainer) {
  const { imgUrl, movieName, releaseYear, isFavourite } = film;

  const btnImg = isFavourite ? "favourite.png" : "notFavourite.png";

  targetContainer.insertAdjacentHTML(
    "beforeend",
    `<div class='film-card'>
        <img class='film-card__poster' src='${imgUrl}'>
        <div class='film-card__title'>${movieName}</div>
        <div class='film-card__year'>${releaseYear}</div>
        <button class='film-card__button'>
          <img class='film-card__button-img' src='assets/img/${btnImg}'>
        </button>
      </div>`
  );
}
