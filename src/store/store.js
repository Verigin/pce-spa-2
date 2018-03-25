import { createStore, composer, applyMiddleware  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));

function reducer(state = {auth: false, data: []},action) {
//function reducer(state = [],action) {   
    if (action.type === 'CHANGE_DATA')
    {         
        console.log('reducer', 'CHANGE_DATA');
        //state.data = action.docs; 
        return {
            ...state,
            data: action.docs
          };    
    }
    if (action.type === 'AUTH_SUCCESS')
    {         
        console.log('AUTH_SUCCESS');
        //state.auth = true;     
        return {
            ...state,
            auth: true
          }; 
    }
    if (action.type === 'LOGOUT')
    {         
        console.log('LOGOUT');
        //state.auth = true;     
        return {
            ...state,
            auth: false
          }; 
    }
    return state;
}

export default store;



