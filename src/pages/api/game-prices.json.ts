import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const games = await getCollection('reviews');
  const titles = games.map((game: any) => game.data.apititle || game.data.title);

  const results = await Promise.all(
    titles.map(async (title: any) => {
      const apiUrl = `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(title)}&limit=1`;

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error(`Failed to fetch price for ${title}`);
          return { title: title, error: 'Failed to fetch price' };
        }

        const data = await response.json();
        if (data.length > 0) {
          const game = data[0];
          const gogInfo = await checkGOGAvailability(game.gameID);
          const steamAppID = game.steamAppID || null;
          const steamStoreLink = steamAppID ? `https://store.steampowered.com/app/${steamAppID}` : null;
          const existsOnSteam = !!steamAppID;

          return {
            title: title,
            currentPrice: game.cheapest,
            cheapestPriceEver: await getCheapestPriceEver(game.gameID),
            dealID: game.cheapestDealID,
            steamAppID,
            steamStoreLink,
            existsOnSteam,
            gog: gogInfo,
          };
        } else {
          return { title: title, error: 'No data found' };
        }
      } catch (error) {
        console.error(`Error fetching price for ${title}:`, error);
        return { title: title, error: 'API error' };
      }
    })
  );

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

async function getCheapestPriceEver(gameID: string) {
  const apiUrl = `https://www.cheapshark.com/api/1.0/games?id=${gameID}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch historical low for gameID: ${gameID}`);
      return null;
    }

    const data = await response.json();
    return data.cheapestPriceEver.price;
  } catch (error) {
    console.error(`Error fetching historical low for gameID: ${gameID}`, error);
    return null;
  }
}

async function checkGOGAvailability(gameID: string) {
  const apiUrl = `https://www.cheapshark.com/api/1.0/games?id=${gameID}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch GOG info for gameID: ${gameID}`);
      return null;
    }

    const data = await response.json();
    const gogStore = data.deals.find((deal: any) => deal.storeID === '7');
    if (gogStore) {
      return {
        available: true,
        storeID: gogStore.storeID,
        gogPrice: gogStore.price,
        gogDealID: gogStore.dealID,
        gogStoreLink: `https://www.gog.com/game/${encodeURIComponent(data.info.title.replace(/\s+/g, '_').toLowerCase())}`,
      };
    } else {
      return { available: false };
    }
  } catch (error) {
    console.error(`Error fetching GOG info for gameID: ${gameID}`, error);
    return { available: false, error: 'API error' };
  }
}
