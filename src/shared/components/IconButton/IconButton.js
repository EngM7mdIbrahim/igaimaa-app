import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

var HEX_REX = /^#([0-9a-f]{3}){1,2}$/i;

//IconButtonObjectParser

const initIconButtonInst = {
  icon: undefined,
  disabled: false,
  isInline: true,
  color: "rgb(0, 110, 230)",
}



const IconButton = ({
  icon = initIconButtonInst,
  isInline,
  onClick,
  disabled,
  color,
}) => {

  if (!HEX_REX.test(color)) {
    console.error("IconButton: A non valid HEX colour passed.");
    color = "#FFFFFF";
  }
  color = disabled ? color + "99" : color;

  let backgroundButtonIconColour = disabled ? "rgba(255,255,255,0.5)" : "white";
  return isInline ? (
    <TouchableOpacity
      style={{ ...styles.inlineContainerStyle, borderColor: color }}
      onPress={onClick}
      disabled={disabled}
    >
      {cloneIcon(icon, color)}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={{ ...styles.normalContainerStyle, backgroundColor: color }}
      onPress={onClick}
      disabled={disabled}
    >
      {cloneIcon(icon, backgroundButtonIconColour)}
    </TouchableOpacity>
  );
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

const styles = StyleSheet.create({
  inlineContainerStyle: {
    margin: 5,
    height: 45,
    width: 45,
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 2,
  },
  normalContainerStyle: {
    height: 45,
    width: 45,
    margin: 5,
    backgroundColor: "white",
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 5,
  },
  iconStyle: {
    fontSize: 35,
    textAlign: "center",
  },
});
IconButton.defaultProps = {
  onClick: () => {},
  disabled: initIconButtonInst.disabled,
  isInline: initIconButtonInst.isInline,
  color: initIconButtonInst.color,
};

export default IconButton;
