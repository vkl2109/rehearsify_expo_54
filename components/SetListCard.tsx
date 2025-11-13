import { bg, bgLight, border, highlight, textMuted } from "@/constants/colors";
import { SetList } from "@/constants/types";
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Pill from "./common/pill";
import Title from "./common/title";

function SetListCard({
    setList
}: {
    setList: SetList
}) {
    const handleRedirect = () => {

    }

    return(
        <View style={styles.cardWrapper}>
            <TouchableOpacity style={{
                ...styles.card,
                backgroundColor: bg
            }} onPress={handleRedirect}>
                <View style={{
                    ...styles.cardImg,
                    backgroundColor: bgLight
                    }}>
                    <Text style={{
                        ...styles.songCount,
                        color: textMuted
                    }}>{setList.songs.length}</Text>
                    <Text style={{
                        ...styles.cardTxt,
                        color: textMuted
                    }}>songs</Text>
                </View>
                <View style={styles.cardContent}>
                    <Pill 
                        w={100}
                        h={25}
                        c={border}
                        text="Feb 12th"
                        fs={14}
                        />
                    <Title w={200} m={5}>{setList.name}</Title>
                </View>
                <AntDesign name="right" size={24} color={highlight} />
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
        borderRadius: 5,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
    },
    cardImg: {
        width: 80,
        height: 80,
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
