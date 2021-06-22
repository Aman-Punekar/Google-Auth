const express = require('express');
const app = express();

const google_auth = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/googleAuth", google_auth);

app.listen(3000, () => {
    console.log('Server is listening is to port 3000');
})