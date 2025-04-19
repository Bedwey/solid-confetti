import type { Particle, ParticleShape } from "./types";
import { ROTATION_TRANSFORMS, Z_AXIS_ROTATION } from "./constants";

/**
 * Creates an array of particles with evenly distributed angles
 */
export const createParticles = (
	count: number,
	colors: string[],
): Particle[] => {
	const increment = 360 / count;
	return Array.from({ length: count }, (_, i) => ({
		color: colors[i % colors.length],
		degree: i * increment,
	}));
};

/**
 * Rounds a number to the specified precision
 */
export function round(num: number, precision = 2) {
	return Math.round((num + Number.EPSILON) * 10 ** precision) / 10 ** precision;
}

/**
 * Compares two arrays for equality
 */
export function arraysEqual<ItemType>(a: ItemType[], b: ItemType[]) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
	return true;
}

/**
 * Maps a value from one range to another
 */
export const mapRange = (
	value: number,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

/**
 * Rotates a degree by a given amount, wrapping around at 360
 */
export const rotate = (degree: number, amount: number) => {
	const result = degree + amount;
	return result > 360 ? result - 360 : result;
};

/**
 * Random boolean with 50% chance
 */
export const coinFlip = () => Math.random() > 0.5;

/**
 * Determines if a particle should be a circle based on its rotation
 */
export const shouldBeCircle = (rotationIndex: number) =>
	!arraysEqual(ROTATION_TRANSFORMS[rotationIndex], Z_AXIS_ROTATION) &&
	coinFlip();

/**
 * Checks if a value is undefined
 */
export const isUndefined = (value: unknown) => typeof value === "undefined";

/**
 * Logs an error message
 */
export const error = (message: string) => {
	console.error(message);
};

/**
 * Validates confetti parameters
 */
export function validate(
	particleCount: number,
	duration: number,
	colors: string[],
	particleSize: number,
	force: number,
	stageHeight: number,
	stageWidth: number,
	particlesShape: ParticleShape,
) {
	const isSafeInteger = Number.isSafeInteger;
	if (
		!isUndefined(particleCount) &&
		isSafeInteger(particleCount) &&
		particleCount < 0
	) {
		error("particleCount must be a positive integer");
		return false;
	}
	if (!isUndefined(duration) && isSafeInteger(duration) && duration < 0) {
		error("duration must be a positive integer");
		return false;
	}
	if (
		!isUndefined(particlesShape) &&
		!["mix", "circles", "rectangles"].includes(particlesShape)
	) {
		error('particlesShape should be either "mix" or "circles" or "rectangle"');
		return false;
	}
	if (!isUndefined(colors) && !Array.isArray(colors)) {
		error("colors must be an array of strings");
		return false;
	}
	if (
		!isUndefined(particleSize) &&
		isSafeInteger(particleSize) &&
		particleSize < 0
	) {
		error("particleSize must be a positive integer");
		return false;
	}
	if (!isUndefined(force) && isSafeInteger(force) && (force < 0 || force > 1)) {
		error("force must be a positive integer and should be within 0 and 1");
		return false;
	}
	if (
		!isUndefined(stageHeight) &&
		typeof stageHeight === "number" &&
		isSafeInteger(stageHeight) &&
		stageHeight < 0
	) {
		error("floorHeight must be a positive integer");
		return false;
	}
	if (
		!isUndefined(stageWidth) &&
		typeof stageWidth === "number" &&
		isSafeInteger(stageWidth) &&
		stageWidth < 0
	) {
		error("floorWidth must be a positive integer");
		return false;
	}
	return true;
}
