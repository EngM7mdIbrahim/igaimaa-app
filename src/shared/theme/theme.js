
const whiteTheme = {
    primaryForegroundColor: '#c60017',
    secondaryForegroundColor: '#03045e',
    primaryBackgroundColor: 'white',
    secondaryBackgroundColor: '#F5F5F5',
}

const blackTheme = {
    primaryForegroundColor: 'white',
    secondaryForegroundColor: '#03045e',
    primaryBackgroundColor: 'black',
    secondaryBackgroundColor: '#1c1c1e',
}

const defaultTheme = {
    placeholderColor: 'gray',
    buttonNormalColor: 'rgb(0, 110, 230)',
    buttonDangerColor: 'rgb(230, 53, 43)',
    buttonNormalDisabledColor: 'rgba(0, 110, 230,0.5)',
    buttonDangerDisabledColor: 'rgba(230, 53, 43,0.5)'
}

export const getTheme = (isBlack) =>{
    const wantedTheme = isBlack ? blackTheme : whiteTheme
    return {...defaultTheme, ...wantedTheme};
}

