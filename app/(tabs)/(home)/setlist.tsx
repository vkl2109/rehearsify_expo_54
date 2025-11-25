import Screen from "@/components/common/screen";
import Title from "@/components/common/title";
import { textColor } from "@/constants/colors";
import { currentSetListStore } from "@/context/SetListStore";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";


export default function SetListView() {
    const router = useRouter()
    const { currentSetList, removeCurrentSetList } = currentSetListStore()

    const handleBack = () => {
        removeCurrentSetList()
        router.back()
    }

    if (!currentSetList) return <Screen />

    // const songIds = currentSetList?.songs ?? []

    // const filteredSongs = songs.filter((s: Song) => songIds.includes(s.id))
    

    return (
        <Screen>
            <View style={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack}>
                        <Ionicons name="chevron-back" size={24} color={textColor}/>
                    </TouchableOpacity>
                    <Title>{currentSetList?.name}</Title>
                    <TouchableOpacity>
                        <Entypo name="dots-three-horizontal" size={24} color={textColor} />
                    </TouchableOpacity>
                </View>
                {/* <FlashList
                    data={filteredSongs}
                    renderItem={({ item }) => <SongCard song={item}/>}
                    style={styles.allSongs}
                    /> */}
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: '100%',
        height: '100%'
    },
    header: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    allSongs: {
        width: '100%',
        height: '100%',
    }
});