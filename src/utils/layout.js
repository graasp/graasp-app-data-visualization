// eslint-disable-next-line import/prefer-default-export
export const nbOfTicks = ({ componentWidth, labelWidth, margin = 0 }) => {
  return Math.max(Math.floor((componentWidth - margin) / labelWidth) - 1, 1);
};
