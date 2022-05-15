//main
import React from "react";
import { Text, View, StyleSheet } from "react-native";
//App skeleton
import { getTheme } from "../shared/theme/theme";
//hooks and utils
import { useSelector } from "react-redux";
//components
import ButtonField from "../shared/components/Button/ButtonField";

export const MODAL_PARAMS = {
  title: "title",
  child: "child",
  buttonLeft: "button left",
  buttonText: "text",
  buttonOnClick: "onClick",
  buttonRight: "button right",
};

const initModalScreenIns = {
  theme: {},
  child: <></>,
  title: "No title set for this modal!",
  buttonLeft: {
    text: "No text found!",
    onClick: () => {},
  },
  buttonRight: {
    text: "No text found!",
    onClick: () => {},
  },
};

const ModalScreen = ({ navigation }) => {
  const isBlack = useSelector((state) => state.user.isBlack);
  const child =
    navigation.getParam(MODAL_PARAMS.child) || initModalScreenIns.child;
  const title =
    navigation.getParam(MODAL_PARAMS.title) || initModalScreenIns.title;
  const buttonLeft = navigation.getParam(MODAL_PARAMS.buttonLeft);
  const buttonRight = navigation.getParam(MODAL_PARAMS.buttonRight);
  const theme = getTheme(isBlack);

  return (
    <View style={{ flex: 1, backgroundColor: theme.primaryBackgroundColor }}>
      <View style={styles.headerStyle}>
        {buttonLeft && (
          <ButtonField
            isInline={true}
            isDanger={true}
            text={buttonLeft.text}
            onClick={buttonLeft.onClick}
          />
        )}
        <Text
          style={{ ...styles.titleStyle, color: theme.primaryForegroundColor }}
        >
          {title}
        </Text>
        {buttonRight && (
          <ButtonField
            isInline={true}
            isDanger={false}
            text={buttonRight.text}
            onClick={buttonRight.onClick}
          />
        )}
      </View>
      <View style={styles.containerStyle}>{child}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: "center",
  },
  headerStyle: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 15,
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default ModalScreen;
