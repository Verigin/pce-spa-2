import { createStore, composer, applyMiddleware  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));

function reducer(state = [],action) {
    if (action.type === 'CHANGE_DATA')
    {         
        state = action.docs;     
    }
    return state;
}

export default store;



