export const elements = {
	searchForm: document.querySelector(".search"),
	searchInput: document.querySelector(".search__field"),
	searchResultList: document.querySelector(".results__list"),
	searchResultDiv: document.querySelector(".results"),
	pageButtons: document.querySelector(".results__pages"),
	recipeDiv: document.querySelector(".recipe"),
	shoppingList: document.querySelector(".shopping__list")
};

export const elementStrings = {
	loader: "loader",
};

export const clearLoadingIcon = () => {
	const loader = document.querySelector(`.${elementStrings.loader}`);
	if (loader) loader.parentElement.removeChild(loader);
};

export const loadingIconShow = (parent) => {
	const loader = `
        <div class="${elementStrings.loader}">
            <svg>
            <use href="img/icons.svg#icon-cw"</use>
            </svg>
        </div>
    `;

	parent.insertAdjacentHTML("afterbegin", loader);
};


