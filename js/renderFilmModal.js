//Функция отрисовки модального окна с фильмом
export function renderFilmModal(clickedFilm, targetContainer) {
  const { imgUrl, movieName, releaseYear, isFavourite, description } =
    clickedFilm;
  const btnImg = isFavourite ? "favourite.png" : "notFavourite.png";

  targetContainer.insertAdjacentHTML(
    "afterEnd",
    `<div class="modal">
        <div class="modal-content">
          <div class="close-modal">
            <img class="close-modal-icon" src="assets/img/cross.png"/>
          </div>
            <img class="film-card__poster" src="${imgUrl}">
            <div class="film-card__title">${movieName}</div>
            <div class="film-card__year">${releaseYear}</div>
            <div class="film-card__description">${description}</div>
            <button class="film-card__button">
              <img class="film-card__button-img" src="assets/img/${btnImg}">
            </button>      
        </div>
      </div>`
  );
}
