import React, { useReducer, useEffect } from "react";
import { validate } from "../../utils/validators";
import LabeledField from "./LabeledField";
import UnLabeledField from "./UnLabeledField";
import { Text, StyleSheet } from "react-native";

//InitInputObject
export const initInputInstance = {
  title: "title",
  isValid: true,
  isPassword: false,
  initValue: "",
  isLabeled: false,
  placeholder: "This is input doesn't have place holder",
  validators: [],
  errorMessage: "This is input doesn't have error message",
  icon: undefined,
  style: {},
  onInputChange: ()=>{console.error('No on input change handler for this input field!')},
  onFocus: ()=>{console.error('No on focus for this input field!')}
};

//Colors:
const RED_COLOR = "#e6352b";

// for seeing the state structure
let INIT_STATE = {
  value: "",
  isValid: false,
  isTouched: false,
};

//state === {value: string, isValid: boolean, isTouched: boolean}
//action === {type: 'change_value' || 'touch' || 'validate', payload: string}
const inputReducer = (state, action) => {
  switch (action.type) {
    case "change_value":
      return {
        ...state,
        value: action.payload,
        isValid: validate(action.payload, action.validators),
      };
    case "touch":
      return { ...state, isTouched: true };
    default:
      return { ...state };
  }
};

const InputField = ({
  isLabeled = initInputInstance.isLabeled,
  title = initInputInstance.title,
  errorMessage = initInputInstance.errorMessage,
  validators = initInputInstance.validators,
  onInputChange = initInputInstance.onInputChange,
  theme,
  style = initInputInstance.style,
  placeholder = initInputInstance.placeholder,
  isPassword = initInputInstance.isPassword,
  initValue = initInputInstance.initValue,
  icon = initInputInstance.icon,
  onFocus = initInputInstance.onFocus
}) => {
  INIT_STATE = {
    value: initValue,
    isValid: validate(initValue, validators),
    isTouched: !!initValue,
  };
  const [state, dispatch] = useReducer(inputReducer, INIT_STATE);
  const { isValid, isTouched, value } = state;
  const id = title;

  //useEffect
  useEffect(() => {
    onInputChange(id, isValid, value);
  }, [onInputChange, id, isValid, value]);

  //Handlers
  const changeTextHandler = (value) => {
    dispatch({
      type: "change_value",
      payload: value,
      validators,
    });
  };
  const touchHandler = () => {
    dispatch({
      type: "touch",
    });
  };

  //UI Elements
  const color = theme.primaryForegroundColor;
  const backgroundColor = theme.secondaryBackgroundColor;
  const placeholderColor = theme.placeholderColor;
  const errorMessageColor = theme ? theme.buttonDangerColor : RED_COLOR;
  const lowerMargin = !isValid && isTouched ? {marginBottom: 5} : {};
  const lowerErrorMargin = !isValid && isTouched ? {marginBottom: 10} : {};

  const elementForInput = isLabeled ? (
    <LabeledField
      title={title}
      onFocus={onFocus}
      touchHandler={touchHandler}
      style={{...style, ...lowerMargin}}
      isPassword={isPassword}
      onChangeText={changeTextHandler}
      color={color}
      placeholder={placeholder}
      backgroundColor={backgroundColor}
      placeholderColor={placeholderColor}
      value={value}
    />
  ) : (
    <UnLabeledField
      touchHandler={touchHandler}
      style={{...style, ...lowerMargin}}
      icon={icon}
      isPassword={isPassword}
      onChangeText={changeTextHandler}
      color={color}
      placeholder={title}
      backgroundColor={backgroundColor}
      placeholderColor={placeholderColor}
      value={value}
    />
  );

  return (
    <>
      {elementForInput}
      {!isValid && isTouched && (
        <Text style={{ ...styles.errorMessageStyle, ...lowerErrorMargin,  color: errorMessageColor }}>
          {errorMessage}
        </Text>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  errorMessageStyle: {
    marginHorizontal: 15,
  },
});

export default InputField;
