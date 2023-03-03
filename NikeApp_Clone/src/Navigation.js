import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text, Pressable } from 'react-native'
import ProductDetailScreen from './screens/ProductDetailScreen'
import ProductsScreen from './screens/ProductsScreen'
import ShoppingCartScreen from './screens/ShoppingCartScreen'
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'
import { selectedNumberOfItems } from './store/CartSlice'
import { useSelector } from 'react-redux'
import TrackOrder from './screens/TrackOrder'

const Stack = createNativeStackNavigator() 

const Navigation = () => {

    const numberOfItems = useSelector(selectedNumberOfItems)
  
    return (

    <NavigationContainer>
        <Stack.Navigator>
            
            <Stack.Screen 
                name='Products' 
                component={ProductsScreen} 
                options={({ navigation }) => ({
                    headerRight: () => (
                        <Pressable 
                            style={{ flexDirection: 'row' }}
                            onPress={() => navigation.navigate('Cart')}    
                        >
                            <FontAwesome5  
                                name='shopping-cart'
                                size={18}
                                color='gray'
                            />
                            <Text style={{ marginLeft: 5, fontWeight: '500' }}>
                                {numberOfItems}
                            </Text>
                        </Pressable>
                    ),
                    headerLeft: () => (
                        <MaterialCommunityIcons 
                            onPress={() => navigation.navigate('Track Order')}
                            name='truck-delivery'
                            size={25}
                            color='gray'
                        />
                    )
                })}
            />

            <Stack.Screen 
                name='Product detail' 
                component={ProductDetailScreen} 
                options={{ presentation: 'modal' }}    
            />

            <Stack.Screen 
                name='Cart'
                component={ShoppingCartScreen}
            />

            <Stack.Screen 
                name='Track Order'
                component={TrackOrder}
            />

        </Stack.Navigator>
    </NavigationContainer>
  
  )
  
}

export default Navigation