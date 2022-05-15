import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ButtonField from "../../../Button/ButtonField";
import SkeletonContent from "react-native-skeleton-content";
import useForm, { isFormValid } from "../../hooks/useForm";
import {
  toExportState,
  toFormInputs,
  toInputInstance,
  toIconButtons,
  getSingleFormLoadingLayout,
  FORM_TYPES as FORM_TYPES_UTILS,
} from "../../utils/formUtils";

const defualtTheme = {
  primaryForegroundColor: "#C60017",
};

//const scroll functions
export const SCROLL_TO = (scroll) => {
  return (reactNode) => scroll.props.scrollToFocusedInput(reactNode);
};
export const FORM_TYPES = FORM_TYPES_UTILS;

//InitFormObjectParser
const initSingPageFormInst = {
  inputInstances: [],
  buttonText: "No Button found for this form!",
  title: "No Title found for this form!",
  isLoading: false,
  onInputFocus: () => {},
  onFormSubmit: ()=>{}
};

const SinglePageForm = ({
  inputInstances = initSingPageFormInst.inputInstances,
  buttonText = initSingPageFormInst.buttonText,
  onFormSubmit = initSingPageFormInst.onFormSubmit,
  theme,
  title = initSingPageFormInst.title,
  isLoading = initSingPageFormInst.isLoading,
  onInputFocus = initSingPageFormInst.onInputFocus,
}) => {
  let inputs = toFormInputs(
    inputInstances || initSingPageFormInst.inputInstances
  );
  let INIT_STATE = { inputs, isValid: isFormValid(inputs) };
  const [formState, inputChangeHandler] = useForm(INIT_STATE);
  const formSubmitHandler = () => {
    let state = toExportState(formState);
    if (onFormSubmit) {
      onFormSubmit(state);
    } else {
      ONFORM_SUBMIT_EMPTY(state);
    }
  };

  const loadingLayout = getSingleFormLoadingLayout(inputInstances);
  console.log(isLoading);
  return (
    <SkeletonContent
      containerStyle={{ flex: 1 }}
      isLoading={isLoading}
      duration={1000}
      boneColor={theme.secondaryBackgroundColor}
      highlightColor={theme.primaryBackgroundColor}
      layout={loadingLayout}
    >
      <Text
        style={{ ...styles.textStyle, color: theme.primaryForegroundColor }}
      >
        {title}
      </Text>
      <View>
        {inputInstances.map((item) => {
          switch (item.type) {
            case FORM_TYPES.text:
              return toInputInstance(
                item,
                theme,
                onInputFocus,
                inputChangeHandler
              );
            case FORM_TYPES.buttons:
              return toIconButtons(item, theme);
          }
        })}
      </View>
      <ButtonField
        disabled={!formState.isValid}
        onClick={formSubmitHandler}
        theme={theme}
        isInline={false}
        isDanger={true}
        text={buttonText}
      />
    </SkeletonContent>
  );
};

//DEFAULT FUNCTIONS
const ONFORM_SUBMIT_EMPTY = (_) => {
  console.error("OnFormSubmit is not initialized for this form!");
};

const styles = StyleSheet.create({
  textStyle: {
    margin: 20,
    fontSize: 40,
    fontWeight: "bold",
  },
});

export default SinglePageForm;
