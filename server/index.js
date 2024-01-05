const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
// Middleware to parse form data in the request body
app.use(express.urlencoded({ extended: true }));
let PORT = 5000;

const sendMail = require("./controllers/sendMail");

app.get("/", (req, res) => {
  res.send("I am a server");
});

app.post("/mail", sendMail);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`I am live in port no.  ${PORT}`);
    });
  } catch (error) {}
};

start();
