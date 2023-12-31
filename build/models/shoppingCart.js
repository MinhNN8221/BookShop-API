'use strict';

module.exports = function (sequelize, DataTypes) {
  var ShoppingCart = sequelize.define('ShoppingCart', {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cart_id: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    buy_now: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    added_on: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'shopping_cart'
  });
  ShoppingCart.associate = function (models) {
    // associations can be defined here
    ShoppingCart.belongsTo(models.Product, {
      foreignKey: 'product_id',
      targetKey: 'product_id',
      onDelete: 'CASCADE'
    });
  };
  return ShoppingCart;
};