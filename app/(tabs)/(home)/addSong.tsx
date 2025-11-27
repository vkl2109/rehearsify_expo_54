import Progress from "@/components/common/Progress";
import Screen from "@/components/common/screen";
import Title from "@/components/common/title";
import { bgLight, highlight } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";


export default function AddSongView() {
    const router = useRouter()
    const handleBack = () => {
        router.back()
    }

    return(
        <Screen style={styles.content}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
                        <Ionicons name="chevron-back" size={24} color={highlight}/>
                    </TouchableOpacity>
                    <Title>Add Song</Title>
                    <View style={{ width: 44}}/>
                </View>
                <View style={styles.progressWrapper}>
                    <Progress progress={0.1} />
                </View>
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    header: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        margin: 10,
    },
    iconBtn: {
        padding: 10,
        borderRadius: 100,
        backgroundColor: bgLight
    },
    progressWrapper: {
        padding: 15
    }
});