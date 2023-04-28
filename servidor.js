//importo librería express y nombro variable express.
const express = require("express");
//importo librería body-parser y nombro variable bodyParser.
const bodyParser = require("body-parser");
//importo librería path y nombro variable ruta.
const ruta = require("path");
// invoco express y la nombro como servidor.
const servidor = express();
//importo librería express-session y nombro variable session.
const session = require ("express-session");


// Configurar el directorio raiz
servidor.set("views",ruta.join(__dirname,"views"));
// Configurar la carpeta de archivos estáticos (como CSS o JavaScript) en la carpeta "publico"
servidor.use(express.static('publico'));
// Configurar las plantillas de EJS
servidor.set("view engine", "ejs");
// Agregar el middleware de BodyParser para procesar solicitudes POST con datos en formato JSON
servidor.use(bodyParser.json());
// Agregar el middleware de BodyParser para procesar solicitudes POST con datos en formato URL-encoded
servidor.use(bodyParser.urlencoded({ extended: false }));
// Importo el módulo "mysql2"
const mysql = require("mysql2");
// Creo una conexión a la base de datos "magic_rhymit" en el servidor local 
const conexion = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"magic_rhymit"
});
// conecta a la base de datos o muestra un mensaje de error.
conexion.connect(function(error){
    if(!!error) console.log(error);
    else console.log("base de datos conectada!");
}); 


// Se define una ruta que se activará cuando se acceda a la página principal del sitio
servidor.get('/',(peticion, respuesta) => {
  // Se define una consulta para seleccionar todas las rimas de la base de datos
  let consulta = "SELECT * FROM rimas";
  // Se ejecuta la consulta en la base de datos
  let query = conexion.query(consulta, (error, resultados) => {
      if(error) throw error;
      // Si la consulta se ejecutó correctamente, se renderiza la vista 'index' y se le pasan los resultados
      respuesta.render('index', {  
          titulo : 'MAGIC RHYMIT',
          rimas : resultados
      });
  });
});

// Se define una ruta que se activará cuando se acceda a la página de agregar una nueva rima
servidor.get('/agregar',(peticion, respuesta) => {
  // Se define una consulta para seleccionar todas las palabras mágicas de la base de datos
  let consulta = "SELECT * FROM palabrasmagicas";
  // Se ejecuta la consulta en la base de datos
  let query = conexion.query(consulta, (error, resultados) => {
      if (error) throw error;
      // Si la consulta se ejecutó correctamente, se renderiza la vista 'agregar' y se le pasan los resultados
      respuesta.render('agregar', {  
          titulo: 'MAGIC RHYMIT',
          palabramagica: resultados  
      });
  });
});
  
// Se define una ruta que se activará cuando se envíe el formulario para agregar una nueva rima
servidor.post('/guardar',(peticion, respuesta) => { 
  // Se obtienen los datos enviados en el formulario
  let datos = {rima: peticion.body.rima, tipo: peticion.body.tipo, estado: peticion.body.estado};
  // Se define una consulta para insertar los datos en la base de datos
  let consulta = "INSERT INTO rimas SET ?";
  // Se ejecuta la consulta en la base de datos
  let query = conexion.query(consulta, datos,(error, resultados) => {
    if(error) throw error;
    // Si la consulta se ejecutó correctamente, se redirige al usuario a la página principal
    respuesta.redirect('/');
  });
});

// Se define una ruta que se activará cuando se acceda a la página para editar una rima
servidor.get('/editar/:userId',(peticion, respuesta) => {
  // Se obtiene el ID de la rima a editar a partir de la URL
  const userId = peticion.params.userId;
  // Se define una consulta para seleccionar la rima con el ID especificado
  let consulta = `Select * from rimas where id = ${userId}`;
  // Se ejecuta la consulta en la base de datos
  let query = conexion.query(consulta,(error, resultado) => {
      if(error) throw error;
      // Si la consulta se ejecutó correctamente, se renderiza la vista 'editar' y se le pasa la rima a editar
      respuesta.render('editar', {
          titulo : 'MAGIC RHYMIT',
          rima : resultado[0]
      });
  });
});

// Se define una ruta en el servidor para recibir una petición POST
servidor.post('/modificar', (peticion, respuesta) => {
  // Se extrae el ID enviado en la petición POST desde el cuerpo (body) de la petición
  const userId = peticion.body.id;
  // Se construye una consulta SQL para actualizar un registro en la tabla 'rimas'
  let consulta = "update rimas SET rima='"+peticion.body.rima+"', tipo='"+peticion.body.tipo+"', estado='"+peticion.body.estado+"' where id ="+userId;
  // Se ejecuta la consulta SQL construida anteriormente
  let query = conexion.query(consulta, (error, resultados) => {
    // En caso de que ocurra un error durante la ejecución de la consulta, se lanza una excepción
    if (error) throw error;
    // Si la consulta se ejecutó correctamente, se redirige al usuario a la página principal
    respuesta.redirect('/');
  });
});

// Se define una ruta en el servidor para recibir una petición GET
servidor.get('/borrar/:userId', (peticion, respuesta) => {
  // Se extrae el ID enviado en la petición GET desde los parámetros de la URL
  const userId = peticion.params.userId;
  // Se construye una consulta SQL para eliminar un registro en la tabla 'rimas'
  let consulta = `DELETE from rimas where id = ${userId}`;
  // Se ejecuta la consulta SQL construida anteriormente
  let query = conexion.query(consulta, (error, resultado) => {
    // En caso de que ocurra un error durante la ejecución de la consulta, se lanza una excepción
    if (error) throw error;
    // Si la consulta se ejecutó correctamente, se redirige al usuario a la página principal
    respuesta.redirect('/');
  });
});


//---SESIONES--
// Establecer la sesión del servidor utilizando la biblioteca de middleware express-session
servidor.use(session({ 
  secret : "123",
  resave : true,
saveUninitialized : false
})) 

// Manejar la solicitud GET para la página de inicio
servidor.get("/",(peticion,respuesta) => {
  // Si la sesión del usuario existe, extraer el nombre de usuario de la sesión y pasarlo como variable
  if(peticion.session.usuario){
      let {usuario} =  peticion.session.usuario;
      return respuesta.render("index", {usuario})
  }
  // Si la sesión del usuario no existe, redirigir a la página de inicio de sesión
  respuesta.redirect("/login");
});
// Manejar la solicitud GET para la página de inicio de sesión
servidor.get("/login",(peticion,respuesta) => {
  // Si la sesión del usuario no existe, renderizar la página de inicio de sesión
  if(!peticion.session.usuario){
     return respuesta.render("login" ,{error : false, msgError : null}); 
  }
  // Si la sesión del usuario existe, redirigir a la página de inicio
  respuesta.redirect("/");
});

// Manejar la solicitud POST para el inicio de sesión
servidor.post("/login", (peticion, respuesta) => {
  // Consultar la base de datos de usuarios
  const datos = "SELECT * FROM usuarios";
  let query = conexion.query(datos, (error, resultados) => {
    if (error) {
      throw error;
    }
    let mensajeError = "el usuario no existe";
    try {
      // Buscar el usuario en la base de datos y comparar la contraseña
      for (let i = 0; i < resultados.length; i++) {
        if (peticion.body.usuario === resultados[i].usuario) {
          const usuario = resultados[i].usuario;
          if (peticion.body.password === resultados[i].password) {
            // Si el usuario y la contraseña son correctos, establecer la sesión del usuario y redirigir a la página de inicio
            peticion.session.usuario = resultados[i];
            return respuesta.redirect("/");
          }
          // Si la contraseña es incorrecta, mostrar un mensaje de error
          mensajeError = "el usuario o CONTRASEÑA no existe";
          break;
        }
      }
      // Si el usuario no existe, mostrar un mensaje de error
      respuesta.render("login", {
        error: true,
        mensajeError
      });
    } catch (error) {
      throw error;
    }
  });
});

// Manejar la solicitud GET para la finalización de sesión
servidor.get("/logout",(peticion,respuesta)=>{
  // Destruir la sesión del usuario y redirigir a la página de inicio de sesión
  peticion.session.destroy (()=> respuesta.redirect("/login"))
});

servidor.listen(3002);


