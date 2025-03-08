<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import PageTransition from '$lib/components/PageTransition.svelte';
</script>

<svelte:head>
  <title>thoughts</title>
  <meta name="description" content="My collection of thoughts and writings" />
</svelte:head>

<PageTransition let:animationProps>
  <div class="content">
    <div class="illustration" in:fly={animationProps.getStaggeredFly(0)}>
      <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" stroke="#594a42" stroke-opacity="0.08" stroke-width="1.5"
          d="M40,80 C60,80 80,60 80,40 C80,20 100,20 120,40 C140,60 160,60 180,40" />
        <path fill="none" stroke="#594a42" stroke-opacity="0.08" stroke-width="1.5"
          d="M20,60 C40,60 60,40 60,20 C60,0 80,0 100,20 C120,40 140,40 160,20" />
      </svg>
    </div>
    
    <h1 in:fly={animationProps.getStaggeredFly(1)}>Thoughts</h1>
    
    <div class="placeholder" in:fly={animationProps.getStaggeredFly(2)}>
      <p>My collection of thoughts and writings will be added soon.</p>
    </div>
  </div>
</PageTransition>

<style>
  .content {
    text-align: center;
    padding: 2rem 0;
  }

  .illustration {
    width: 400px;
    height: 170px;
    margin: 0 auto 1rem;
    opacity: 0.9;
    transition: all 0.3s ease;
  }

  .illustration:hover path {
    stroke: #ff7e33;
    stroke-opacity: 0.2;
  }

  h1 {
    margin-bottom: 2rem;
  }

  .placeholder {
    color: #594a42;
    line-height: 1.6;
  }

  .subtitle {
    margin-top: 1rem;
    opacity: 0.8;
  }

  a {
    color: inherit;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
    transition: opacity 0.2s ease;
  }

  a:hover {
    opacity: 0.7;
  }
</style> 