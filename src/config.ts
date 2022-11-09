import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  db: process.env.DB_URL || '',
  jwt: {
    secretKey: process.env.JWT_SECRETKEY || '',
    expiresIn: process.env.JWT_EXPIRE,
  },
};

export default config;
