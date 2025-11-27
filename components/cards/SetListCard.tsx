import { bgLight, border, borderMuted, highlight, textMuted } from "@/constants/colors";
import { SetList } from "@/constants/types";
import { currentSetListStore } from "@/context/SetListStore";
import { useUserStore } from "@/context/UserStore";
import { formatJsDateToHHmmMMdd } from "@/utils/datetime";
import { getUser } from "@/utils/queries";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Avatar from "../common/avatar";
import Pill from "../common/pill";
import Title from "../common/title";

function SetListCard({
    setList
}: {
    setList: SetList
}) {
    if (!setList) return <View/>
    const router = useRouter()
    const setCurrentSetList = currentSetListStore(s => s.setCurrentSetList)
    const handleRedirect = () => {
        setCurrentSetList(setList)
        router.push("/setlist")
    }

    const createdBy = setList?.createdBy ?? ""

    const getUserById = useUserStore(s => s.getUserById)
    const setUser = useUserStore(s => s.setUser)
    const createdByUser = getUserById(createdBy)

    useEffect(() => {
        if (!createdByUser) {
            getUser(createdBy).then((u) => {
                if (u) setUser(u)
        })
        }
    },[createdByUser, createdBy])

    return(
        <View style={styles.cardWrapper}>
            <TouchableOpacity 
                style={styles.card} 
                onPress={handleRedirect}
                >
                <View style={styles.cardImg}>
                    <Title fs={36} b>{3}</Title>
                    <Title fs={12}>songs</Title>
                </View>
                <View style={styles.cardContent}>
                    <Pill 
                        w={100}
                        h={25}
                        c={border}
                        text={formatJsDateToHHmmMMdd(setList?.createdAt?.toDate())}
                        fs={12}
                        />
                    <Title w={200} m={5} b>{setList?.name}</Title>
                    <View style={styles.bottomLine}>
                        <Avatar name="V" size={20}/>
                        <Title fs={16} c={textMuted}>{createdByUser?.firstName ?? ""}</Title>
                    </View>
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
        paddingHorizontal: 10,
    },
    card: {
        width: '100%',
        height: 100,
        borderRadius: 5,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
        backgroundColor: bgLight
    },
    cardImg: {
        width: 80,
        height: 80,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: borderMuted
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
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    bottomLine: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center'
    }
})

export {
    SetListCard
};
