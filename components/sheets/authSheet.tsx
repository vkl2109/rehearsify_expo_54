import { bgDark, bgLight, border, borderMuted, textMuted } from '@/constants/colors';
import { useAuthStore } from '@/context/AuthStore';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppleIcon } from '../common/AppleIcon';
import Button from '../common/button';
import Divider from '../common/Divider';
import { GoogleIcon } from '../common/GoogleIcon';
import Input from '../common/Input';
import Title from '../common/title';

function AuthSheet() {
    const insets = useSafeAreaInsets();
    const signIn = useAuthStore((state) => state.logInUser);
    const [ email, setEmail ] = useState('');

    const handleSignIn = async () => {
      try {
        await SheetManager.hide('AuthSheet');
        signIn('test');
      } catch (e) {
        console.log(e)
      }
    }

    const handleGoogleAuth = () => {
      
    }

    return (
        <ActionSheet
            containerStyle={styles.container}
            indicatorStyle={styles.indicatorStyle}
            safeAreaInsets={insets}
            gestureEnabled
            >
            <View style={styles.sheet}>
                <View style={styles.inputGroup}>
                  <Input
                    icon={<Fontisto name="email" size={20} color={"white"} />}
                    placeholder="email"
                    input={email}
                    setInput={setEmail}
                    w={"90%"}
                    bg={border}
                    c={borderMuted}
                    h={50}
                    />
                  <Button w={"90%"} h={45} onPress={handleSignIn}>Sign In</Button>
                </View>
                <Divider w="90%">or</Divider>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={styles.googleBtn}
                        onPress={handleGoogleAuth}
                        >
                        <GoogleIcon size={24} />
                        <Title fs={18} c={border}>Google</Title>
                    </TouchableOpacity>
                    <View style={{ width: 15 }} />
                    <TouchableOpacity 
                        onPress={() => {}}
                        style={styles.appleBtn}
                        >
                        <AppleIcon size={24} color={textMuted} />
                        <Title fs={18}>Apple</Title>
                    </TouchableOpacity>
                </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 0,
  },
  indicatorStyle: {
    width: 75,
    backgroundColor: borderMuted,
  },
  googleBtn: {
    backgroundColor: textMuted,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: border,
    borderWidth: 2
  },
  buttonGroup: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5
  },
  appleBtn: {
    backgroundColor: bgDark,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: borderMuted,
    borderWidth: 2
  },
  inputGroup: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  emailInput: {
    height: 50,
    borderWidth: 1,
    borderColor: borderMuted,
    borderRadius: 10,
    width: '90%',
  }
});
 
export default AuthSheet;