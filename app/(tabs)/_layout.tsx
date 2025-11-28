import HapticScaleButton from '@/components/common/HapticButton';
import { TabButton } from '@/components/common/TabButton';
import { primary, textColor } from '@/constants/colors';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { StyleSheet, View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';

// Defining the layout of the custom tab navigator
export default function Layout() {

  return (
    <Tabs>
      <TabSlot />
      <View style={{...styles.tabList, 
        backgroundColor: "transparent"
        }}>
        <TabTrigger name="home" href="/" asChild style={{flex: 1}}>
          <TabButton
            icon={<Entypo name="home" size={24} color={textColor} />}
            />
        </TabTrigger>
        <View />
        <HapticScaleButton
          onPress={() => SheetManager.show('AddSheet')}
          style={styles.plusBtn}
        >
          <Entypo name="plus" size={42} color={textColor}/>
        </HapticScaleButton>
        <TabTrigger name="profile" href="/profile" asChild style={{flex: 1}}>
          <TabButton
            icon={<FontAwesome name="user-circle" size={24} color={textColor} />}
            />
        </TabTrigger>
      </View>
      <TabList style={{display: 'none'}}>
        <TabTrigger name="home" href="/">
          <Entypo name="home" size={24} color="black" />
        </TabTrigger>
        <TabTrigger name="profile" href="/profile">
          <FontAwesome name="user-circle" size={24} color="black" />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabList: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'relative',
  },
  plusBtn: {
  backgroundColor: primary,
  borderRadius: 100,
  position: 'absolute',
  top: -40,
  height: 65,
  width: 65,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: textColor,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  zIndex: 1000,
}
});
