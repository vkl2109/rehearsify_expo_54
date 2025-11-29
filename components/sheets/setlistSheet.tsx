import { bgLight, border, borderMuted, danger, primary, secondary, textColor } from '@/constants/colors';
import { currentSetListStore, useSetListStore } from '@/context/SetListStore';
import { useSongStore } from '@/context/SongStore';
import { deleteSetListAndSongs, refetchSetList, updateSetListDetails } from '@/utils/queries';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import ActionSheet, { ActionSheetRef, FlatList } from 'react-native-actions-sheet';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AddSongSetListCard } from '../cards/AddSongSetListCard';
import Button from '../common/button';
import Input from '../common/Input';
import Title from '../common/title';


function SetlistSheet() {
    const [ step, setStep ] = useState<string>('menu')
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const insets = useSafeAreaInsets();
    const handleUpdateDetails = () => {
        setStep('updateDetails');
    }
    const handleAddSong = () => {
        setStep('addSong');
    }
    const router = useRouter()
    const currentSetList = currentSetListStore(s => s.currentSetList)

    useEffect(() => {
        setStep('menu');
    }, []);

    function handleDelete() {
        Alert.alert(
            "Delete Set List?",
            "This action cannot be undone.",
            [
                { 
                    text: "Cancel", 
                    style: "cancel" 
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            if (!currentSetList) return;
                            await deleteSetListAndSongs(currentSetList.id);
                            actionSheetRef.current?.hide()
                            router.back()
                        } catch (e) {
                            console.log("Transaction failed: ", e);
                        }
                    },
                },
            ]
        );
    }

    function UpdateDetails() {
        const [ localSetListName, setLocalSetListName ] = useState(currentSetList?.name || '')
        const disabled = localSetListName.trim() === ''
        const setLists = useSetListStore(s => s.setLists)
        const updateSetLists = useSetListStore(s => s.addSetLists)
        const setCurrentSetList = currentSetListStore(s => s.setCurrentSetList)

        const update = async () => {
            try {
                if (!currentSetList) return;
                await updateSetListDetails(currentSetList.id, localSetListName.trim());
                const newSetList = await refetchSetList(currentSetList.id);
                if (!newSetList) return;
                const updatedSetLists = setLists.map(sl =>
                    sl.id === currentSetList.id ? newSetList : sl
                );
                setCurrentSetList(newSetList);
                updateSetLists(updatedSetLists);
                actionSheetRef.current?.hide()
            } catch (e) {
                console.log("Failed to update set list details", e);
            }
        }
        
        return(
            <View style={styles.sheet}>
                <Input
                    input={localSetListName}
                    setInput={setLocalSetListName} 
                    w={'90%'}
                    m={5}
                    icon={<Ionicons name="musical-notes" size={20} color={textColor} />}
                    autoFocus
                    />
                <Button 
                    onPress={update}
                    h={50}
                    r={100}
                    c={disabled ? borderMuted : primary}
                    disabled={disabled}
                    >
                    <Title fs={20} b>Update</Title>
                </Button>
            </View>
        )
    }

    function AddSongs() {
        const allSongs = useSongStore(s => s.songs) || []
        return (
            <View style={styles.sheet}>
                <View style={styles.addHeader}>
                    <Title fw={100} m={5}>Songs</Title>
                </View>
                {/* {allSongs.length > 0 && 
                allSongs.map((song: Song) => {
                    return (
                    <AddSongSetListCard key={song.id} song={song} />
                )})} */}
                <FlatList
                    data={allSongs}
                    renderItem={({ item }) => <AddSongSetListCard song={item} />}
                    />
                <Button>
                    Add to Set List
                </Button>
            </View>
        )
    }

    const Renderer = useCallback(() => {
        const entering = FadeIn
        const exiting  = FadeOut
        switch(step) {
            case 'menu':
                return (
                    <Animated.View 
                        entering={entering} 
                        key={step}
                        exiting={exiting}
                        style={styles.sheet}
                        >
                        <Button 
                            onPress={handleUpdateDetails}
                            icon={<MaterialIcons name="update" size={20} color={textColor} />}
                            >
                            Update Details
                        </Button>
                        <Button 
                            onPress={handleAddSong} 
                            c={secondary}
                            icon={<Feather name="plus" size={20} color={textColor} />}
                            >
                            Add Song
                        </Button>
                        <Button 
                            onPress={handleDelete} 
                            c={danger}
                            icon={<Feather name="trash-2" size={20} color={textColor} />}
                            >
                            Delete Set List
                        </Button>
                    </Animated.View>
                );
            case 'updateDetails':
                return (
                    <Animated.View 
                        entering={entering} 
                        key={step}
                        exiting={exiting}
                        >
                        <UpdateDetails />
                    </Animated.View>
                );
            case 'addSong':
                return (
                    <Animated.View 
                        entering={entering} 
                        key={step}
                        exiting={exiting}
                        style={styles.sheet}
                        >
                        <AddSongs />
                    </Animated.View>
                );
            default:
                return <View />;
        }
    }, [step]);

    return (
        <ActionSheet 
            containerStyle={styles.container}
            indicatorStyle={styles.indicatorStyle}
            safeAreaInsets={insets}
            gestureEnabled
            ref={actionSheetRef}
            >
            <View style={styles.sheet}>
                {Renderer()}
            </View>
        </ActionSheet>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgLight,
    paddingTop: 5,
  },
  sheet: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  addHeader: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: border,
    marginBottom: 10,
  },
  indicatorStyle: {
    width: 75,
    backgroundColor: borderMuted,
  }
});
 
export default SetlistSheet;