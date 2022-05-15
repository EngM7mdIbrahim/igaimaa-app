//Main imports
import React from "react";
import { Text,StyleSheet } from "react-native";

//AppSkeleton
import { getTheme } from "../../shared/theme/theme";
import { getImage } from "../../shared/assetsConstants/images";

//hooks and utils
import { useSelector } from "react-redux";
import { VALIDATOR_REQUIRE } from "../../shared/components/Form/utils/validators";

//components
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MODAL_PARAMS } from "../../modal/ModalScreen";

//icons

//Keyboard Scroll View Attributes
let scroll = null;

//Modal View
let modal = null;

const LoginScreen = ({ navigation }) => {
  const isBlack = useSelector((state) => state.user.isBlack);
  const theme = getTheme(isBlack);
  return (
    <KeyboardAwareScrollView
      innerRef={(ref) => {
        scroll = ref;
      }}
      style={{
        ...styles.mainContainer,
        backgroundColor: theme.primaryBackgroundColor,
      }}
    >
          </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageContainer: {
    width: null,
    height: 300,
    resizeMode: "cover",
  },
  textStyle: {
    margin: 20,
    fontSize: 40,
    fontWeight: "bold",
  },
});

LoginScreen.navigationOptions = {
  headerShown: false,
};

export default LoginScreen;
