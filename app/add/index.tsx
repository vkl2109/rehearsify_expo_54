import { StyleSheet, Text, View } from 'react-native';

export default function SongOrList() {
  return (
    <View style={styles.container}>
      <Text>Tab [SongOrList]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
