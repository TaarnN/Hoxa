# 🚀 Hoxa - React Hook Library

Remember? You needed these hooks yesterday

[![NPM version](https://img.shields.io/npm/v/hoxa.svg)](https://www.npmjs.com/package/hoxa)
[![NPM downloads](https://img.shields.io/npm/dw/hoxa.svg)](https://www.npmjs.com/package/hoxa)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://www.npmjs.com/package/hoxa?activeTab=code)

> Over **100+ fully-typed React Hooks** that save your time, reduce boilerplate, and just work.  
> Perfect for any React/Next.js project.

⭐️ Star us on GitHub → https://github.com/TaarnN/Hoxa

---

## ✨ Features

- 🧠 **100+ hooks**: utility, DOM, event, state, media, form, storage, etc.
- 🔧 Built with developer experience in mind
- 💡 Useful defaults, real-world use cases

---

## 📦 Installation

```bash
npm install hoxa
# or
yarn add hoxa
# or
bun add hoxa
```

---

# V1 Set

---

## State Management

### `useLocalStorageState`

Persists state in localStorage and synchronizes across tabs  
**Inputs:**

- `key: string`
- `initialValue: T | (() => T)`
- `options?: { serialize?: (value: T) => string, deserialize?: (storedValue: string) => T }`

**Outputs:**

- `[state: T, setState: (value: T | ((prev: T) => T)) => void]`

### `useDebouncedState`

State hook that debounces updates  
**Inputs:**

- `initialValue: T`
- `delay: number`

**Outputs:**

- `[value: T, debouncedValue: T, setValue: React.Dispatch<React.SetStateAction<T>>]`

### `useThrottleState`

State hook that throttles updates  
**Inputs:**

- `initialValue: T`
- `interval: number`

**Outputs:**

- `[value: T, setValue: React.Dispatch<React.SetStateAction<T>>]`

### `usePrevious`

Stores previous value of state/prop  
**Inputs:**

- `value: T`

**Outputs:**

- `previousValue: T | undefined`

### `usePreviousDistinct`

Stores previous distinct value  
**Inputs:**

- `value: T`
- `compare?: (a: T, b: T) => boolean`

**Outputs:**

- `previousDistinctValue: T | undefined`

### `useUndoRedo`

State history with undo/redo  
**Inputs:**

- `initialValue: T`
- `maxHistory?: number`

**Outputs:**

- `{ current: T, set: (value: T) => void, undo: () => void, redo: () => void, clearHistory: () => void, canUndo: boolean, canRedo: boolean }`

### `useStateWithHistory`

State that records all changes  
**Inputs:**

- `initialValue: T`
- `maxHistory?: number`

**Outputs:**

- `[value: T, setValue: (value: T | ((prev: T) => T)) => void, { history: T[], pointer: number, back: () => void, forward: () => void, go: (index: number) => void }]`

### `useLazyState`

Lazily updates state with async function  
**Inputs:**

- `initialValue: T`
- `asyncSetter: (current: T) => Promise<T>`

**Outputs:**

- `[state: T, setAsync: () => Promise<void>]`

### `useSSRState`

Ensures consistent state between server and client  
**Inputs:**

- `initialValue: T | (() => T)`
- `key: string`

**Outputs:**

- `[state: T, setState: React.Dispatch<React.SetStateAction<T>>]`

---

## UI & DOM

### `useClickOutside`

Detects clicks outside element(s)  
**Inputs:**

- `handler: (event: MouseEvent | TouchEvent) => void`
- `elements?: RefObject<HTMLElement>[] | null`

**Outputs:**

- `ref: RefObject<T>`

### `useHover`

Detects hover state  
**Inputs:**

- None

**Outputs:**

- `[ref: RefObject<T>, isHovered: boolean]`

### `useHoverDelay`

Hover detection with delay  
**Inputs:**

- `delay?: number`

**Outputs:**

- `[isHovered: boolean, { onMouseEnter: () => void; onMouseLeave: () => void }]`

### `useFocusTrap`

Traps focus within element  
**Inputs:**

- `active?: boolean`

**Outputs:**

- `ref: RefObject<T>`

### `useOnScreen`

Detects if element is in viewport  
**Inputs:**

- `options?: IntersectionObserverInit`

**Outputs:**

- `[ref: MutableRefObject<T | null>, isVisible: boolean]`

### `useIntersectionObserver`

Tracks element visibility  
**Inputs:**

- `options?: IntersectionObserverInit`

**Outputs:**

- `[ref: MutableRefObject<Element | null>, isIntersecting: boolean]`

### `useResizeObserver`

Tracks element size changes  
**Inputs:**

- `ref: MutableRefObject<T | null>`

**Outputs:**

- `dimensions: DOMRectReadOnly | null`

### `useScrollbarWidth`

Measures browser scrollbar width  
**Inputs:**

- None

**Outputs:**

- `width: number`

### `useMultiRefs`

Manages refs for dynamic lists  
**Inputs:**

- None

**Outputs:**

- `[setRef: (index: number) => (element: T | null) => void, refs: T[]]`

### `useSynchronizedScroll`

Synchronizes scrolling between elements  
**Inputs:**

- `refs: React.RefObject<HTMLElement>[]`

**Outputs:**

- None

### `useGesture`

Detects drag gestures  
**Inputs:**

- None

**Outputs:**

- `[ref: React.RefObject<HTMLElement>, state: { isDragging: boolean; startX: number; startY: number; deltaX: number; deltaY: number; }]`

### `useDarkMode`

Manages dark mode preference  
**Inputs:**

- `options?: { localStorageKey?: string, defaultDark?: boolean }`

**Outputs:**

- `[isDark: boolean, setIsDark: (dark: boolean) => void]`

---

## Async Operations

### `useAsyncRetry`

Retries async functions automatically  
**Inputs:**

- `asyncFunction: () => Promise<T>`
- `options?: { retryDelay?: number; maxRetries?: number }`

**Outputs:**

- `{ loading: boolean; error: Error | null; value: T | null; retryCount: number; retry: () => void; cancel: () => void }`

### `usePromiseQueue`

Queues promises sequentially  
**Inputs:**

- None

**Outputs:**

- `{ enqueue: (task: () => Promise<any>) => void, isRunning: boolean, queueSize: number }`

### `usePolling`

Executes function at intervals  
**Inputs:**

- `callback: () => Promise<void> | void`
- `interval: number`
- `immediate?: boolean`

**Outputs:**

- `{ start: () => void, stop: () => void }`

### `useTimeout`

Runs callback after delay  
**Inputs:**

- `callback: () => void`
- `delay: number | null`
- `dependencies?: any[]`

**Outputs:**

- None

### `useTimeoutFn`

Manages timeout with control  
**Inputs:**

- None

**Outputs:**

- `{ set: (fn: () => void, delay: number) => void, clear: () => void, reset: (fn: () => void, delay: number) => void }`

### `useEventQueue`

Processes events sequentially  
**Inputs:**

- `processor: (event: T) => Promise<void>`
- `options?: { interval?: number }`

**Outputs:**

- `{ addToQueue: (event: T) => void, queueSize: number }`

### `useMultiStepForm`

Manages multi-step forms  
**Inputs:**

- `steps: StepComponent[]`
- `initialData?: any`

**Outputs:**

- `{ CurrentStep: React.FC, currentStep: number, next: (stepData?: any) => void, prev: () => void, goToStep: (index: number) => void, formData: any, isFirst: boolean, isLast: boolean, totalSteps: number }`

---

## Browser APIs

### `useWindowSizeDebounced`

Tracks debounced window size  
**Inputs:**

- `debounceDelay?: number`

**Outputs:**

- `{ width: number; height: number }`

### `useOnlineStatus`

Tracks browser online status  
**Inputs:**

- None

**Outputs:**

- `isOnline: boolean`

### `usePageVisibility`

Detects tab visibility  
**Inputs:**

- None

**Outputs:**

- `isVisible: boolean`

### `useCopyToClipboard`

Copies text to clipboard  
**Inputs:**

- `timeout?: number`

**Outputs:**

- `[copied: boolean, copyToClipboard: (text: string) => Promise<boolean>]`

### `useClipboardListener`

Listens for copy/paste events  
**Inputs:**

- `onCopy?: (text: string) => void`
- `onPaste?: (text: string) => void`

**Outputs:**

- None

### `useMediaQuery`

Tracks media query matches  
**Inputs:**

- `query: string`

**Outputs:**

- `matches: boolean`

### `usePrefersReducedMotion`

Detects reduced motion preference  
**Inputs:**

- None

**Outputs:**

- `prefersReduced: boolean`

### `useNetworkStatus`

Tracks network information  
**Inputs:**

- None

**Outputs:**

- `{ effectiveType: string; rtt: number; downlink: number; saveData: boolean }`

### `useIdleTimeout`

Triggers callback after inactivity  
**Inputs:**

- `callback: () => void`
- `timeout?: number`

**Outputs:**

- None

---

## Forms

### `useInputValidation`

Manages form input validation  
**Inputs:**

- `initialValue?: string`
- `rules?: { required?: boolean; minLength?: number; maxLength?: number; pattern?: RegExp; validate?: (value: string) => boolean }`

**Outputs:**

- `{ value: string; setValue: React.Dispatch<React.SetStateAction<string>>; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onBlur: () => void; errors: string[]; isValid: boolean; dirty: boolean; validate: () => boolean; reset: () => void }`

---

## Performance

### `useDeepCompareEffect`

`useEffect` with deep comparison  
**Inputs:**

- `effect: React.EffectCallback`
- `dependencies: any[]`
- `shallowFallback?: boolean` (optional fallback to shallow comparison)

**Outputs:**

- None (side-effect only)

### `useThrottle`

Throttles function execution  
**Inputs:**

- `func: T`
- `wait: number`
- `options?: { leading?: boolean; trailing?: boolean }`

**Outputs:**

- `throttledFunction: (...args: Parameters<T>) => void`

### `useThrottleEvent`

Throttles event listeners  
**Inputs:**

- `eventName: string`
- `callback: T`
- `throttleTime: number`
- `element?: HTMLElement | Window | Document`

**Outputs:**

- None

### `useEventCallback`

Stable callback reference  
**Inputs:**

- `fn: T`

**Outputs:**

- `stableFn: T`

---

## Animation & Media

### `useBezierEase`

Creates cubic Bézier easing function  
**Inputs:**

- `p1x: number`
- `p1y: number`
- `p2x: number`
- `p2y: number`

**Outputs:**

- `easingFunction: (t: number) => number`

---

## Networking

### `useFetchWithCache`

Fetches data with caching  
**Inputs:**

- `url: string`
- `options?: RequestInit`
- `cacheKey?: string`

**Outputs:**

- `{ data: T | null; loading: boolean; error: Error | null; refresh: () => void }`

### `useScriptLoader`

Loads external scripts  
**Inputs:**

- `src: string`
- `options?: { async?: boolean; defer?: boolean; attributes?: Record<string, string> }`

**Outputs:**

- `status: 'loading' | 'ready' | 'error'`

### `useScriptState`

Tracks script loading status  
**Inputs:**

- `src: string`

**Outputs:**

- `status: 'loading' | 'ready' | 'error' | 'idle'`

---

## Error Handling

### `useErrorBoundary`

Catches component errors  
**Inputs:**

- None

**Outputs:**

- `{ setError: (error: Error) => void, resetError: () => void }`

---

## Miscellaneous

### `useEventListener`

Attaches event listeners  
**Inputs:**

- `eventType: K`
- `handler: (event: WindowEventMap[K]) => void`
- `element?: Window | Document`
- `options?: AddEventListenerOptions`

**Outputs:**

- None

### `useLocalStorageEffect`

Effect based on localStorage  
**Inputs:**

- `key: string`
- `effect: (storedValue: any) => void`
- `dependencies?: any[]`

**Outputs:**

- None

### `useEventEmitter`

Creates event emitter  
**Inputs:**

- None

**Outputs:**

- `{ emit: (data: T) => void, subscribe: (listener: (data: T) => void) => () => void }`

### `useIsClient`

Detect if in server or client
**Inputs:**

- None

**Outputs:**

- `isClient: boolean`

---

# V2 Set

---

## State Management

### `useToggle`

Toggle between boolean states  
**Inputs:**

- `initialValue?`: boolean (default: false)

**Outputs:**

- `[state: boolean, toggle: () => void, setState: React.Dispatch<boolean>]`

### `useCounter`

Manage numeric values  
**Inputs:**

- `initialValue?`: number (default: 0)
- `options?`: { min?: number; max?: number; step?: number }

**Outputs:**

- `{ value: number, increment: () => void, decrement: () => void, reset: () => void, set: (value: number) => void }`

### `useMap`

Manage key-value pairs  
**Inputs:**

- `initialEntries?`: Iterable<[K, V]>

**Outputs:**

- `Map-like object with { size, get, set, delete, clear, entries, keys, values }`

### `useSet`

Handle unique collections  
**Inputs:**

- `initialValues?`: Iterable<T>

**Outputs:**

- `Set-like object with { size, has, add, delete, clear }`

### `useArray`

Enhanced array operations  
**Inputs:**

- `initialValue?`: T[]

**Outputs:**

- `{ value: T[], push: (...items: T[]) => void, pop: () => void, shift: () => void, unshift: (...items: T[]) => void, update: (index: number, item: T) => void, remove: (index: number) => void, filter: (predicate: (value: T) => boolean) => void, clear: () => void }`

### `useCookieState`

Sync state with cookies  
**Inputs:**

- `key`: string
- `initialValue`: T

**Outputs:**

- `[value: T, setValue: (value: T, options?: CookieOptions) => void]`

### `useSessionStorageState`

Persist state in sessionStorage  
**Inputs:**

- `key`: string
- `initialValue`: T | (() => T)

**Outputs:**

- `[value: T, setValue: React.Dispatch<React.SetStateAction<T>>]`

### `useQueue`

FIFO (First-In-First-Out) data structure  
**Inputs:**

- `initialItems?`: T[]

**Outputs:**

- `{ items: T[], size: number, isEmpty: boolean, enqueue: (item: T) => void, dequeue: () => T | undefined, peek: () => T | undefined, clear: () => void }`

### `useStack`

LIFO (Last-In-First-Out) data structure  
**Inputs:**

- `initialItems?`: T[]

**Outputs:**

- `{ items: T[], size: number, isEmpty: boolean, push: (item: T) => void, pop: () => T | undefined, peek: () => T | undefined, clear: () => void }`

### `useFrozenState`

Prevent state updates when frozen  
**Inputs:**

- `initialValue`: T
- `freezeCondition`: boolean

**Outputs:**

- `[state: T, setFrozenState: React.Dispatch<React.SetStateAction<T>>]`

---

## UI & DOM

### `useFocus`

Track element focus state  
**Inputs:** None

**Outputs:**

- `[ref: RefObject<HTMLElement>, isFocused: boolean, focus: () => void]`

### `useFocusWithin`

Detect if focus is within container  
**Inputs:** None

**Outputs:**

- `[ref: RefObject<HTMLElement>, isFocusWithin: boolean]`

### `useLongPress`

Detect long-press gestures  
**Inputs:**

- `callback: () => void`
- `duration?`: number (ms)

**Outputs:**

- `Event handlers object: { onMouseDown, onMouseUp, onMouseLeave, onTouchStart, onTouchEnd }`

### `useDrag`

Handle drag operations  
**Inputs:** None

**Outputs:**

- `{ dragRef: RefObject<HTMLElement>, isDragging: boolean, handleMouseDown: (e: React.MouseEvent) => void }`

### `useDrop`

Create drop targets  
**Inputs:**

- `onDrop: (item: T) => void`

**Outputs:**

- `[ref: RefObject<HTMLElement>, isOver: boolean, isDropped: boolean]`

### `useFullscreen`

Control fullscreen mode  
**Inputs:** None

**Outputs:**

- `[ref: RefObject<HTMLElement>, isFullscreen: boolean, enter: () => void, exit: () => void]`

### `useElementSize`

Track element dimensions  
**Inputs:** None

**Outputs:**

- `[ref: RefObject<HTMLElement>, size: { width: number; height: number }]`

### `useViewportPosition`

Track element position in viewport  
**Inputs:** None

**Outputs:**

- `[ref: RefObject<HTMLElement>, position: { top: number; left: number; visibleRatio: number }]`

### `useMousePosition`

Track mouse coordinates  
**Inputs:** None

**Outputs:**

- `{ x: number; y: number }`

### `useScrollDirection`

Detect scroll direction  
**Inputs:**

- `threshold?`: number

**Outputs:**

- `'up' | 'down' | null`

### `useCssVariable`

Get/set CSS custom properties  
**Inputs:**

- `name`: string
- `element?`: HTMLElement | null

**Outputs:**

- `[value: string | null, setVariable: (value: string) => void]`

### `useBreakpoint`

Track responsive breakpoints  
**Inputs:**

- `breakpoints?`: Record<string, number>

**Outputs:**

- `currentBreakpoint: string`

### `useLockBodyScroll`

Prevent body scrolling  
**Inputs:**

- `lock?`: boolean

**Outputs:** None (side-effect only)

---

## Async Operations

### `useRetry`

Retry failed async operations  
**Inputs:**

- `asyncFn: () => Promise<T>`
- `options?`: { retries?: number; retryDelay?: number; onSuccess?: (data: T) => void; onError?: (error: Error) => void }

**Outputs:**

- `{ data: T | null, error: Error | null, loading: boolean, attempt: () => Promise<void>, retry: () => void }`

### `useConcurrentRequests`

Manage parallel async tasks  
**Inputs:**

- `requests: (() => Promise<T>)[]`
- `options?`: { maxConcurrent?: number; onComplete?: (results: T[]) => void }

**Outputs:**

- `{ results: T[], errors: Error[], loading: boolean, progress: number, retry: () => void }`

### `useInterval`

Managed interval timer  
**Inputs:**

- `callback: () => void`
- `delay`: number | null
- `options?`: { immediate?: boolean }

**Outputs:** None (side-effect only)

### `useCountdown`

Countdown timer implementation  
**Inputs:**

- `initialSeconds`: number
- `options?`: { autoStart?: boolean; onComplete?: () => void; interval?: number }

**Outputs:**

- `{ seconds: number, isRunning: boolean, start: () => void, pause: () => void, reset: () => void, formatted: string }`

---

## Browser APIs

### `useBatteryStatus`

Access battery information  
**Inputs:** None

**Outputs:**

- `{ level: number, charging: boolean, chargingTime: number, dischargingTime: number } | null`

### `useGeolocation`

Track geographical location  
**Inputs:**

- `options?`: PositionOptions

**Outputs:**

- `{ latitude: number | null, longitude: number | null, accuracy: number | null, error: GeolocationPositionError | null, timestamp: number | null }`

### `useDeviceOrientation`

Detect device tilt  
**Inputs:** None

**Outputs:**

- `{ alpha: number | null, beta: number | null, gamma: number | null, absolute: boolean | null }`

### `useMotion`

Access device motion data  
**Inputs:** None

**Outputs:**

- `{ acceleration: { x: number | null; y: number | null; z: number | null }, accelerationIncludingGravity: { x: number | null; y: number | null; z: number | null }, rotationRate: { alpha: number | null; beta: number | null; gamma: number | null }, interval: number | null }`

### `usePreferredLanguage`

Get browser language  
**Inputs:** None

**Outputs:**

- `language: string`

### `usePrint`

Detect print dialog events  
**Inputs:** None

**Outputs:**

- `isPrinting: boolean`

### `useWakeLock`

Prevent screen sleep  
**Inputs:** None

**Outputs:**

- `{ isSupported: boolean, isActive: boolean, request: () => Promise<void>, release: () => void }`

---

## Forms

### `useForm`

Comprehensive form management  
**Inputs:**

- `options?`: { initialValues?: Record<string, any>; validate?: (values: Record<string, any>) => Record<string, string>; onSubmit?: (values: Record<string, any>) => void }

**Outputs:**

- `{ values: Record<string, any>, errors: Record<string, string>, touched: Record<string, boolean>, isSubmitting: boolean, handleChange: (e: React.ChangeEvent) => void, handleBlur: (e: React.FocusEvent) => void, handleSubmit: (e: React.FormEvent) => void, resetForm: () => void, setFieldValue: (name: string, value: any) => void, setFieldTouched: (name: string, touched: boolean) => void, isValid: boolean }`

### `useField`

Manage individual form fields  
**Inputs:**

- `initialValue`: T
- `options?`: { validate?: (value: T) => string | null }

**Outputs:**

- `{ value: T, error: string | null, touched: boolean, onChange: (e: React.ChangeEvent) => void, onBlur: (e: React.FocusEvent) => void, setValue: (value: T) => void, setTouched: (touched: boolean) => void }`

### `useInputMask`

Apply input masking  
**Inputs:**

- `mask`: string
- `options?`: { placeholderChar?: string; autofix?: boolean }

**Outputs:**

- `{ maskedValue: string, rawValue: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, onBlur: (e: React.FocusEvent<HTMLInputElement>) => void, setValue: (value: string) => void, inputRef: RefObject<HTMLInputElement> }`

---

## Performance

### `useMemoCompare`

Memoize with custom comparison  
**Inputs:**

- `value`: T
- `compare`: (a: T, b: T) => boolean

**Outputs:**

- `memoizedValue: T`

### `useDebounceCallback`

Debounce function calls  
**Inputs:**

- `callback`: (...args: any[]) => void
- `delay`: number (ms)
- `options?`: { leading?: boolean; trailing?: boolean }

**Outputs:**

- `debouncedFunction: (...args: any[]) => void`

### `useRaf`

Run logic on requestAnimationFrame  
**Inputs:**

- `callback`: (time: DOMHighResTimeStamp) => void

**Outputs:**

- `{ start: () => void, stop: () => void, toggle: () => void, isRunning: boolean }`

### `useIsFirstRender`

Detect initial render  
**Inputs:** None

**Outputs:**

- `isFirstRender: boolean`

### `useRenderCount`

Track render count  
**Inputs:** None

**Outputs:**

- `count: number`

### `useUpdateEffect`

Run effect only on updates  
**Inputs:**

- `effect`: React.EffectCallback
- `deps?`: React.DependencyList

**Outputs:** None (side-effect only)

### `useIsomorphicEffect`

Universal effect for SSR  
**Inputs:** None

**Outputs:**

- `React.EffectCallback` (useLayoutEffect client-side, useEffect server-side)

### `useDeepCompareCallback`

Memoize callbacks with deep comparison  
**Inputs:**

- `callback`: T
- `dependencies`: any[]

**Outputs:**

- `memoizedCallback: T`

---

## Networking

### `useFetch`

Simplified data fetching  
**Inputs:**

- `url`: string
- `options?`: RequestInit

**Outputs:**

- `{ data: any, loading: boolean, error: Error | null, abort: () => void, refetch: () => void }`

### `useWebSocket`

Manage WebSocket connections  
**Inputs:**

- `url`: string
- `options?`: { onOpen?: (event: Event) => void; onClose?: (event: CloseEvent) => void; onError?: (event: Event) => void; reconnect?: boolean; reconnectInterval?: number }

**Outputs:**

- `{ data: any, send: (data: any) => void, readyState: number, lastMessage: MessageEvent | null, connect: () => void, disconnect: () => void }`

---

## Miscellaneous

### `useMutationObserver`

Observe DOM mutations  
**Inputs:**

- `target`: Element
- `callback`: MutationCallback
- `options?`: MutationObserverInit

**Outputs:**

- `{ disconnect: () => void, takeRecords: () => MutationRecord[] }`

### `useLogger`

Log component lifecycle  
**Inputs:**

- `componentName`: string
- `props?`: Record<string, any>

**Outputs:** None (console logging)

### `useRandomId`

Generate accessible unique IDs  
**Inputs:**

- `prefix?`: string

**Outputs:**

- `id: string`

---

# V3 Set

## Simulation & Effects

### `useGravityEffect`

Simulates gravity on elements using CSS transforms  
**Inputs:**

- `ref`: RefObject<HTMLElement>
- `options?`: `{ gravity?: number }`

**Outputs:**

- `cleanup: () => void`

### `useWindBlower`

Applies wind animation to elements  
**Inputs:**

- `ref`: RefObject<HTMLElement>
- `options?`: `{ direction?: 'left' | 'right' | 'up' | 'down'; intensity?: number }`

**Outputs:**

- `cleanup: () => void`

### `useTimeWarp`

Speeds up or slows down UI effects globally  
**Inputs:**

- `multiplier`: number (e.g., 2 = double speed)

**Outputs:**

- `cleanup: () => void`

### `useDimensionShift`

Applies 3D transformation to elements  
**Inputs:**

- `ref`: RefObject<HTMLElement>
- `options?`: `{ rotateX?: number; rotateY?: number; perspective?: number }`

**Outputs:**

- `cleanup: () => void`

### `useDreamSequence`

Applies surreal floating and blur animations  
**Inputs:**

- `ref`: RefObject<HTMLElement>
- `intensity?`: number (0–1)

**Outputs:**

- `stop: () => void`

### `useRetroFilter`

Applies vintage filters like sepia/pixelate  
**Inputs:**

- `ref`: RefObject<HTMLElement>
- `filter`: `'sepia' | 'pixelate' | 'scanlines'`

**Outputs:**

- `cleanup: () => void`

### `useEmojiRain`

Creates falling emoji animations  
**Inputs:**

- `ref`: RefObject<HTMLElement>
- `emojiList`: string[]
- `speed?`: number (default: 20)

**Outputs:**

- `cleanup: () => void`

---

## AI & Prediction

### `useMindReader`

Predicts user's next action based on patterns  
**Inputs:**

- `windowEventTarget?: Window` (default: window)

**Outputs:**

- `Array<{ action: string; confidence: number }>`

### `useAICompanion`

Connects to AI API for chatbot-like interactions  
**Inputs:**

- `endpoint`: string

**Outputs:**

- `{ conversation: Message[], send: (text: string) => void }`

---

## Time Control

### `useTimeTravelState`

Rewind or forward state like a time machine  
**Inputs:**

- `initialValue: T`

**Outputs:**

- `{ state, setState, rewind, forward, canRewind, canForward }`

### `useChronoLoop`

Repeats callback at interval with time multiplier  
**Inputs:**

- `callback: () => void`
- `interval: number`
- `multiplier?`: number

**Outputs:**

- `{ start, stop, isRunning }`

### `useTimeFreeze`

Pauses state updates until unfreezed  
**Inputs:**

- `state: T`
- `freeze: boolean`

**Outputs:**

- `frozenState: T`

### `useChronoDrift`

Applies slow movement to elements over time  
**Inputs:**

- `ref`: RefObject<HTMLElement>
- `duration`: number (in seconds)

**Outputs:**

- `stop: () => void`

---

## Themed UI & Environment

### `useWeatherTheme`

Adjusts app theme based on real-time weather  
**Inputs:**

- `apiKey`: string (your OpenWeatherMap API key)
- `location`: string

**Outputs:**

- `theme: { type: string; colors: { background: string; text: string } }`

### `useMoodLighting`

Changes UI lighting based on mood  
**Inputs:**

- `mood: 'happy' | 'calm' | 'sad' | ...`

**Outputs:**

- `{ background: string; color: string }`

### `useSmelloscope`

Simulates "smell" through UI metaphors  
**Inputs:**

- `scent: string`
- `customScentMap?: Record<string, string>`

**Outputs:**

- `description: string`

---

## Space & Movement

### `useQuantumLeap`

Teleports elements to random positions  
**Inputs:**

- `bounds: { xMin: number; xMax: number; yMin: number; yMax: number }`

**Outputs:**

- `{ pos: { x: number; y: number }, leap: () => void }`

### `useHologram`

Applies holographic 3D look  
**Inputs:**

- `ref`: RefObject<HTMLElement>
- `options?`: `{ rotation?: number; depth?: number }`

**Outputs:**

- `cleanup: () => void`

### `useGalaxyBackground`

Renders animated galaxy/star background  
**Inputs:**

- `canvasRef`: RefObject<HTMLCanvasElement>

**Outputs:**

- `cleanup: () => void`

---

## Fantasy & Surprise

### `useConfettiSurprise`

Triggers confetti animation on event  
**Inputs:**

- `trigger: boolean`

**Outputs:**

- `renderConfetti: () => JSX.Element`

### `useRandomFortune`

Displays random fortunes or quotes  
**Inputs:** None

**Outputs:**

- `fortune: string`

### `useQuantumDice`

Generates unpredictable quantum number  
**Inputs:**

- `sides: number`

**Outputs:**

- `roll: () => Promise<number>`

---

## Meta / Hook Utilities

### `useHookManager`

Orchestrates multiple hooks together  
**Inputs:**

- `hooks: Array<() => any>`

**Outputs:**

- `Array of hook return values`

### `useHookDebugger`

Logs hook updates and internal state  
**Inputs:**

- `label: string`
- `value: any`

**Outputs:** None

---

## UI Behavior & Interactions

### `useGhostMode`

Randomly fades elements in/out  
**Inputs:**

- `ref`: RefObject<HTMLElement>

**Outputs:**

- `cleanup: () => void`

### `useMirrorWorld`

Flips UI horizontally or vertically  
**Inputs:** None

**Outputs:**

- `{ style: React.CSSProperties; flipX: () => void; flipY: () => void }`

### `useChaosMonkey`

Injects chaos into UI for testing  
**Inputs:**

- `ref`: RefObject<HTMLElement>
- `chaosLevel`: number (0–1)

**Outputs:**

- `logs: string[]`

### `useParallelUniverse`

Manages multiple state branches  
**Inputs:**

- `initialValue: T`

**Outputs:**

- `{ branches: T[][]; fork: (index: number, value: T) => void }`

### `useTeleportButton`

Makes buttons dodge the mouse  
**Inputs:**

- `ref`: RefObject<HTMLButtonElement>
- `options?`: `{ distance?: number }`

**Outputs:** None

---

## Bugs Improvement

If you encounter any bugs or issues while using this project, please report them to **taarn.ng@gmail.com**. Your feedback helps us improve and make the project better for everyone.

Thank you for your support!
