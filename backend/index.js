const express = require('express')
const app = express()
const port = 5000
const mongoDB=require("./db")
const path =require('path')


mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})


app.use(express.json());
app.use("/api" , require("./routes/createUser"));
app.use("/api" , require("./routes/DisplayData"));
app.use("/api" , require("./routes/OrderData"));

app.use(express.static(path.join(__dirname ,'./build')))
app.get("*" , function(req ,res){
  res.sendFile(path.join(__dirname ,'./build/index.html'));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
