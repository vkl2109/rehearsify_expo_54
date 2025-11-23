import { bgDark, bgLight, border, borderMuted, textColor, textMuted } from '@/constants/colors';
import { useAuthStore } from '@/context/AuthStore';
import { auth } from '@/firebase';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../common/button';
import Input from '../common/Input';

function AuthSheet() {
    const insets = useSafeAreaInsets();
    const signIn = useAuthStore((state) => state.logInUser);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSignIn = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        await SheetManager.hide('AuthSheet');
        signIn(user.uid);
      } catch (error) {
        const e = error as FirebaseError;
        const errorCode = e?.code;
        const errorMessage = e?.message;
        console.log(errorCode)
        console.log(errorMessage)
        alert(errorMessage)
      }
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
                    icon={<Fontisto name="email" size={20} color={textMuted} />}
                    placeholder="email"
                    input={email}
                    setInput={setEmail}
                    variant="email"
                    w={"90%"}
                    bg={border}
                    c={textColor}
                    pc={textMuted}
                    h={45}
                    fs={20}
                    />
                  <Input
                    icon={<Entypo name="lock" size={20} color={textMuted} />}
                    placeholder="password"
                    input={password}
                    setInput={setPassword}
                    variant="password"
                    w={"90%"}
                    bg={border}
                    c={textColor}
                    pc={textMuted}
                    h={45}
                    fs={20}
                    />
                  <Button w={"90%"} h={45} r={100} onPress={handleSignIn}>Sign In</Button>
                </View>
                {/* <Divider w="90%">or</Divider>
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
                </View> */}
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
    borderRadius: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
    borderRadius: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
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