import { keys } from "@/components";
import SongCard from "@/components/cards/SongCard";
import Button from "@/components/common/button";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Progress from "@/components/common/Progress";
import Screen from "@/components/common/screen";
import { SegmentControl } from "@/components/common/SegmentControl";
import Title from "@/components/common/title";
import { bgLight, borderMuted, highlight, primary, textColor } from "@/constants/colors";
import { Song } from "@/constants/types";
import { useAddSongStore } from "@/context/AddSongStore";
import { useAuthStore } from "@/context/AuthStore";
import { useSongStore } from "@/context/SongStore";
import { db } from "@/firebase";
import { fetchSongsForBand } from "@/utils/queries";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
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
    const backStep = useAddSongStore(s => s.backStep)
    const minutes = useAddSongStore(s => s.minutes)
    const seconds = useAddSongStore(s => s.seconds)
    const key = useAddSongStore(s => s.key)
    const bpm = useAddSongStore(s => s.bpm)
    const setMinutesSecondsKeyBpm = useAddSongStore(s => s.setMinutesSecondsKeyBpm)
    const [ localMinutes, setLocalMinutes ] = useState<string>(String(minutes));
    const [ localSeconds, setLocalSeconds ] = useState<string>(String(seconds));
    const [ localKey, setLocalKey ] = useState<string>(key);
    const [ localBpm, setLocalBpm ] = useState<string>(String(bpm));
    const disabled = (localMinutes.trim() === '' && localSeconds.trim() === '' && localKey.trim() === '' && localBpm.trim() === '')

    const handleNext = () => {
        if (disabled) return
        const parsedMinutes = parseInt(localMinutes) || 0;
        const parsedSeconds = parseInt(localSeconds) || 0;
        const parsedBpm = parseInt(localBpm) || 0;
        setMinutesSecondsKeyBpm(
            parsedMinutes,
            parsedSeconds,
            localKey,
            parsedBpm
        )
    }
    return (
        <View style={styles.stepWrapper}>
            <TouchableOpacity
                style={styles.backBtn}
                onPress={backStep}
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
                <Dropdown
                    options={keys}
                    selected={localKey}
                    setSelected={setLocalKey}
                    placeholder="Key"
                    w={'47.5%'}
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

function Step3() {
    const router = useRouter()
    const currentBandId = useAuthStore(s => s.user?.currentBandId)
    const addSongs = useSongStore(s => s.addSongs)
    const backStep = useAddSongStore(s => s.backStep)
    const newSong = {
        title: useAddSongStore(s => s.title),
        artist: useAddSongStore(s => s.artist),
        type: useAddSongStore(s => s.songType),
        minutes: useAddSongStore(s => s.minutes),
        seconds: useAddSongStore(s => s.seconds),
        key: [useAddSongStore(s => s.key)],
        bpm: useAddSongStore(s => s.bpm),
        link: '',
        notes: '',
        bandId: currentBandId || ''
    }

    const newSongWithId: Song = {
        ...newSong,
        id: ''
    }

    const handleAddSong = async () => {
        try {
            if (!currentBandId) throw new Error("No band selected");
            await addDoc(collection(db, "songs"), newSong)
            const newSongs = await fetchSongsForBand(currentBandId)
            addSongs(newSongs)
            router.back()
        } catch (error) {
            console.error("Error adding song:", error);
        }
    }
    return(
        <View style={styles.stepWrapper}>
            <TouchableOpacity
                style={styles.backBtn}
                onPress={backStep}
                >
                <Ionicons name="arrow-back-circle-outline" size={24} color={highlight} />
                <Title c={highlight}>Back</Title>
            </TouchableOpacity>
            <SongCard song={newSongWithId} />
            <Button
                onPress={handleAddSong}
                w={'100%'}
                h={50}
                r={100}
                >
                <Title fs={20} b c={textColor}>{'Add Song'}</Title>
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
            case 2:
                return(
                    <Animated.View 
                        key={step}
                        entering={entering} 
                        exiting={exiting}
                        style={{ width: '100%' }}
                        >
                        <Step3 />
                    </Animated.View>
                )
            default:
                return <View />
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
                    <Title b>New Song</Title>
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