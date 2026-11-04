document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("search-btn");
    const result = document.getElementById("result");
 
    // Strip characters used to inject markup (apostrophes are kept so "T'challa" works), then trim.
    function sanitize(value) {
        return value.replace(/[<>`]/g, "").trim();
    }
 
    function searchSuperheroes() {
        const query = sanitize(searchInput.value);
        // With an empty search box, request the plain list (no query param).
        const url = query === ""
            ? "superheroes.php"
            : "superheroes.php?query=" + encodeURIComponent(query);
 
        fetch(url)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Request failed with status " + response.status);
                }
                return response.text();
            })
            .then(function (html) {
                const notFound = html.toLowerCase().includes("superhero not found");
                result.classList.toggle("not-found", notFound);
                result.innerHTML = html;
            })
            .catch(function () {
                result.classList.add("not-found");
                result.textContent = "Something went wrong. Please try again.";
            });
    }
 
    searchBtn.addEventListener("click", searchSuperheroes);
 
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            searchSuperheroes();
        }
    });
});