const GREEN_LIGHT = '#5AD27C';
const GREEN_DARK = '#81A176';
const WHITE = '#fff';
const BLACK = '#000';
const GRAY_100 = '#A99E9E';
const PRIMARY_TEXT = '#6BAA75';
const WHITE_100 = '#F5FCFF';

const common = {
  GREEN_LIGHT,
  GREEN_DARK,
  GRAY_100,
  PRIMARY_TEXT,
  WHITE_100,
};

const light = {...common, PRIMARY_APP_BG: WHITE};
const dark = {...common, PRIMARY_APP_BG: BLACK};

export const colors = {light, dark};
