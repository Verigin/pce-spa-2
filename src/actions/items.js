import { getAllItems } from '../store/database.js';

export const onGetAllItems = () => dispatch => {
    // getAllItems();
}

export const authSuccess = () => dispatch => {
    dispatch({type: 'AUTH_SUCCESS'});
}