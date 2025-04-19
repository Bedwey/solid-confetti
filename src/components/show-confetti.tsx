import { render, Portal } from "solid-js/web";
import { mergeProps } from "solid-js";
import type { IConfettiExplosion } from "../types";
import { PARTICLE_COUNT, DURATION, COLORS, SIZE, FORCE } from "../constants";
import { ConfettiExplosion } from "./confetti-explosion";

/**
 * Shows confetti explosion at a specific position or the center of the screen
 * Can be called from anywhere in the app
 *
 * @param options Optional configuration for the confetti explosion
 * @param targetElement Optional element to use as the origin point for the confetti
 * @returns Object with dispose function to clean up early if needed
 */
export function showConfetti(
	options: IConfettiExplosion = {},
	targetElement?: HTMLElement,
) {
	// Create a container element for the confetti
	const container = document.createElement("div");
	container.className =
		"fixed z-[9999] top-0 left-0 w-screen h-screen pointer-events-none overflow-visible";
	document.body.appendChild(container);

	// Default to center of screen
	let defaultClass =
		"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]";

	// If a target element is provided, position the confetti at that element
	if (targetElement) {
		const rect = targetElement.getBoundingClientRect();
		const x = rect.left + rect.width / 2;
		const y = rect.top + rect.height / 2;

		// Create a custom class with the exact position
		defaultClass = "fixed z-[9999]";

		// Set the position style directly to the confetti container
		container.style.setProperty("--confetti-x", `${x}px`);
		container.style.setProperty("--confetti-y", `${y}px`);
	}

	// Merge with defaults
	const props = mergeProps(
		{
			particleCount: PARTICLE_COUNT,
			duration: DURATION,
			colors: COLORS,
			particleSize: SIZE,
			force: FORCE,
			stageHeight: window.innerHeight,
			stageWidth: window.innerWidth,
			shouldDestroyAfterDone: true,
			particlesShape: "mix" as const,
			class: defaultClass,
		},
		options,
	);

	// Render the confetti in the container
	const dispose = render(
		() => (
			<Portal mount={container}>
				<div
					style={
						targetElement
							? {
								position: "absolute",
								top: "var(--confetti-y)",
								left: "var(--confetti-x)",
								transform: "translate(-50%, -50%)",
							}
							: undefined
					}
				>
					<ConfettiExplosion {...props} />
				</div>
			</Portal>
		),
		container,
	);

	// Clean up after duration
	setTimeout(() => {
		dispose();
		if (container.parentNode) {
			container.parentNode.removeChild(container);
		}
	}, props.duration + 100); // Add a small buffer to ensure animation completes

	return { dispose };
}
