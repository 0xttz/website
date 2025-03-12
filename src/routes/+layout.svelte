<script lang="ts">
  import { page } from '$app/stores';
  import { fade, fly, crossfade, slide } from 'svelte/transition';
  import { cubicInOut, cubicOut } from 'svelte/easing';
  import { navigationDirection, currentPath, previousPath, getAnimationProps } from '$lib/stores';
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut as cubicOutMotion } from 'svelte/easing';
  import { preloadCode, preloadData } from '$app/navigation';

  export let data;

  // Get standard animation properties with reduced duration
  const animations = getAnimationProps(250, 0);
  
  // Create crossfade animation with direction awareness
  const [send, receive] = crossfade({
    duration: animations.duration,
    easing: cubicInOut,
    fallback(node, params) {
      // Simplified animation that only uses opacity to avoid transform issues
      return {
        duration: animations.duration,
        easing: cubicInOut,
        css: (t) => `
          position: absolute;
          width: 100%;
          opacity: ${t};
          pointer-events: ${t === 1 ? 'all' : 'none'};
        `
      };
    }
  });

  // Update path stores when URL changes
  $: if (data.url) {
    previousPath.set($currentPath);
    currentPath.set(data.url);
  }

  $: isActive = (path: string) => {
    // Check if the current pathname matches exactly or if it's a sub-route of the path
    // e.g. /projects/project-1 should still show projects as active
    return $page.url.pathname === path || 
           (path !== '/' && $page.url.pathname.startsWith(path + '/'));
  };
  
  // Function to get position index from path
  function getPositionFromPath(path: string): number {
    if (path.startsWith('/projects/') || path === '/projects') return 0;
    if (path === '/') return 1;
    if (path.startsWith('/thoughts')) return 2;
    if (path.startsWith('/recommendations')) return 3;
    return 1; // Default to home
  }
  
  // Initialize the underline position based on the current path
  const initialPosition = getPositionFromPath($page.url.pathname);
  
  // Create a tweened store for the underline position with the correct initial value
  const underlinePosition = tweened(initialPosition, {
    duration: 250,
    easing: cubicOut
  });
  
  // Track if this is the initial page load
  let isInitialLoad = true;
  
  // Update the underline position based on active link
  $: {
    const newPosition = getPositionFromPath($page.url.pathname);
    
    // Only animate if it's not the initial load
    if (!isInitialLoad) {
      // Start the underline animation immediately when navigation begins
      // This ensures it's synchronized with the page transition
      underlinePosition.set(newPosition, { 
        duration: 250, // Match page transition duration exactly
        easing: cubicOut // Use the same easing as page transitions
      });
    } else {
      isInitialLoad = false;
    }
  }
  
  // Add scroll detection for header styling
  let scrolled = false;
  
  // Preload pages on hover
  function preloadPage(path: string) {
    // Use both methods for maximum preloading
    preloadCode(path);
    preloadData(path);
  }
  
  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Preload all main navigation pages on initial load for instant navigation
    setTimeout(() => {
      // Delay preloading slightly to prioritize current page rendering
      preloadPage('/projects');
      preloadPage('/');
      preloadPage('/thoughts');
      preloadPage('/recommendations');
    }, 300);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div class="background">
  <div class="gradient"></div>
</div>

<nav class:scrolled>
  <div class="nav-container">
    <div class="nav-links">
      <div class="nav-items">
        <div class="underline-container">
          <div class="flowing-underline" style="transform: translateX(calc({$underlinePosition} * (100% + 3rem)))"></div>
        </div>
        <a href="/projects" class:active={isActive('/projects')} on:mouseenter={() => preloadPage('/projects')}>
          <span class="text">projects</span>
        </a>
        <a href="/" class:active={isActive('/')} on:mouseenter={() => preloadPage('/')}>
          <span class="text">home</span>
        </a>
        <a href="/thoughts" class:active={isActive('/thoughts')} on:mouseenter={() => preloadPage('/thoughts')}>
          <span class="text">thoughts</span>
        </a>
        <a href="/recommendations" class:active={isActive('/recommendations')} on:mouseenter={() => preloadPage('/recommendations')}>
          <span class="text">recommendations</span>
        </a>
      </div>
    </div>
  </div>
</nav>

<div class="content-wrapper">
  <main>
    <slot />
  </main>
</div>

<style>
  :global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f5f5f0;
  }

  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f5f5f0;
    z-index: -2;
  }

  .gradient {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, rgba(89, 74, 66, 0.03) 0%, rgba(44, 24, 16, 0.01) 100%);
    z-index: -1;
  }

  nav {
    position: sticky;
    top: 0;
    padding: 1.5rem 0;
    z-index: 10;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  nav.scrolled {
    background: transparent;
    padding: 0.75rem 0;
  }
  
  nav.scrolled .nav-container {
    background: white;
    border-radius: 2rem;
    padding: 0.75rem 1.25rem;
    box-shadow: 0 1px 3px rgba(44, 24, 16, 0.04), 0 2px 8px rgba(44, 24, 16, 0.04);
    border: 1px solid rgba(89, 74, 66, 0.05);
    transform: translateY(0);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nav-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1rem;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nav-links {
    display: flex;
    justify-content: center;
  }

  .nav-items {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
    width: 100%;
    will-change: transform;
  }

  .underline-container {
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    z-index: 0;
  }

  .flowing-underline {
    position: absolute;
    width: calc((100% - 9rem) / 4);  /* Total width minus all gaps (3rem * 3) divided by 4 */
    height: 2px;
    background: linear-gradient(90deg, #2c1810 0%, #594a42 100%);
    border-radius: 2px;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
  }

  a {
    position: relative;
    color: #594a42;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s ease;
    padding: 0.25rem 0;
    text-align: center;
    line-height: 1.2;
    height: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: -0.01em;
    font-weight: 400;
  }

  a:hover {
    color: #2c1810;
  }

  .text {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .active {
    color: #2c1810;
    font-weight: 500;
  }

  @keyframes flowIn {
    0% {
      transform: scaleX(0);
      opacity: 0;
    }
    100% {
      transform: scaleX(1);
      opacity: 1;
    }
  }

  @keyframes flowOut {
    0% {
      transform: scaleX(1);
      opacity: 1;
    }
    100% {
      transform: scaleX(0);
      opacity: 0;
    }
  }

  :global(.underline-enter) {
    animation: flowIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  :global(.underline-exit) {
    animation: flowOut 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .content-wrapper {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    min-height: calc(100vh - 120px);
    max-height: calc(100vh - 120px);
    overflow: visible;
    padding: 0 1rem;
  }

  main {
    position: absolute;
    top: 0;
    left: 1rem;
    right: 1rem;
    height: 100%;
    padding: 0;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(44, 24, 16, 0.05);
    border: 1px solid rgba(44, 24, 16, 0.1);
  }

  @media (max-width: 600px) {
    .nav-items {
      gap: 1.5rem;
    }

    .flowing-underline {
      width: calc((100% - 4.5rem) / 4);  /* Total width minus all gaps (1.5rem * 3) divided by 4 */
    }
    
    nav.scrolled .nav-container {
      border-radius: 1.5rem;
      padding: 0.5rem 1rem;
    }
  }

  :global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f5f5f0;
  }

  :global(h1) {
    font-size: 2.5rem;
    color: #2c1810;
    margin-bottom: 2rem;
    font-weight: 700;
    text-shadow: 
      0 1px 1px rgba(44, 24, 16, 0.05),
      0 2px 3px rgba(44, 24, 16, 0.05);
    text-align: center;
    display: block;
    line-height: 1.2;
  }

  :global(h1.home) {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
    background: linear-gradient(180deg, #2c1810 0%, #2c1810ee 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 600px) {
    :global(h1) {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }

    :global(h1.home) {
      font-size: 2.5rem;
    }
  }
</style> 