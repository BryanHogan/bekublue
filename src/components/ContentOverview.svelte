<script>
    import { onMount } from "svelte";
    import GameCard from "../components/GameCard.svelte";
    export let allEntries = [];

    let showBlogPosts = true;
    let showReviews = true;

    onMount(() => {
        const params = new URLSearchParams(location.search);
        const hasReviews = params.has("reviews");
        const hasBlog = params.has("blog");

        if (hasReviews && !hasBlog) {
            showBlogPosts = false;
        } else if (hasBlog && !hasReviews) {
            showReviews = false;
        }
    });
</script>

<form class="form-container margin-inline-auto">
    <h2 style="font-size: var(--text-size-2xl)">Filter</h2>
    <div class="option-controls-container">
        <label>
            <input type="checkbox" bind:checked={showBlogPosts} />
            Show Blog Posts
        </label>
        <label>
            <input type="checkbox" bind:checked={showReviews} />
            Show Reviews
        </label>
    </div>
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
        border: 1px solid var(--color-neutral-700);
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
    .option-controls-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        gap: var(--space-s);
    }
    label {
        border: 1px solid var(--color-neutral-700);
        padding: var(--space-2xs) var(--space-xs);
        border-radius: var(--border-radius-s);
        background-color: var(--color-neutral-900);
    }
</style>
