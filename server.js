const fs = require('fs');
const express = require('express');
const path = require('path');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./Develop/public'));

app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, './Develop/public/index.html'))
);

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
);


app.get('/api/notes', (req, res) =>{

    fs.readFile('./Develop/db/db.json', 'utf8', (error, data) => {
        
        error ? console.error(error) : console.log(data);
        res.json(JSON.parse(data));

    }
    );
}
);


app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, './Develop/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);