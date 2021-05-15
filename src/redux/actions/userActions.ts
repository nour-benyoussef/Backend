import axios from 'axios'
import {LocationGeocodedAddress} from 'expo-location'
import { Dispatch } from 'react'
import { BASE_URL} from '../../utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FoodModel, OrderModel, UserModel } from '../models'
import { Alert } from 'react-native'

export interface UpdateLocationAction{
    readonly type: 'ON_UPDATE_LOCATION',
    payload: LocationGeocodedAddress

}

export interface UserErroeAction{
    readonly type: 'ON_USER_ERROR',
    payload: any

}

export interface UpdateCartAction{
    readonly type: 'ON_UPDATE_CART',
    payload: FoodModel
}

export interface UserLoginAction{
    readonly type: 'ON_USER_LOGIN',
    payload: UserModel
}

export interface CreateOrderAction{
    readonly type: 'ON_CREATE_ORDER',
    payload: OrderModel
}

export interface ViewOrdersAction{
    readonly type: 'ON_VIEW_ORDER'|'ON_CANCEL_ORDER',
    payload: [OrderModel]
}

export interface UserLogoutAction{
    readonly type: 'ON_USER_LOGOUT'
}




export type UserAction = UpdateLocationAction | UserErroeAction | UpdateCartAction | UserLoginAction | CreateOrderAction | ViewOrdersAction|UserLogoutAction; 

export const onUpdateLocation = (location:LocationGeocodedAddress) => {

    return async ( dispatch: Dispatch<UserAction>) => {

        try{
            const locationString = JSON.stringify(location)
            await AsyncStorage.setItem('user_location', locationString)
            dispatch({
                type:'ON_UPDATE_LOCATION',
                payload: location
            })


        }catch(error){
            dispatch({
                type:'ON_USER_ERROR',
                payload: error
            })


        }
    }


}


export const onUpdateCart = (item: FoodModel) => {

    return async ( dispatch: Dispatch<UserAction>) => {

        
            dispatch({
                type:'ON_UPDATE_CART',
                payload: item
            })


    }


}



export const OnUserLogin = (email: string , password: string) => {

    return async ( dispatch: Dispatch<UserAction>) => {

        try{
            const response = await axios.post<UserModel>(`http://192.168.8.103:8000/customer/login`,{
                email,
                password
            })

 
            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Login error'
                })
           

            }else{
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
            Alert.alert("Welcome", "Your new account is ready")


        }catch(error){
            dispatch({
                type:'ON_USER_ERROR',
                payload: error
            })
            Alert.alert("Login Failed","your Login or Password is incorrect, Please try again")
        }
    }


}



export const OnUserSignup = ( email: string ,phone: string, password: string) => {

    return async ( dispatch: Dispatch<UserAction>) => {

        try{
            const response = await axios.post<UserModel>(`http://192.168.8.103:8000/customer/signup/`,{
                email,
                phone,
                password
            })
          
         
            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Login error'
                })
            }else{
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
                Alert.alert("Welcome", "Your new account is ready")

            }


        }catch(error){
            dispatch({
                type:'ON_USER_ERROR',
                payload: error
            })
            Alert.alert("Sign Up Failed","The email address, Phone number or password you entered is incorrect, Please Try again ")


        }
    }
}


export const onVerifyOTP = (otp: string ,user: UserModel) => {

    return async ( dispatch: Dispatch<UserAction>) => {

        try{
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            const response = await axios.patch<UserModel>(`http://192.168.8.103:8000/customer/verify/`,{
                otp
            })
         
            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Verification error'
                })
            }else{
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }


        }catch(error){
            dispatch({
                type:'ON_USER_ERROR',
                payload: error
            })


        }
    }
}


export const onOTPrequest = (user: UserModel) => {

    return async ( dispatch: Dispatch<UserAction>) => {

        try{
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            const response = await axios.get<UserModel>(`http://192.168.8.103:8000/customer/otp/`)
         
            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Verification error'
                })
            }else{
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }


        }catch(error){
            dispatch({
                type:'ON_USER_ERROR',
                payload: error
            })


        }
    }
}






export const onCreateOrder = (cartItems:[FoodModel],user:UserModel) => {

    let cart = new Array();
    cartItems.map(item => {
        cart.push({_id: item._id, unit: item.unit});
    })
    return async ( dispatch: Dispatch<UserAction>) => {

        try{
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            const response = await axios.post<OrderModel>(`${BASE_URL}user/create-order`, {
                cart: cart
            })

 
            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Verification error'
                })
            }else{
                dispatch({
                    type: 'ON_CREATE_ORDER',
                    payload: response.data
                })
            }


        }catch(error){
            dispatch({
                type:'ON_USER_ERROR',
                payload: error
            })
            Alert.alert("Create Order failed", "Please verify your informations")


        }
    }

}








export const onGetOrders = (user:UserModel) => {

    
    return async ( dispatch: Dispatch<UserAction>) => {

        try{
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            const response = await axios.get<[OrderModel]>(`${BASE_URL}user/order`)
            

 
            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Verification error'
                })
            }else{
                dispatch({
                    type: 'ON_VIEW_ORDER',
                    payload: response.data
                })
            }


        }catch(error){
            dispatch({
                type:'ON_USER_ERROR',
                payload: error
            })


        }
    }

}



export const onCancelOrder = (order:OrderModel,user:UserModel) => {

    
    return async ( dispatch: Dispatch<UserAction>) => {

        try{
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            const response = await axios.delete<[OrderModel]>(`${BASE_URL}user/order/${order._id}`)
            

 
            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Verification error'
                })
            }else{
                dispatch({
                    type: 'ON_CANCEL_ORDER',
                    payload: response.data
                })
            }


        }catch(error){
            dispatch({
                type:'ON_USER_ERROR',
                payload: error
            })


        }
    }

}


export const onUserLogout = () => {

    
    return async ( dispatch: Dispatch<UserAction>) => {

        try{
                 
                dispatch({
                    type: 'ON_USER_LOGOUT',
                })
            
                

        }catch(error){
            dispatch({
                type:'ON_USER_ERROR',
                payload: error
            })


        }
    }

}