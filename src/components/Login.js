import React, { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login(){
        this.props.login({ username: 'rohit', user_id: '12' });
    };
    
    render() {
        return (
            <div className="col-md-6">
                <h1>Login or Register</h1>
                <form>
                    <div className="form-group">
                        <label for="username">Username</label>
                        <input name="username" type="text" className="form-control" placeholder="Please enter your username here." />
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input name="password" type="password" className="form-control" placeholder="Please enter your password here." />
                    </div>
                    <button className="btn btn-success form-control" onClick={this.login} type="button">Submit</button>
                </form>
            </div>
        );
    }
    
}

export default Login;