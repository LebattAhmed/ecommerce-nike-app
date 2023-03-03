import { 
    ActivityIndicator,
    Alert,
    FlatList, 
    Pressable, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import ShoppingCartTotal from '../components/ShoppingCartTotal'
import CartListItem from '../components/CartListItem'
import { useSelector, useDispatch } from 'react-redux'
import {
    useCreateOrderMutation,
    useCreatePaymentIntentMutation,
} from '../store/apiSlice'
import {selectDeliveryPrice, selectSubtotal, selectTotal, cartSlice} from '../store/CartSlice'
import { useStripe } from '@stripe/stripe-react-native'

const ShoppingCartScreen = () => {

    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const cartItems = useSelector(state => state.cart.items)
    const subtotal = useSelector(selectSubtotal)
    const deliveryFee = useSelector(selectDeliveryPrice)
    const total = useSelector(selectTotal)
    const dispatch = useDispatch()

    const [createOrder, {isLoading, data, error}] = useCreateOrderMutation();


    const onCheckout = async() => {

        // 1. Create a payment intent
        const response = await createPaymentIntent({
            amount: Math.floor(total * 100),
        });
        if (response.error) {
            Alert.alert('something went wrong', response.error)
            return;
        }
        
        // 2. Initialize the Payment sheet
        const { error: paymentSheetError } = await initPaymentSheet({
            merchantDisplayName: 'Example, Inc.',
            paymentIntentClientSecret: response.data.paymentIntent,
            defaultBillingDetails: {
              name: 'Jane Doe',
            },
        });
        if (paymentSheetError) {
            Alert.alert('Something went wrong', paymentSheetError.message);
            return;
        }

        // 3. Present the Payment Sheet from Stripe
        const { error: paymentError } = await presentPaymentSheet();

        if (paymentError) {
            Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
            return;
        }

        // if payment -> ok, create order
        onCreateOrder();

    }


    const onCreateOrder = async() => {
        const result = await createOrder({
            items: cartItems,
            subtotal,
            deliveryFee,
            total,
            customer: {
                name: 'dede',
                adresse: 'bmd',
                email: 'dede@gmail.com'
            },
        });

        if (result.data?.status === 'OK') {
            Alert.alert(
                'Order has been submited',
                `Your Order reference is ${result.data.data.ref}`
            )

            dispatch(cartSlice.actions.clear());
        }
    }

  return (

    <>
      
        <FlatList 
            data={cartItems}
            renderItem={({ item }) => (
                <CartListItem  cartItem={item} />
            )}
            ListFooterComponent={ShoppingCartTotal}
        />

        <Pressable 
            style={styles.button}
                onPress={onCheckout}
        >
        <Text style={styles.buttonText}>
            Checkout {isLoading && <ActivityIndicator />}
        </Text>
        </Pressable>

    </>

  )

}

export default ShoppingCartScreen

const styles = StyleSheet.create({
    button:{
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 35,
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center',
    },
    buttonText:{
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
})