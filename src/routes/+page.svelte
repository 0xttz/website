<script lang="ts">
  import { dev } from '$app/environment';
  import { fade, fly } from 'svelte/transition';
  import type { ComponentType } from 'svelte';
  import { 
    Github, 
    Twitter, 
    Linkedin
  } from 'lucide-svelte';

  interface SocialLink {
    href: string;
    icon: string;
    label: string;
  }

  const socialLinks: SocialLink[] = [
    { href: "https://github.com/0xttz", icon: "/github.svg", label: "GitHub" },
    { href: "https://x.com/0xKaramazov", icon: "/twitter.svg", label: "Twitter" },
    { href: "https://www.linkedin.com/in/lennard-kaye-428103196/", icon: "/linkedin.svg", label: "LinkedIn" },
    { href: "https://lichess.org/@/lfk99", icon: "/lichess.svg", label: "Lichess" },
    { href: "https://www.goodreads.com/user/show/184384780-lennard-kaye", icon: "/goodreads.svg", label: "Goodreads" }
  ];

  let hoveredIndex = -1;
</script>

<svelte:head>
  <title>Lennard Kaye</title>
  <meta name="description" content="Personal digital garden - thoughts, projects, recommendations" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="container" in:fade={{ duration: 300, delay: 150 }}>
  <div class="illustration" in:fly={{ y: 20, duration: 400, delay: 150 }}>
    <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" stroke="#594a42" stroke-opacity="0.12" stroke-width="1.5"
        d="M100,20 C130,20 150,40 150,70 C150,85 135,95 120,95 C105,95 90,85 90,70 C90,55 105,45 120,45" />
      <path fill="none" stroke="#594a42" stroke-opacity="0.12" stroke-width="1.5"
        d="M70,30 C100,30 120,50 120,80 C120,95 105,105 90,105 C75,105 60,95 60,80 C60,65 75,55 90,55" />
    </svg>
  </div>
  <h1 class="home">Lennard Kaye</h1>
  <div class="description" in:fly={{ y: 20, duration: 400, delay: 250 }}>
    <p>Creating agentic systems to augment human potential - focused on transforming both enterprise workflows and personal productivity.</p>
    <p>Exploring the future through continuous building and learning.</p>
  </div>
  
  <div class="social-links" in:fly={{ y: 20, duration: 400, delay: 350 }}>
    {#each socialLinks as { href, icon, label }, i}
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
          <img src={icon} alt={label} />
        </div>
        <span class="tooltip">{label}</span>
      </a>
    {/each}
  </div>
</div>

<style>


  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    text-align: center;
    padding-top: 1rem;
  }

  .description {
    color: #594a42;
    margin-bottom: 3.5rem;
    line-height: 1.6;
    font-weight: 400;
    max-width: 32rem;
    position: relative;
  }

  .description p {
    margin: 0.5rem 0;
  }

  .social-links {
    display: flex;
    gap: 2rem;
    align-items: center;
    position: relative;
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
    opacity: 0.4;
    transform: translateY(0);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .social-link.hovered {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  .icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: opacity(0.8);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .social-link.hovered .icon img {
    filter: opacity(1);
  }

  .tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.4rem 0.6rem;
    background: rgba(44, 24, 16, 0.9);
    color: #f5f5f0;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: all 0.2s ease;
    margin-top: 0.5rem;
    display: block;
  }

  .social-link.hovered .tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .tooltip::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: rgba(44, 24, 16, 0.9);
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 2.5rem !important;
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
    width: 400px;
    height: 200px;
    margin: 0 auto 1rem;
    opacity: 0.9;
    transition: all 0.3s ease;
  }

  .illustration:hover path {
    stroke: #ff7e33;
    stroke-opacity: 0.2;
  }

</style>
