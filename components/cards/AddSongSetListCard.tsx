import { border } from "@/constants/colors";
import { Song } from "@/constants/types";
import { Checkbox } from 'expo-checkbox';
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Pill from "../common/pill";
import Title from "../common/title";


export function AddSongSetListCard({ song }: { song: Song}) {
    const [ isChecked, setChecked ] = useState(false);
    return (
        <View style={styles.cardWrapper}>
            <View style={styles.group}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Pill
                    fs={14}
                    c={border}
                    w={'auto'}
                    h={30}
                    text={song?.artist ?? ""}
                />
            </View>
            <Title>{song?.title ?? "test"}</Title>
        </View>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 5,
    },
    checkbox: {

    },
    group: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    }
});
