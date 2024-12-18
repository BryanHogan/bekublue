<script>
    import GameCard from "../components/GameCard.svelte";
    export let allEntries = [];

    let showBlogPosts = true;
    let showReviews = true;
</script>

<form class="form-container margin-inline-auto">
    <h2 style="font-size: var(--text-size-2xl)">Filter</h2>
    <label>
        <input type="checkbox" bind:checked={showBlogPosts} />
        Show Blog Posts
    </label>
    <label>
        <input type="checkbox" bind:checked={showReviews} />
        Show Review
    </label>
</form>
<div class="cards-container">
    {#each allEntries as entry}
        {#if (showBlogPosts && entry.collection === "posts") || (showReviews && entry.collection === "reviews")}
            <GameCard
                title={entry.data.title}
                description={entry.data.description}
                link={`/${entry.collection === "reviews" ? "games" : "blog"}/${entry.slug}`}
                cover={entry.data.cover}
            />
        {/if}
    {/each}
</div>

<style>
    .form-container {
        max-width: 500px;
        border: 1px solid var(--color-neutral-400);
        margin-block: var(--space-xl);
        padding: var(--space-m);
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
        border-radius: var(--border-radius-m);
        background-color: var(--color-neutral-800);
    }
    .cards-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--space-m);
    }
</style>
