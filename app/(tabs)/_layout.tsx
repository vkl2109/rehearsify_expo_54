import { backgroundColor } from '@/constants/colors';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Defining the layout of the custom tab navigator
export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs>
      <TabSlot />
      <View style={{...styles.tabList, 
        paddingBottom: insets.bottom,
        backgroundColor: backgroundColor
        }}>
        <TabTrigger name="home" href="/">
          <Entypo name="home" size={24} color="white" />
        </TabTrigger>
        <Entypo name="plus" size={24} color="white" />
        <TabTrigger name="profile" href="/profile">
          <FontAwesome name="user-circle" size={24} color="white" />
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
});
