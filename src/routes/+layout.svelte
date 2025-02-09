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
          transform: translateX(${dx * u}%);
          pointer-events: ${t === 1 ? 'all' : 'none'}
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
        <a href="/projects" class:active={isActive('/projects')}>
          <span class="text">projects</span>
          {#if isActive('/projects')}
            <div class="underline" transition:slide={{ duration: 200, easing: cubicOut }}></div>
          {/if}
        </a>
        <a href="/" class:active={isActive('/')}>
          <span class="text">home</span>
          {#if isActive('/')}
            <div class="underline" transition:slide={{ duration: 200, easing: cubicOut }}></div>
          {/if}
        </a>
        <a href="/thoughts" class:active={isActive('/thoughts')}>
          <span class="text">thoughts</span>
          {#if isActive('/thoughts')}
            <div class="underline" transition:slide={{ duration: 200, easing: cubicOut }}></div>
          {/if}
        </a>
        <a href="/recommendations" class:active={isActive('/recommendations')}>
          <span class="text">recommendations</span>
          {#if isActive('/recommendations')}
            <div class="underline" transition:slide={{ duration: 200, easing: cubicOut }}></div>
          {/if}
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
    background: rgba(245, 245, 240, 0.8);
    backdrop-filter: blur(10px);
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

  a {
    position: relative;
    color: #594a42;
    text-decoration: none;
    font-size: 1rem;
    transition: all 0.3s ease;
    padding: 0.5rem 0;
    text-align: center;
  }

  a:hover {
    color: #2c1810;
  }

  .text {
    position: relative;
    z-index: 1;
  }

  .underline {
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #2c1810 0%, #594a42 100%);
    border-radius: 2px;
  }

  .active {
    color: #2c1810;
  }

  .content-wrapper {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    min-height: calc(100vh - 120px);
    overflow-x: hidden;
  }

  main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 2rem 1rem;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(44, 24, 16, 0.05);
    border: 1px solid rgba(44, 24, 16, 0.1);
    will-change: transform;
  }

  @media (max-width: 600px) {
    .nav-items {
      gap: 1.5rem;
    }
  }
</style> 