$(document).ready(function () {
  let container = $("#popular-container");

  // Ensure the container is cleared before fetching new data
  container.empty();

  // Fetch the popular items dynamically from the server
  $.getJSON("/api/popular", function (popularItems) {
    container.empty(); // Clear container again just in case

    for (let item of popularItems) {
      let colDiv = $("<div>").addClass("col-md-4");
      let card = `
        <div class="card mb-3">
            <a href="/view/${item.id}">
                <img src="${item.image}" class="card-img-top" alt="${item.title}">
            </a>
          <div class="card-body">
            <h5 class="card-title">
                <a href="/view/${item.id}" class="card-title">${item.title}</a>
            </h5>
            <a href="/view/${item.id}" class="btn btn-primary">View</a>
          </div>
        </div>
      `;
      colDiv.html(card);
      container.append(colDiv);
    }
  }).fail(function () {
    container.html("<p>Error loading popular items.</p>");
  });

  // Prevent whitespace-only searches
  $("#searchForm").submit(function (event) {
    let searchInput = $("#searchInput");
    let query = searchInput.val().trim(); // Trim whitespace

    if (query === "") {
      event.preventDefault(); // Stop form submission
      searchInput.val(""); // Clear input field
      searchInput.focus(); // Keep focus in the search bar
    }
  });
});
