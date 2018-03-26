import db from '../store/database.js';

export const getAllItems = () => dispatch => {
    db.allDocs({
        include_docs: true,
        attachments: true
    }).then(function (result) {
        //console.log("getAllItems",result);
        //var mylist = result.rows;
        const docs = result.rows
            .map(row => row.doc)
            .filter(doc => doc.type === 'item');
        console.log("getAllItems from local database", docs);                
        dispatch({type: 'CHANGE_DATA',docs});    
    }).catch(function (err) {
        console.log(err);
    }); 
}

export const authSuccess = () => dispatch => {
    dispatch({type: 'AUTH_SUCCESS'});
}