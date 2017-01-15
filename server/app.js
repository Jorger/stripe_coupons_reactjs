"use strict";

const express 			= 	require("express"),
	  app				= 	express(),
	  morgan 			= 	require('morgan'),
	  path 				= 	require('path'),
	  cors 				= 	require('cors'),
	  puerto 			= 	process.env.PORT || 3300,
	  helmet 			= 	require('helmet'), 
	  bodyParser 		= 	require('body-parser'),
	  passport 			= 	require('passport'),
	  LocalStrategy 	= 	require('passport-local').Strategy,
	  cookieParser 		= 	require('cookie-parser'),
	  session 			= 	require('express-session'),
	  bcrypt 			= 	require('bcrypt-nodejs'), 
	  db   				= 	require('./modules/database'),
	  users				=   require('./modules/users'),
	  stripe			=   require('./modules/stripe');
	  
	//Para el manejo de autenticación...
	passport.use('local', new LocalStrategy((username, password, done) => {
		console.log("Validación");
		console.log({username, password});
		db.coleccion("users").findOne({email : username}, (err, admin) => {
			if (err) { return done(err);}
			if (!admin){
				console.log("ERROR NO EXISTE EL USUARIO");
        		return done(null, false, { message: 'Nombre de usaurio incorrecto.' });
      		}
			if(!bcrypt.compareSync(password, admin.password)){
				console.log("ERROR EN LA CLAVE");
				return done(null, false, { message: 'Password incorrecto' });
			}
			console.log("TODO HA SALIDO BIEN");
			console.log(admin);
			return done(null, admin);
		});
	}));

	passport.serializeUser((user, done)=> {
		console.log("serializeUser");
		console.log(user);
	    done(null, user.email);
	});

	passport.deserializeUser((email, done) => {
		console.log("deserializeUser");
		console.log(email);
		db.coleccion("users").findOne({email : email}, (err, user) => {
			done(null, user);
		});
	});

	app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(cookieParser());
	app.use(session({
						secret: '$2a$10$GsvafBLCODG.gUNlB987fORJjTiwjiKs42MjAIqTMB3lour44n39K',
						cookie: { maxAge: 6000000 },
						resave: true,
						saveUninitialized: true
					}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(cors());
	app.use(helmet());
	app.use(helmet.hidePoweredBy({ setTo: 'Developed by https://jorger.github.io/page/es/' }));
	app.use(express.static(path.resolve(__dirname, 'build')));
	
	//Servicios...
	app.post("/register", users.register);
	app.post("/login", users.login);
	app.get("/coupons/:page", stripe.coupons);
	app.get("/getcoupon/:id", stripe.getCoupon);
	app.post("/newcoupon", stripe.newCoupon);
	app.put("/updatecoupon", stripe.updateCoupon);
	app.delete("/deletecoupon/:id", stripe.deleteCoupon);
	app.get('*', (req, res) => {
  		res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
	});
	
	db.conectaMongo((err, database) => {
		if(err) throw err;
		let server = app.listen(puerto, (err) => 
		{
	   		if(err) throw err;
	   		let message = 'Servidor corriendo en @ http://localhost:' + server.address().port;
	   		console.log(message);	   
		});
	});