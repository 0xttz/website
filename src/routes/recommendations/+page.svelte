<script lang="ts">
  import { fade, fly } from 'svelte/transition';

  interface Recommendation {
    title: string;
    description: string;
    link?: string;
    author?: string;
  }

  const books: Recommendation[] = [
    {
      title: "Zero to One",
      author: "Peter Thiel",
      description: "Notes on startups, or how to build the future.",
      link: "https://www.amazon.com/Zero-One-Notes-Startups-Future/dp/0804139296"
    }
  ];

  const essays: Recommendation[] = [
    {
      title: "What You Can't Say",
      author: "Paul Graham",
      description: "Thoughts on social censorship and intellectual discourse.",
      link: "http://www.paulgraham.com/say.html"
    }
  ];

  const videos: Recommendation[] = [
    {
      title: "The Century of the Self",
      description: "How the unconscious mind of the consumer influences modern democracy.",
      link: "https://www.youtube.com/watch?v=DnPmg0R1M04"
    }
  ];
</script>

<svelte:head>
  <title>Recommendations | Lennard Kaye</title>
  <meta name="description" content="Books, essays, and videos I recommend" />
</svelte:head>

<div class="container" in:fade={{ duration: 300, delay: 150 }}>
  <div class="content" in:fly={{ y: 20, duration: 400, delay: 250 }}>
    <div class="illustration">
      <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" stroke="#594a42" stroke-opacity="0.08" stroke-width="1.5"
          d="M20,20 C60,20 100,80 140,80 C160,80 180,60 180,40" />
        <path fill="none" stroke="#594a42" stroke-opacity="0.08" stroke-width="1.5"
          d="M40,40 C80,40 120,100 160,100" />
        <path fill="none" stroke="#594a42" stroke-opacity="0.08" stroke-width="1.5"
          d="M60,60 C100,60 140,20 180,20" />
      </svg>
    </div>
    <h1>Recommendations</h1>
    <div class="placeholder">
      <p>A curated list of my favorite books, tools, and resources will be added soon.</p>
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

  h1 {
    font-size: 2.5rem;
    color: #2c1810;
    margin-bottom: 2rem;
    font-weight: 700;
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