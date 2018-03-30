import { createSelector } from 'reselect'
import {documentById} from "./documentselector";

const contactById = function(state, contactID) {
    //console.log("state: " + JSON.stringify(state));
    return documentById(state, 'contacts', contactID);
}

//creating Memoized Selector
export const getContactById = createSelector(
    [ contactById ],
    (contactById) => {return contactById;}
)