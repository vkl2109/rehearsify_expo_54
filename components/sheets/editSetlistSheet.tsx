import { bgLight, border, borderMuted, primary, textColor } from "@/constants/colors";
import { currentSetListStore, useSetListStore } from "@/context/SetListStore";
import { refetchSetList, updateSetListDetails } from "@/utils/queries";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../common/button";
import Input from "../common/Input";
import Title from "../common/title";


function EditSetListSheet() {
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const insets = useSafeAreaInsets();
    const currentSetList = currentSetListStore(s => s.currentSetList)
    const [ localSetListName, setLocalSetListName ] = useState(currentSetList?.name || '')
    const disabled = localSetListName.trim() === '' || localSetListName.trim() === currentSetList?.name;
    const setLists = useSetListStore(s => s.setLists)
    const updateSetLists = useSetListStore(s => s.addSetLists)
    const setCurrentSetList = currentSetListStore(s => s.setCurrentSetList)

    const update = async () => {
        try {
            if (!currentSetList) return;
            await updateSetListDetails(currentSetList.id, localSetListName.trim());
            const newSetList = await refetchSetList(currentSetList.id);
            if (!newSetList) return;
            const updatedSetLists = setLists.map(sl =>
                sl.id === currentSetList.id ? newSetList : sl
            );
            setCurrentSetList(newSetList);
            updateSetLists(updatedSetLists);
            actionSheetRef.current?.hide()
        } catch (e) {
            console.log("Failed to update set list details", e);
        }
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
                <Input
                    input={localSetListName}
                    setInput={setLocalSetListName} 
                    w={'90%'}
                    m={5}
                    icon={<Ionicons name="musical-notes" size={20} color={textColor} />}
                    autoFocus
                    />
                <Button
                    onPress={update}
                    h={50}
                    r={100}
                    c={disabled ? borderMuted : primary}
                    disabled={disabled}
                    >
                    <Title fs={20} b>Update</Title>
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

export default EditSetListSheet;