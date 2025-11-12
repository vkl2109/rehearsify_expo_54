import { SetList } from "@/constants/types";
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Pill from "./common/pill";

function SetListCard({
    setList
}: {
    setList: SetList
}) {
    const handleRedirect = () => {

    }

    return(
        <View style={styles.cardWrapper}>
            <TouchableOpacity style={styles.card} onPress={handleRedirect}>
                <View style={styles.cardImg}>
                    <Text style={styles.songCount}>{setList.songs.length}</Text>
                    <Text style={styles.cardTxt}>songs</Text>
                </View>
                <View style={styles.cardContent}>
                    <Pill w={60} h={18} c='lightgray' text="Feb 12th"/>
                    <Text>{setList.name}</Text>
                </View>
                <AntDesign name="right" size={24} color="lightgray" />
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
        paddingRight: 10,
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
    },
    cardContent: {
        flex: 1,
        height: '100%',
        paddingVertical: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
    }
})

export {
    SetListCard
};
