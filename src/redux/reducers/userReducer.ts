import { LocationGeocodedAddress } from 'expo-location'
import { Alert } from 'react-native'
import { UserAction } from '../actions'
import { FoodModel, OrderModel, UserModel,UserState } from '../models'

const initialState: UserState={
    user: {} as UserModel,
    location: {} as LocationGeocodedAddress,
    error: undefined,
    Cart: {} as [FoodModel],
    orders: {} as [OrderModel]

}
const UserReducer = (state: UserState = initialState, action: UserAction) =>{

    switch(action.type){
        case 'ON_UPDATE_LOCATION':
        return {
            ...state,
            location: action.payload
        }
        case 'ON_UPDATE_CART': 
        if(!Array.isArray(state.Cart)){
            return {
                ...state,
                Cart: [action.payload]
            }
        }
        const existingFoods = state.Cart.filter(item => item._id == action.payload._id);


        if (existingFoods.length > 0){
            let updatedCart = state.Cart.map((food) => {
                if(food._id == action.payload._id){
                   food.unit = action.payload.unit;
                }
                return food
            })

            return {
                ...state,
                Cart:  updatedCart.filter( item => item.unit > 0)
            }

        }else{
            return {
                ...state,
                Cart: [...state.Cart, action.payload]
            }
        }

        case 'ON_USER_LOGIN':
            return {
                ...state,
                user: action.payload
            }
            
            

            case 'ON_USER_LOGOUT':
                return {
                    ...state,
                    user: {} as UserModel
                }

        case 'ON_CREATE_ORDER':
            if(!Array.isArray(state.orders)){
                return{
                    ...state,
                    cart: [],
                    orders: [action.payload]
                }
                 
            }else{
                return{
                    ...state,
                    Cart: [],
                    orders: [...state.orders, action.payload]

                }
            }
        case 'ON_VIEW_ORDER':
        case 'ON_CANCEL_ORDER':
            return{
                ...state,
                orders: action.payload
            }

        default:
            return state;
    }

}

export { UserReducer}