const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// server listen the post request from localhost.
app.post('/api/movies',(req, res) => {
  console.log(req.body);
  res.send('Movie Added');
})

// listen to the request json
app.get('/api/movies', (req, res) => {
  const movies = [
        {
            "title": "Love & Other Drugs",
            "imdbID": "tt0758752",
            "pageCount": 0,
            "posterUrl":
            "https://m.media-amazon.com/images/M/MV5BMTgxOTczODEyMF5BMl5BanBnXkFtZTcwMDc0NDY4Mw@@._V1_SX300.jpg",
            "year": "2010",
            "rates": "6.7",
            "director": ["Edward Zwick"],
            "categories": []
        },
        {
            "title": "The Avengers",
            "imdbID": "tt0848228",
            "pageCount": 0,
            "posterUrl":
            "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
            "year": "2012",
            "rates": "8.0",
            "director": ["Joss Whedon"],
            "categories": []
        },            {
            "title": "Avatar: The Way of Water",
            "imdbID": "tt1630029",
            "pageCount": 0,
            "posterUrl":
            "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg",
            "year": "2022",
            "rates": "7.9",
            "director": ["James Cameron"],
            "categories": []
        }
    ]
  
    
    // response to the request and send back json
    res.status(200).json({
        myMovies:movies
    })
})

// listen the connections on the port specified above
app.listen(port,() => {
  console.log(`Example app listening on port ${port}`)
})