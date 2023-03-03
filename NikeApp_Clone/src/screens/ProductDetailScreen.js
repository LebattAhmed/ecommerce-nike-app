import { 
    View,
    Text, 
    StyleSheet, 
    Image, 
    FlatList, 
    useWindowDimensions, 
    ScrollView,
    Pressable, 
    ActivityIndicator,
    Alert,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { cartSlice } from '../store/CartSlice'
import { useGetProductQuery } from '../store/apiSlice'

const ProductDetailScreen = ({route}) => {

    const id = route.params.id
    const {data, isLoading, error} = useGetProductQuery(id)
    const { width } = useWindowDimensions()
    const dispatch = useDispatch()
    const product = data?.data;
   // const product = useSelector(state => state.products.selectedProduct)

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>error fetching the product details</Text>
    }

    const AddToCard = () => {
        dispatch(cartSlice.actions.addCartItem({ product }))
        Alert.alert(
            'product added in your cart'
        )
    }

  return (
    
    <View>
      
        <ScrollView>

            <FlatList 
                data={product.images}
                renderItem={({ item }) => (
                    <Image 
                        source={{ uri: item }}
                        style={{
                            width,
                            aspectRatio: 1.2,    
                        }}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
            />

            <View style={{  padding: 20 }}>
                <Text style={styles.title}>
                    {product.name}
                </Text>
                <Text style={styles.price}>
                    ${product.price}
                </Text>
                <Text style={styles.description}>
                    {product.description}
                </Text>
            </View>

        </ScrollView>

        <Pressable onPress={AddToCard} style={styles.button}>
             <Text style={styles.buttonText}>Add to card</Text>
        </Pressable>

    </View>
  
  )

}

export default ProductDetailScreen

const styles = StyleSheet.create({
    title:{
        fontSize: 34,
        fontWeight: '500',
        marginVertical: 10,
    },
    price:{
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 1,
    },
    description:{
        fontSize: 18,
        fontWeight: '300',
        lineHeight: 30,
        marginVertical: 10,
    },
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