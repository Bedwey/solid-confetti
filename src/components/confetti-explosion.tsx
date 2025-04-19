import {
	type Component,
	Show,
	For,
	onMount,
	mergeProps,
	createMemo,
	createSignal,
	onCleanup,
	Accessor
} from "solid-js";

import "../styles/styles.css";
import type { IConfettiExplosion, Particle } from "../types";
import { validate, createParticles, mapRange, rotate, round, coinFlip, arraysEqual } from "../utils";
import {
	PARTICLE_COUNT,
	DURATION,
	COLORS,
	SIZE,
	FORCE,
	FLOOR_HEIGHT,
	FLOOR_WIDTH,
	ROTATION_TRANSFORMS,
	Z_AXIS_ROTATION,
	ROTATION_SPEED_MIN,
	ROTATION_SPEED_MAX,
	CRAZY_PARTICLES_FREQUENCY,
	CRAZY_PARTICLE_CRAZINESS,
	BEZIER_MEDIAN
} from "../constants";

/**
 * SolidJS directive that applies confetti styling to a DOM element
 */
export const confettiStyles = (
	node: HTMLDivElement,
	inOptions: Accessor<Particle & IConfettiExplosion>,
) => {
	const opts = inOptions();
	// Get x landing point for it
	const landingPoint = mapRange(
		Math.abs(rotate(opts.degree, 90) - 180),
		0,
		180,
		-(opts.stageWidth ?? FLOOR_WIDTH) / 2,
		(opts.stageWidth ?? FLOOR_WIDTH) / 2,
	);
	// Crazy calculations for generating styles
	const rotation =
		Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) +
		ROTATION_SPEED_MIN;
	const rotationIndex = Math.round(
		Math.random() * (ROTATION_TRANSFORMS.length - 1),
	);
	const durationChaos = opts.duration
		? opts.duration - Math.round(Math.random() * 1000)
		: 0;
	const shouldBeCrazy = Math.random() < CRAZY_PARTICLES_FREQUENCY;

	// Helper function to determine if particle should be a circle
	const shouldBeCircleShape = (rotationIndex: number) =>
		!arraysEqual(ROTATION_TRANSFORMS[rotationIndex], Z_AXIS_ROTATION) &&
		Math.random() > 0.5;

	const isCircle =
		opts.particlesShape !== "rectangles" &&
		(opts.particlesShape === "circles" || shouldBeCircleShape(rotationIndex));

	// x-axis disturbance, roughly the distance the particle will initially deviate from its target
	const x1 = shouldBeCrazy
		? round(Math.random() * CRAZY_PARTICLE_CRAZINESS, 2)
		: 0;
	const x2 = x1 * -1;
	const x3 = x1;
	// x-axis arc of explosion, so 90deg and 270deg particles have curve of 1, 0deg and 180deg have 0
	const x4 = round(
		Math.abs(mapRange(Math.abs(rotate(opts.degree, 90) - 180), 0, 180, -1, 1)),
		4,
	);

	// roughly how fast particle reaches end of its explosion curve
	const y1 = round(Math.random() * BEZIER_MEDIAN, 4);
	// roughly maps to the distance particle goes before reaching free-fall
	const y2 = round(
		Math.random() * (opts.force ?? FORCE) * (coinFlip() ? 1 : -1),
		4,
	);
	// roughly how soon the particle transitions from explosion to free-fall
	const y3 = BEZIER_MEDIAN;
	// roughly the ease of free-fall
	const y4 = round(
		Math.max(
			mapRange(
				Math.abs(opts.degree - 180),
				0,
				180,
				opts.force ?? FORCE,
				-(opts.force ?? FORCE),
			),
			0,
		),
		4,
	);
	const setCSSVar = (key: string, val: string | number) =>
		node.style.setProperty(key, `${val}`);

	setCSSVar("--x-landing-point", `${landingPoint}px`);
	setCSSVar("--duration-chaos", `${durationChaos}ms`);

	setCSSVar("--x1", `${x1}`);
	setCSSVar("--x2", `${x2}`);
	setCSSVar("--x3", `${x3}`);
	setCSSVar("--x4", `${x4}`);

	setCSSVar("--y1", `${y1}`);
	setCSSVar("--y2", `${y2}`);
	setCSSVar("--y3", `${y3}`);
	setCSSVar("--y4", `${y4}`);

	setCSSVar(
		"--width",
		`${isCircle ? (opts.particleSize ?? SIZE) : Math.round(Math.random() * 4) + (opts.particleSize ?? SIZE) / 2}px`,
	);
	setCSSVar(
		"--height",
		`${isCircle
			? (opts.particleSize ?? SIZE)
			: Math.round(Math.random() * 2) + (opts.particleSize ?? SIZE)
		}px`,
	);

	setCSSVar("--rotation", `${ROTATION_TRANSFORMS[rotationIndex].join()}`);
	setCSSVar("--rotation-duration", `${rotation}ms`);
	setCSSVar("--border-radius", `${isCircle ? "50%" : "0"}`);
};

/**
 * A component that displays a confetti explosion animation
 */
export const ConfettiExplosion: Component<IConfettiExplosion> = (inProps) => {
	const props = mergeProps(
		{
			particleCount: PARTICLE_COUNT,
			duration: DURATION,
			colors: COLORS,
			particleSize: SIZE,
			force: FORCE,
			stageHeight: FLOOR_HEIGHT,
			stageWidth: FLOOR_WIDTH,
			shouldDestroyAfterDone: true,
			particlesShape: "mix" as const,
		},
		inProps,
	);
	const [isVisible, setVisible] = createSignal(true);
	const isValid = createMemo(() =>
		validate(
			props.particleCount,
			props.duration,
			props.colors,
			props.particleSize,
			props.force,
			props.stageHeight,
			props.stageWidth,
			props.particlesShape,
		),
	);
	const particles = createMemo(() =>
		createParticles(props.particleCount, props.colors),
	);
	onMount(() => {
		const timeoutId = setTimeout(() => {
			if (props.shouldDestroyAfterDone) {
				setVisible(false);
			}
		}, props.duration);
		onCleanup(() => clearTimeout(timeoutId));
	});

	return (
		<Show when={isVisible() && isValid()}>
			<div
				class={`sce-container${props.class ? ` ${props.class}` : ""}`}
				style={{ "--floor-height": `${props.stageHeight}px` }}
			>
				<For each={particles()}>
					{(particle) => (
						<div
							class="sce-particle"
							use:confettiStyles={{ ...particle, ...props }}
						>
							<div style={{ "--bgcolor": particle.color }} />
						</div>
					)}
				</For>
			</div>
		</Show>
	);
};
