<script lang="ts">
  import type { Project } from '$lib/types';
  
  export let project: Project;
  export let index: number = 0;
  export let baseDelay: number = 150;
  export let animationProps: any = {}; // Keep for API compatibility
</script>

<div class="project-card" on:click>
  <div class="card-inner">
    <div class="card-image">
      <img src={project.coverImage} alt={project.title} />
      <div class="image-overlay"></div>
    </div>
    
    <div class="card-content">
      <div class="title-area">
        <h3>{project.title}</h3>
        <p class="subtitle">{project.subtitle}</p>
      </div>
      
      <div class="meta-area">
        <div class="tags">
          {#each project.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
        
        <div class="date-area">
          <time datetime={project.date}>
            {new Date(project.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short'
            })}
          </time>
        </div>
      </div>
    </div>
    
    <div class="hover-indicator"></div>
  </div>
</div>

<style>
  .project-card {
    height: 160px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
  }
  
  .card-inner {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 1px 6px rgba(44, 24, 16, 0.03);
    border: 1px solid rgba(89, 74, 66, 0.06);
    display: flex;
    height: 100%;
    position: relative;
    -webkit-font-smoothing: antialiased;
    transition: box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                border-color 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .card-inner:hover {
    box-shadow: 0 8px 20px -5px rgba(44, 24, 16, 0.1);
    border-color: rgba(89, 74, 66, 0.1);
  }
  
  .card-image {
    width: 15rem;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }
  
  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(245, 245, 240, 0) 0%, rgba(44, 24, 16, 0.03) 100%);
    transition: opacity 0.25s ease;
    opacity: 0;
  }
  
  .card-inner:hover .card-image img {
    filter: brightness(1.05);
  }
  
  .card-inner:hover .image-overlay {
    opacity: 1;
  }
  
  .card-content {
    flex-grow: 1;
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .title-area {
    margin-bottom: 0.75rem;
  }
  
  h3 {
    margin: 0 0 0.375rem;
    font-size: 20px !important;
    font-weight: 600;
    color: #2c1810;
    line-height: 1.3;
  }
  
  .subtitle {
    color: #594a42;
    margin: 0;
    line-height: 1.5;
    font-size: 14px !important;
    opacity: 0.9;
  }
  
  .meta-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tag {
    background-color: rgba(89, 74, 66, 0.08);
    color: #594a42;
    font-size: 12px !important;
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s ease;
  }
  
  .card-inner:hover .tag {
    background-color: rgba(89, 74, 66, 0.12);
  }
  
  .date-area {
    display: flex;
    align-items: center;
  }
  
  time {
    font-size: 13px !important;
    color: #594a42;
    opacity: 0.8;
  }
  
  .hover-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, #594a42 0%, #2c1810 100%);
    opacity: 0;
    transition: opacity 0.25s ease;
  }
  
  .card-inner:hover .hover-indicator {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    .project-card {
      height: auto;
    }
    
    .card-inner {
      flex-direction: column;
    }
    
    .card-image {
      width: 100%;
      height: 10rem;
    }
    
    .hover-indicator {
      width: 100%;
      height: 3px;
      top: 0;
      left: 0;
    }
  }
</style> 