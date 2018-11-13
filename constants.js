const radiansConversionFactor = 0.0174533;
const globalHeartbeatTimer = 30;
const rateOfFire = 800;
const turnRadius = 5;
const tankSpeed = 100;
const degreeConversionFactor = 57.2958;
const radarSpeed = 0.5;
const radarRange = 700;
const radarBlipRatio = 28;
const tankBotCircleRange = window.innerWidth / 5;
const randomNumberGenerator = ( max, min = 0 ) => {
	return Math.floor( ( Math.random() * max ) + min )
}
const invulnerableTimer = 3000;
const cannonballSpeed = 300;