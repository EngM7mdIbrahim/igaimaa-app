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
  SCROLL_TO as SCROLL_TO_UTILS,
} from "../../utils/formUtils";

//const scroll functions
export const SCROLL_TO = SCROLL_TO_UTILS;
export const FORM_TYPES = FORM_TYPES_UTILS;

//InitFormObjectParser
const initSingPageFormInst = {
  inputInstances: [],
  buttonText: "No Button found for this form!",
  title: "No Title found for this form!",
  subtitle: "No subtitle for this form!",
  isLoading: false,
  onInputFocus: () => {},
  onFormSubmit: () => {},
};

const FormPage = ({
  inputInstances = initSingPageFormInst.inputInstances,
  buttonText = initSingPageFormInst.buttonText,
  onFormSubmit = initSingPageFormInst.onFormSubmit,
  subtitle = initSingPageFormInst.subtitle,
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
    }
  };

  const loadingLayout = getSingleFormLoadingLayout(inputInstances);
  console.log(isLoading);
  return (
    <SkeletonContent
      containerStyle={{ flex: 1 }}
      isLoading={isLoading}
      duration={1000}
      animationType="pulse"
      boneColor={theme.secondaryBackgroundColor}
      highlightColor={theme.primaryBackgroundColor}
      layout={loadingLayout}
    >
      <Text
        style={{ ...styles.titleStyle, color: theme.primaryForegroundColor }}
      >
        {title}
      </Text>
      <Text
        style={{ ...styles.subTitleStyle, color: theme.primaryForegroundColor }}
      >
        {subtitle}
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

const styles = StyleSheet.create({
  titleStyle: {
    margin: 20,
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
  },
  subTitleStyle: {
    marginVertical: 20,
    fontSize: 16,
    textAlign: "center",
  },
});

export default FormPage;
