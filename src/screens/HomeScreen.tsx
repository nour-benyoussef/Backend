import React, { useEffect, useState} from 'react'
import { View, Text, StyleSheet, Dimensions , Image } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

import { useNavigation } from '../utils'

import { connect } from 'react-redux'
import { ButtonWithIcon, CategoryCard, SearchBar, RestaurantCard } from '../components'
import { onAvailability, onSearchFoods ,UserState, ApplicationState, ShoppingState, Restaurant, FoodModel } from '../redux'
 
interface HomeProps{
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function,
    onSearchFoods: Function
}

export const _HomeScreen: React.FC<HomeProps> = (props) => {
    

    const { navigate } = useNavigation()


    const { location } = props.userReducer;
    const { availability } = props.shoppingReducer;

    const { categories, foods, restaurants } = availability

 
    useEffect(() => {
        props.onAvailability(location.postalCode)
        setTimeout(() => {
            props.onSearchFoods(location.postalCode)
        }, 1000 )

    }, [])

    const onTapRestaurant = (item: Restaurant) => {
        navigate('RestaurantPage', { restaurant: item})
    }

    const onTapFood = (item: FoodModel) => {    
        navigate('FoodDetailPage', { food: item})
    }



    return (
        <View style={styles.container}>
            <View style={styles.navigation}> 
                <View style={{ marginTop: 15, flex: 4, paddingLeft: 10, paddingRight: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',  borderBottomColor: '#000000',}}>
                <Image source ={require('../images/location.png')} style={{width:30, height:30}}/>    

         
                <Text style={{fontSize:14, marginBottom:2, color:'#000000', fontWeight:'600'}}>  {`${location.street},${location.city},${location.region}`} </Text> 
                  
                </View>
            </View>
            
            <View style={styles.body}>
                <ScrollView>
                    <FlatList 
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     data={categories}
                     renderItem ={({ item }) =>  <CategoryCard item={item} onTap={() => {} } /> } 
                     keyExtractor={(item) => `${item.id}`}
                    />
                    <View>
                        <Text style={{fontSize: 25, fontWeight: '700', color: '#A74479', marginLeft: 50 }} > Top Restaurants : </Text>
                    </View>
                    <FlatList 
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     data={restaurants}
                     renderItem ={({ item }) =>  <RestaurantCard item={item} onTap={onTapRestaurant} /> } 
                     keyExtractor={(item) => `${item._id}`}
                    />

                    <View>
                        <Text style={{fontSize: 25, fontWeight: '700', color: '#A74479', marginLeft: 50 }} > Favorite Foods : </Text>
                    </View>
                    <FlatList 
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     data={foods}
                     renderItem ={({ item }) =>  <RestaurantCard item={item} onTap={onTapFood} /> } 
                     keyExtractor={(item) => `${item._id}`}
                    />
                    

                </ScrollView>

                 
            </View>
         </View>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(242,242,242,1)'
    },
    navigation: {
        flex: 1,
     },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
     },
    

})


const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps, { onAvailability,  onSearchFoods })(_HomeScreen)

export { HomeScreen }