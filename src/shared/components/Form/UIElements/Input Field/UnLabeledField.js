import React, { useState } from "react";

import { TextInput, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const UnLabeledField = ({
  style,
  touchHandler,
  icon,
  onChangeText,
  value,
  placeholder,
  isPassword,
  placeholderColor,
  color,
  backgroundColor,
}) => {
  const [passToggle, setPassToggle] = useState(isPassword);
  return (
    <View style={{ ...styles.backgroundStyle, ...style, backgroundColor }}>
      {cloneIcon(icon, color) || (
        <AntDesign
          name="questioncircle"
          style={{ ...styles.iconStyle, color }}
        />
      )}
      <TextInput
        secureTextEntry={isPassword && passToggle}
        onEndEditing={touchHandler}
        placeholderTextColor={placeholderColor}
        onChangeText={onChangeText}
        style={{ ...styles.inputStyle, color: color }}
        placeholder={placeholder}
        value={value}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => {
            setPassToggle(!passToggle);
          }}
        >
          {passToggle ? (
            <Entypo
              name="eye-with-line"
              style={{ ...styles.iconStyle, color }}
            />
          ) : (
            <Entypo name="eye" style={{ ...styles.iconStyle, color }} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    margin: 15,
    borderRadius: 5,
    height: 45,
    flexDirection: "row",
  },
  inputStyle: {
    flex: 1,
    paddingHorizontal: 5,
  },
  iconStyle: {
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    alignSelf: "center",
  },
});

UnLabeledField.defaultProps = {
  placeholder: "No Placeholder found from labeled!",
  style: {},
  onChangeText: () => {},
};

const cloneIcon = (icon, color) => {
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, {
      key: Math.random(),
      style: { ...icon.props.style, ...styles.iconStyle, color },
    });
  }
  return icon;
};

export default UnLabeledField;
