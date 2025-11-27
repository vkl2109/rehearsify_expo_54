import Button from "@/components/common/button";
import Input from "@/components/common/Input";
import Progress from "@/components/common/Progress";
import Screen from "@/components/common/screen";
import { SegmentControl } from "@/components/common/SegmentControl";
import Title from "@/components/common/title";
import { bgLight, borderMuted, highlight, primary, textColor } from "@/constants/colors";
import { useAddSongStore } from "@/context/AddSongStore";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";


function Step1() {
    const setTitleArtist = useAddSongStore(s => s.setTitleArtist)
    const [ localTitle, setLocalTitle ] = useState('');
    const [ localArtist, setLocalArtist ] = useState('');
    const disabled = (localTitle.trim() === '' || localArtist.trim() === '')

    const handleNext = () => {
        if (disabled) return
        setTitleArtist(localTitle, localArtist);
    }

    return (
        <View style={styles.stepWrapper}>
            <Input
                placeholder="Title"
                input={localTitle}
                setInput={setLocalTitle}
                icon={<Ionicons name="musical-notes" size={24} color={highlight} />}
                autoFocus
            />
            <Input 
                placeholder="Artist"
                input={localArtist}
                setInput={setLocalArtist}
                icon={<Feather name="user" size={24} color={highlight} />}
            />
            <SegmentControl 
                data={['Original', 'Cover'].map((label, index) => ({ index, label }))}
                selected={'Original'}
                setSelected={(value) => console.log(value)}
                />
            <Button
                onPress={handleNext}
                w={'100%'}
                h={50}
                c={disabled ? borderMuted : primary}
                disabled={localTitle.trim() === '' || localArtist.trim() === ''}
                >
                <Title fs={20} b c={textColor}>Next</Title>
            </Button>
        </View>
    )
}

function Step2 () {

    return (
        <View style={styles.stepWrapper}>
            <TouchableOpacity
                style={styles.backBtn}
                >
                <Ionicons name="arrow-back-circle-outline" size={24} color={highlight} />
                <Title c={highlight}>Back</Title>
            </TouchableOpacity>
        </View>
    )
}

export default function AddSongView() {
    const step = useAddSongStore(s => s.step)
    const router = useRouter()
    const handleBack = () => {
        router.back()
    }

    const StepRenderer = useCallback(() => {
        switch(step) {
            case 0:
                return (
                    <Animated.View 
                    entering={SlideInRight} 
                    exiting={SlideOutLeft}>
                        <Step1 />
                    </Animated.View>
                )
            case 1:
                return (
                    <Animated.View 
                    entering={SlideInRight} 
                    exiting={SlideOutLeft}>
                        <Step2 />
                    </Animated.View>
                )
            // Future steps can be added here
            default:
                return <Step1 />
        }
    }, [step])

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
                    <Progress progress={(step + 1) / 3} />
                </View>
                <StepRenderer />
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
    },
    inputWrapper: {
        width: '100%',
        alignSelf: 'center',
    },
    stepWrapper: {
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backBtn: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});