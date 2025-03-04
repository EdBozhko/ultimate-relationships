export const getIntersectionPoint = (cx, cy, r, angleDegrees) => {
  let angleRadians = angleDegrees * (Math.PI / 180);

  let x = cx + r * Math.sin(angleRadians);
  let y = cy - r * Math.cos(angleRadians);

  return { x: x, y: y };
};
