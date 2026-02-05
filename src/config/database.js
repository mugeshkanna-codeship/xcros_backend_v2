import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    statement_timeout: 60000,
    idle_in_transaction_session_timeout: 60000
  },
  pool: {
    max: 10,  // Increased for better concurrency with PgBouncer
    min: 2,
    acquire: 30000,
    idle: 10000,
    evict: 60000,
    handleDisconnects: true
  },
  retry: {
    max: 5,
    timeout: 5000
  }
});

export default sequelize;