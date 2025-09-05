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
// GET /api/products/count
const getProductCount = async (req, res) => {
  try {
    const count = await Product.count();
    
    res.status(200).json({
      success: true,
      message: 'Conteo de productos obtenido exitosamente',
      data: {
        totalProducts: count
      }
    });
  } catch (error) {
    console.error('Error al contar productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};


// GET /api/products/total-cost
const getTotalCost = async (req, res) => {
  try {
    const result = await Product.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('price')), 'totalCost']
      ]
    });
    
    const totalCost = result[0].dataValues.totalCost || 0;
    
    res.status(200).json({
      success: true,
      message: 'Sumatoria de costos calculada exitosamente',
      data: {
        totalCost: parseFloat(totalCost).toFixed(2),
        currency: 'USD' // o la moneda que uses
      }
    });
  } catch (error) {
    console.error('Error al calcular costo total:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

