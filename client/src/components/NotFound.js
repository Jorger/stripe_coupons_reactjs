import React from 'react';
import Header from './Header';

const NotFound = () => {
        return (<div>
                        <Header title="Error: Page not found"/>
                        <div className="container">
        	                <div className="row">
            			        <div className="col-lg-12">
                                            <h1>Page not found</h1>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default NotFound;