<script lang="ts">
  import { dev } from '$app/environment';
  import { fade, fly } from 'svelte/transition';
  import type { ComponentType } from 'svelte';
  import { 
    Github, 
    Twitter, 
    Linkedin,
    Swords,
    BookOpen
  } from 'lucide-svelte';

  interface SocialLink {
    href: string;
    icon: ComponentType;
    label: string;
  }

  const socialLinks: SocialLink[] = [
    { href: "https://github.com/0xttz", icon: Github, label: "GitHub" },
    { href: "https://x.com/0xKaramazov", icon: Twitter, label: "Twitter" },
    { href: "https://www.linkedin.com/in/lennard-kaye-428103196/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://lichess.org/@/lfk99", icon: Swords, label: "Lichess" },
    { href: "https://www.goodreads.com/user/show/184384780-lennard-kaye", icon: BookOpen, label: "Goodreads" }
  ];

  let hoveredIndex = -1;
</script>

<svelte:head>
  <title>Lennard Kaye</title>
  <meta name="description" content="Personal portfolio and blog" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="container" in:fade={{ duration: 300, delay: 150 }}>
  <div class="illustration" in:fly={{ y: 20, duration: 400, delay: 150 }}>
    <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" stroke="#594a42" stroke-opacity="0.08" stroke-width="1.5"
        d="M100,20 C130,20 150,40 150,70 C150,85 135,95 120,95 C105,95 90,85 90,70 C90,55 105,45 120,45" />
      <path fill="none" stroke="#594a42" stroke-opacity="0.08" stroke-width="1.5"
        d="M70,30 C100,30 120,50 120,80 C120,95 105,105 90,105 C75,105 60,95 60,80 C60,65 75,55 90,55" />
    </svg>
  </div>
  <h1 in:fly={{ y: 20, duration: 400, delay: 150 }}>Lennard Kaye</h1>
  <div class="description" in:fly={{ y: 20, duration: 400, delay: 250 }}>
    <p>Passionate about the world, AI and <a href="https://x.com/karpathy/status/1886192184808149383" target="_blank" rel="noopener noreferrer">vibe coding</a>.</p>
    <p>Curious minds welcome — Please reach out!</p>
  </div>
  
  <div class="social-links" in:fly={{ y: 20, duration: 400, delay: 350 }}>
    {#each socialLinks as { href, icon: Icon, label }, i}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
        class:hovered={hoveredIndex === i}
        on:mouseenter={() => hoveredIndex = i}
        on:mouseleave={() => hoveredIndex = -1}
      >
        <div class="icon">
          <svelte:component this={Icon} />
        </div>
        <span class="tooltip">{label}</span>
      </a>
    {/each}
  </div>
</div>

<style>
  :global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f5f5f0;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    text-align: center;
    padding-top: 2rem;
  }

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    color: #2c1810;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-shadow: 
      0 1px 1px rgba(44, 24, 16, 0.05),
      0 2px 3px rgba(44, 24, 16, 0.05);
    background: linear-gradient(180deg, #2c1810 0%, #2c1810ee 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .description {
    color: #594a42;
    margin-bottom: 3rem;
    line-height: 1.6;
    font-weight: 400;
  }

  .description p {
    margin: 0.5rem 0;
  }

  .social-links {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .social-link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: #2c1810;
    padding: 0;
    opacity: 0.5;
    transform: translateY(0);
    transition: all 0.2s ease;
  }

  .social-link.hovered {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .icon {
    width: 24px;
    height: 24px;
  }

  .tooltip {
    display: none;
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 2.5rem;
    }

    .social-links {
      gap: 1.5rem;
    }

    .social-link {
      width: 20px;
      height: 20px;
    }

    .icon {
      width: 20px;
      height: 20px;
    }
  }

  .illustration {
    width: 200px;
    height: 100px;
    margin: 0 auto 1rem;
    opacity: 0.9;
    transition: all 0.3s ease;
  }

  .illustration:hover path {
    stroke: #ff7e33;
    stroke-opacity: 0.2;
  }

  .description a {
    color: inherit;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
    transition: all 0.2s ease;
  }

  .description a:hover {
    opacity: 0.8;
    color: #ff7e33;
  }
</style>
