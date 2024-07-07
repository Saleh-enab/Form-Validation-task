import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import dotenv from "dotenv"
dotenv.config()

const app = express()


app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')


app.get("/", (req, res) => {
    res.render("index")
})


app.post("/register", [
    check("fullname")
        .matches(/^[^\d]*$/)
        .withMessage("Full name must not contain any numbers"),
    check("email")
        .isEmail()
        .normalizeEmail()
        .withMessage("Invalid Email"),
    check("BD").isDate({ format: "DD/MM/YYYY" })
        .withMessage("Invalid Date"), check("password")
            .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,64}$/)
            .withMessage("Week Password"),
    check("password2")
        .custom((value, { req }) => { return value === req.body.password })
        .withMessage("Passwords do not match")
], (req: Request, res: Response) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorsArr = errors.array()
        res.render('index', { errors: errorsArr })
    } else {
        res.send("SUCCESSFUL")
    }

})
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Connceted Successfully...")
})