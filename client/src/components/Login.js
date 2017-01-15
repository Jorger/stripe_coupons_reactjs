import React from 'react';
import Header from './Header';
import { Link } from 'react-router';
import { apiServer } from '../apiserver';

class Login extends React.Component {
	constructor(){
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(event){
        event.preventDefault();
		apiServer({
			method 	: "post", 
			data	: {  
							username : this.email.value,
							password : this.password.value
					  }, 
			service	: "login"
		}, (error, response) => {
			if(!error){
				if(response.data.error){
					alert("Access data is invalid");
				}
				else{
					this.context.router.transitionTo(`/coupons/`);
				}
			}
			else{
				console.log(error);
			}
		});
    }
	
	render() {
		return (<div>
					<Header title="Login Stripe Coupons" />
					<div className="container">
        				<div className="row">
            				<div className="col-lg-12">
								<form onSubmit={this.handleSubmit}>
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
										<Link to="/register">Create account</Link>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
    );
  };
};

Login.contextTypes = {
    router : React.PropTypes.object
};

export default Login;