<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import type { Project, ProjectFilter } from '$lib/types';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import PageTransition from '$lib/components/PageTransition.svelte';
  
  // Sample projects data - replace with actual data source
  const projects: Project[] = [
    {
      id: 'project-1',
      title: 'AI-Powered Analytics Dashboard',
      subtitle: 'Real-time business intelligence with machine learning insights',
      date: '2023-12-10',
      tags: ['AI', 'React', 'TypeScript', 'Python'],
      coverImage: '/static/images/projects/project1.jpg',
      architectureImage: '/static/images/projects/architecture1.svg',
      content: '# Project details go here'
    },
    {
      id: 'project-2',
      title: 'E-commerce Recommendation Engine',
      subtitle: 'Personalized shopping experience using collaborative filtering',
      date: '2023-10-05',
      tags: ['Machine Learning', 'Node.js', 'MongoDB'],
      coverImage: '/static/images/projects/project2.jpg',
      content: '# Project details go here'
    },
    {
      id: 'project-3',
      title: 'Blockchain-Based Document Verification',
      subtitle: 'Secure document verification using distributed ledger technology',
      date: '2023-08-15',
      tags: ['Blockchain', 'Solidity', 'React', 'TypeScript'],
      coverImage: '/static/images/projects/project3.jpg',
      content: '# Project details go here'
    },
    // Add more sample projects as needed
  ];
  
  // Available filters based on project tags
  let allTags = [...new Set(projects.flatMap(p => p.tags))];
  let currentFilter: ProjectFilter = 'all';
  
  $: filteredProjects = projects.filter(project => {
    if (currentFilter === 'all') return true;
    return project.tags.includes(currentFilter);
  });
  
  // Sort projects by date (newest first)
  $: sortedProjects = [...filteredProjects].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  function setFilter(filter: ProjectFilter) {
    currentFilter = filter;
  }
</script>

<svelte:head>
  <title>projects</title>
  <meta name="description" content="A showcase of my projects and work" />
</svelte:head>

<PageTransition let:animationProps>
  <div class="content">
    <div class="filters" in:fly={animationProps.getStaggeredFly(0)}>
      <button 
        class:active={currentFilter === 'all'} 
        on:click={() => setFilter('all')}
      >
        All
      </button>
      
      {#each allTags as tag}
        <button 
          class:active={currentFilter === tag} 
          on:click={() => setFilter(tag)}
        >
          {tag}
        </button>
      {/each}
    </div>
    
    <div class="projects-container" in:fly={animationProps.getStaggeredFly(1)}>
      <div class="projects-list">
        {#each sortedProjects as project, i}
          <div 
            class="project-link-wrapper"
            in:fade={{ 
              duration: 300, 
              delay: 200 + (i * 50),
              easing: cubicOut
            }}
          >
            <a href={`/projects/${project.id}`} class="project-link">
              <ProjectCard 
                {project} 
                index={i}
                baseDelay={200}
              />
            </a>
          </div>
        {/each}
        
        {#if sortedProjects.length === 0}
          <div class="no-projects" in:fade={{ duration: 300, delay: 300 }}>
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
  }
  
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 2rem;
    justify-content: center;
  }
  
  .filters button {
    background: none;
    border: 1px solid rgba(89, 74, 66, 0.15);
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    color: #594a42;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .filters button:hover {
    background-color: rgba(89, 74, 66, 0.05);
  }
  
  .filters button.active {
    background: linear-gradient(90deg, #594a42 0%, #2c1810 100%);
    color: white;
    border-color: transparent;
  }
  
  .projects-container {
    width: 100%;
    /* Force GPU acceleration */
    transform: translateZ(0);
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
    will-change: opacity;
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
    
    .filters {
      gap: 0.5rem;
      margin-bottom: 2rem;
    }
    
    .project-link-wrapper {
      height: auto;
      min-height: 300px;
    }
  }
  
  @media (max-width: 480px) {
    .filters button {
      font-size: 14px !important;
      padding: 0.4rem 0.8rem;
    }
  }
</style>