<script>
  export let title;
  export let description;
  export let link;
  export let cover;
</script>

<article>
  <a href={link}>
    <img src={cover.src} alt={title + " cover"} class="game-header" />
    <div class="text-group">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </a>
</article>

<style>
  a,
  a * {
    text-decoration: none;
    color: inherit;
    transition: var(--transition-normal) opacity;
  }

  article {
    border-radius: var(--border-radius-m);
    border: 1px solid var(--color-neutral-700);
    height: 100%;
    max-width: 500px;
    transition: border var(--transition-fast);

    & .game-header {
      overflow: hidden;
      border-radius: var(--border-radius-m) var(--border-radius-m) 0 0;
      object-fit: cover;
      width: 100%;
      height: auto;
      aspect-ratio: 2 / 1;
    }
    & a:hover,
    a:focus-within {
      opacity: 0.9;
    }
    &:hover {
      border: 1px solid var(--color-accent-700);
    }
  }
  .text-group {
    padding: var(--space-s);
    & h3 {
      padding-bottom: 0.125em;
      font-size: var(--font-size-large);
    }
    & p {
      color: var(--color-neutral-200);
    }
  }
</style>
