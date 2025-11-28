import { bgLight, borderMuted, danger, secondary, textColor } from '@/constants/colors';
import { currentSetListStore } from '@/context/SetListStore';
import { deleteSetListAndSongs } from '@/utils/queries';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
                        <Button onPress={handleUpdateDetails}>Update Details</Button>
                        <Button onPress={() => {}} c={secondary}>Add Song</Button>
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
                        style={styles.sheet}
                        >
                        <Input
                            input="" 
                            setInput={() => {}} 
                            w={'90%'}
                            m={5}
                            autoFocus
                            />
                        <Button 
                            onPress={() => {}}
                            h={50}
                            r={100}
                            >
                            <Title fs={20} b>Update</Title>
                        </Button>
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
    height: 'auto',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  indicatorStyle: {
    width: 75,
    backgroundColor: borderMuted,
  }
});
 
export default SetlistSheet;