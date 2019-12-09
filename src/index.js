import "./static/css/style.scss";

class Model {
    constructor() {
        this.apiUrl = process.env.API_URL;
        this.apiKey = process.env.API_KEY;
        this.news = [];
        this.currentOffset = 0;
        this.lang = "en";
        this.category = "";
        this.type = "top-headlines";
        this.sources = [];
        this.source = "";
    }

    static get options() {
        return {
            newsOffset: 5,
            newsLimit: 40
        }
    }

    get url() {
        const baseUrl = `${this.apiUrl}/${this.type}`;
        const params = [
            `&language=${this.lang}`,
            `&category=${this.category}`,
            `&sources=${this.source}`
        ];

        return `${baseUrl}?apiKey=${this.apiKey}&pageSize=40${params.join("")}`;
    }

    async fetch() {
        const response = await fetch(this.url);

        const json = await response.json();
        this.news = json.articles;

        this.currentOffset = 0;
    }

    async search(request) {
        const response = await fetch(`${this.url}&q=${request}`);

        const json = await response.json();
        this.news = json.articles;

        this.currentOffset = 0;
    }

    async fetchSources() {
        const baseUrl = `${this.apiUrl}/sources`;
        const response = await fetch(
            `${baseUrl}?apiKey=${this.apiKey}`
        );

        const json = await response.json();
        this.sources = json.sources;

        this.currentOffset = 0;
    }

    loadMore(callback) {
        if (this.currentOffset + Model.options.newsOffset < Model.options.newsLimit) {
            this.currentOffset += Model.options.newsOffset;
            callback();
        }
    }

    get currentNews() {
        return this.news.slice(
            this.currentOffset,
            this.currentOffset + Model.options.newsOffset
        );
    }
}

class View {
    constructor() {
        this.model = new Model();
    }
    async initialRender() {
        const model = this.model;
        await model.fetch();
        await model.fetchSources();

        const fragment = document.createDocumentFragment();

        const appBar = this.renderAppBar();
        fragment.appendChild(appBar);

        const newsContainer = document.createElement("div");
        newsContainer.id = "news-container";
        const renderedNews = model.currentNews.map(View.renderItem);
        renderedNews.forEach((item) => {
            newsContainer.appendChild(item);
        });
        fragment.appendChild(newsContainer);

        const loadMoreBtn = document.createElement("button");
        loadMoreBtn.innerText = "Load More";

        const loadMoreContainer = document.createElement("div");
        loadMoreContainer.className = "load-more-container";
        loadMoreContainer.appendChild(loadMoreBtn);

        loadMoreBtn.addEventListener("click", (e) => {
            model.loadMore(() => this.renderNews());
        });

        fragment.appendChild(loadMoreContainer);

        document.querySelector("#root").appendChild(fragment);
    }

    renderNews(shouldReplace) {
        const model = this.model;

        const newsContainer = document.querySelector("#news-container");

        if (shouldReplace) {
            newsContainer.innerHTML = "";
        }

        const fragment = document.createDocumentFragment();

        const renderedNews = model.currentNews.map(View.renderItem);
        renderedNews.forEach((item) => {
            fragment.appendChild(item);
        });

        newsContainer.appendChild(fragment);
    }

    static renderItem(item) {
        if (item.urlToImage === null) {
            item.urlToImage = require("./static/pics/placeholder.png");
        }
        const newsItem = document.createElement("div");
        newsItem.className = "news-item";
        newsItem.innerHTML = `
            <div class="image-container">
                <img src="${item.urlToImage}" />
            </div>
            <div class="text-container">
                <div class="title">${item.title || "..."}</div>
                <div class="description">${item.description || "No Description"}</div>
                <div class="link-container">
                    <a href="${item.url}" target="_blank">
                        Read more
                    </a>
                </div>
            </div>
        `;

        newsItem.addEventListener("click", () => {
            location.href = item.url;
        });

        return newsItem;
    }

    renderSourcesDropdown() {
        const dropdown = document.createElement("select");

        const emptyOption = document.createElement("option");
        emptyOption.setAttribute("value", "");
        emptyOption.innerText = "---";
        dropdown.appendChild(emptyOption);

        this.model.sources.forEach((source) => {
            const option = document.createElement("option");
            option.setAttribute("value", source.id);
            option.innerText = source.name;
            dropdown.appendChild(option);
        });

        dropdown.addEventListener("change", async (e) => {
            this.model.source = e.currentTarget.value;
            await this.model.fetch();
            this.renderNews(true);
        });

        return dropdown;
    }

    renderLangDropdown() {
        const languages = [
            "en",
            "ru",
            "fr",
            "it",
            "de",
            "jp"
        ];

        const dropdown = document.createElement("select");

        languages.forEach((category) => {
            const option = document.createElement("option");
            option.setAttribute("value", category);
            option.innerText = category;
            dropdown.appendChild(option);
        });

        dropdown.addEventListener("change", async (e) => {
            this.model.lang = e.currentTarget.value;
            await this.model.fetch();
            this.renderNews(true);
        });

        return dropdown;
    }

    renderSearchControls() {
        const container = document.createElement("div");
        container.className = "search-controls-container";

        const searchInput = document.createElement("input");
        searchInput.type = "search";

        const searchBtn = document.createElement("button");
        searchBtn.className = "search-button";
        searchBtn.innerText = "Search";

        container.appendChild(searchInput);
        container.appendChild(searchBtn);

        searchInput.addEventListener("keypress", async (e) => {
            const keyCode = e.which || e.keyCode;
            if (keyCode === 13) {
                await this.model.search(e.currentTarget.value);
                this.renderNews(true);
            }
        });

        searchBtn.addEventListener("click", async (e) => {
            await this.model.search(searchInput.value);
            this.renderNews(true);
        });

        return container;
    }

    renderAppBar() {
        const appBar = document.createElement("div");
        appBar.className = "app-bar";

        const searchInput = this.renderSearchControls();
        appBar.appendChild(searchInput);

        const categoriesDropdown = this.renderSourcesDropdown();
        appBar.appendChild(categoriesDropdown);

        const langDropdown = this.renderLangDropdown();
        appBar.appendChild(langDropdown);

        return appBar;
    }
}

const view = new View();
view.initialRender();
