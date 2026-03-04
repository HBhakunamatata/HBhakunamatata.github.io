let a = SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/search.json',
    searchResultTemplate: `<li class="border-bottom border-1 border-secondary p-2">
            <div class="container pb-1">
                <h3 class="pt-3 pb-4 m-0">
                    <a class="post-title" href="{url}">
                        {title}
                    </a>
                </h3>
                
                <div class="d-flex flex-row ps-1">
                    <div class="d-flex pe-3"><i class="bi bi-calendar-minus-fill pe-1"></i> {date}</div>
                    <div class="d-flex pe-3"><i class="bi bi-person-fill pe-1"></i>Bo Han</div>
                    <div class="d-flex pe-3">
                        {categories}
                    </div>
                    <div class="d-flex pe-3">
                        {tags}
                    </div>
                </div>
            </div>
        </li>`,
    fuzzy: true
})