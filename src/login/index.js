import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PouchDB from 'pouchdb';
import config, { environments, switchEnvironment } from "../config";
import { session } from "../session";
import Api from '../common/api';
import { sinhronize, openRemoteDb } from '../store/database';
import { authSuccess } from '../actions/items';

const api = new Api;

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      loginMessage: null,
      rememberPassword: false,
      inProgress: false,
      class: 'alert alert-info'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onChangeUsername = (user) => {
    this.setState({ user });
  };

  onChangePassword = (password) => {
    this.setState({ password });
  };

  onLoginPressed1 = (event) => {
    event.preventDefault();
    console.log("___THIS");
  }

  onLoginPressed = (event) => {
    event.preventDefault();
    console.log("user clicked log in button");
    this.setState({
      loginMessage: null,
      inProgress: true
    });

    const username = this.state.user;
    const password = this.state.password;
    let METHOD_GET = 'GET';
    let METHOD_POST = 'POST';
    api.login(username, password)
      .then(data => {
        if (data.success === true) {
          console.log('try to auth like ',username,password);
          console.log(data.data);
          session.user = data.data;
          session.user.email = session.user.email.toLowerCase();
          //console.log(session.user);
          this.setState({
            loginMessage: "login in progress ",
            inProgress: true,
            class: 'alert alert-success'
          });
          // console.log('try sinhronize ',username,password);
          // sinhronize(username, password);
          openRemoteDb(username, password);
          this.props.onAuthSuccess();
          this.props.history.push('/items');
          // resetToHome(this.props.navigation);
          return false;
        }
      }, error => {
        session.user = "error";
        this.setState({
          loginMessage: error.message,
          inProgress: false,
          class: 'alert alert-danger'
        });
        //console.log("login or password is incorrect");
        return false;
      })
      .catch((error) => {
        session.user = "error";
        console.log("Login failed");
        console.error(error);
        return false;
      })
  };

  render() {
    let loginMessage;
    if (this.state.loginMessage) {
      loginMessage = <div class={this.state.class} >
        {this.state.loginMessage}
      </div>;
    }
    return (
      <div className="container-fluid noPadding">
        <div className="container">          
          <div className="row">
            <div className="col-sm-3 col-lg-3 col-xl-4"></div>
            <div className="col-sm-6 col-lg-6 col-xl-4">
              <div className="card">
                <div className="card-body">
                  {loginMessage}
                  <h5 className="card-title">Card title</h5>
                  <form onSubmit={this.onLoginPressed}>
                    <div className="form-group">
                      <label for="EmailInput">Email address</label>
                      <input
                        name="user"
                        type="email"
                        className="form-control"
                        id="EmailInput"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={this.state.user}
                        onChange={this.handleInputChange}
                        required="required" />
                      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                      <label for="PasswordInput">Password</label>
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        id="PasswordInput"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        required="required" />
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                    <br/>
                    user: pcespa5@mail.ru <br/>
                    password: pcespa5 <br/>
                    don`t use real user<br/> there is synchronization problem!
                  </form>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-lg-3 col-xl-4"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
      testStore: state
  }),
  dispatch => ({
      onAuthSuccess: () => {
          console.log('AUTH_SUCCESS');
          dispatch(authSuccess());
      }
  })
)(Login);
