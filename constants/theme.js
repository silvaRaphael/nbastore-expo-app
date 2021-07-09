import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#EA5750',
  secondary: '#727A87',
  topGradient: '#EB5951',
  bottomGradient: '#FB8361',
  white: '#FFFFFF',
  button: '#FFFFFF25',
  textButton: '#FFFFFF70',
  miniButton: '#43464D',
  header: '#14171C99',
  bgDark: '#14171C',
  bgLight: '#1D2027',

  modalBg: '#323438'
}

export const borderActive = {
  borderWidth: 1,
  borderColor: '#EA5750'
}

export const borderDisabled = {
  borderWidth: 1,
  borderColor: '#727A87'
}

export const SIZES = {
  width,
  height,
  padding: 25,
  radius: 20,
  margin: 20,
  padding: 20,
  icon: {
    width: 20,
    height: 20
  },
  
  borderActive,
  borderDisabled,

  bigTitle: 30,
  title: 20,
  title2: 18,
  default: 16,
  fontInfo: 14,
  price: 28,
  h3: 14,
  h5: 12,
  h6: 10,
}

export const FONTS = {
  bigTitle: { fontWeight: 'bold', fontSize: SIZES.bigTitle },
  title: { fontWeight: 'normal', fontSize: SIZES.title },
  title2: { fontWeight: 'bold', fontSize: SIZES.title2 },
  default: { fontWeight: 'normal', fontSize: SIZES.default },
  fontInfo: { fontWeight: '100', fontSize: SIZES.fontInfo },
  price: { fontWeight: '500', fontSize: SIZES.price },
  h3: { fontWeight: 'normal', fontSize: SIZES.h3 },
  h5: { fontWeight: 'normal', fontSize: SIZES.h5 },
  h6: { fontWeight: 'normal', fontSize: SIZES.h6 },
}

const appTheme = { COLORS, SIZES, FONTS }

export default appTheme;