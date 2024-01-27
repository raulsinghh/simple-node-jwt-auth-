const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey = "secretkey";

app.get("/", (req, resp) => {
    resp.json({
        message: "a sample api"
    })
})


app.post("/login", (req, resp) => {
    const user = {
        id: 1,
        username: "Ram",
        email: "ram@test.com"

    }

    jwt.sign({ user }, secretKey, { expireIn: '300s' }, (err, token) => {
        resp.json({
            token
        })
    })

})
app.post("/profile", verifyToken, (req, resp) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            resp.send({ result: "invalid token" })
        } else {
            resp.json({
                message: "profile accessed",
            })
        }
    })
})

function verifyToken(req, resp, next) {
    const bearerHeader = req.header['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();

    } else {
        resp.send({
            result: 'Token is not valid'
        })
    }

}


app.listen(3000, () => {
    console.log("app is running on 3000 port,thanks !");

})
