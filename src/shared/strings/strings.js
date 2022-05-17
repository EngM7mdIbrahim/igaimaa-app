import english from "./english";
import arabic from './arabic';

export const supportedLanguages = {
    engish: 'English',
    arabic: 'Arabic'
}

export const appStringskeys = {
    //Login Screen Texts
    loginScreen_signupText: 'loginScreen_signupText',
    loginScreen_loginText: 'loginScreen_loginText',
    loginScreen_usernamePlaceholderText: 'loginScreen_usernamePlaceholderText',
    loginScreen_usernameErrorMessage: 'loginScreen_usernameErrorMessage',
    loginScreen_passwordPlaceholderText: 'loginScreen_passwordPlaceholderText',
    loginScreen_passwordErrorMessage: 'loginScreen_passwordErrorMessage',
    loginScreen_loginButtonText: 'loginScreen_loginButtonText',
    loginScreen_forgetPasswordButtonText: 'loginScreen_forgetPasswordButtonText',
    //Signup Screen Texts
    signupScreen_modal_titleText: 'signupScreen_modal_titleText',
    signupScreen_modal_rightButtonText: 'signupScreen_modal_rightButtonText',
    signupScreen_modal_leftButtonText: 'signupScreen_modal_leftButtonText',
    signupScreen_form_page1_titleText: 'signupScreen_form_page1_titleText',
    signupScreen_form_page1_subTitleText: 'signupScreen_form_page1_subTitleText',
    signupScreen_form_page1_usernameInputLabelText: 'signupScreen_form_page1_usernameInputLabelText',
    signupScreen_form_page1_usernameInputLabelPlaceHolder: 'signupScreen_form_page1_usernameInputLabelPlaceHolder',
    signupScreen_form_page1_usernameInputLabelErrorMessage: 'signupScreen_form_page1_usernameInputLabelPlaceHolder',
    signupScreen_form_page1_passwordInputLabelText: 'signupScreen_form_page1_passwordInputLabelText',
    signupScreen_form_page1_passwordInputLabelPlaceHolder: 'signupScreen_form_page1_passwordInputLabelPlaceHolder',
    signupScreen_form_page1_passwordInputLabelErrorMessage: 'signupScreen_form_page1_passwordInputLabelErrorMessage'

}


export const getString = (language, key)=>{
    let result = null;
    switch(language){
        case supportedLanguages.engish: result = english[key]; break;
        case supportedLanguages.arabic: result = arabic[key]; break;
    }
    if(!result){
        result='String not found!'
    }
    return result;
}