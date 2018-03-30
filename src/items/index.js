import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteItems, updateItem } from '../shared/actions'
import { getAllItems } from '../shared/selectors/itemselectorweb'
import v1 from 'uuid/v1'
// import { onGetAllItems } from '../actions/items'

class Item extends Component {
  // componentDidMount() {
  //     this.props.onGetAllItems();
  // }

  render () {
    let { deleteItem, onUpdateItem } = this.props
    return (
      <div className='container-fluid noPadding'>
        <div className='container'>

          <form>
            <input
              type='text'
              ref={input => (this.number = input)}
              placeholder='number'
              name='number'
            />
            <input
              type='text'
              ref={input => (this.title = input)}
              placeholder='title'
              name='title'
            />
            <input
              type='text'
              ref={input => (this.artist = input)}
              placeholder='artist'
              name='artist'
            />
            <button
              onClick={event => {
                event.preventDefault()
                let item = {
                  _id: '' + v1(),
                  type: 'item',
                  dimension: {
                    width: 0,
                    height: 0,
                    depth: 0,
                    measurementUnit: 'INCHES'
                  },
                  images: []
                }
                item.inventoryNumber = this.number.value
                item.title = this.title.value
                item.artist = this.artist.value
                console.log('try to create item ...', item)
                onUpdateItem(item)
              }}
            >
              Add
            </button>
          </form>
          <br />
          <div className='row'>

            {this.props.items.map((item, index) => ( // </li> // <li class='list-group-item' key={index}> //   {item.inventoryNumber} {item.title} {item.year}
              <div class='col-sm-3'>
                <div className='card w-75'>
                  <div class='card-body' key={index}>
                    <h5 className='card-title'>{item.inventoryNumber}</h5>
                    <p className='card-text'>Title: {item.title} </p>
                    <p className='card-text'>Artist: {item.Artist} </p>
                    <a href='#' className='card-link'>Edit</a>
                    <a
                      href='#'
                      className='card-link'
                      onClick={() => deleteItem(item._id)}
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: getAllItems(state)
})

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: id => {
      console.log('try to delete id=', id)
      dispatch(deleteItems(new Array(id)))
    },
    onUpdateItem: item => {
      console.log('try to create item', item)
      dispatch(updateItem(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)
