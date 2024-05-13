import express from "express"
import cookieParser from "cookie-parser"
import postRoute from "./routes/post.routes.js"
import authRoute from "./routes/auth.routes.js"
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/post', postRoute)
app.use('/api/auth', authRoute)

console.log('test2')

app.listen(8800, () => {
    console.log("Server is runing")
})