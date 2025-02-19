<script lang="ts">
  import { fade, fly } from 'svelte/transition';
</script>

<svelte:head>
  <title>projects</title>
  <meta name="description" content="A list of my projects" />
</svelte:head>

<div class="container" in:fade={{ duration: 300, delay: 150 }}>
  <div class="content" in:fly={{ y: 20, duration: 400, delay: 250 }}>
    <div class="illustration">
      <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" stroke="#594a42" stroke-opacity="0.08" stroke-width="1.5"
          d="M60,50 C60,35 75,20 90,20 C105,20 120,35 120,50 C120,65 105,80 90,80 C75,80 60,65 60,50" />
        <path fill="none" stroke="#594a42" stroke-opacity="0.08" stroke-width="1.5"
          d="M80,50 C80,40 90,30 100,30 C110,30 120,40 120,50 C120,60 110,70 100,70 C90,70 80,60 80,50" />
        <path fill="none" stroke="#594a42" stroke-opacity="0.08" stroke-width="1.5"
          d="M100,50 C100,45 105,40 110,40 C115,40 120,45 120,50 C120,55 115,60 110,60 C105,60 100,55 100,50" />
      </svg>
    </div>
    <h1>Projects</h1>
    <div class="placeholder">
      <p>Work in progress.</p>
    </div>
  </div>
</div>

<style>
  .container {
    padding: 2rem 0;
  }

  .content {
    text-align: center;
  }

  .illustration {
    width: 400px;
    height: 180px;
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
</style> 