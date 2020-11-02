require("@babel/polyfill");
import Search from './model/Search';
import { elements, renderLoader, clearLoader } from './view/base'
import * as searchView from './view/searchView';


let search = new Search('pasta');
/*
Web app төлөв
-Хайлтын query, үр дүн
- Тухайн үзүүлж байгаа жор
-Лайклсан жорууд
-Захиалж байгаа жорын найрлагууд
*/

const state = {};

const controlSearch = async() => {
    // 1. Вебээс хайлтын түрхүүр үгийг гаргаж авна.
    const query = searchView.getInput();

    if (query) {
        // 2. Шинээр хайлтын obj үүсгэж өгнө.
        state.search = new Search(query);
        // 3. Хайлт хийхэд зориулж дэлгэцийн UI - ыг бэлтгэнэ.
        searchView.clearSearchQuery();
        searchView.clearSearchResult();
        renderLoader(elements.searchResultDiv);
        // 4. Хайлтыг гүйцэтгэнэ
        await state.search.doSearch();
        // 5. Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
        clearLoader();
        if (state.search.result === undefined) alert('Хайлтаар илэрцгүй....');
        else searchView.renderRecipes(state.search.result);
    }
}

elements.searchFrom.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.pageButtons.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');

    if (btn) {
        const gotoPageNumber = parseInt(btn.dataset.goto, 10);
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.result, gotoPageNumber);
    }
});