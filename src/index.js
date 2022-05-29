const express = require("express");
const { phone } = require("phone");
const bodyParser = require("body-parser");
const { config } = "dotenv";

const { multiplication } = require("./utils/operation"); //de esta forma se pone una importacion parcial
const app = express();
const port = 5000;
const appv1= require('./routes/v1')
//de esta manera se asigna el soporte para que nuestra aplicacion soporte de los archivos
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
//para soporte de archivos JSON se utiliza la siguiente forma
app.use(bodyParser.json());



appv1(app);
//*********Esto es un mildware************
app.use((req,res)=>{
	res.status(404).send("NOT FOUND")
})
// se ocupa esta linea para poder la aplicacion escuchando
app.listen(process.env.PORT|| 5000, () => {
	console.log(`running ${process.env.PORT || 5000}`);
});


// ************ Toda esta parte la comente por que ahora ya utilizaremos el modelo MVC

// app.get("/", (req, res) => {
// 	res.status(200).send(
// 		`<html><head><meta charset="utf-8"></head><body> HOLA</body></html>`
// 	);
// });
// app.get("/info", (req, res) => {
// 	res.setHeader("Content-Type", "application/json");
// 	res.status(200).send(
// 		JSON.stringify({ versin: "1.0.0", appName: "CURSON DE NODE" })
// 	);
// });
// app.get("/details", (req, res) => {
// 	res.status(200).send(
// 		`<html><head><meta charset="utf-8"></head><body> DETAILS</body></html>`
// 	);
// });
// app.get("/phone", (req, res) => {
// 	try {
// 		//const query = req.query;
// 		const {value,country}=req.query;//utilizamos destructurin, const query = req.query; para poder reducir el codigo de mejor manera
// 		const result = phone(value, country.toUpperCase());
// 		res.setHeader("Content-Type", "application/json");
// 		res.status(200).send(JSON.stringify(result));
// 	} catch (e) {
// 		res.status(400).send(e.message);
// 	}
// });
// //siempre se pone al final la ruta que queremos poner como no definida
// // app.get("*",(req,res)=>{
// // 	res.status(404).send("NOT FOUND")
// // })
// app.post("/login",(req,res)=>{

// 	const {name,pass}=req.body;
// 	//los datos que enviamos desde nuestra pagina deben corresponder con los nombres con el que recibe
// 	if (name ==="mario" && pass==="1234") {
// 		res.send({status:"ok"})
// 	}else{
// 		res.status(401).send("acceso denegado");
// 	}
// })
// //*********Esto es un mildware************
// app.use((req,res)=>{
// 	res.status(404).send("NOT FOUND")
// })
// // se ocupa esta linea para poder la aplicacion escuchando
// app.listen(PORT, () => {
// 	console.log(`running ${PORT}`);
// });

//************ Esta es la forma que se utiliza sin utilizar express**********
// const http = require("http");
// const url = require("url");
// const server = http.createServer((req, res) => {
// 	const urlData = url.parse(req.url, true);
// 	const path = urlData.pathname;
// 	const query = urlData.query;
// 	switch (path) {
// 		case "/":
// 			res.writeHead(200, { "Content-Type": "text/html" });
// 			res.write(`<html>
// 		<head> <meta charset="utf-8"></head>
// 		<body>
// 			Hola mundo
// 		</body>
// 	 <html/>`);
// 			break;
// 		case "/info":
// 			res.writeHead(200, { "Content-Type": "application/json" });
// 			res.write(
// 				JSON.stringify({ versin: "1.0.0", appName: "Curso Node.js" })
// 			);
// 			break;
// 		case "/phone":
// 			//phone(query.value);//tambien se pued poner phone(query["value"]);
// 			try {
// 				const result = phone(query.value, query.country.toUpperCase());
// 				res.writeHead(200, { "Content-Type": "application/json" });
// 				res.write(JSON.stringify(result));
// 			} catch (e) {
// 				res.writeHead(400, { "Content-Type": "text/html" });
// 				res.write("BAD REQUEST");
// 			}

// 			break;
// 		default:
// 			res.writeHead(404, { "Content-Type": "text/html" });
// 			res.write(`<html>
// 		<head> <meta charset="utf-8"></head>
// 		<body>
// 			NOT FOUND
// 		</body>
// 	 <html/>`);
// 	}

// 	res.end(); //finalizamos la respuesta
// });
// // console.log("addition", operation.addition(3,5));
// console.log(`run server in por: ${PORT}`);
// server.listen(`${PORT}`);
// console.log("addition", multiplication(3, 5));
