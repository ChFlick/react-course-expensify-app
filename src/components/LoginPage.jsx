import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLoginWithGoogle, startLoginWithGithub }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expensify</h1>
            <p>It&#39;s time to get your expenses under control.</p>
            <button className="button" onClick={startLoginWithGoogle}>Login with Google</button>
            <button className="button" onClick={startLoginWithGithub}>Login with GitHub</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLoginWithGoogle: () => dispatch(startLogin('google')),
    startLoginWithGithub: () => dispatch(startLogin('github'))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
