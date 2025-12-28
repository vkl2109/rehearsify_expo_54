import { bgLight, border, borderMuted, primary, textColor } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../common/button";
import Title from "../common/title";


function ReorderSetlistSheet() {
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const insets = useSafeAreaInsets();
    const disabled = true;

    function handleSaveOrder () {

    }
    return(
        <ActionSheet
            containerStyle={styles.container}
            indicatorStyle={styles.indicatorStyle}
            safeAreaInsets={insets}
            gestureEnabled
            ref={actionSheetRef}
            >
            <View style={styles.sheet}>
                <View style={styles.addHeader}>
                    <Title fw={100} m={5}>Order</Title>
                </View>
                <Button
                    onPress={handleSaveOrder}
                    disabled={disabled}
                    c={disabled ? borderMuted : primary}
                    style={{ marginVertical: 10 }}
                    icon={<Feather name="upload" size={20} color={textColor} />}
                    >
                    Save Changes
                </Button>
            </View>
        </ActionSheet>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgLight,
    paddingTop: 5,
  },
  sheet: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  addHeader: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: border,
    marginBottom: 10,
  },
  indicatorStyle: {
    width: 75,
    backgroundColor: borderMuted,
  }
});

export default ReorderSetlistSheet