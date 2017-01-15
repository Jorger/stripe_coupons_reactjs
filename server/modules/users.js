"use strict";
const db   		= require('./database'), 
	  bcrypt    = require('bcrypt-nodejs'), 
	  passport 	= require('passport');

let register = (req, res, next) => 
{
	let data 	= req.body,
		users 	= db.coleccion("users");
	//Primero saber si el usuario ya existe...
	users.find({email: data.email}).count((err, doc) => {
		if (err) console.warn("Error creando usuario", err.message);
		if(doc !== 0){
			res.json({error : true, msg : "A user with this data already exists"});
		}
		else
		{
			let  date   = new Date(), 
				 fecha 	= `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; 
			data.password = bcrypt.hashSync(data.password);
			data.fecha 	= fecha;			
			users.insert(data, (err, doc) => 
			{
				if (err) console.warn("Error guardaAdmin", err.message);
				if(doc.result.ok === 1){
					res.json({error : false});
				}
			});
		}
	});
};

let login = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if(err || !user){
			return res.json({error : true});
		}
		return req.logIn(user, (err) => {
			return res.json({error : err ? true : false});
		});
		
	})(req, res, next);
};

module.exports.register = register;
module.exports.login = login;