export const calculateAngle = (x1, y1, x2, y2, x3, y3) => {
  const a = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const b = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2));
  const c = Math.sqrt(Math.pow(x3 - x1, 2) + Math.pow(y3 - y1, 2));

  let angleInRadians = Math.acos((a * a + b * b - c * c) / (2 * a * b));
  let angleInDegrees = angleInRadians * (180 / Math.PI);

  // Determine the orientation of the angle
  const orientation = Math.sign((x3 - x1) * (y2 - y1) - (x2 - x1) * (y3 - y1));

  if (orientation === -1) {
    angleInDegrees = 360 - angleInDegrees;
  }

  return Math.round(angleInDegrees);
};
