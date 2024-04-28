import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import signupRoute from "./routes/signup.js";
import loginRoute from "./routes/login.js";
import dataRoute from "./routes/data.js";
import productRoute from "./routes/product.js";
import fileuploadsRoute from "./routes/imageuploads.js";
import farmerprofileRoute from "./routes/farmerprofile.js"
import storeRoute from "./routes/store.js"
import customerprofileRoute from "./routes/customerprofile.js"

const app = express();
const port = 9000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/data",dataRoute);
app.use("/product",productRoute);
app.use("/file",fileuploadsRoute);
app.use("/farmerprofile",farmerprofileRoute);
app.use("/store",storeRoute);
app.use("/customerprofile",customerprofileRoute);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  