import type { Component, JSX } from "solid-js";
import type { IConfettiExplosion } from "../types";
import { showConfetti } from "./show-confetti";

interface ConfettiWrapperProps {
	/** Options to customize the confetti effect */
	confettiOptions?: IConfettiExplosion;
	/** Handler for click events */
	onClick?: (e: MouseEvent) => void;
	/** Handler for keydown events */
	onKeyDown?: (e: KeyboardEvent) => void;
	/** Additional CSS classes */
	class?: string;
	/** Additional inline styles */
	style?: JSX.CSSProperties;
	/** Optional HTML attributes */
	attributes?: Record<string, string>;
	/** Child elements to wrap */
	children?: JSX.Element;
}

/**
 * A wrapper component that adds confetti effects when children are clicked
 */
export const ConfettiWrapper: Component<ConfettiWrapperProps> = (props) => {
	let elementRef: HTMLElement | undefined;

	const handleClick = (e: MouseEvent) => {
		// Trigger confetti from the element's position
		if (elementRef) {
			showConfetti(props.confettiOptions || {}, elementRef);
		}

		// Call the original onClick handler if provided
		props.onClick?.(e);
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		// Trigger confetti on Enter or Space key
		if (e.key === "Enter" || e.key === " ") {
			if (elementRef) {
				showConfetti(props.confettiOptions || {}, elementRef);
			}
		}

		// Call the original onKeyDown handler if provided
		props.onKeyDown?.(e);
	};

	// If children are provided, create a wrapper with confetti capabilities
	if (props.children) {
		// Create a ref callback that works with any element
		const refCallback = (el: HTMLElement) => {
			elementRef = el;
		};

		// Spread additional attributes if provided
		const additionalAttributes = props.attributes || {};

		// Return the child with enhanced props
		return (
			<div
				ref={refCallback}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				class={props.class || ""}
				style={props.style || {}}
				tabindex="0"
				{...additionalAttributes}
			>
				{props.children}
			</div>
		);
	}

	return null;
};
