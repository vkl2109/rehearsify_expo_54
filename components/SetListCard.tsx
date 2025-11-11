import { SetList } from "@/constants/types";
import { StyleSheet, Text, View } from "react-native";


export default function SetListCard({
    setList
}: {
    setList: SetList
}) {
    return(
        <View style={styles.cardWrapper}>
            <View style={styles.card}>
                <Text>{setList.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})