import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import signupRoute from "./routes/signup.js";
import loginRoute from "./routes/login.js";

const app = express();
const port = 9000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/signup", signupRoute);
app.use("/login", loginRoute);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  