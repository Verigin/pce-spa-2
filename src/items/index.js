import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllItems } from '../actions/items';

class List extends Component {

    componentDidMount() {
        this.props.onGetAllItems();
    }

    render() {
        return (
            <div className="container-fluid noPadding">
                <div className='container'>                    
                    <div className="row">
                    <ul class="list-group">
                        {this.props.testStore.data.map((item, index) =>
                            <li class="list-group-item" key={index}>{item.inventoryNumber} {item.title} {item.year}</li>
                        )}
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
        onGetAllItems: () => {
            dispatch(getAllItems());
        }
    })
)(List);

