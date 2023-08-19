import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk, { ThunkMiddleware } from "redux-thunk"

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;