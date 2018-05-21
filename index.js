const express = require('express'),
bodyparser = require('body-parser'),
func = require('./function'),
app = express(),
port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.all('*',(req,res,next)=>{
  func.connectToDB();
  console.log(`logged to database`);
  next();
});

app.get('/getAllBooks',(req,res)=>{
    // res.status(200).json({"books":func.getAllBooks()});
    res.status(200).send(func.getAllBooks());
});

app.post('/getBookData',(req,res)=>{
    var id = req.body.id;
  res.status(200).json(func.getBookData(id));
});

app.get('/getBookByMaxPageAndMaxPrice/:maxPage/:maxPrice',(req,res)=>{
  var maxPage = req.params.maxPage,
  maxPrice = req.params.maxPrice;
  res.json(func.getBookbyMinPageAndMiniPrice(maxPage,maxPrice));
});

app.all('/getBookByMaxPageAndMaxPrice/',(req,res)=>{
  var maxPage = req.body.maxPage,
  maxPrice = req.body.maxPrice;
  res.json(func.getBookbyMinPageAndMiniPrice(maxPage,maxPrice));
});

app.get('/background.jpg',
    (req,res) =>{
    res.sendFile(`${__dirname}/background.jpg`);
    });


app.get('/include/style.css',
    (req,res) =>{
    res.sendFile(`${__dirname}/include/style.css`);
    });

app.all('*',(req,res)=>{
  res.sendfile(`${__dirname}/api.html`);
});

app.listen(port,()=>{
  console.log(`listen on port ${port}`);
});
