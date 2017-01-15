import React from 'react';
import Header from './Header';
import { Link } from 'react-router';
import { apiServer } from '../apiserver';

class NewCoupon extends React.Component {	
    constructor(){
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            coupon : {}
        };
	}

    componentWillMount(){
        if(this.props.params.id !== '0'){
            apiServer({
			method 	: "get", 
			data	: this.props.params.id, 
			service	: "getcoupon"
            }, (error, response) => {
                if(!error){
                    if(response.data.err){
                        alert(response.data.err.message);
                        this.context.router.transitionTo(`/`);
                    }
                    else{
                        const coupon = {...response.data.coupon};
                        if(coupon.duration_in_months === null){
                            coupon.duration_in_months = "0";
                        }
                        this.setState({coupon});
                    }
                }
                else{
                    console.log(error);
                }
            });
        }
    }

    componentWillUnmount(){
        this.setState({coupon : {}});
    }

    handleChange(event){
        const updateCoupon = {
            ...this.state.coupon,
            [event.target.name] :  event.target.value
        };
        this.setState({coupon : updateCoupon});
    }

	handleSubmit(event){
        event.preventDefault();
        apiServer({
			method 	: this.props.params.id === "0" ? "post" : "put", 
			data	: 	{
                            id      : this.props.params.id, 
                            percentoff : this.percentoff.value,  
                            duration : this.duration.value,
                            durationmoths : this.durationmoths.value
                        }, 
			service	: this.props.params.id === "0" ? "newcoupon" : "updatecoupon"
		}, (error, response) => {
            if(!error){
                if(response.data.err){
					alert(`Error: ${response.data.err.message}`);
					this.context.router.transitionTo(`/`);
				}
                else {
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
					<Header title={this.props.params.id === '0' ? "New Coupon" : "Edit Coupon"} />
					<div className="container">
        				<div className="row">
            				<div className="col-lg-12">
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<label>Percent off</label>
										<input 
											type="number" 
											className="form-control" 
											placeholder="Percent off"
											ref={(input) => {this.percentoff = input}}
                                            value={this.state.coupon.percent_off}
                                            name="percent_off"
                                            onChange={(e) => this.handleChange(e)}
										/>
  									</div>
                                      <div className="form-group">
										<label>Duration</label>
                                            <select 
                                                className="form-control"
                                                ref={(input) => {this.duration = input}}
                                                value={this.state.coupon.duration}
                                                name="duration"
                                                onChange={(e) => this.handleChange(e)}
                                            >
                                                <option value="repeating">Repeating</option>
                                                <option value="forever">Forever</option>
                                                <option value="once">Once</option>
                                            </select>
                                        </div>
									<div className="form-group">
										<label>Duration in months</label>
										<input 
											type="number" 
											className="form-control" 
											placeholder="Duration in months"
											ref={(input) => {this.durationmoths = input}}
                                            value={this.state.coupon.duration_in_months}
                                            name="duration_in_months"
                                            onChange={(e) => this.handleChange(e)}
										/>
  									</div>
									<div>
										<button type="submit" className="btn btn-primary">Save</button>
                                        <Link to="/coupons" className="btn btn-default pull-right" role="button">Cancel</Link>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
    );
  };
};

NewCoupon.contextTypes = {
    router : React.PropTypes.object
};

export default NewCoupon;