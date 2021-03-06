import {LocationGeocodedAddress} from 'expo-location'
export interface Category{
    id: string,
    title: String,
    icon: String
}



export interface FoodModel{
    _id: string;
    vandorId: string;
    name:string;
    description:string;
    category:string;
    foodType:string;
    readyTime:number;
    price:number;
    rating: number;
    images:string
    unit: number;
}
 

export interface Restaurant{
    name:string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable:boolean;
    coverImages: string,
    rating:number; 
    foods: any
}

export interface FoodAvailability{
    restaurants: [Restaurant];
}
 

export interface UserModel{
    firstName:string;
    lastName:string;
    email:string;
    contactNumber: String;
    token: string;
    verified: boolean
}
 
export interface UserState{
    user: UserModel;
    location: LocationGeocodedAddress;
    error: string | undefined;
    Cart: [FoodModel],
    orders: [OrderModel]

}

export interface ShoppingState{
    availability: [Restaurant],
    availableFoods: [FoodModel]

}
export interface CartModel{
    _id: string;
    food:FoodModel;
    unit: number;

}

export interface OrderModel{
    _id: string;
    orderID: string;
    vandorID:string
    items:[CartModel];
    totalAmount: number;
    orderDate: number;
    paidThrough:string;
    orderStatus: string;
}