import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import { useSelector } from 'react-redux'
import {selectDeliveryPrice, selectSubtotal, selectTotal} from '../store/CartSlice'

const ShoppingCartTotal = () => {

    const subtotal = useSelector(selectSubtotal)
    const deliveryFee = useSelector(selectDeliveryPrice)
    const total = useSelector(selectTotal)

  return (
    <View style={styles.totalContainer}>
        <View style={styles.row}>
            <Text style={styles.text}>Subtotal</Text>
            <Text style={styles.text}>{subtotal} US$</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.text}>Delivery</Text>
            <Text style={styles.text}>{deliveryFee} US$</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.textBold}>Total</Text>
            <Text style={styles.textBold}>{total} US$</Text>
        </View>
    </View>
  )
}

export default ShoppingCartTotal

const styles = StyleSheet.create({
    totalContainer:{
        margin: 20,
        paddingTop: 10,
        borderColor: 'gainsboro',
        borderTopWidth: 1,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text:{
        fontSize: 16,
        color: 'gray',
    },
    textBold:{
        fontWeight: '500',
        fontSize: 16,
    },
})