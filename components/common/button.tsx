import { primary } from '@/constants/colors';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import { AnimatableNumericValue, DimensionValue, StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import Title from './title';


interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
    w?: DimensionValue;
    h?: DimensionValue;
    r?: AnimatableNumericValue | string;
    m?: DimensionValue;
    p?: number;
    flex?: number;
    c?: string;
    fs?: TextStyle["fontSize"];
    icon?: React.ReactElement<IconProps<any>>;
    noRightSpace?: boolean;
}

export default function Button({
    w = '90%',
    h = 'auto',
    r = 20,
    m = 10,
    p = 10,
    c = primary,
    fs = 16,
    noRightSpace = false,
    icon,
    onPress,
    children,
    ...props
}: ButtonProps) {
    return(
        <TouchableOpacity 
        {...props}
        style={{...styles.btnContainer, 
            width: w, 
            height: h,
            borderRadius: r,
            margin: m,
            padding: p,
            backgroundColor: c,
            paddingHorizontal: p ? (p * 2) : 20,
        }} onPress={onPress}>
            {icon ? icon : <View />}
            <Title fs={fs} b >{children}</Title>
            {!noRightSpace && <View style={{ width: (icon) ? (icon.props.size || 20) : 0}}/>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnTxt: {
    margin: 10,
    fontSize: 16,
    fontWeight: '600',
  }
});