document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const productId = button.dataset.productId;
      try {
        await fetch(`/products/${productId}/add-to-cart`, { method: 'POST' });
        alert('Product added to cart successfully');
      } catch (error) {
        alert('Error adding product to cart');
        throw new Error('Error adding product to cart: '  + err.message);
      }
    });
  });

  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
      const currentPage = parseInt(target.dataset.currentPage);
      const nextPage = target.id === 'next-page-btn' ? currentPage + 1 : currentPage - 1;
      navigateToPage(nextPage);
    }
  });

  function navigateToPage(page) {
    window.location.href = `/products?page=${page}`;
  }
});




