import { bgLight, borderMuted, secondary } from '@/constants/colors';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../common/button';
import Input from '../common/Input';
import Title from '../common/title';


function SetlistSheet() {
    const [ step, setStep ] = useState<string>('menu')
    const insets = useSafeAreaInsets();
    const handleUpdateDetails = () => {
        setStep('updateDetails');
    }

    useEffect(() => {
        setStep('menu');
    }, []);

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