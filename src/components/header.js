import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { session } from "../session";
import { connect } from 'react-redux';
import { cancelSync } from '../store/database';

class Header extends Component {
    render() {
        return (
            <div className="container-fluid noPadding">
                <div className='container'>
                    <div className="row">
                        <ul class="nav nav-pills nav-fill">
                            <li class="nav-item"><Link className="nav-link" to='/'>Home</Link></li>
                            { !this.props.testStore.auth &&  
                            <li class="nav-item"><Link className="nav-link" to='/login'>Login</Link></li>
                            }
                            { this.props.testStore.auth  &&  
                            <li class="nav-item" ><Link className="nav-link"  onClick={this.props.onLogout} to='/'>Logout</Link></li>
                            }
                            { this.props.testStore.auth  &&
                            <li class="nav-item"><Link className="nav-link" to='/Items'>Items</Link></li>
                            }
                        </ul>
                    </div>
                </div>             
            </div>

        )
    }
}

export default connect(
    state => ({
        testStore: state
    }),
    dispatch => ({
        onLogout: () => {
            dispatch({type: "LOGOUT"});
            cancelSync();
        }
    })
)(Header);
