export const calculateDistance = (
  location1: { lat: number; lon: number },
  location2: { lat: number; lon: number }
): number => {
  const earthRadius = 6371e3; // Earth radius in meters
  const latitude1InRadians = (location1.lat * Math.PI) / 180;
  const latitude2InRadians = (location2.lat * Math.PI) / 180;
  const latitudeDifference = ((location2.lat - location1.lat) * Math.PI) / 180;
  const longitudeDifference = ((location2.lon - location1.lon) * Math.PI) / 180;

  const haversineFormula =
    Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
    Math.cos(latitude1InRadians) *
      Math.cos(latitude2InRadians) *
      Math.sin(longitudeDifference / 2) *
      Math.sin(longitudeDifference / 2);

  const centralAngle = 2 * Math.atan2(Math.sqrt(haversineFormula), Math.sqrt(1 - haversineFormula));

  return earthRadius * centralAngle; // Distance in meters
};
