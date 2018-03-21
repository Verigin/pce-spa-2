import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from '../logo.svg';
import config, {environments, switchEnvironment} from "../config";
import {session} from "../session";
import PouchDB from 'pouchdb';

import '../App.css';
import '../index.css';
import Api from '../common/api';

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
  this.setState({user});
};

onChangePassword = (password) => {
  this.setState({password});
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
              session.user = data.data;
              session.user.email = session.user.email.toLowerCase();
              console.log(session.user);
              // Stay logged in
             // if (this.state.rememberPassword) {
             //     LoginScreen.storeSession(JSON.stringify(session.user));
             // }

            //  session.user.password = password; // because the server doesn't return the password
            console.log("CORRECT");
            console.table(data.success);
              // Begin synchronization
             // synchronizeUser(username, password);
            //  Clipboard.setString(undefined);

            // let link = config.couchDB(username,password);
            // //api._exec(METHOD_GET, link);
            // let promise;
            // let headers = {
            //   "Access-Control-Allow-Origin": "*",
            //   "Access-Control-Allow-Methods": "POST, OPTIONS",      
            //   //'Accept': 'application/json',        
            //   'Content-Type' : 'application/json; charset=utf-8',
            //   'Authorization'  :'Basic '+ btoa(username + ':' + password)              
            //   };
            // //var headers = new Headers();
            // //headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
            // promise = fetch(config.baseURL + "/couchdb/", {
            //   method: METHOD_POST,
            //   //body: JSON.stringify(params),
            //   headers: headers,
            //   responseType: 'json',
            //   withCredentials: true,
            //   mode: 'cors',
            //   follow: 0
            // })
            // .then(data => {
            //    console.log(data); 
            // });
            //https://verigin.aleks@gmail.com:yalsaudo0603@palettecollector.com/couchdb/
            
            let localDB = null;
            let remoteDB = null;
            localDB  = new PouchDB('mydb2');
            localDB.put({'_id':'3','name':'Alex'}).then(()=>console.log('put'));
            //remoteDB = new PouchDB('https://'+username+':'+password+"@palettecollector.com/couchdb/");

            // localDB.replicate.form(remoteDB).on('complete', function () {
            //   console.log('done');
            // }).on('error', function (err) {
            //   // boo, something went wrong!
            // });

            this.setState({
              loginMessage: "login in progress ",
              inProgress: true,
              class: 'alert alert-success'               
            }); 
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
          <header className="jumbotron">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="display-3">Welcome to React</h1>
          </header>
   

      <div className="container">
      <div className="row">
          <p className="App-intro">
          LOGIN page
          </p>
      
          <h1>App</h1>
          <ul>
            <li><Link to='/'>Main</Link></li>
            <li><Link to='/home'>Home</Link></li>
          </ul>
          {/* добавили вывод потомков */}
          {this.props.children}
        </div>
<div className="row">  
<div className="col-sm-3 col-lg-3 col-xl-4"></div>
<div className="col-sm-6 col-lg-6 col-xl-4">

  <div className="card">
    <div className="card-body">
    
    {loginMessage}
    {
   
      
    }
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
                    onChange={this.handleInputChange}/>
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
                onChange={this.handleInputChange}/>
            </div>

              {/* {this.state.user} */}
            <button type="submit" className="btn btn-primary" >Submit</button>
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

export default Login;
