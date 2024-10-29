import { Sequelize } from "sequelize";
import 'dotenv/config'

const pgsql = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: "postgres",
});


pgsql
  .authenticate()
  .then(async () => {
    console.log(`Authentication successful, Connection to ${process.env.DB_HOST}:${process.env.DB_NAME} SUCCESS`);
  })
  .catch((err) => {
    console.log(`Failed connect to ${process.env.DB_HOST}:${process.env.DB_NAME} with ERROR: ${err}`);
  });


  export default pgsql