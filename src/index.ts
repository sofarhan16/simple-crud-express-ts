import express from "express"
import 'dotenv/config'
import router from "./routes/router";
import dotenv from 'dotenv'
dotenv.config()


const app = express();
const port = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/api/v1", router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
