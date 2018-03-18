// Higher Order Component (HOC) - A component that renders another component
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The Info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    const Wrapped = (props) => (
        <div>
            { props.isAdmin && <h3>Warning this is admin info</h3> }
            <WrappedComponent {...props}/>
        </div>
    );

    return Wrapped;
};

const requireAuthentication = (WrappedComponent) => {
    const Wrapped = (props) => (
        props.isAuthenticated ?
            <WrappedComponent {...props}/> :
            <p>Please Log in to show the info</p>
    );

    return Wrapped;
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={false} info='These are the details' />, document.getElementById('app'));
