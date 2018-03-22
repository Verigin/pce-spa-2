import React, { Component } from 'react';
import { connect } from 'react-redux';

class Item extends Component {

    render (){
        return (
           <div>
            {this.props.testStore.map((item,index)=>
                <li key={index}>{item.title}</li>
            )}
           </div>     
        )
    }
}

export default connect (
    state => ({
      testStore: state
    }),
    dispatch => ({
    //   onAddTrack: (trackName) => {
    //     dispatch({type: 'ADD_TRACK', playload: trackName})
    //   }
    })
  )(Item);