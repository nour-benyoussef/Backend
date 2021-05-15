import { combineReducers} from 'redux'
import { ShoppingReducer} from './ShoppingReducer'
import { UserReducer} from './userReducer'

const rootReducer = combineReducers({
    userReducer: UserReducer,
    shoppingReducer:ShoppingReducer
})

export type ApplicationState = ReturnType<typeof rootReducer>

export {rootReducer}