import { filmsMock } from "./filmsMock.js";
import { fromStorage } from "./js/fromStorage.js";
import { sortAllFilmsByIsFavourite } from "./js/sortAllFilmsByIsFavourite.js";
import { sortFavouriteFilms } from "./js/sortFavouriteFilms.js";
import { toStorage } from "./js/toStorage.js";
import { renderFilmCard } from "./js/renderFilmCard.js";
import { renderFilmModal } from "./js/renderFilmModal.js";

const ALL_FILMS = "ALL_FILMS";
const FAVOURITE_FILMS = "FAVOURITE_FILMS";

if (!fromStorage(ALL_FILMS)) {
  toStorage(ALL_FILMS, filmsMock);
}

//Рисуем список фильмов
renderFilmsList(fromStorage(ALL_FILMS), ALL_FILMS);

// Функция рендера списка фильмов
function renderFilmsList(filmsList, listType) {
  const favouriteFilmsBtnHTML = document.querySelector(
    ".film-cards-container__favourite-films"
  );

  favouriteFilmsBtnHTML.insertAdjacentHTML(
    "afterend",
    `<div id='${listType}' class='film-cards-container'></div>`
  );
  const filmsContainerHTML = document.querySelector(".film-cards-container");

  //Отрисовка карточек фильов
  if (filmsList.length !== 0) {
    filmsList.forEach((film) => {
      renderFilmCard(film, filmsContainerHTML);
    });
  } else {
    filmsContainerHTML.innerHTML = "<div>Список фильмов пуст</div>";
  }

  // Слушатели добавления фильмов в избранное
  const likeBtns = document.querySelectorAll(".film-card__button");

  likeBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      handleLikeBtnClick(listType, i);
    });
  });

  //Слушатели открытия - закрытия модального окна
  const filmTitles = document.querySelectorAll(".film-card__title");
  filmTitles.forEach((title, i) => {
    title.addEventListener("click", () => {
      const clickedFilm = filmsList[i];
      renderFilmModal(clickedFilm, filmsContainerHTML);

      const closeModalBtnHTML = document.querySelector(".close-modal");
      closeModalBtnHTML.addEventListener(
        "click",
        () => {
          const modal = document.querySelector(".modal");
          modal.remove();
        },
        { once: true }
      );
    });
  });
}

const favouriteFilmsBtnHTML = document.querySelector(
  ".film-cards-container__favourite-films"
);

//Вызов функции - свитчерf списков
favouriteFilmsBtnHTML.addEventListener("click", () =>
  handleFilmsListSwitch(favouriteFilmsBtnHTML)
);

//Функция - свитчер списков
function handleFilmsListSwitch(switcherBtn) {
  const filmsContainerHTML = document.querySelector(".film-cards-container");
  const filmsCardContainerTitleHTML = document.querySelector(
    ".film-cards-container__title"
  );

  const favouriteFilms = fromStorage(ALL_FILMS).filter(
    ({ isFavourite }) => isFavourite
  );

  switch (filmsContainerHTML.id) {
    case ALL_FILMS:
      filmsCardContainerTitleHTML.innerHTML = "Favourite Films";
      switcherBtn.innerHTML = "See All Films";
      filmsContainerHTML.remove();
      renderFilmsList(favouriteFilms, FAVOURITE_FILMS);
      return;
    case FAVOURITE_FILMS:
      filmsCardContainerTitleHTML.innerHTML = "All Films";
      switcherBtn.innerHTML = "See Favourite Films";
      filmsContainerHTML.remove();
      renderFilmsList(fromStorage(ALL_FILMS), ALL_FILMS);
      return;
    default:
      return;
  }
}

function handleLikeBtnClick(listType, filmNumber) {
  const allFilms = fromStorage(ALL_FILMS);
  allFilms[filmNumber].isFavourite = !allFilms[filmNumber].isFavourite;

  const sortedAllFilms = sortAllFilmsByIsFavourite(allFilms);
  toStorage(ALL_FILMS, sortedAllFilms);

  const filmsListContainerHTML = document.getElementById(listType);
  filmsListContainerHTML.remove();

  switch (listType) {
    case ALL_FILMS:
      renderFilmsList(sortedAllFilms, listType);
      return;
    case FAVOURITE_FILMS:
      renderFilmsList(sortFavouriteFilms(allFilms), listType);
      return;
    default:
      return;
  }
}
