require("@babel/polyfill");
import Search from "./model/search";
import { elements, loadingIconShow, clearLoadingIcon } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import List from "./model/List";
import * as listView from "./view/listView";
import {
	renderRecipe,
	clearRecipe,
	highlightSelectedRecipe,
} from "./view/recipeView";

/*
 * Web app төлөв
 * Хайлтын query, үр дүн
 * Тухайн үзүүлж байгаа жор
 * Лайкласан жорууд
 * Захиалж байгаа жорын найрлага
 */

const state = {};

const controlSearch = async () => {
	// 1 webees hailtiin tulhuur ugiig gargaj avna
	const query = searchView.getInput();

	if (query) {
		// 2 shineer hailtiin obiektiig uusgej ugnu
		state.search = new Search(query);
		// 3 hailt hiihed zoriulj UI beltgene
		searchView.clearSearchQuery();
		searchView.clearSearchResult();
		loadingIconShow(elements.searchResultDiv);

		// 4 hailtiig guitsetgene
		await state.search.doSearch();

		// 5 hailtiin ur dung delgetsend gargana
		clearLoadingIcon();
		if (state.search.result === undefined) alert("hailtaar ilertsgui");
		else searchView.renderRecipes(state.search.result);
		//
	}
};

elements.searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	controlSearch();
});

elements.pageButtons.addEventListener("click", (e) => {
	const btn = e.target.closest(".btn-inline");

	if (btn) {
		const gotoPageNumber = parseInt(btn.dataset.goto, 10);
		searchView.clearSearchResult();
		searchView.renderRecipes(state.search.result, gotoPageNumber);
	}
});

const r = new Recipe(47746);
r.getRecipe();

const controlRecipe = async () => {
	const id = window.location.hash.replace("#", "");

	if (id) {
		state.recipe = new Recipe(id);

		clearRecipe();
		loadingIconShow(elements.recipeDiv);
		highlightSelectedRecipe(id);

		await state.recipe.getRecipe();

		clearLoadingIcon();

		state.recipe.calcTime();
		state.recipe.calcHuniiToo();

		renderRecipe(state.recipe);
	}
};

["hashchange", "load"].forEach((e) =>
	window.addEventListener(e, controlRecipe)
);

const controlList = () => {
	state.list = new List();
	listView.clearItems();
	state.recipe.ingredients.forEach((n) => {
		//nairlagiig model ruu hiine
		state.list.addItem(n);
		// nairlagiig delgetsend gargana
		listView.renderItem(n);
	});
};

elements.recipeDiv.addEventListener("click", (e) => {
	if (e.target.matches(".recipe__btn, .recipe__btn *")) {
		controlList();
	}
});
