import getOpenToText from './getOpenToText';

export default values => {
  const newVal = {};

  newVal['no'] = { ...values.blank, text: getOpenToText('no') };
  newVal['tilt'] = { ...values.tilt, text: getOpenToText('tilt') };

  newVal['toLeft'] = { ...values.turn, text: getOpenToText('toLeft') };
  newVal['toRight'] = { ...values.turn, text: getOpenToText('toRight') };

  newVal['tilt_toLeft'] = { ...values.tiltAndTurn, text: getOpenToText('tilt_toLeft') };
  newVal['tilt_toRight'] = { ...values.tiltAndTurn, text: getOpenToText('tilt_toRight') };

  return newVal;
};
