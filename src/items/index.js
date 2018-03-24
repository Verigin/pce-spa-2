import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllItems } from '../actions/items';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'

class List extends Component {

    componentDidMount() {
        this.props.onGetAllItems();
    }

    render() {
        return (
            <div className="container-fluid noPadding">
                <div className='container'>
                    <div className="row">
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/list'>List</Link></li>
                        </ul>
                    </div>
                    <div className="row">
                        {this.props.testStore.map((item, index) =>
                            <li key={index}>{item.title}</li>
                        )}
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
        onGetAllItems: () => {
            dispatch(getAllItems());
        }
    })
)(List);

