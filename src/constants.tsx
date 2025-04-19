// Constants for confetti animation
export const ROTATION_SPEED_MIN = 200; // minimum possible duration of single particle full rotation
export const ROTATION_SPEED_MAX = 800; // maximum possible duration of single particle full rotation
export const CRAZY_PARTICLES_FREQUENCY = 0.1; // 0-1 frequency of crazy curvy unpredictable particles
export const CRAZY_PARTICLE_CRAZINESS = 0.3; // 0-1 how crazy these crazy particles are
export const BEZIER_MEDIAN = 0.5; // utility for mid-point bezier curves, to ensure smooth motion paths

export const FORCE = 0.8; // 0-1 roughly the vertical force at which particles initially explode - increased for better visibility
export const SIZE = 15; // max height for particle rectangles, diameter for particle circles - increased size
export const FLOOR_HEIGHT = 800; // pixels the particles will fall from initial explosion point
export const FLOOR_WIDTH = 1600; // horizontal spread of particles in pixels
export const PARTICLE_COUNT = 200; // increased particle count for better effect
export const DURATION = 3500;
export const COLORS = [
	"#FFC700",
	"#FF0000",
	"#2E3191",
	"#41BBC7",
	"#FF00FF",
	"#00FF00",
]; // added more colors

// Rotation transformations for different particle effects
export const Z_AXIS_ROTATION: [number, number, number] = [0, 0, 1];

export const ROTATION_TRANSFORMS: [number, number, number][] = [
	// dual axis rotations (a bit more realistic)
	[1, 1, 0],
	[1, 0, 1],
	[0, 1, 1],
	// single axis rotations (a bit dumber)
	[1, 0, 0],
	[0, 1, 0],
	Z_AXIS_ROTATION,
];
