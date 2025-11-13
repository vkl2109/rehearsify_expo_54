import { bgDark } from "@/constants/colors";
import { StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";


export default function Screen ({ children, ...props }: SafeAreaViewProps) {
    return(
        <SafeAreaView 
        {...props}
        style={{...styles.container, 
            backgroundColor: bgDark
        }}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})