import Button from "@/components/common/button";
import Input from "@/components/common/Input";
import Progress from "@/components/common/Progress";
import Screen from "@/components/common/screen";
import { SegmentControl } from "@/components/common/SegmentControl";
import Title from "@/components/common/title";
import { bgLight, borderMuted, highlight, primary, textColor } from "@/constants/colors";
import { useAddSongStore } from "@/context/AddSongStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";


function Step1() {
    const setTitleArtist = useAddSongStore(s => s.setTitleArtist)
    const title = useAddSongStore(s => s.title)
    const artist = useAddSongStore(s => s.artist)
    const songType = useAddSongStore(s => s.songType)
    const [ localTitle, setLocalTitle ] = useState(title);
    const [ localArtist, setLocalArtist ] = useState(artist);
    const [ localSongType, setLocalSongType ] = useState<string>(songType);
    const disabled = (localTitle.trim() === '' || localArtist.trim() === '')

    const handleNext = () => {
        if (disabled) return
        setTitleArtist(localTitle, localArtist, songType);
    }

    return (
        <View style={styles.stepWrapper}>
            <Input
                placeholder="Title"
                input={localTitle}
                setInput={setLocalTitle}
                m={5}
                icon={<Ionicons name="musical-notes" size={24} color={highlight} />}
                autoFocus
            />
            <Input 
                placeholder="Artist"
                input={localArtist}
                setInput={setLocalArtist}
                m={5}
                icon={<Feather name="user" size={24} color={highlight} />}
            />
            <SegmentControl 
                data={['Original', 'Cover'].map((label, index) => ({ index, label }))}
                selected={localSongType}
                setSelected={(value) => setLocalSongType(value)}
                />
            <Button
                onPress={handleNext}
                w={'100%'}
                h={50}
                r={100}
                c={disabled ? borderMuted : primary}
                disabled={disabled}
                >
                <Title fs={20} b c={textColor}>Next</Title>
            </Button>
        </View>
    )
}

function Step2 () {
    const backStep1 = useAddSongStore(s => s.backStep1)
    const [ localMinutes, setLocalMinutes ] = useState<string>('');
    const [ localSeconds, setLocalSeconds ] = useState<string>('');
    const [ localKey, setLocalKey ] = useState<string>('');
    const [ localBpm, setLocalBpm ] = useState<string>('');
    const disabled = (localMinutes.trim() === '' && localSeconds.trim() === '' && localKey.trim() === '' && localBpm.trim() === '')

    const handleNext = () => {

    }
    return (
        <View style={styles.stepWrapper}>
            <TouchableOpacity
                style={styles.backBtn}
                onPress={backStep1}
                >
                <Ionicons name="arrow-back-circle-outline" size={24} color={highlight} />
                <Title c={highlight}>Back</Title>
            </TouchableOpacity>
            <View style={styles.inputRow}>
                <Input
                    placeholder="minutes"
                    input={localMinutes}
                    setInput={setLocalMinutes}
                    autoFocus
                    variant="number"
                    icon={<AntDesign name="clock-circle" size={20} color={highlight} />}
                    w={'47.5%'}
                />
                <Input
                    placeholder="seconds"
                    input={localSeconds}
                    setInput={setLocalSeconds}
                    variant="number"
                    icon={<AntDesign name="clock-circle" size={20} color={highlight} />}
                    w={'47.5%'}
                />
            </View>
            <View style={styles.inputRow}>
                <Input
                    placeholder="key"
                    input={localKey}
                    setInput={setLocalKey}
                    w={'47.5%'}
                    icon={<Ionicons name="musical-notes" size={20} color={highlight} />}
                />
                <Input
                    placeholder="bpm"
                    input={localBpm}
                    variant="number"
                    setInput={setLocalBpm}
                    icon={<FontAwesome name="heartbeat" size={20} color={highlight} />}
                    w={'47.5%'}
                />
            </View>
            <Button
                onPress={handleNext}
                w={'100%'}
                h={50}
                r={100}
                c={disabled ? borderMuted : primary}
                >
                <Title fs={20} b c={textColor}>{disabled ? 'Skip' : 'Next'}</Title>
            </Button>
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
        const entering = FadeIn
        const exiting  = FadeOut
        switch(step) {
            case 0:
            return (
                <Animated.View 
                    entering={entering} 
                    key={step}
                    exiting={exiting}
                    style={{ width: '100%' }}
                    >
                    <Step1 />
                </Animated.View>
            )
            case 1:
            return (
                <Animated.View 
                    key={step}
                    entering={entering} 
                    exiting={exiting}
                    style={{ width: '100%' }}
                    >
                    <Step2 />
                </Animated.View>
            )
            default:
            return <Step1 />
        }
    }, [step])

    const stepProgress = step ? (step + 1) / 3 : 0.33

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
                    <Progress progress={stepProgress} />
                </View>
                <View style={{width: '100%'}}>
                    {StepRenderer()}
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
        height: 40,
        paddingHorizontal: 10,
    },
    inputRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    }
});