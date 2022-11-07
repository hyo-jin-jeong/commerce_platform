import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  db: process.env.DB_URL || '',
};

export default config;
