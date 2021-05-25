import React, { useEffect, useState} from 'react'
import { View, Text, StyleSheet, Dimensions , Image, Animated, TouchableOpacity} from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

import { useNavigation } from '../utils'

import { connect } from 'react-redux'
import { ButtonWithIcon, CategoryCard, SearchBar, RestaurantCard, RestaurantCard1 } from '../components'
import { onAvailability, onSearchFoods ,UserState, ApplicationState, ShoppingState, Restaurant, FoodModel } from '../redux'
import iconsBar from '../foodicons/iconsBar'
import TravelList from '../Screen/TravelList'
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
    const {availableFoods} = props.shoppingReducer;
    const   restaurants = availability
    const foods = availableFoods
    const scrollX = React.useRef(new Animated.Value(0)).current;


 
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

 



    const { width, height } = Dimensions.get('screen');
    const ITEM_WIDTH = width * 0.76;
    const ITEM_HEIGHT = ITEM_WIDTH * 1.0;

    return (
        <View style={styles.container}>
         <View style={styles.navigation}> 
                <View style={{ marginTop: 15, flex: 4, alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row'}}>
                <Image source={require("../images/location.png")} style ={{width:25, height:25, marginLeft:10}}/>
                    

                <Text style={{fontSize:20, paddingBottom:15, color:'#000000', fontWeight:'700'}}>  Current Location : </Text>

                  
                </View>
                <View style={{ marginTop: 5, flex: 4, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Text  style={{fontSize:15, paddingTop:14, color:'#000000', fontWeight:'600'}}>{`${location.street},${location.city},${location.region}`} </Text> 

                </View>

            </View>
            
            <View style={styles.body}>
            </View>
         </View>
    )

}


const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    navigation: {
        flex: 1,
        backgroundColor:'white',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:12
        },
        shadowOpacity:1,
        shadowRadius:30,
        padding:20,
        elevation: 24,
        
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

const HomeScreen = connect(mapToStateProps, { onAvailability, onSearchFoods })(_HomeScreen)

export { HomeScreen }


/* <View>
                        <Text style={{fontSize: 25, fontWeight: '700', color: '#A74479', marginLeft: 50 }} > Favorite Foods : </Text>
                    </View>

                    <FlatList 
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     data={foods}
                     renderItem ={({item}) =>  <RestaurantCard1 item={item} onTap={onTapFood} /> } 
                     keyExtractor={(item) => `${item._id}`}

                    />
                    
                    
                      <FlatList 
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     pagingEnabled
                     data={restaurants}
                     renderItem ={({item , index}) =>  {
                
                      
                      
                      
                        return (
        <TouchableOpacity onPress={() => onTapRestaurant(item)}>
                            
                            <View style ={{ width,justifyContent:'center', alignItems:'center'}} >
                          
                          <View style ={{
                            borderRadius:18,
                            shadowColor:'#000',
                            shadowOffset:{
                                width:0,
                                height:12
                            },
                            shadowOpacity:1,
                            shadowRadius:30,
                            padding:12,
                            elevation: 24,
                            
                        
                          }}>
                          <View style={{width:ITEM_WIDTH,
                            height:ITEM_HEIGHT,
                             overflow:'hidden',
                             alignItems:'center',
                            borderRadius :14,
                    
                             }}>
                           <Animated.Image source ={{uri:`${item.coverImages}`}} 
                           style ={{
                            width:ITEM_WIDTH * 1,
                            height:ITEM_HEIGHT, 
                            resizeMode:'cover', 
                            }}/>
                    
                           </View>
                    
                          </View>
                    
                    
                            </View>
    
        </TouchableOpacity>
        
                        
                        )
                     } } 
                     keyExtractor={(item) => `${item.email}`}

                    />                  
                    
                    
                    
        
                     <Animated.FlatList 
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     pagingEnabled
                     onScroll={Animated.event([{nativeEvent:{contentOffset:{x :scrollX}}}], {useNativeDriver:true})}
                     data={foods}
                     renderItem ={({item , index}) =>  {
                
                      
                      const inputRange = [
                          (index - 1) * width,
                          index * width,
                          (index + 1) * width 
                      ];
                      const translateX = scrollX.interpolate({
                          inputRange,
                          outputRange : [-width * .7, 0, width* .7]
                      })
                      
                        return (
        <TouchableOpacity onPress={() => onTapFood(item)}>
                            
                            <View style ={{ width,justifyContent:'center', alignItems:'center'}} >
                          
                          <View style ={{
                            borderRadius:18,
                            shadowColor:'#000',
                            shadowOffset:{
                                width:0,
                                height:12
                            },
                            shadowOpacity:1,
                            shadowRadius:30,
                            padding:12,
                            elevation: 24,
                            
                        
                          }}>
                          <View style={{width:ITEM_WIDTH,
                            height:ITEM_HEIGHT,
                             overflow:'hidden',
                             alignItems:'center',
                            borderRadius :14,
                    
                             }}>
                           <Animated.Image source ={{uri:`${item.images}`}} 
                           style ={{
                            width:ITEM_WIDTH * 1,
                            height:ITEM_HEIGHT, 
                            resizeMode:'cover', 
                            transform :[
                                {translateX}
                            ]}}/>
                    
                           </View>
                    
                          </View>
                    
                    
                            </View>
    
        </TouchableOpacity>
        
                        
                        )
                     } } 
                     keyExtractor={(item) => `${item._id}`}

                    />            
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    */

