import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))



app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended: true, limit: "50mb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"
import stripe from "./routes/stripe.js"
import orderRouter from "./routes/order.route.js"
import commentRouter from "./routes/comment.route.js"

app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/stripe", stripe);
app.use("/api/order", orderRouter);
app.use("/api/comment", commentRouter);

export { app }

