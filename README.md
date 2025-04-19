# solid-confetti

A lightweight, customizable confetti animation library for SolidJS applications.

## Installation

```bash
npm install solid-confetti
# or
yarn add solid-confetti
# or
pnpm add solid-confetti
```

## Usage

### Using ConfettiProvider

The recommended way to use solid-confetti is with the ConfettiProvider, which allows you to trigger confetti animations from anywhere in your application.

1. Wrap your application with the ConfettiProvider:

```jsx
import { ConfettiProvider } from 'solid-confetti';

function App() {
  return (
    <ConfettiProvider defaultOptions={{ 
      particleCount: 200,
      colors: ['#ff0000', '#00ff00', '#0000ff']
    }}>
      <YourAppComponent />
    </ConfettiProvider>
  );
}
```

2. Use the `useConfetti` hook in any component to trigger confetti:

```jsx
import { useConfetti } from 'solid-confetti';

function CelebrationButton() {
  const [fireConfetti, isActive] = useConfetti();
  
  return (
    <button 
      onClick={() => fireConfetti({ 
        particleCount: 100,
        force: 0.8
      })}
      disabled={isActive()}
    >
      Celebrate!
    </button>
  );
}
```

### Using ConfettiWrapper

The ConfettiWrapper component wraps a child element and can trigger confetti from the child's position:

```jsx
import { ConfettiWrapper } from 'solid-confetti';

function CelebrationComponent() {
  return (
    <ConfettiWrapper 
      triggerOnClick={true}
      options={{ 
        particleCount: 100,
        colors: ['#FFD700', '#FF1493', '#00BFFF']
      }}
    >
      <button>Click me for confetti!</button>
    </ConfettiWrapper>
  );
}
```

Or with auto-trigger:

```jsx
import { ConfettiWrapper } from 'solid-confetti';

function AutoCelebration() {
  return (
    <ConfettiWrapper 
      autoTrigger={true}
      triggerDelay={1000} // Wait 1 second before triggering
      options={{ 
        particleCount: 150,
        force: 0.7
      }}
    >
      <div>🎉 Achievement Unlocked!</div>
    </ConfettiWrapper>
  );
}
```

## API Reference

### ConfettiProvider

| Prop | Type | Description |
|------|------|-------------|
| `children` | `JSX.Element` | Child components wrapped by the provider |
| `defaultOptions` | `Partial<IConfettiExplosion>` | Default options for all confetti explosions |

### useConfetti

Returns a tuple:
- `fireConfetti`: Function that accepts optional confetti options
- `isActive`: Signal indicating if confetti is currently active

### ConfettiWrapper

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | Child element to wrap |
| `autoTrigger` | `boolean` | `false` | Auto-trigger confetti on mount |
| `triggerOnClick` | `boolean` | `false` | Trigger confetti when the wrapped element is clicked |
| `triggerDelay` | `number` | `0` | Delay in ms before triggering confetti (useful with autoTrigger) |
| `options` | `Partial<IConfettiExplosion>` | `{}` | Confetti animation options |
| `class` | `string` | `undefined` | CSS class for the wrapper element |
| `style` | `JSX.CSSProperties` | `undefined` | Inline styles for the wrapper element |

### IConfettiExplosion (Options)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `particleCount` | `number` | `150` | Number of confetti particles |
| `duration` | `number` | `3500` | Duration of animation in milliseconds |
| `colors` | `string[]` | `["#FFC700", "#FF0000", "#2E3191", "#41BBC7"]` | Colors of the confetti particles |
| `particleSize` | `number` | `12` | Size of particles in pixels |
| `force` | `number` | `0.5` | Force of the explosion (0-1) |
| `stageHeight` | `number` | `800` | Vertical distance particles will travel |
| `stageWidth` | `number` | `1600` | Horizontal spread of particles |
| `particlesShape` | `"mix" \| "circles" \| "rectangles"` | `"mix"` | Shape of the particles |
| `shouldDestroyAfterDone` | `boolean` | `true` | Whether to remove confetti after animation |

## License

MIT