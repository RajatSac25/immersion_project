const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const errorMsg = document.getElementById('errorMsg');
const results = document.getElementById('results');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const query = input.value.trim().toLowerCase();

  if (query === '') {
    errorMsg.textContent = 'Search field cannot be empty!';
    results.innerHTML = '';
    return;
  }

  errorMsg.textContent = '';
  results.innerHTML = 'Loading...';

  const API_URL = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`;

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      // Apply sorting
      const sortOption = sortSelect.value;
      if (sortOption === 'lowToHigh') {
        products.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'highToLow') {
        products.sort((a, b) => b.price - a.price);
      }

      if (!products.length) {
        results.innerHTML = '<p>No products found.</p>';
        return;
      }

      results.innerHTML = '';
      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}">
          <div class="product-info">
            <strong>${product.title}</strong>
            <span>Price: $${product.price}</span>
          </div>
        `;

        results.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      results.innerHTML = '<p>Something went wrong. Try again later.</p>';
    });
});
