<script lang="ts">
  import { page } from '$app/stores';
  import { fade, fly, crossfade, slide } from 'svelte/transition';
  import { cubicInOut, cubicOut } from 'svelte/easing';

  export let data;

  const [send, receive] = crossfade({
    duration: 200,
    easing: cubicInOut,
    fallback(node, params) {
      const direction = getDirection(data.url);
      const dx = direction === 'next' ? 100 : -100;
      
      return {
        duration: 200,
        easing: cubicInOut,
        css: (t, u) => `
          position: absolute;
          width: 100%;
          opacity: ${t};
          transform: translateX(${dx * u}%) translateZ(0);
          pointer-events: ${t === 1 ? 'all' : 'none'};
          backface-visibility: hidden;
        `
      };
    }
  });

  let currentPath = data.url;
  let previousPath = data.url;

  $: if (data.url !== currentPath) {
    previousPath = currentPath;
    currentPath = data.url;
  }

  const navOrder = {
    '/projects': 0,
    '/': 1,
    '/thoughts': 2,
    '/recommendations': 3
  } as const;

  function getDirection(path: string) {
    const current = navOrder[$page.url.pathname as keyof typeof navOrder] ?? 0;
    const previous = navOrder[previousPath as keyof typeof navOrder] ?? 0;
    return current > previous ? 'next' : 'prev';
  }

  $: isActive = (path: string) => $page.url.pathname === path;
</script>

<div class="background">
  <div class="gradient"></div>
</div>

<nav>
  <div class="nav-container">
    <div class="nav-links">
      <div class="nav-items">
        <div class="underline-container">
          <div class="flowing-underline" style="transform: translateX(calc({
            isActive('/projects') ? '0' : 
            isActive('/') ? '100% + 3rem' : 
            isActive('/thoughts') ? '200% + 6rem' : 
            '300% + 9rem'
          }))"></div>
        </div>
        <a href="/projects" class:active={isActive('/projects')}>
          <span class="text">projects</span>
        </a>
        <a href="/" class:active={isActive('/')}>
          <span class="text">home</span>
        </a>
        <a href="/thoughts" class:active={isActive('/thoughts')}>
          <span class="text">thoughts</span>
        </a>
        <a href="/recommendations" class:active={isActive('/recommendations')}>
          <span class="text">recommendations</span>
        </a>
      </div>
    </div>
  </div>
</nav>

<div class="content-wrapper">
  {#key data.url}
    <main 
      in:receive={{key: data.url}}
      out:send={{key: data.url}}
    >
      <slot />
    </main>
  {/key}
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
    padding: 2rem 0;
    z-index: 10;
    background: transparent;
    backdrop-filter: none;
  }

  .nav-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
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
    transition: transform 0.25s cubic-bezier(0.65, 0, 0.35, 1);
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
    animation: flowIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  :global(.underline-exit) {
    animation: flowOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .content-wrapper {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    min-height: calc(100vh - 120px);
    overflow: visible;
    padding: 0 1rem;
  }

  main {
    position: absolute;
    top: 0;
    left: 1rem;
    right: 1rem;
    padding: 2rem;
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