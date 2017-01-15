import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import NewCoupon from './components/NewCoupon';
import { BrowserRouter, Match, Miss} from 'react-router';

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Match exactly pattern="/" component={Login}/>
                <Match exactly pattern="/coupons/" component={App}/>
                <Match exactly pattern="/register/" component={Register}/>
                <Match exactly pattern="/newcoupon/:id" component={NewCoupon}/>
                <Miss component={NotFound}></Miss>
            </div>
        </BrowserRouter>
    );
};

render(<Root/>, document.querySelector("#main"));