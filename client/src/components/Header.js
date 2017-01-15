import React from 'react';
import { Link } from 'react-router';

const Header = (props) => 
{
    return (
			<nav className="navbar navbar-inverse" role="navigation">
        		<div className="container">
            		<div className="navbar-header">
						<Link className="navbar-brand" to="/">{props.title}</Link>
            		</div>
        		</div>
    		</nav>
    );
};

Header.propTypes = {
    title : React.PropTypes.string.isRequired
};

export default Header;