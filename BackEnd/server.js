const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// allow server to access to different port
const cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});


// Connect to MongoDB
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {

  mongoose.set("strictQuery", true);
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.ztbtldb.mongodb.net/?retryWrites=true&w=majority');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

// schema holds strings
const MovieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String,
  director: String
});

const movieModel = mongoose.model('movies', MovieSchema);


// server listen the post request from localhost.
app.post('/api/movies',(req, res) => {
  console.log(req.body);

  movieModel.create({
    title:req.body.title,
    year:req.body.year,
    poster:req.body.poster,
    director:req.body.director
  })
  res.send('Movie Added');
})

// listen to the request json
app.get('/api/movies', (req, res) => {
//   const movies = [
//         {
//             "title": "Love & Other Drugs",
//             "imdbID": "tt0758752",
//             "pageCount": 0,
//             "posterUrl":
//             "https://m.media-amazon.com/images/M/MV5BMTgxOTczODEyMF5BMl5BanBnXkFtZTcwMDc0NDY4Mw@@._V1_SX300.jpg",
//             "year": "2010",
//             "rates": "6.7",
//             "director": ["Edward Zwick"],
//             "categories": []
//         },
//         {
//             "title": "The Avengers",
//             "imdbID": "tt0848228",
//             "pageCount": 0,
//             "posterUrl":
//             "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
//             "year": "2012",
//             "rates": "8.0",
//             "director": ["Joss Whedon"],
//             "categories": []
//         },            {
//             "title": "Avatar: The Way of Water",
//             "imdbID": "tt1630029",
//             "pageCount": 0,
//             "posterUrl":
//             "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg",
//             "year": "2022",
//             "rates": "7.9",
//             "director": ["James Cameron"],
//             "categories": []
//         }
//     ]

    movieModel.find((err,data)=>{
        console.log(data);
        res.json(data);
    })
        // // response to the request and send back json
        // res.status(200).json({
        //   myMovies:movies
        // })
    })
        app.get('/api/movie/:id', (req,res)=>{
        console.log(req.params.id);
        movieModel.findById(req.params.id,(err, data)=>{
            console.log(data);
            res.json(data);
        })
    })
  
    // Update new movie informations
    app.put('/api/movie/:id', (req, res)=>{
      console.log("Update: "+req.params.id);
    
      movieModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
        (error,data)=>{
          res.send(data);
        })
    })

    // MERN stack - Delete movie from the list
    app.delete('/api/movie/:id',(req, res)=>{
      console.log('Delete: '+req.params.id);
      // activate this function when user click the delete function
      movieModel.deleteOne({_id:req.params.id},(error,data)=>{
        res.send(data);
      })
    })

// listen the connections on the port specified above
 app.listen(port,() => {
   console.log(`Example app listening on port ${port}`)
 })