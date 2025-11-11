import { StyleSheet, View } from "react-native";


export default function SetListCard() {
    return(
        <View style={styles.cardWrapper}>

        </View>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        width: '90%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 10,
    }
})