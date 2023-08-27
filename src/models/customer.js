'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer= sequelize.define('Customer', {
    customer_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false
      },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique:true,
        validate:{
            isEmail:true
        }
      },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
    address: DataTypes.STRING(100),
    shipping_region_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:'1'
      },
    mob_phone: DataTypes.STRING(100),
    gender: DataTypes.STRING(19),
    date_of_birth: DataTypes.DATEONLY,
    avatar: DataTypes.STRING(200)
  }, {
    timestamps: false,
    tableName: 'customer',
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      }
    }
  });
  Customer.associate = function(models) {
    // associations can be defined here
  };
  Customer.findByEmail = email => {
    let customer = Customer.findOne({
      where: { email },
    });

    return customer;
  };
  return Customer;
};
