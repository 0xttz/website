<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { getAnimationProps, navigationDirection } from '$lib/stores';
  import { onMount } from 'svelte';

  // Reduced durations for crisper transitions
  export let duration: number = 250;
  export let baseFadeDuration: number = 180;
  export let baseDelay: number = 0;
  export let staggerDelay: number = 30;
  export let easing = cubicOut;
  
  // Get animation properties
  const animations = getAnimationProps(duration, baseDelay);
  
  // Derived store for x and y direction animation
  const xOffset = animations.getX();
  const yOffset = animations.getY();
  
  // Animation properties to pass to child components via slot props
  const animationProps = {
    fade: {
      duration: baseFadeDuration, 
      delay: baseDelay,
      easing
    },
    getStaggeredFly: (index: number = 0, multiplier: number = 1) => ({
      x: $xOffset * multiplier,
      y: $navigationDirection.direction === 'vertical' ? $yOffset * multiplier : 0,
      duration,
      delay: baseDelay + (index * staggerDelay),
      easing
    }),
    getCardFly: (index: number = 0) => ({
      x: $xOffset,
      y: 0,
      duration,
      delay: baseDelay + 50 + (index * staggerDelay),
      easing
    }),
    getContainerFade: (extraDelay: number = 0) => ({
      duration: baseFadeDuration,
      delay: baseDelay + extraDelay,
      easing
    })
  };
</script>

<div class="page-container" in:fade={animationProps.fade}>
  <slot {animationProps} />
</div>

<style>
  .page-container {
    display: contents;
    position: relative;
    width: 100%;
    /* Optimize for animations */
    will-change: transform, opacity;
    transform: translateZ(0);
    -webkit-font-smoothing: antialiased;
    backface-visibility: hidden;
  }
</style> 