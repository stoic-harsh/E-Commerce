const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(require("./routes/routes"));

app.use(express.static("frontend/build"));

app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'frontend','build','index.html'));
});

app.listen(PORT, ()=>{
    console.log(`server is listening at ${PORT}`);
});