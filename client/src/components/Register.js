import React from 'react';
import Header from './Header';
import { Link } from 'react-router';
import { apiServer } from '../apiserver';

class Register extends React.Component {
	constructor(){
		super();
		this.handleSubmit = this.handleSubmit.bind(this); 
	}
	
	handleSubmit(event){
        event.preventDefault();
		apiServer({
			method 	: "post", 
			data	: 	{
							name : this.name.value,  
							email : this.email.value,
							password : this.password.value
						}, 
			service	: "register"
		}, (error, response) => {
			if(!error){
				if(response.data.error){
					alert(response.data.msg);
				}
				else{
					this.context.router.transitionTo(`/`);
				}
			}
			else{
				console.log(error);
			}
		});
    }

	render() {
		return (
			<div>
				<Header title="Register Stripe coupons"/>
				<div className="container">
        				<div className="row">
            				<div className="col-lg-12">
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<label>Name</label>
										<input 
											type="text" 
											className="form-control" 
											placeholder="Enter name"
											ref={(input) => {this.name = input}}
										/>
  									</div>
									<div className="form-group">
										<label>Email address</label>
										<input 
											type="email" 
											className="form-control" 
											placeholder="Enter email"
											ref={(input) => {this.email = input}}
										/>
  									</div>
									  <div className="form-group">
    									<label>Password</label>
    									<input 
											type="password" 
											className="form-control" 
											placeholder="Password"
											ref={(input) => {this.password = input}}
										/>
  									</div>
									<div className="text-center">
										<button type="submit" className="btn btn-primary">Submit</button>
										<hr/>
										<Link to="/">Return to Login</Link>
									</div>
								</form>
							</div>
						</div>
					</div>
			</div>
    );
  }
};

Register.contextTypes = {
    router : React.PropTypes.object
};

export default Register;