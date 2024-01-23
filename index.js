import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
var x = false;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const body = req.body;  // Fix: Use req.body instead of body.req
    const pass = body["password"];  // Fix: Use body["password"] instead of body.req["password"]
    const user = body["username"];  // Fix: Use body["username"] instead of body.req["username"]

    if (pass == "ARYAN" && user == "NETFLIX") {
        x = true;
    }
    next();
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/submit", (req, res) => {  // Fix: Add missing parenthesis
    if (x) {
        res.sendFile(__dirname + "/index.html");
    } else {
        console.log("error");
    }
});

const port = 7000;
app.listen(port, () => {  // Fix: Remove unnecessary (req, res) parameters
    console.log("server is running");
});
