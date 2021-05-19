import React, { useState, useEffect, createRef} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ImageBackground, Dimensions, Alert } from 'react-native'
import { connect } from 'react-redux'
import { ApplicationState, FoodModel, ShoppingState, UserState , onUpdateCart, onCreateOrder} from '../redux'
import { ButtonWithIcon, ButtonWithTitle, FoodCard, FoodCardInfo, SearchBar } from '../components'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { checkExistence, useNavigation } from '../utils'
import PaymentTypePopup from 'react-native-raw-bottom-sheet'

interface CartScreenProps{ 
    userReducer: UserState,
    shoppingReducer: ShoppingState;
    onUpdateCart : Function,
    onCreateOrder:Function
 }


const _CartScreen: React.FC<CartScreenProps> = (props) => {

    const { navigate } = useNavigation()
    const [totalAmount, setTotalAmount] =useState(0)

    const {Cart, user, location, orders} = props.userReducer;
    const popupRef= createRef<PaymentTypePopup>();

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', {food:item})
    }

 
    useEffect(() => {
        onCalculateAmount()
    },[Cart]);

    const onCalculateAmount = () => {

        let total = 0
        if(Array.isArray(Cart)){
            Cart.map(food => {
                total += food.price * food.unit
            })
        }   
         setTotalAmount(total);
    
        }


        const onValidateorder = () => {
            if(user !== undefined){
              if(!user.verified){
                  navigate('LoginPage')
       
              }else{

                  popupRef.current?.open();
       
              }
            }else{
                navigate('LoginPage');
            }
      
          }

      
          const onTapPlaceOrder = ()=>{
              props.onCreateOrder(Cart,user);
              popupRef.current.close();
          }
      

        const popupView = () => {
            return(
                <PaymentTypePopup
                height={400}
                ref={popupRef}
                 closeOnDragDown={true}
                 closeOnPressMask={false}
                 customStyles={{
                     wrapper: {
                         backgroundColor: 'transparent'
                     },
                     draggableIcon: {
                         backgroundColor:'#000'
                     },
                     container:{
                         justifyContent:'flex-start',
                         alignItems:'center'
                     }

                 }}
                 >
                    <View style={{
                        display:'flex',
                        flexDirection: 'column',
                        justifyContent:'space-around',
                        width: '100%',
                    }}>
                        
                        <View style={styles.paymentView}>
                            <Text style={{fontSize: 20}}>Payables Amount</Text>
                            <Text style={{fontSize: 20 , fontWeight:'600'}}>{totalAmount.toFixed(2)} DT</Text>
                        </View>

                        <View style ={{ display:'flex', height:100, padding: 20 , flexDirection: 'row'}}>
                            <Image source ={require('../images/location.png')} style={{width:40, height:40}}/>
                           
                           <View style={{ marginLeft:10}}>
                           <Text style={{fontSize:16,fontWeight:'700', marginBottom:5}}> Address Used to Delivery: </Text>
                            <Text style={{color:'#666666', marginBottom:5, width: Dimensions.get('screen').width - 60}}>{`${location.name},${location.street},${location.city}`}</Text>
                           </View>
         
                        </View>
                        <ScrollView horizontal={true}>
                            <View style={styles.paymentOptions}>
                                <TouchableOpacity
                                onPress={() => onTapPlaceOrder()}
                                style={styles.options}>
                                <Image source ={require('../images/cod_icon.png')} style={styles.icon}/>
                                <Text style={styles.optionText}> Cash On Delivery</Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                onPress={() => {}}
                                style={styles.options}>
                                <Image source ={require('../images/card_icon.png')} style={styles.icon}/>

                                <Text style={styles.optionText}> Card Payment</Text>

                                </TouchableOpacity>



                            </View>
                        </ScrollView>


                    </View>
                </PaymentTypePopup>
            )
        }









  
    if(Cart.length > 0){ 
                return (<View style={styles.container}>
                        <View style={styles.navigation}> 
                        <View style={{ display: 'flex', height: 60, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft:20, paddingRight:20}}>
                        <Text style={{fontSize:18,fontWeight:'700'}}>My Cart</Text>
                       
                        {user.token !==undefined &&
                        <TouchableOpacity style={{alignItems:'center'}}
                            onPress={() =>{
                                navigate('OrderPage')
                            }}
                        >
                        <Image source={require('../images/orders.png')} style={{width:50, height:50}}/>
                        </TouchableOpacity> }
                        
                     </View>
                        </View>

                            <View style={styles.body}>
                                <FlatList 
                                    showsVerticalScrollIndicator={false}
                                    data={Cart}
                                    renderItem={({item}) => <FoodCardInfo onTap={onTapFood} item={checkExistence(item, Cart)} OnUpdateCart ={props.onUpdateCart} /> }
                                    keyExtractor={(item) => `${item._id}`}
                                />
                            </View>

                            <View style={styles.footer}>
                                <View style={styles.amountDetails}>
                                    <Text style={{ fontSize: 20}}>Total</Text>
                                    <Text style={{ fontSize: 20}}>{totalAmount} DT</Text>
                                </View>
                                <ButtonWithTitle title={"Order Now"} onTap={onValidateorder} height={50} width={200}/>
                            </View>
                            {popupView()}

                      </View>)
    }else{
        return (<View style={styles.container}>
            <View style={styles.navigation}> 
                    <View style={{ display: 'flex', height: 60, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft:20, paddingRight:20}}>
                        <Text style={{fontSize:25,fontWeight:'700'}}>My Cart</Text>
                        {user.token !==undefined &&
                        <TouchableOpacity style={{alignItems:'center'}}
                            onPress={() =>{
                                navigate('OrderPage')
                            }}
                        >
                        <Image source={require('../images/orders.png')} style={{width:50, height:50}}/>
                        </TouchableOpacity> }
                        
                     </View>
            </View>

                <View style={styles.body}>
                <Image source={require('../images/empty-cart.png')} style={{width:100, height:100}}/>

                    <Text style={{ fontSize:25, fontWeight:'600'}}>Your Cart is Empty </Text>

                </View>

                

          </View>)
             
                     
            } 
}


const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: '#F2F2F2'},
navigation: { flex: 1,  marginTop: 43, },
body: { flex: 9, justifyContent: 'center', alignItems: 'center' },
footer: { flex: 2, justifyContent: 'center', paddingLeft: 10, paddingRight: 10 },
paymentView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    margin: 5 ,
    backgroundColor: '#CEAECC'
},
paymentOptions:{
    display: 'flex',
    flex:1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    paddingLeft:20
},
icon:{
    width: 80,
    height: 80,

},

optionText:{
    fontSize:16,
    fontWeight: '600',
    color: '#545252'
},

options:{
    display:'flex',
    height: 120,
    width: 160,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'column',
    padding: 10,
    borderColor:'#A0A0A0',
    backgroundColor:'#F2F2F2',
    borderWidth: 0.2,
    borderRadius: 10,
    margin: 10


},

amountDetails: {
   display:'flex' , flexDirection:'row' , justifyContent:'space-between' , paddingLeft:20, paddingRight:20}
})



const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})


const CartScreen = connect(mapStateToProps, {onUpdateCart,onCreateOrder})(_CartScreen)

 export { CartScreen }