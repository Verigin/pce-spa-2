export const documentById = function (
  state,
  documentTypeStateAccessor,
  documentID
) {
  let referencedDocument = state[documentTypeStateAccessor].find(
    document => documentID == document._id
  )
  if (referencedDocument != undefined) {
    return referencedDocument
  } else {
    // console.log("documentselector.getItemById: could not find referenced " + documentTypeStateAccessor + " in state. document id: " + documentID);
    return null
  }
}
