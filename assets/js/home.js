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
    fuzzy: false
})

// 监听输入，清空时显示默认列表
let searchInput = document.getElementById('search-input');
let defaultContainer = document.getElementById('default-container');
let resultsContainer = document.getElementById('results-container');
let paginationContainer = document.getElementById('pagination');
searchInput.addEventListener('input', function() {
  if (this.value.trim() === '') {
    defaultContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
    resultsContainer.innerHTML = '';
    paginationContainer.style.display = 'block';
  } else {
    defaultContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    paginationContainer.style.display = 'none';
  }
});