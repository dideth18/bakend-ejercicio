const db = require('../db');

// --- CREATE ---
// Crear un nuevo producto (POST /api/products)
exports.createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
            [name, description, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
}

exports.getProducts = async (req, res) => { 
    try {
        const result = await db.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

// --- READ ---
// Obtener todos los productos (GET /api/products)

//Conteo de los productos
exports.countProducts = async (req, res) => {
  try {
    const result = await db.query('SELECT COUNT(*) FROM products');
    res.status(200).json({ total: result.rows[0].count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al contar productos' });
  }
};

//Sumatoria de precios
exports.sumProducts = async (req, res) => {
  try {
    const result = await db.query('SELECT SUM(price) FROM products');
    res.status(200).json({ total_price: result.rows[0].sum });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al sumar precios' });
  }
};

//Obtener productos por categoría
exports.getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM products WHERE category_id = $1',
      [categoryId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener productos por categoría' });
  }
};

