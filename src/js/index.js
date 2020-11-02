require("@babel/polyfill");
import Search from './model/Search';
import { elements } from './view/base'
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
        // 4. Хайлтыг гүйцэтгэнэ
        await state.search.doSearch();
        // 5. Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
        if (state.search.result === undefined) alert('Хайлтаар илэрцгүй....')
        searchView.renderRecipes(state.search.result)
    }
}

elements.searchFrom.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});