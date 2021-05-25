import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image,StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { LandingScreen } from './src/screens/LandingScreen';

import { Provider } from 'react-redux'
import { store } from './src/redux'

import { RestaurantScreen } from './src/screens/RestaurantScreen';
import { FoodDetailScreen } from './src/screens/FoodDetailScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { SearchScreen } from './src/screens/SearchScreen';
import { CartScreen } from './src/screens/CartScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import {OrderScreen} from './src/screens/OrderScreen';
import { OrderDetailsScreen } from './src/screens/OrderDetailsScreen';
import { AccountScreen } from './src/screens/AccountScreen';



const switchNavigator = createSwitchNavigator({

   landingStack: {
    screen: createStackNavigator({
      Landing: LandingScreen,
      

    },{
      defaultNavigationOptions: {
        headerShown: false
      }
    }),
  },
  homeStack: createBottomTabNavigator({

    home: {
      screen: createStackNavigator({
        HomePage: HomeScreen,
        SearchPage: SearchScreen,
        RestaurantPage: RestaurantScreen,
        FoodDetailPage: FoodDetailScreen
      },{
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          let icon  = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} /> 
        }
      }
    },

    search: {
      screen: createStackNavigator({
        SearchPage: SearchScreen
      },{
        defaultNavigationOptions: {
          headerShown: false}
        }),
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          let icon  = focused == true ? require('./src/images/search_icon.png') : require('./src/images/search.png')
          return <Image source={icon} style={styles.tabIcon} /> 
        }
      }
    },
    Cart: {
      screen: createStackNavigator({
        CartPage: CartScreen,
        LoginPage: LoginScreen ,
        OrderPage: OrderScreen,
        OrderDetailsPage: OrderDetailsScreen

      },{
        defaultNavigationOptions: {
          headerShown: false}
        }),
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          let icon  = focused == true ? require('./src/images/cart_icon.png') : require('./src/images/cart_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} /> 
        }
      }
    },
    Account: {
      screen: createStackNavigator({
        AccountPage: AccountScreen,
        LoginPage: LoginScreen ,
        AccountOrderPage : OrderScreen,
        OrderDetailPage: OrderDetailsScreen

      },{
        defaultNavigationOptions: {
          headerShown: false}
        }),
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          let icon  = focused == true ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} /> 
        }
      }
    }



  })
});

const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  
  return ( 
    <Provider store={store}>
       <AppNavigation /> 
    </Provider>
  );
}
const styles = StyleSheet.create({

  tabIcon: {
    width: 30,
    height: 30
  }
});