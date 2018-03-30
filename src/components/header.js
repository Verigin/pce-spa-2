import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { session } from '../session'
import { connect } from 'react-redux'
import { closeRemoteDb } from '../database'
import { getMeActive } from '../shared/selectors/itemselectorweb'

class Header extends Component {
  render () {
    return (
      <div className='container-fluid noPadding'>
        <div className='container'>
          <div className='row'>
            <ul class='nav nav-pills nav-fill'>
              <li class='nav-item'>
                <Link className='nav-link' to='/'>Home</Link>
              </li>
              {!this.props.active &&
                <li class='nav-item'>
                  <Link className='nav-link' to='/login'>Login</Link>
                </li>}
              {this.props.active &&
                <li class='nav-item'>
                  <Link
                    className='nav-link'
                    onClick={this.props.onLogout}
                    to='/'
                  >
                    Logout
                  </Link>
                </li>}
              {this.props.active &&
                <li class='nav-item'>
                  <Link className='nav-link' to='/Items'>Items</Link>
                </li>}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  active: getMeActive(state)
})

const mapDispatchToProps = {
  onLogout: closeRemoteDb
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
