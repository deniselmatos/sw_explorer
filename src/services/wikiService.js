export async function getWikiData(name) {
  try {
    const searchRes = await fetch(
      `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent(name)}&limit=1`
    );

    const searchData = await searchRes.json();

    if (!searchData.pages?.length) {
      return { description: null, image: null };
    }

    const pageTitle = searchData.pages[0].title;

    const summaryRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`
    );

    if (!summaryRes.ok) {
      return { description: null, image: null };
    }

    const data = await summaryRes.json();

    const description = data.extract || null;

    if (
      !description ||
      description.toLowerCase().includes("incomplete list") ||
      description.length < 80
    ) {
      return { description: null, image: data.thumbnail?.source || null };
    }

    return {
      description,
      image: data.thumbnail?.source || null
    };

  } catch (error) {
    console.error("Wikipedia error:", error);
    return { description: null, image: null };
  }
}