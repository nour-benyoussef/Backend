import { useContext } from 'react'
import { NavigationScreenProp ,NavigationContext, NavigationRoute , NavigationParams } from 'react-navigation'

export function useNavigation(){

    return useContext(NavigationContext) as NavigationScreenProp<NavigationRoute,NavigationParams>

}