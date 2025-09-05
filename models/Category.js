const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'categories',
  timestamps: true
});

module.exports = Category;

// GET /api/categories/:id/products
const getCategoryWithProducts = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findByPk(id, {
      include: [{
        model: Product,
        as: 'products',
        attributes: ['id', 'name', 'price', 'description']
      }]
    });
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Categoría con productos obtenida exitosamente',
      data: {
        category: {
          id: category.id,
          name: category.name,
          description: category.description,
          productCount: category.products.length,
          products: category.products
        }
      }
    });
  } catch (error) {
    console.error('Error al obtener categoría con productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// GET /api/categories - Listar todas las categorías con conteo de productos
const getAllCategoriesWithCount = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{
        model: Product,
        as: 'products',
        attributes: []
      }],
      attributes: [
        'id',
        'name',
        'description',
        'isActive',
        [sequelize.fn('COUNT', sequelize.col('products.id')), 'productCount']
      ],
      group: ['Category.id'],
      order: [['name', 'ASC']]
    });
    
    res.status(200).json({
      success: true,
      message: 'Categorías obtenidas exitosamente',
      data: {
        categories: categories,
        total: categories.length
      }
    });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};