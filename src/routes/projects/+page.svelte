<script lang="ts">
  import { fade, fly, scale } from 'svelte/transition';
  import { cubicOut, elasticOut, backOut, backIn } from 'svelte/easing';
  import type { Project, ProjectFilter } from '$lib/types';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import PageTransition from '$lib/components/PageTransition.svelte';
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  
  // Sample projects data - replace with actual data source
  const projects: Project[] = [
    {
      id: 'project-1',
      title: 'AI-Powered Analytics Dashboard',
      subtitle: 'Real-time business intelligence with machine learning insights',
      date: '2023-12-10',
      tags: ['AI', 'React', 'TypeScript', 'Python'],
      coverImage: '/images/projects/project1.png',
      architectureImage: '/images/projects/architecture1.svg',
      content: '# Project details go here'
    },
    {
      id: 'project-2',
      title: 'E-commerce Recommendation Engine',
      subtitle: 'Personalized shopping experience using collaborative filtering',
      date: '2023-10-05',
      tags: ['Machine Learning', 'Node.js', 'MongoDB'],
      coverImage: '/images/projects/project2.png',
      content: '# Project details go here'
    },
    {
      id: 'project-3',
      title: 'Blockchain-Based Document Verification',
      subtitle: 'Secure document verification using distributed ledger technology',
      date: '2023-08-15',
      tags: ['Blockchain', 'Solidity', 'React', 'TypeScript'],
      coverImage: '/images/projects/project3.png',
      content: '# Project details go here'
    },
    // Add more sample projects as needed
  ];
  
  // Available filters based on project tags
  let allTags = [...new Set(projects.flatMap(p => p.tags))];
  let activeFilters: string[] = [];
  let filtersElement: HTMLElement;
  let showScrollIndicator = false;
  
  // Track which button has the ripple animation
  let rippleFilter: string | null = null;
  
  // Sort tags with active ones first
  $: sortedTags = [...allTags].sort((a, b) => {
    const aActive = activeFilters.includes(a);
    const bActive = activeFilters.includes(b);
    if (aActive && !bActive) return -1;
    if (!aActive && bActive) return 1;
    return 0;
  });
  
  $: filteredProjects = projects.filter(project => {
    if (activeFilters.length === 0) return true;
    return activeFilters.some(filter => project.tags.includes(filter));
  });
  
  // Sort projects by date (newest first)
  $: sortedProjects = [...filteredProjects].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Calculate project count for each tag
  $: tagCounts = allTags.reduce((counts, tag) => {
    counts[tag] = projects.filter(project => project.tags.includes(tag)).length;
    return counts;
  }, {} as Record<string, number>);
  
  function toggleFilter(filter: string) {
    // Set ripple animation
    rippleFilter = filter;
    
    // Toggle filter immediately to improve responsiveness
    if (activeFilters.includes(filter)) {
      activeFilters = activeFilters.filter(f => f !== filter);
    } else {
      activeFilters = [...activeFilters, filter];
    }
    
    // Clear ripple after animation
    setTimeout(() => {
      rippleFilter = null;
    }, 300);
    
    // Scroll to the beginning of the filters
    if (filtersElement) {
      filtersElement.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }
    
    checkScrollIndicator();
  }
  
  function clearFilters() {
    activeFilters = [];
  }
  
  function checkScrollIndicator() {
    if (filtersElement) {
      showScrollIndicator = filtersElement.scrollWidth > filtersElement.clientWidth;
    }
  }
  
  onMount(() => {
    checkScrollIndicator();
    window.addEventListener('resize', checkScrollIndicator);
    
    return () => {
      window.removeEventListener('resize', checkScrollIndicator);
    };
  });
</script>

<svelte:head>
  <title>projects</title>
  <meta name="description" content="A showcase of my projects and work" />
</svelte:head>

<PageTransition let:animationProps>
  <div class="content">
    <div class="filters-container" in:fly={animationProps.getStaggeredFly(0)}>
      <div class="filters" bind:this={filtersElement} on:scroll={checkScrollIndicator}>
        {#each sortedTags as tag}
          <button 
            class:active={activeFilters.includes(tag)} 
            on:click={() => toggleFilter(tag)}
          >
            <div class="filter-content">
              <span class="filter-text">{tag}</span>
              {#if activeFilters.includes(tag)}
                <span class="filter-active-indicator" in:scale={{duration: 200, start: 0, opacity: 0, easing: backOut}}></span>
              {/if}
              {#if rippleFilter === tag}
                <span class="ripple" in:scale={{duration: 400, start: 0.5, opacity: 1, easing: cubicOut}}></span>
              {/if}
            </div>
          </button>
        {/each}
      </div>
      {#if showScrollIndicator}
        <div class="scroll-indicator"></div>
      {/if}
    </div>
    
    <div class="projects-container" in:fly={animationProps.getStaggeredFly(1)}>
      <div class="projects-list">
        {#each sortedProjects as project, i (project.id)}
          <div 
            class="project-link-wrapper"
            in:fade={{ 
              duration: 200, 
              delay: 100 + (i * 30),
              easing: cubicOut
            }}
            animate:flip={{ duration: 200 }}
          >
            <a href={`/projects/${project.id}`} class="project-link">
              <ProjectCard 
                {project} 
                index={i}
                baseDelay={100}
              />
            </a>
          </div>
        {/each}
        
        {#if sortedProjects.length === 0}
          <div class="no-projects" in:fade={{ duration: 200, delay: 150 }}>
            <p>No projects found matching the selected filter.</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</PageTransition>

<style>
  .content {
    max-width: 900px;
    margin: 0 auto;
    padding: 1.5rem 0;
    will-change: contents;
  }
  
  .filters-container {
    width: 100%;
    margin-bottom: 1rem;
    position: relative;
    overflow: hidden;
    padding: 0.5rem 0;
  }
  
  .scroll-indicator {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 30px;
    pointer-events: none;
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 70%);
    z-index: 1;
  }
  
  .filters {
    display: flex;
    gap: 0.5rem;
    padding: 0.25rem 0;
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    white-space: nowrap;
    width: 100%;
    justify-content: flex-start;
    will-change: transform;
  }
  
  .filters::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  .filters button {
    background: none;
    border: 1px solid rgba(89, 74, 66, 0.15);
    border-radius: 2rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
    color: #594a42;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    will-change: transform, background-color, box-shadow;
  }
  
  .filter-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .filter-text {
    position: relative;
    z-index: 2;
  }
  
  .filter-active-indicator {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
    top: -8px;
    right: -8px;
    opacity: 0.8;
  }
  
  .ripple {
    position: absolute;
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(89, 74, 66, 0.15) 0%, rgba(89, 74, 66, 0) 70%);
    border-radius: 50%;
    z-index: 1;
    pointer-events: none;
    will-change: transform, opacity;
  }
  
  .active .ripple {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 70%);
  }
  
  .filters button:hover {
    background-color: rgba(89, 74, 66, 0.05);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(44, 24, 16, 0.05);
  }
  
  .filters button:active {
    transform: translateY(0);
  }
  
  .filters button.active {
    background: linear-gradient(90deg, #594a42 0%, #2c1810 100%);
    color: white;
    border-color: transparent;
    box-shadow: 0 2px 4px rgba(44, 24, 16, 0.1);
    transform: translateY(-1px) scale(1.05);
  }
  
  .filters button.active:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 3px 6px rgba(44, 24, 16, 0.15);
  }
  
  .projects-container {
    width: 100%;
    /* Force GPU acceleration */
    transform: translateZ(0);
    will-change: contents;
  }
  
  .projects-list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .project-link-wrapper {
    /* Maintain consistent dimensions during transitions */
    transform: translateZ(0);
    backface-visibility: hidden;
    margin-bottom: 1.5rem;
    height: 160px; /* Match ProjectCard's fixed height */
    position: relative;
    box-sizing: border-box;
    will-change: transform, opacity;
  }
  
  .project-link {
    text-decoration: none;
    color: inherit;
    display: block;
    height: 100%;
    /* Prevent font rendering differences */
    -webkit-font-smoothing: antialiased;
  }
  
  .no-projects {
    text-align: center;
    padding: 3rem 0;
    color: #594a42;
  }
  
  @media (max-width: 768px) {
    .content {
      padding: 0 1rem;
    }
    
    .filters-container {
      margin-bottom: 1.25rem;
    }
    
    .project-link-wrapper {
      height: auto;
      min-height: 300px;
    }
  }
  
  @media (max-width: 480px) {
    .filters button {
      font-size: 0.8rem;
      padding: 0.35rem 0.7rem;
    }
    
    .filters-container {
      padding: 0.75rem 0.75rem 0.5rem;
    }
  }
</style>