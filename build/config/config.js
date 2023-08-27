'use strict';

require('dotenv/config');

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  }
};

const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

// Tạo một đối tượng Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

// Kiểm tra kết nối đến cơ sở dữ liệu
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Kết nối đến MySQL thành công!');
  } catch (error) {
    console.error('Lỗi kết nối:', error);
  } finally {
    // Đóng kết nối sau khi kiểm tra
    await sequelize.close();
  }
}

// Gọi hàm kiểm tra kết nối
testConnection();



