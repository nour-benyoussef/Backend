import { ShoppingAction } from '../actions'
import { FoodAvailability, FoodModel, Restaurant, ShoppingState } from '../models'


const initialState = {
    availability: {} as [Restaurant],
    availableFoods: {} as [FoodModel]
}



const ShoppingReducer = (state: ShoppingState = initialState, action: ShoppingAction) => {
    
    switch(action.type){
        case 'ON_AVAILABILITY':
            return {
                ...state,
                availability: action.payload
            }
        case 'ON_FOODS_SEARCH':
            return {
                ...state,
                availableFoods: action.payload
            }


        default:
            return state
    }


}


export { ShoppingReducer}