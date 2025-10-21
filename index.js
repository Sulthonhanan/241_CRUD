const express = require('express');
let mysql = require('mysql');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sulthonhanan123',
  database: 'biodata',
  port: 3306
});         

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL:', err);
    return;
  }
    console.log('Connection Successfully.');
});

app.get('/api/mahasiswa', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (err, results) => {
    if (err) {
      console.error('Error executing users:', err);
      res.status(500).send('Error executing users');
      return;
    }
    res.json(results);
  });
});