const GREEN_200 = '#5AD27C';
const GREEN_400 = '#349324';
const WHITE = '#fff';
const BLACK = '#000';
const GRAY_100 = '#A99E9E';
const GRAY_200 = '#5C5C5C';
const PRIMARY_TEXT = '#6BAA75';
const WHITE_100 = '#F5FCFF';
const BLUE_100 = '#D6E2E9';

const common = {
  GREEN_200,
  GREEN_400,
  GRAY_100,
  GRAY_200,
  WHITE_100,
  BLUE_100,
  PRIMARY_TEXT,
};

const light = {...common, PRIMARY_APP_BG: WHITE};
const dark = {...common, PRIMARY_APP_BG: BLACK};

export const colors = {light, dark};
