const data = require('./data/books.json');
var consts = require('./consts'),
bookSchema = require('./mainbook'),
mongoose = require('mongoose'),
sleep = require('system-sleep');
var booki;


module.exports = {
  getAllBooks: () => {
    bookSchema.findOne({},(err,book)=>{
      console.log(book.books);
      booki = book.books;
    });
    sleep(1000);
    return booki;
  },
  getBookData: (id) => {
    bookSchema.findOne({'libary_name':'alon libary'},{'books':{$elemMatch:{'id':id}}},(err,book)=>{
      if(book.books[0] == null)
      booki = {'ERROR':'ID not found'}
      else booki = book.books[0];
    });
    sleep(1000);
    return booki;
  },
  connectToDB: () => {
    mongoose.connect(consts.MLAB_KEY);
    mongoose.Promise = global.Promise;
  },
  getBookbyMinPageAndMiniPrice: (maxPage,maxPrice) => {
    var specBooks = []
    bookSchema.findOne({},(err,book)=>{
      var mybooks = book.books ;
      for(let i in mybooks){
        if(mybooks[i].price <= maxPrice && mybooks[i].num_of_pages <= maxPage)
        specBooks.push(mybooks[i]);
      }
    });
    sleep(2000);
    if(specBooks.length == 0)
    return {"ERROR":'no result for your query'};
    return specBooks;
  }
};
