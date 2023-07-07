import { Router } from 'express';

import ProductManager from '../dao/managers/ProductManagerDb.js';
import CartManager from '../dao/managers/CartManagerDb.js';
const productManager = new ProductManager();
const cartManager = new CartManager();
const router = Router();

router.get('/', async (req, res) => {
  let products = await productManager.getProducts();
  return res.render('home', {
    title: 'Home',
    products: products
  })
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();

  return res.render("realTimeProducts", {
    title: "Real Time Products",
    products: products,
  });


});

router.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  try {
    const { products, totalPages } = await productManager.getProductsPage(
      {},
      null,
      limit,
      page
    );

    return res.render('products', {
      products,
      currentPage: page,
      totalPages,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages
    });
  } catch (err) {
    console.error('Error retrieving products:', err);
    return res.status(500).json({ error: 'Error retrieving products' });
  }
});

router.post('/products/:productId/add-to-cart', async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await productManager.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if cart exists, otherwise create a new one
    const carts = await cartManager.getCarts();
    let cart = carts[0];
    if (!cart) {
      cart = await cartManager.createCart();
    }

    // Add the product to the cart
    await cartManager.addProductToCart(cart._id, productId);

    return res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Error adding product to cart' });
  }
});

router.get('/chat', (req, res) => {
  res.render('chat');
})

export default router;
