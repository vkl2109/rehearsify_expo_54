import { bgDark, bgLight, border, borderMuted, textMuted } from '@/constants/colors';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppleIcon } from '../common/AppleIcon';
import Divider from '../common/Divider';
import { GoogleIcon } from '../common/GoogleIcon';
import Title from '../common/title';

function AuthSheet() {
    const insets = useSafeAreaInsets();

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
                <Divider w="90%">or</Divider>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={styles.googleBtn}
                        onPress={handleGoogleAuth}
                        >
                        <GoogleIcon size={24} />
                        <Title fs={18} c={border}>Google</Title>
                    </TouchableOpacity>
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
    margin: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: border,
    borderWidth: 2
  },
  buttonGroup: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  appleBtn: {
    backgroundColor: bgDark,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    margin: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: borderMuted,
    borderWidth: 2
  }
});
 
export default AuthSheet;