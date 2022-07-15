const cors = require('cors');

const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors())

app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'b680881e89fef6',
  password: '3c91f2db',
  database: 'heroku_75173ff99f41fcf', 
  insecureAuth : true
});





// Route
app.get('/', (req, res) => {
  res.send('ESTA API ESTA CORRIENDO');
});

// all customers
app.get('/partes/', (req, res) => {
  const sql = 'SELECT * FROM autopartes';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/partes/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM autopartes WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

app.post('/partes/', (req, res) => {
  const sql = 'INSERT INTO autopartes SET ?';

  const customerObj = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    stock: req.body.stock,
    precio: req.body.precio
  };

  connection.query(sql, customerObj, error => {
    if (error) throw error;
    res.send('Pieza insertada :)');
  });
});

app.put('/partes/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, stock, precio } = req.body;
  const sql = `UPDATE autopartes SET nombre = '${nombre}', descripcion='${descripcion}', stock='${stock}', precio='${precio}'WHERE id =${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Pieza modificada');
  });
});

app.delete('/partes/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM autopartes WHERE id= ${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Pieza eliminada');
  });
});

// Check connect
connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));