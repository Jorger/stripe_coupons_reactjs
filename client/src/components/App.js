import React from 'react';
import Header from './Header';
import Coupons from './Coupons';
import { apiServer } from '../apiserver';
import { Link } from 'react-router';

class App extends React.Component {
	constructor(){
		super();
		this.deleteCoupon = this.deleteCoupon.bind(this);
		this.editCoupon = this.editCoupon.bind(this);
		this.state = {
			coupons : [], 
			user	: "Stripe coupons"
		};
	}

	componentWillMount(){
		apiServer({
			method 	: "get", 
			data	: 1, 
			service	: "coupons"
		}, (error, response) => {
			if(!error){
				if(!response.data.err){
					this.setState({coupons : response.data.coupons});
					this.setState({user : `Stripe coupons - ${response.data.user}`});
				}
				else{
					alert(`${response.data.err.type} : ${response.data.err.message}`);
					this.context.router.transitionTo(`/`);
				}
			}
			else{
				console.log(error);
				
			}
		});
    }

	editCoupon(idcoupon){
		this.context.router.transitionTo(`/newcoupon/${idcoupon}`);
	}

	deleteCoupon(idcoupon){
		apiServer({
			method 	: "delete", 
			data	: idcoupon, 
			service	: "deletecoupon"
		}, (error, response) => {
			if(!error){
				if(response.data.err){
					alert(`Error: ${response.data.err.message}`);
					this.context.router.transitionTo(`/`);
				}
				else{
					const coupons = [...this.state.coupons];
					let indice = 0; 
					for(let i = 0; i < coupons.length; i++){
						if(coupons[i].id === idcoupon){
							indice = i;
							break;
						}
					}
					delete coupons[indice];
					this.setState({coupons});
				}
			}
			else{
				console.log(error);
			}
		});
	}


	render(){
		return (
			<div>
				<Header title={this.state.user}/>
				<div className="container">
					<div className="row">
            			<div className="col-lg-12">
							<h2>Stripe coupons</h2>
							<Link to="/newcoupon/0" className="btn btn-info" role="button">New Coupon</Link>
							<hr/>
							{
								this.state.coupons.map((coupon) => 
									<Coupons
										key={coupon.id}
										details={coupon}
										deleteCoupon={this.deleteCoupon}
										editCoupon={this.editCoupon}
									/>
								)
							}
						</div>
					</div>
				</div>
	        </div>
		);
	}
};

App.contextTypes = {
    router : React.PropTypes.object
};

export default App;
