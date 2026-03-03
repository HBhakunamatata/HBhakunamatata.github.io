let a = SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/search.json',
    searchResultTemplate: `<li class="border-bottom border-1 border-secondary p-2">
            <div class="container">
                <h3 class="pt-4 pb-4 mb-0">
                    <a class="post-title" href="{{ post.url | relative_url }}">
                        {{ post.title | escape }}
                    </a>
                </h3>
                
                <div class="d-flex flex-row ps-1">
                    <div class="d-flex pe-3"><i class="bi bi-calendar-minus-fill pe-1"></i> {{ post.date | date: date_format }}</div>
                    <div class="d-flex pe-3"><i class="bi bi-person-fill pe-1"></i>Bo Han</div>
                    <div class="d-flex pe-3">
                        <i class="bi bi-card-list pe-1"></i>
                        <ul class="list-inline">
                            {%- for category in post.categories -%}
                                <!-- <li class="list-inline-item badge rounded-pill text-bg-secondary">
                                    <a class="color-light" href="{{ site.baseurl }}/tags#{{ tag | slugify }}">{{ tag }}</a>
                                </li> -->
                                <li class="list-inline-item badge text-bg-secondary">{{ category }}</li>
                            {%- endfor -%}
                        </ul>
                    </div>
                    <div class="d-flex pe-3">
                        <i class="bi bi-tags-fill pe-1"> </i>
                        <ul class="list-inline">
                            {%- for tag in post.tags -%}
                                <li class="list-inline-item badge rounded-pill text-bg-secondary">{{ tag }}</li>
                            {%- endfor -%}
                        </ul>
                    </div>
                </div>
            </div>
        </li>`,
    fuzzy: true
})

let hash = window.location.hash.substring(1).replace("-arch", "")
console.log(hash)

if (hash) {
    console.log("Hash found: " + hash)
    let buttonElement = $(`button[aria-controls=${hash}]`)[0]
    let collapseElement = document.getElementById(hash)
    if (buttonElement && collapseElement) {
        console.log(buttonElement)
        buttonElement.classList.remove("collapsed")
        collapseElement.classList.add("show")
    }
}