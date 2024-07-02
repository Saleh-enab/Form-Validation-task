"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.get("/", (req, res) => {
    res.render("index");
});
app.post("/register", [(0, express_validator_1.check)("fullname").matches(/^[^\d]*$/).withMessage("Full name must not contain any numbers"), (0, express_validator_1.check)("email").isEmail().normalizeEmail().withMessage("Invalid Email"), (0, express_validator_1.check)("BD").isDate({ format: "DD/MM/YYYY" }).withMessage("Invalid Date"), (0, express_validator_1.check)("password").matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,64}$/).withMessage("Week Password"), (0, express_validator_1.check)("password2").custom((value, { req }) => { return value === req.body.password; }).withMessage("Passwords do not match")], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorsArr = errors.array();
        res.render('index', { errors: errorsArr });
    }
    else {
        res.send("SUCCESSFUL");
    }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Connceted Successfully...");
});
