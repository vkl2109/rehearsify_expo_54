import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf="house.fill" drawable="custom_android_drawable" />
        <Label hidden />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger 
        name="add"
        >
        <Icon sf="plus" />
        <Label hidden />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Icon sf="person" drawable="custom_settings_drawable" />
        <Label hidden />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
