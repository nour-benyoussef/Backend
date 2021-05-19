import React, { useState, useEffect} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ImageBackground, Dimensions, FlatList } from 'react-native'
import { connect } from 'react-redux';
import { ButtonWithIcon, FoodCard } from '../components';
import { ApplicationState, FoodModel, onUpdateCart, UserState} from '../redux';
import { checkExistence } from '../utils';
import {useNavigation} from '../utils/useNavigation'
interface FoodDetailProps{
    userReducer: UserState,
    onUpdateCart : Function,
    
    navigation: { getParam: Function, goBack: Function}
   

}

const _FoodDetailScreen: React.FC<FoodDetailProps> = (props) => {
    const { getParam, goBack } = props.navigation;

    const food = getParam('food') as FoodModel
    
    const {navigate} = useNavigation()
    const {Cart} = props.userReducer;


  
    
    return(
        <View style ={styles.container}>
            <View style= {styles.navigation}>
                <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={40} height={40}/>
                <Text style={{ fontSize:22 , fontWeight: '600' , marginLeft:20}}> {food.name}</Text>
            </View>

            <View style={styles.body}>
                    <ImageBackground source={{uri:`${food.images}`}}
                        style={{ width: Dimensions.get('screen').width, height: 300, justifyContent: 'flex-end', }}>
                            <View style={{ height: 120, backgroundColor: 'rgba(0,0,0,0.6)', padding: 20}}>

                                    <Text style={{ color: '#FFF', fontSize: 25, fontWeight: '700' }} > {food.name}</Text>
                                    <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '500' }} > {food.category}</Text>

                            </View>
                    </ImageBackground>

                    <View> 
                        <Text style={{ padding: 20, fontSize: 20}}> Food Will be ready within {food.readyTime} Minute(s)</Text>
                         <Text style={{ padding: 10 ,fontSize: 15}}>Description : {food.description} </Text>
                         <View style={{ height:120}}>
                         <FoodCard item={checkExistence(food,Cart)} onTap={() => {}} OnUpdateCart ={props.onUpdateCart}/>
                          </View>
                      </View> 
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F2F2'},
    navigation: { flex: 1, marginTop: 43, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' },
    body: { flex: 10, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF', paddingBottom: 160 },
    footer: { flex: 1, backgroundColor: 'cyan' }
    })

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})


const FoodDetailScreen = connect(mapStateToProps, {onUpdateCart})(_FoodDetailScreen)

 export { FoodDetailScreen }