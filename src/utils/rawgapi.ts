const fetchGameDataByTitle = async (gameTitle: string) => {
    const apiKey = import.meta.env.RAWG;
    try {
        const searchResponse = await fetch(
            `https://api.rawg.io/api/games?search=${encodeURIComponent(gameTitle)}&key=${apiKey}`
        );

        if (!searchResponse.ok) {
            console.error("Error fetching game data:", searchResponse.statusText);
            return { platforms: [], publishers: [] };
        }

        const searchData = await searchResponse.json();

        if (searchData.results && searchData.results.length > 0) {
            const game = searchData.results[0];

            const gameDetailsResponse = await fetch(
                `https://api.rawg.io/api/games/${game.id}?key=${apiKey}`
            );

            if (!gameDetailsResponse.ok) {
                console.error("Error fetching game details:", gameDetailsResponse.statusText);
                return { platforms: [], publishers: [] };
            }

            const gameDetails = await gameDetailsResponse.json();

            const platforms = gameDetails.parent_platforms
                ? gameDetails.parent_platforms.map((parent: any) => parent.platform.name)
                : [];

            const publishers = gameDetails.publishers
                ? gameDetails.publishers.map((pub: any) => pub.name)
                : [];

            return { platforms, publishers };
        } else {
            console.warn("No results found for the game title.");
            return { platforms: [], publishers: [] };
        }
    } catch (error) {
        console.error("Error fetching or parsing game data:", error);
        return { platforms: [], publishers: [] };
    }
};

export { fetchGameDataByTitle };
