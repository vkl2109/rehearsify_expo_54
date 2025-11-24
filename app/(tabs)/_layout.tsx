import { TabButton } from '@/components/common/TabButton';
import { primary, textColor } from '@/constants/colors';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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
        <TouchableOpacity 
          onPress={() => SheetManager.show('AddSheet')}
          style={styles.plusBtn}
          >
          <Entypo name="plus" size={36} color={textColor} />
        </TouchableOpacity>
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
  },
  plusBtn: {
    backgroundColor: primary,
    borderRadius: 100,
    position: 'absolute',
    top: -25,
    zIndex: 10,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: textColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
