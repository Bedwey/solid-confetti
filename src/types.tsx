import { JSX } from "solid-js";

export type Particle = {
	color: string; // color of particle
	degree: number; // vector direction, between 0-360 (0 being straight up ↑)
};

export type Rotate3dTransform = [number, number, number];
export type ParticleShape = "mix" | "circles" | "rectangles";

export interface IConfettiExplosion {
	count?: number;
	colors?: string[];
	class?: string;
	particleCount?: number;
	particleSize?: number;
	particlesShape?: ParticleShape;
	duration?: number;
	force?: number;
	stageHeight?: number;
	stageWidth?: number;
	shouldDestroyAfterDone?: boolean;
}

// Add directive for SolidJS
declare module "solid-js" {
	namespace JSX {
		interface Directives {
			confettiStyles: Particle & IConfettiExplosion;
		}
	}
}
