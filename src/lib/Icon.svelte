<script lang="ts">
  import { onMount } from 'svelte';
  export let icon: any;
  let IconComponent: any;

  onMount(() => {
    IconComponent = icon;
  });
</script>

{#if IconComponent}
  <div class="icon">
    <svelte:component this={IconComponent} />
  </div>
{/if}

<style>
  .icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.icon svg) {
    width: 100%;
    height: 100%;
  }
</style> 