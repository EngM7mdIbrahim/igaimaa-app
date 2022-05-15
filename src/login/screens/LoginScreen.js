//Main imports
import React from "react";
import { Text,StyleSheet, Image } from "react-native";

//AppSkeleton
import { getTheme } from "../../shared/theme/theme";
import { getImage } from "../../shared/assetsConstants/images";

//hooks and utils
import { useSelector } from "react-redux";
import { VALIDATOR_REQUIRE } from "../../shared/components/Form/utils/validators";

//components
import SinglePageForm, {FORM_TYPES,SCROLL_TO} from '../../shared/components/Form/FormTypes/SinglePageForm/SinglePageForm'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ButtonField from "../../shared/components/Button/ButtonField";
import { MODAL_PARAMS } from "../../modal/ModalScreen";

//icons
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

//Keyboard Scroll View Attributes
let scroll = null;

//Modal View
let modal = null;

const LoginScreen = ({ navigation }) => {
  const isBlack = useSelector((state) => state.user.isBlack);
  const theme = getTheme(isBlack);
  const images = getImage();
  const formInputs = [
    {
      type: FORM_TYPES.text,
      title: "Username",
      validators: [VALIDATOR_REQUIRE()],
      errorMessage: "Please enter a valid username!",
      icon: <FontAwesome name="user" />,
    },
    {
      type: FORM_TYPES.text,
      title: "Password",
      isPassword: true,
      validators: [VALIDATOR_REQUIRE()],
      errorMessage: "Please enter a valid username!",
      icon: <FontAwesome name="lock" />,
    },
    {
      type: FORM_TYPES.buttons,
      items: [
        {
          icon: <EvilIcons name="sc-facebook" />,
          color: "#3b5998",
          disabled: false,
          isInline: false,
          onClick: () => {
            console.log("Facebook button is pressed!");
          },
        },
        {
          icon: <FontAwesome name="google" />,
          color: "#c60017",
          disabled: false,
          isInline: false,
          onClick: () => {
            console.log("Google button is pressed!");
          },
        },
      ],
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
      <Image
        style={{ ...styles.imageContainer }}
        source={{
          uri: Image.resolveAssetSource(images.loginImage).uri,
        }}
      />
      <ButtonField
        isInline={true}
        text="Don't have an account? Sign up!"
        style={{ alignSelf: "flex-end" }}
        onClick={() =>
          navigation.push("ModalScreen", {
            [MODAL_PARAMS.child]:<Text>Hello World</Text>,
            [MODAL_PARAMS.buttonLeft]:{
              [MODAL_PARAMS.buttonText]: 'Cancel',
              [MODAL_PARAMS.buttonOnClick]: ()=>{navigation.pop();}
            },
            [MODAL_PARAMS.buttonRight]:{
              [MODAL_PARAMS.buttonText]: 'Next',
              [MODAL_PARAMS.buttonOnClick]: ()=>{navigation.pop();}
            },
            [MODAL_PARAMS.title]: 'Sign up'
          })
        }
      />
      <SinglePageForm
        inputInstances={formInputs}
        theme={theme}
        title="Login"
        buttonText="Login"
        onInputFoucs={SCROLL_TO(scroll)}
        onFormSubmit={(state) => console.log(state)}
      />
     
      <ButtonField isInline={true} isDanger={true} text="Forgot Password?" />
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
