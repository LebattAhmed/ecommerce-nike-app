import { 
    StyleSheet, 
    FlatList, 
    Image, 
    Pressable,  
    ActivityIndicator,
    Text,
} from 'react-native' 
import { useGetProductsQuery } from '../store/apiSlice'


const ProductsScreen = ({ navigation }) => {

    const {data, isLoading, error} = useGetProductsQuery()

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>error fetching products</Text>
    }

    const products = data.data;

  return (
    
    <FlatList 
        data={products}
        renderItem={({ item }) => (
            <Pressable
                onPress={() =>
                    {
                        navigation.navigate('Product detail', {id: item._id})
                    } 
                }
                style={styles.itemContainer}
            >
                <Image 
                    source={{ uri:item.image }}
                    style={styles.image}
                />
            </Pressable>
        )}
        numColumns={2}
    />

  )

}

export default ProductsScreen

const styles = StyleSheet.create({
    itemContainer:{
        width: '50%',
        padding: 1,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    }
})