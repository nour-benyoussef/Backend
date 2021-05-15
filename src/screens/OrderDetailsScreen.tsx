import React, { useState, useEffect, createRef} from 'react'
import { StyleSheet, View, Text,Alert} from 'react-native'
import { connect } from 'react-redux'
import { ApplicationState,UserState ,onCancelOrder, OrderModel} from '../redux'
import { ButtonWithIcon, ButtonWithTitle, FoodCard, FoodCardInfo, SearchBar } from '../components'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '../utils'
import { OrderCard } from '../components/OrderCard'
import moment from 'moment'
interface OrderDetailsScreenProps{ 
    userReducer: UserState,
    onCancelOrder:Function,
    navigation:{getParam: Function, goBack:Function }
 }


const _OrderDetailsScreen: React.FC<OrderDetailsScreenProps> = (props) => {

    const{goBack , getParam}=props.navigation;
    const {user} = props.userReducer;

    const order = getParam('order') as OrderModel;


    const onTapCancelOrder = () => {
        Alert.alert("Do you want to cancel this order ?",
        "Cancellation charge may applicable as per terms and conditons!\nWe will send you cancellation confirmation soon!",
        [
            {text:'Cancel', onPress:() =>{} , style:"cancel"},
            {text: 'Yes', onPress: ()=>{
                props.onCancelOrder(order,user);
                goBack();

            }}
        ]
        );
    }




    const headerCard = () => {

        return <View style={{ padding : 10 , alignItems:'flex-start'}}>
            <Text style={styles.orderInfo}> Order Date : { moment(order.orderDate).format('Do MMM YY, h:mm a')}</Text>
            <Text style={styles.orderInfo}> Order Amount: {order.totalAmount} £</Text>
            <Text style={styles.orderInfo}> Status: {order.orderStatus}</Text>
        </View>
    }

    const footerCard = () => {

        if(order.orderStatus.toLowerCase() ==="cancelled"){
            return <>
             <View style={{marginBottom: 10 , justifyContent:'center', alignItems:'center',height:200}}>
                <Text style={{fontSize:20, color:'#E96363',fontWeight:'700'}}> Order is Cancelled ! </Text>
            </View></>
        }else{
            return <>
           
        
            <View style={{marginBottom:10}}>
                <ButtonWithTitle title={"Cancel Order"} onTap={()=> onTapCancelOrder()} height={50} width={200}/>
            </View>
            </>
        }
    }





        return (<View style={styles.container}>
            <View style={styles.navigation}> 
                 <View style={{ display: 'flex', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft:20, paddingRight:20}}>
                     <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={32} height={38}/>
                         <Text style={{fontSize:22,fontWeight:'700' , marginLeft:30}}>Order ID: {order.orderID}</Text>
                  </View>
            </View>

                <View style={styles.body}>
                   <FlatList 
                        showsVerticalScrollIndicator={false}
                        data={order.items}
                        renderItem={({item}) => <FoodCard 
                        item={item.food} onTap={()=> {}} OnUpdateCart={()=> {}} unit={item.unit}
                        />  }
                        keyExtractor={(item) => `${item._id}`}
                        ListHeaderComponent={headerCard}
                        ListFooterComponent={footerCard}
                   />
                </View>

 

          </View>)

   
   
         
}


const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: '#F2F2F2'},
navigation: { flex: 1,  marginTop: 43, },
body: { flex: 11, justifyContent: 'center', alignItems: 'center' },

paymentView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    margin: 5 ,
    backgroundColor: '#E3BE74'
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
    width: 115,
    height: 80,

},

optionText:{
    fontSize:16,
    fontWeight: '600',
    color: '#545252'
},
orderInfo:{
     fontSize:20 , 
     color:'#6A6665' ,
     fontWeight:'400', 
     marginBottom: 10
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
    userReducer: state.userReducer
})


const OrderDetailsScreen = connect(mapStateToProps, {onCancelOrder})(_OrderDetailsScreen)

 export { OrderDetailsScreen }