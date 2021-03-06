import axios from 'axios'
import { LocationGeocodedAddress } from 'expo-location'
import { Dispatch } from 'react'
import { BASE_URL } from '../../utils'
import { FoodAvailability, FoodModel, Restaurant } from '../models'


//availability Action

export interface AvailabilityAction{
    readonly type: 'ON_AVAILABILITY',
    payload: [Restaurant]
}


export interface FoodSearchAction{
    readonly type: 'ON_FOODS_SEARCH',
    payload: [FoodModel]
}


export interface ShoppingErrorAction{
    readonly type: 'ON_SHOPPING_ERROR',
    payload: any
}



export type ShoppingAction = AvailabilityAction | ShoppingErrorAction | FoodSearchAction 


export const onAvailability = (postCode: string) => {


 
    return async ( dispatch: Dispatch<ShoppingAction>) => {

        try {
            const response = await axios.get<[Restaurant]>(`http://192.168.8.103:8000/`)
 
            if(!response){
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            }else{
                dispatch({
                    type: 'ON_AVAILABILITY',
                    payload: response.data
                })
            }


        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }

    }

}


export const foodin30min = (postCode: string) => {


    return async ( dispatch: Dispatch<ShoppingAction>) => {

        try {

            const response = await axios.get<[FoodModel]>(`http://192.168.8.103:8000/search`)

            

            if(!response){
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            }else{
            
                dispatch({
                    type: 'ON_FOODS_SEARCH',
                    payload: response.data
                })
            }


        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }

    }

}




export const onSearchFoods = (postCode: string) => {


    return async ( dispatch: Dispatch<ShoppingAction>) => {

        try {

            const response = await axios.get<[FoodModel]>(`http://192.168.8.103:8000/search`)

            

            if(!response){
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            }else{
            
                dispatch({
                    type: 'ON_FOODS_SEARCH',
                    payload: response.data
                })
            }


        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }

    }

}