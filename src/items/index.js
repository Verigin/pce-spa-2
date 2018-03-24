import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllItems } from '../actions/items';
import 'bootstrap/dist/css/bootstrap.css';

class List extends Component {

    componentDidMount() {
        this.props.onGetAllItems();
    }

    render() {
        return (
            <div>
                {this.props.testStore.map((item, index) =>
                    <li key={index}>{item.title}</li>
                )}
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

