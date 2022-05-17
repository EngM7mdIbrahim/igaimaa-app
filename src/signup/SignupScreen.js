//Main imports
import React from "react";
import { Text, StyleSheet } from "react-native";

//AppSkeleton
import { getTheme } from '../shared/theme/theme';
import { getString, appStringskeys} from '../shared/strings/strings';

//hooks and utils
import { useSelector } from "react-redux";
import { VALIDATOR_REQUIRE } from "../shared/components/Form/utils/validators";

//components
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {FORM_TYPES} from '../shared/components/Form/FormTypes/MultiPageForm/FormPage';
import FormPage, {SCROLL_TO} from "../shared/components/Form/FormTypes/MultiPageForm/FormPage";

//icon 
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

//Keyboard Scroll View Attributes
let scroll = null;


const SignupScreen = ({ navigation }) => {
  const isBlack = useSelector((state) => state.user.isBlack);
  const theme = getTheme(isBlack);
  const language = useSelector((state) => state.user.language);
  const formInputs = [
    {
      type: FORM_TYPES.text,
      title: "Username",
      isLabeled: true,
      placeholder: 'Enter a username',
      validators: [VALIDATOR_REQUIRE()],
      errorMessage: "Please enter a valid username!",
    },
    {
      type: FORM_TYPES.text,
      title: "Password",
      isPassword: true,
      isLabeled: true,
      placeholder: 'Enter a password',
      validators: [VALIDATOR_REQUIRE()],
      errorMessage: "Please enter a valid password!",
      icon: <FontAwesome name="lock" />,
    },
   
  ];
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
      <FormPage
        inputInstances={formInputs}
        theme={theme}
        title={getString(language, appStringskeys.signupScreen_form_page1_titleText)}
        buttonText="SignUp"
        subtitle={getString(language, appStringskeys.signupScreen_form_page1_subTitleText)}
        onInputFoucs={SCROLL_TO(scroll)}
        isLoading={false}
        hint="Hello world"
        onFormSubmit={(state) => console.log(state)}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf:'stretch'
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

SignupScreen.navigationOptions = {
  headerShown: false,
};

export default SignupScreen;
