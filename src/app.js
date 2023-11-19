require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./routes/auth-route");
const productRoute = require("./routes/product-route");
const errorMiddleware = require("./middleware/error");
const notFoundMiddleware = require("./middleware/not-found");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/product", productRoute);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || "5000";
app.listen(PORT, () => console.log(`server running on fucking port: ${PORT} `));
