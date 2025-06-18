//Importamos todas las librerias requeridas
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const multer = require('multer');

//Creamos instancia y definimos el numero del puerto
const app = express();
const port = 3000;
//-------------------------------------------------------------------------------------------------
//BASE DE DATOS
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'EvaluacionIRU3'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Conexión exitosa a la base de datos.');
});

//----------------------------------------------------------------------------------------------------------------
//Se configura la aplicacion para que inicie desde el directorio asignado
app.use(express.static(path.join(__dirname, 'pagina_principal')));
//Enviar datos en la solicitud del formulario
app.use(express.urlencoded({ extended: true }));
//Se usa multer para manejar los archivos
const upload = multer({ dest: 'Imagenes/' });
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/fotos', express.static(path.join(__dirname, 'fotos')));
app.use('/Imagenes', express.static(path.join(__dirname, 'Imagenes')));

//Se configura al port que va a "escuchar"
app.listen(port, () => { 
    console.log('Servidor corriendo en http://localhost:3000'); 
});
//----------------------------------------------------------------------------------------------------------------
//CODIGO PARA SUBIR IMAGENES
app.post('/subir_imagen', upload.single('imagen'), (req, res) => {
    const { nombre, descripcion, talla } = req.body;
    const imagen = req.file.filename;
    const query = 'INSERT INTO imagenes (Nombre, Descripcion, Imagen, Talla) VALUES (?, ?, ?, ?)';
    connection.query(query, [nombre, descripcion, imagen, talla], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//---------------------------------------------------------------------------------------------------------------
//cODIGO PARA OBTENER LAS IMAGENES
app.get('/imagenes', (req, res) => {
    const query = 'SELECT Nombre, Descripcion, Imagen FROM imagenes';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los datos de la base de datos: ' + err.stack);
            res.status(500).send('Error al obtener los datos de la base de datos.');
            return;
        }
        res.json(results);
    });
});
//-------------------------------------------------------------------------------------------------
// Ruta para obtener los encargos
app.get('/api/encargos', (req, res) => {
    const query = 'SELECT * FROM imagenes';
    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }
        res.json(results);
    });
});

//---------------------------------------------------------------------------------------------------------------

//----------------------Registro y Acceso de Usuarios--------------------------

//Ruta para manejar el registro de usuario
app.post('/registrar_usuario', (req, res) => {
    const { nombre, correo, contraseña, rol } = req.body;
    
    const query = 'INSERT INTO usuarios2 ( Nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)';
    connection.query(query, [nombre, correo, contraseña, rol], (err, result) => {
        if (err) {
            console.error('Error al registrar usuario:', err);
            res.send('Error al registrar al usuario');
        } else {
            console.log('Usuario registrado exitosamente:', result);
            res.redirect('/');
        }
    });
});

//Ruta para manejar el registro de Administrador
app.post('/registrar_administrador', (req, res) => {
    const { nombre, correo, contraseña, rol } = req.body;
    
    const query = 'INSERT INTO usuarios2 ( Nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)';
    connection.query(query, [nombre, correo, contraseña, rol], (err, result) => {
        if (err) {
            console.error('Error al registrar usuario:', err);
            res.send('Error al registrar al usuario');
        } else {
            console.log('Usuario registrado exitosamente:', result);
            res.redirect('/admin.html');
        }
    });
});


app.post('/iniciar_sesion', (req, res) => {
    const { correo, contraseña, rol } = req.body;

    const query = 'SELECT rol FROM usuarios2 WHERE correo = ? AND contraseña = ?';
connection.query(query, [correo, contraseña], (err, result) => {
    if (err) {
        console.error('Error al iniciar sesión:', err);
        return res.send('Error al iniciar sesión');
    }

    if (result.length > 0) {
        const rol = result[0].rol;

        if (rol === 1) {
            return res.redirect('/admin.html');
        } else if (rol === 2) {
            return res.redirect('/usuario.html');
        } else {
            return res.send('Rol no reconocido');
        }
    } else {
        return res.send('Correo o contraseña incorrectos');
    }
    });
});

