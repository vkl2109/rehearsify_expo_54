import Screen from "@/components/common/screen";
import Title from "@/components/common/title";
import { textColor } from "@/constants/colors";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";


export default function SetListView() {
    const router = useRouter()

    return (
        <Screen>
            <View style={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={router.back}>
                        <Ionicons name="chevron-back" size={24} color={textColor}/>
                    </TouchableOpacity>
                    <Title>SetList View</Title>
                    <TouchableOpacity>
                        <Entypo name="dots-three-horizontal" size={24} color={textColor} />
                    </TouchableOpacity>
                </View>
                ß
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
    }
});