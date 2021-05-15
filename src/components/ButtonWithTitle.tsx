import React, { useState, useEffect} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image , ImageSourcePropType} from 'react-native'

interface ButtonProps{
    onTap: Function;
    width: number;
    height: number;
    title : String;
    isNoBg?: boolean;
    disable?: boolean 

}

const ButtonWithTitle: React.FC<ButtonProps> = ({ onTap , title , width , height , isNoBg= false , disable=false}) => {
   
   if(isNoBg){
    return(
        <TouchableOpacity disabled={disable} style={[styles.btn , { width , height, backgroundColor:'transparent'} ]}
            onPress={() => onTap()}>
                <Text style={{ fontSize:18 , color: disable ? '#6F6F6F': '#D56DBE'}}>{title}</Text>
               

        </TouchableOpacity>

    )

   }else{ 
    return(
        <TouchableOpacity style={[styles.btn , { width , height } ]}
            onPress={() => onTap()}>
                <Text style={{ fontSize:18 , color:'#FFF'}}>{title}</Text>
               

        </TouchableOpacity>

    )
}
}
const styles = StyleSheet.create({
    btn: { display: 'flex',
     justifyContent: 'center' ,
     alignItems: 'center', 
     width:60,
     height:40,
     backgroundColor:'#b8b5ff',
     borderRadius:30,
     alignSelf: 'center',
     marginTop: 20
    }
})

export {ButtonWithTitle}