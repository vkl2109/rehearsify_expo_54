import { SetList } from "@/constants/types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function SetListCard({
    setList
}: {
    setList: SetList
}) {
    return(
        <View style={styles.cardWrapper}>
            <TouchableOpacity style={styles.card}>
                <View style={styles.cardImg}>
                    <Text style={styles.songCount}>{setList.songs.length}</Text>
                    <Text style={styles.cardTxt}>songs</Text>
                </View>
                <Text>{setList.name}</Text>
            </TouchableOpacity>
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
        borderRadius: 5,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardImg: {
        width: 80,
        height: 80,
        backgroundColor: 'lightblue',
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    songCount: {
        fontSize: 36,
        textAlign: 'center',
        color: 'gray',
    },
    cardTxt: {
        fontSize: 12,
        textAlign: 'center',
        color: 'gray'
    }
})