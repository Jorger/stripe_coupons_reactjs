"use strict";
const stripe = require("stripe")(process.env.STRIPE_ID);

let coupons = (req, res) => {
	if(!req.isAuthenticated()){
		res.json({
			err : {type : "logged", message : "You are not logged in"}
		});
	}
	else {
		stripe.coupons.list(
		{ limit: 20 },
		(err, coupons) => {
			if(!err){
				res.json({
					err, 
					coupons : coupons.data,
					user	: req.user.name
				});
			}
			else {
				res.json({ err });
			}
			
		});
	}
};

let newCoupon = (req, res) => {
	if(!req.isAuthenticated()){
		res.json({
			err : {type : "logged", message : "You are not logged in"}
		});
	}
	else {
		let data = req.body, 
			coupon = {
				percent_off: Number(data.percentoff),
				duration: data.duration, 
				id: `co-${Math.floor(Math.random() * 100000)}`
			};
		if(data.duration === "repeating"){
			coupon.duration_in_months = Number(data.durationmoths);
		}
		stripe.coupons.create(coupon, (err, coupon) => {
			if(!err){
				res.json({err, coupon});
			}
			else {
				res.json({err});
			}
		});
	}
};

let updateCoupon = (req, res) => {
	if(!req.isAuthenticated()){
		res.json({
			err : {type : "logged", message : "You are not logged in"}
		});
	}
	else {
		let data = req.body, {id} = data;
		delete data.id;
		stripe.coupons.update(id, {metadata: data}, (err, coupon) => {
			if(!err){
				res.json({err, coupon});
			}
			else{
				res.json({err});
			}
		});
	}
};

let deleteCoupon = (req, res) => {
	if(!req.isAuthenticated()){
		res.json({
			err : {type : "logged", message : "You are not logged in"}
		});
	}
	else {
		stripe.coupons.del(req.params.id, (err, coupon) => {
			if(!err){
				res.json({err, coupon});
			}
			else {
				res.json({err});
			}
		});
	}
};

let getCoupon = (req, res) => {
	if(!req.isAuthenticated()){
		res.json({
			err : {type : "logged", message : "You are not logged in"}
		});
	}
	else {
		stripe.coupons.retrieve(req.params.id, (err, coupon) => {
			if(!err){
    			res.json({err, coupon});
			}
			else {
				res.json({err});
			}
  		});
	}
};

module.exports.coupons = coupons;
module.exports.getCoupon = getCoupon;
module.exports.newCoupon = newCoupon;
module.exports.updateCoupon = updateCoupon;
module.exports.deleteCoupon = deleteCoupon;