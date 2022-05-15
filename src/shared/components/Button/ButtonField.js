import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const RED_COLOR = "rgb(230, 53, 43)";
const RED_COLOR_DISABLED = "rgba(230, 53, 43,0.5)";
const BLUE_COLOR = "rgb(0, 110, 230)";
const BLUE_COLOR_DISABLED = "rgba(0, 110, 230,0.5)";

//InitButtonObjectParse
export const initButtonInstance = {
  isInline: false,
  onClick:()=>{},
  disabled: false,
  text: 'No Text for this button!',
  isDanger: true,
  style:{}
}

const ButtonField = ({
  theme,
  isInline = initButtonInstance.isInline,
  onClick = initButtonInstance.onClick,
  disabled = initButtonInstance.disabled,
  text = initButtonInstance.text,
  isDanger = initButtonInstance.isDanger,
  style = initButtonInstance.style
}) => {
  let colorStyle = null;
  let backgroundButtonColor = null;
  let backgroundButtonTextColor = disabled ? "rgba(255,255,255,0.5)" : "white";
  if (!theme) {
    colorStyle = {
      color: isDanger ? RED_COLOR : BLUE_COLOR,
    };
    backgroundButtonColor = {
      backgroundColor: isDanger
        ? disabled
          ? RED_COLOR_DISABLED
          : RED_COLOR
        : disabled
        ? BLUE_COLOR_DISABLED
        : BLUE_COLOR,
    };
  } else {
    colorStyle = isDanger
      ? { color: theme.buttonDangerColor }
      : { color: theme.buttonNormalColor };
    backgroundButtonColor = {
      backgroundColor: isDanger
        ? disabled
          ? theme.buttonDangerDisabledColor
          : theme.buttonDangerColor
        : disabled
        ? theme.buttonNormalDisabledColor
        : theme.buttonNormalColor,
    };
  }
  return isInline ? (
    <TouchableOpacity
      style={{...styles.inlineContainerStyle, ...style}}
      onPress={onClick || ON_CLICK_EMPTY}
      disabled={disabled}
    >
      <Text style={{ ...styles.textStyle, ...colorStyle }}>{text}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={{ ...styles.normalContainerStyle, ...backgroundButtonColor,...style }}
      onPress={onClick || ON_CLICK_EMPTY}
      disabled={disabled}
    >
      <Text style={{ ...styles.textStyle, color: backgroundButtonTextColor }}>{text}</Text>
    </TouchableOpacity>
  );
};

//const functions 
const ON_CLICK_EMPTY = ()=>{console.error('No on click initialized for this button')}

const styles = StyleSheet.create({
  inlineContainerStyle: {
    height: 35,
    marginHorizontal: 5,
    alignSelf: "center",
    justifyContent: "center",
  },
  normalContainerStyle: {
    height: 50,
    marginHorizontal: 5,
    backgroundColor: "white",
    alignSelf: "stretch",
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 5,
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ButtonField;
