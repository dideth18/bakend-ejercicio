// migrations/add-category-to-products.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'categoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      },
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'categoryId');
  }
};