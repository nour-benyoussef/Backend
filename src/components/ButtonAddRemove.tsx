import React, { useState, useEffect} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'

interface ButtonProps{
    onAdd: Function;
    unit: number;
    onRemove: Function;

}

const ButtonAddRemove: React.FC<ButtonProps> = ({onAdd,unit,onRemove}) => {
    if (unit>0)
   { return(
        <View style={styles.optionsView}>
        <TouchableOpacity style={styles.btnPlusMinus} onPress={() => onRemove()}>
            <Text style={{ fontSize:20, color:'#FFF'}}>-</Text>
        </TouchableOpacity>
        <View  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40 }}>
            <Text style={{ fontSize: 25, fontWeight: '600', color: 'black',textAlign: 'center'}}>{unit}</Text>
        </View>
        
        <TouchableOpacity style={styles.btnPlusMinus} onPress={() => onAdd()}>
            <Text style={{ fontSize:20, color:'#FFF'}}>+</Text>
        </TouchableOpacity>

        </View>
    )
   }else{
       
    return(
        <TouchableOpacity style={styles.btn}  onPress={() => onAdd()}>
            <Text style={{ fontSize:20, color:'#FFF'}}> Add </Text>
        </TouchableOpacity>
    )



   }

}
const styles = StyleSheet.create({
    btn: { 
        display: 'flex',  
        justifyContent: 'center', 
        alignItems: 'center',
         width: 80, 
        height: 40,  
        alignSelf: 'center', 
        borderRadius: 30, 
        backgroundColor: '#4997C9'},
    
    btnPlusMinus: { 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 0.5, 
        backgroundColor: '#4997C9', 
        borderColor:'#4997C9',
        height: 40, 
        width: 38},

    optionsView: { 
        display: 'flex', 
        flexDirection: 'row',  
        justifyContent: 'space-between', 
        alignItems: 'center',
        flex:1 ,
        paddingRight:20
     }
})

export {ButtonAddRemove}