// En models/Product.js - agregar la relación
const Product = require('./Product');
const Category = require('./Category');

// Definir asociaciones
Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products'
});

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});