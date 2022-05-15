import React from "react";
import { Text,TextInput, View, StyleSheet } from "react-native";



const LabeledField = ({
  style,
  title,
  touchHandler,
  onFocus,
  onChangeText,
  value,
  placeholder,
  isPassword,
  placeholderColor,
  color,
  backgroundColor,
}) => {
  
  return (
    <View style={{ ...styles.backgroundStyle, ...style, backgroundColor, borderColor: placeholderColor }}>
        <Text style={{...styles.labelStyle,color}}>{title}</Text>
      <TextInput
        secureTextEntry={isPassword}
        onFocus={(event)=>{
          onFocus(event.target);
        }}
        onEndEditing={touchHandler}
        placeholderTextColor={placeholderColor}
        onChangeText={onChangeText}
        style={{ ...styles.inputStyle, color: color }}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    margin: 15,
    height: 45,
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  labelStyle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 5,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  inputStyle: {
    flex: 2,
    paddingHorizontal: 5,
  },
  iconSize: {
    fontSize: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    alignSelf: "center",
  },
});

LabeledField.defaultProps = {
  title: "No title found!",
  placeholder: "No Placeholder found from labeled!",
  style: {},
  value:'',
  isPassword: false,
  placeholderColor:'gray',
  color:'#c60017',
  backgroundColor:'',
  touchHandler: ()=>{},
  onFocus: ()=>{},
  onChangeText: () => {},
};

export default LabeledField;
