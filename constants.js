const radiansConversionFactor = 0.0174533;
const globalHeartbeatTimer = 30;
const rateOfFire = 500;
const turnRadius = 5;
const degreeConversionFactor = 57.2958;
const radarSpeed = 0.5;
const radarRange = 500;
const radarBlipRatio = 20;
const tankBotCircleRange = window.innerWidth / 5;
const randomNumberGenerator = ( max, min = 0 ) => {
	return Math.floor( ( Math.random() * max ) + min )
}
