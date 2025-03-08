<script lang="ts">
  import { page } from '$app/stores';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import type { Project } from '$lib/types';
  import PageTransition from '$lib/components/PageTransition.svelte';
  
  // This would normally come from a data loading function
  // For now we're using sample data
  const projects: Record<string, Project> = {
    'project-1': {
      id: 'project-1',
      title: 'AI-Powered Analytics Dashboard',
      subtitle: 'Real-time business intelligence with machine learning insights',
      date: '2023-12-10',
      tags: ['AI', 'React', 'TypeScript', 'Python'],
      coverImage: '/images/projects/project1.jpg',
      architectureImage: '/images/projects/architecture1.svg',
      content: `
# AI-Powered Analytics Dashboard

This project involved creating a real-time analytics dashboard that uses machine learning to provide predictive insights for business data.

## Key Features
- Real-time data visualization
- ML-powered predictions
- Interactive filtering
- Data export capabilities
- Role-based access control

## Technical Implementation
The frontend was built with React and TypeScript, while the backend analytics engine used Python and TensorFlow.
      `,
      featured: true
    },
    'project-2': {
      id: 'project-2',
      title: 'E-commerce Recommendation Engine',
      subtitle: 'Personalized shopping experience using collaborative filtering',
      date: '2023-10-05',
      tags: ['Machine Learning', 'Node.js', 'MongoDB'],
      coverImage: '/images/projects/project2.jpg',
      content: `
# E-commerce Recommendation Engine

A recommendation system for online stores that provides personalized product suggestions based on user behavior and preferences.

## Approach
The system uses collaborative filtering algorithms to analyze purchase patterns and browsing history to suggest relevant products.

## Technologies Used
- Node.js for the backend API
- MongoDB for data storage
- Machine learning libraries for recommendation algorithms
      `
    }
  };

  const id = $page.params.id;
  const project = projects[id];
</script>

<svelte:head>
  <title>{project?.title || 'Project Not Found'} | Lennard Kaye</title>
  <meta name="description" content={project?.subtitle || 'Project details'} />
</svelte:head>

{#if project}
  <PageTransition let:animationProps>
    <div class="project-container">
      <div class="header-section" in:fly={animationProps.getStaggeredFly(0)}>
        <div class="cover-image" in:fly={animationProps.getStaggeredFly(1)}>
          <img src={project.coverImage} alt={project.title} />
        </div>
        
        <div class="project-header" in:fly={animationProps.getStaggeredFly(2)}>
          <h1>{project.title}</h1>
          <p class="subtitle">{project.subtitle}</p>
          
          <div class="meta">
            <div class="tags">
              {#each project.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
            
            <time datetime={project.date}>
              {new Date(project.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </div>
      </div>
      
      <div class="content-section" in:fly={animationProps.getStaggeredFly(3)}>
        {#if project.architectureImage}
          <div class="architecture-diagram">
            <h2>Architecture</h2>
            <img src={project.architectureImage} alt="Architecture diagram" />
          </div>
        {/if}
        
        <div class="project-content">
          <!-- This would normally use a markdown renderer -->
          <div class="markdown">
            {#each project.content.split('\n') as line}
              {#if line.startsWith('# ')}
                <h2>{line.substring(2)}</h2>
              {:else if line.startsWith('## ')}
                <h3>{line.substring(3)}</h3>
              {:else if line.startsWith('- ')}
                <ul>
                  <li>{line.substring(2)}</li>
                </ul>
              {:else if line.trim() !== ''}
                <p>{line}</p>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
  </PageTransition>
{:else}
  <div class="not-found">
    <h1>Project Not Found</h1>
    <p>The project you're looking for doesn't exist or has been removed.</p>
    <a href="/projects" class="back-button">Back to projects</a>
  </div>
{/if}

<style>
  .project-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .header-section {
    margin-bottom: 3rem;
  }
  
  .cover-image {
    width: 100%;
    border-radius: 0.75rem;
    overflow: hidden;
    margin-bottom: 2rem;
    box-shadow: 0 4px 12px rgba(44, 24, 16, 0.05);
    border: 1px solid rgba(89, 74, 66, 0.1);
  }
  
  .cover-image img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  .project-header {
    margin-bottom: 2rem;
  }
  
  h1 {
    margin: 0 0 0.75rem;
    font-size: 2.5rem;
    color: #2c1810;
    line-height: 1.2;
  }
  
  .subtitle {
    font-size: 1.25rem;
    color: #594a42;
    margin: 0 0 1.5rem;
    line-height: 1.4;
  }
  
  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tag {
    background-color: rgba(89, 74, 66, 0.08);
    color: #594a42;
    font-size: 0.8rem;
    padding: 0.3rem 0.75rem;
    border-radius: 2rem;
    font-weight: 500;
  }
  
  time {
    font-size: 0.9rem;
    color: #594a42;
    opacity: 0.8;
  }
  
  .content-section {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0.75rem;
    overflow: hidden;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(44, 24, 16, 0.03);
    border: 1px solid rgba(89, 74, 66, 0.08);
  }
  
  .architecture-diagram {
    margin-bottom: 3rem;
  }
  
  .architecture-diagram h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: #2c1810;
  }
  
  .architecture-diagram img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
  
  .project-content {
    color: #594a42;
    line-height: 1.6;
  }
  
  .markdown h2 {
    font-size: 1.75rem;
    color: #2c1810;
    margin: 2rem 0 1rem;
  }
  
  .markdown h3 {
    font-size: 1.25rem;
    color: #2c1810;
    margin: 1.5rem 0 0.75rem;
  }
  
  .markdown p {
    margin: 1rem 0;
  }
  
  .markdown ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }
  
  .markdown li {
    margin-bottom: 0.5rem;
  }
  
  .not-found {
    text-align: center;
    padding: 5rem 1rem;
    color: #594a42;
  }
  
  .not-found h1 {
    margin-bottom: 1rem;
  }
  
  .not-found p {
    margin-bottom: 2rem;
  }
  
  @media (max-width: 768px) {
    .project-container {
      padding: 1.5rem 1rem;
    }
    
    h1 {
      font-size: 2rem;
    }
    
    .subtitle {
      font-size: 1.1rem;
    }
    
    .content-section {
      padding: 1.5rem;
    }
  }
</style> 