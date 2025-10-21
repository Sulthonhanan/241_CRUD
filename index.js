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
      res.status(500).json('Error executing users');
      return;
    }
    res.json(results);
  });
});

app.post('/api/mahasiswa', (req, res) => {
  const { nama, nim, kelas, prodi } = req.body;
    const query = 'INSERT INTO mahasiswa (nama, nim, kelas, prodi) VALUES (?, ?, ?, ?)';
        
    if (!nama || !nim || !kelas || !prodi) {
      return res.status(400).json('nama, nim, kelas, dan prodi harus diisi');
    }

    db.query(
        'INSERT INTO mahasiswa (nama, nim, kelas, prodi) VALUES (?, ?, ?, ?)',
        [nama, nim, kelas, prodi],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json ({ message: 'Database Error' });   
            }
            res.status(201).json({ message: 'Mahasiswa added successfully', id: result.insertId });
        }
    );
});