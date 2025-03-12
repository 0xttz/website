<script lang="ts">
  import { fade, fly, scale, draw, slide } from 'svelte/transition';
  import { cubicOut, quintOut, elasticOut, backOut, quintInOut } from 'svelte/easing';
  import PageTransition from '$lib/components/PageTransition.svelte';
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';

  interface SocialLink {
    href: string;
    icon: string;
    label: string;
    action: string;
  }

  const socialLinks: SocialLink[] = [
    { href: "https://github.com/0xttz", icon: "/github.svg", label: "GitHub", action: "code" },
    { href: "https://x.com/0xKaramazov", icon: "/twitter.svg", label: "Twitter", action: "discuss" },
    { href: "https://www.linkedin.com/in/lennard-kaye-428103196/", icon: "/linkedin.svg", label: "LinkedIn", action: "connect" },
    { href: "https://lichess.org/@/lfk99", icon: "/lichess.svg", label: "Lichess", action: "play chess" },
    { href: "https://www.goodreads.com/user/show/184384780-lennard-kaye", icon: "/goodreads.svg", label: "Goodreads", action: "read" }
  ];

  let hoveredIndex = -1;
  let contentVisible = false;
  let socialExpanded = false;
  
  const toggleSocials = () => {
    socialExpanded = !socialExpanded;
  };

  onMount(() => {
    // Simpler animation sequence
    setTimeout(() => {
      contentVisible = true;
    }, 400);
  });
</script>

<svelte:head>
  <title>home</title>
  <meta name="description" content="Lennard Kaye - Creating on the frontier of AI innovation" />
</svelte:head>

<div class="page-container">
  <div class="illustration-wrapper">
    <img src="/images/home.png" alt="Illustration of a person reading under a tree" />
  </div>

  {#if contentVisible}
    <div class="content-container" in:fade={{ duration: 800, easing: cubicOut }}>
      <div class="content">
        <p class="greeting" in:fly={{ y: 20, duration: 600, delay: 100, easing: cubicOut }}>
          Hey, I'm
        </p>
        
        <h1 class="name" in:fly={{ y: 30, duration: 800, delay: 200, easing: cubicOut }}>
          Lennard Kaye
        </h1>
        
        <div class="bio-section" in:fly={{ y: 20, duration: 600, delay: 400, easing: cubicOut }}>
          <p class="tagline">Creating at the intersection of <span class="highlight">human potential</span> and <span class="highlight">AI innovation</span>.</p>
          <p class="description">Crafting intelligent systems that amplify creativity, streamline workflows, and solve complex problems.</p>
        </div>
        
        <div class="social-section" in:fly={{ y: 20, duration: 600, delay: 600, easing: cubicOut }}>
          <div class="social-container">
            <p class="social-label">I like to</p>
            <div class="social-links">
              {#each socialLinks as { href, icon, label, action }, i}
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link"
                  class:hovered={hoveredIndex === i}
                  on:mouseenter={() => hoveredIndex = i}
                  on:mouseleave={() => hoveredIndex = -1}
                  in:fly={{ x: -20, duration: 400, delay: 700 + (i * 120), easing: cubicOut }}
                >
                  <div class="social-icon">
                    <img src={icon} alt={label} />
                  </div>
                  <span class="social-action">{action}</span>
                </a>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .page-container {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 200px);
    max-height: calc(100vh - 120px);
    overflow: hidden;
    display: flex;
  }

  .illustration-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
  }
  
  .illustration-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 95% 60%;
    transform: scale(1.05);
  }
  
  .content-container {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }
  
  .content {
    position: absolute;
    top: 2.5rem;
    left: 2.5rem;
    padding: 0;
    max-width: 600px;
  }
  
  .greeting {
    font-size: 1.75rem;
    color: #594a42;
    margin: 0 0 0.25rem 0;
    font-weight: 500;
  }
  
  .name {
    font-size: 5rem;
    margin: 0 0 1.5rem 0;
    letter-spacing: -0.03em;
    line-height: 0.9;
    color: #2c1810;
    background: linear-gradient(135deg, #2c1810 0%, #594a42 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: left;
    z-index: 4;
  }
  
  .bio-section {
    margin-bottom: 1.75rem;
  }
  
  .tagline {
    font-size: 1.9rem;
    line-height: 1.4;
    color: #2c1810;
    margin: 0 0 1rem 0;
    font-weight: 500;
    text-align: left;
  }
  
  .highlight {
    position: relative;
    display: inline-block;
  }
  
  .highlight::after {
    content: '';
    position: absolute;
    bottom: 0.1em;
    left: 0;
    width: 100%;
    height: 0.15em;
    background-color: rgba(89, 74, 66, 0.15);
    z-index: -1;
    border-radius: 2px;
  }
  
  .description {
    font-size: 1.35rem;
    color: #594a42;
    margin: 0;
    line-height: 1.5;
    font-weight: 400;
    text-align: left;
  }
  
  .social-section {
    position: relative;
    margin-top: 1.5rem;
  }
  
  .social-container {
    display: flex;
    align-items: flex-start;
  }
  
  .social-label {
    font-size: 1.4rem;
    font-weight: 600;
    color: #2c1810;
    margin: 0 0.75rem 0 0;
    white-space: nowrap;
  }
  
  .social-links {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .social-link {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.1rem 0;
    transition: all 0.2s ease;
    opacity: 0.8;
    text-decoration: none;
  }
  
  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  .social-link img {
    width: 14px;
    height: 14px;
    object-fit: contain;
    filter: opacity(0.8);
    transition: all 0.2s ease;
  }
  
  .social-action {
    font-size: 1.1rem;
    color: #594a42;
    transition: all 0.2s ease;
  }
  
  .social-link:hover, 
  .social-link.hovered {
    transform: translateX(3px);
    opacity: 1;
  }
  
  .social-link:hover .social-icon, 
  .social-link.hovered .social-icon {
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 8px rgba(44, 24, 16, 0.1);
  }
  
  .social-link:hover img, 
  .social-link.hovered img {
    filter: opacity(1);
  }
  
  .social-link:hover .social-action, 
  .social-link.hovered .social-action {
    color: #2c1810;
    font-weight: 500;
  }
  
  @media (max-width: 768px) {
    .content {
      top: 2rem;
      left: 2rem;
      max-width: 500px;
    }
    
    .name {
      font-size: 4.5rem;
      margin-bottom: 1.25rem;
    }
    
    .tagline {
      font-size: 1.7rem;
    }
    
    .description {
      font-size: 1.25rem;
    }
    
    .social-container {
      align-items: flex-start;
    }
    
    .social-label {
      font-size: 1.3rem;
    }
    
    .social-action {
      font-size: 1rem;
    }
  }
  
  @media (max-width: 600px) {
    .content {
      top: 1.5rem;
      left: 1.5rem;
      max-width: 90%;
    }
    
    .illustration-wrapper img {
      object-position: 65% 60%;
    }
    
    .name {
      font-size: 3.5rem;
      margin-bottom: 1rem;
    }
    
    .greeting {
      font-size: 1.5rem;
    }
    
    .tagline {
      font-size: 1.4rem;
    }
    
    .description {
      font-size: 1.15rem;
    }
    
    .bio-section {
      margin-bottom: 1.5rem;
    }
    
    .social-container {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .social-label {
      font-size: 1.2rem;
      margin: 0 0 0.5rem 0;
    }
    
    .social-icon {
      width: 22px;
      height: 22px;
    }
    
    .social-link img {
      width: 12px;
      height: 12px;
    }
    
    .social-action {
      font-size: 0.95rem;
    }
  }
</style> 