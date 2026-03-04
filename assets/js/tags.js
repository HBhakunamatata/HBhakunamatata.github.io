$(document).ready(function () {
    let hash = window.location.hash.substring(1).replace("-arch", "")
    if (hash) {
        console.log(hash)
        showTarget(hash)
    }

    // let buttons = $("button[aria-controls]")
    let asideCategories = $(".aside-tag")
    asideCategories.each(function (index, item) {
        $(item).on("click", function (e) {
            e.preventDefault()
            console.log(item.textContent.trim())
            showTarget(`${item.textContent.trim().toLowerCase()}`)

            // collapse other categories
            $(`button[aria-controls]`).not(`button[aria-controls=${item.textContent.trim().toLowerCase()}]`).each(function (index, item) {
                item.classList.add("collapsed")
                document.getElementById(item.getAttribute("aria-controls")).classList.remove("show")
            })
        });
    });
});

function showTarget(target) {
    let buttonElement = $(`button[aria-controls=${target}]`)[0]
    let collapseElement = document.getElementById(target)
    if (buttonElement && collapseElement) {
        buttonElement.classList.remove("collapsed")
        collapseElement.classList.add("show")
    }
}

function collapseTarget(target) {
    let buttonElement = $(`button[aria-controls=${target}]`)[0]
    let collapseElement = document.getElementById(target)
    if (buttonElement && collapseElement) {
        buttonElement.classList.add("collapsed")
        collapseElement.classList.remove("show")
    }
}