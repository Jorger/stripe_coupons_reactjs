import React from 'react';

class Coupons extends React.Component {
	constructor(){
		super();
        this.deleteCoupon = this.deleteCoupon.bind(this); 
	}
    
    deleteCoupon(idcoupon){
        const msg = "Are you sure delete this coupon?";
        if(confirm(msg)){
            this.props.deleteCoupon(idcoupon);
        }
    }

	render(){
		return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Coupon # {this.props.details.id}
                        </h3>
                    </div>
                    <div className="panel-body">
                        <ul>
                            <li>Percent off: {this.props.details.percent_off}% off</li>
                            <li>ID: {this.props.details.id}</li>
                            <li>Duration: {this.props.details.duration}</li>
                            <li>Duration in months: {this.props.details.duration_in_months || "none"}</li>
                            <li>Valid: {this.props.details.valid.toString()}</li>
                            <li>Created: {new Date(this.props.details.created * 1000).toString()}</li>
                        </ul>
                        <hr/>
                        <button 
                            type="button" 
                            className="btn btn-success"
                            onClick={() => this.props.editCoupon(this.props.details.id)}
                        >Edit Coupon</button>
                        <button 
                            type="button" 
                            className="btn btn-danger pull-right"
                            onClick={() => this.deleteCoupon(this.props.details.id)}
                        >Delete Coupon</button>
                    </div>
                </div>
		);
	}
};

Coupons.propTypes = {
    details : React.PropTypes.object.isRequired,
    deleteCoupon : React.PropTypes.func.isRequired,
    editCoupon : React.PropTypes.func.isRequired
};

export default Coupons;