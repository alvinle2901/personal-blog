export interface ArticleData {
  category: string;
  title: string;
  date: string;
  imageSrc: string;
  slug: string;
}

export interface ArticleFilter {
  categories?: string[];
  limit?: number;
  excludeCategories?: string[];
}

const filterArticles = (
  articles: ArticleData[],
  filter: ArticleFilter = {}
): ArticleData[] => {
  let filtered = [...articles];

  // Filter by categories
  if (filter.categories && filter.categories.length > 0) {
    filtered = filtered.filter(article =>
      filter.categories!.includes(article.category)
    );
  }

  // Exclude specific categories
  if (filter.excludeCategories && filter.excludeCategories.length > 0) {
    filtered = filtered.filter(article =>
      !filter.excludeCategories!.includes(article.category)
    );
  }

  // Apply limit if specified
  if (filter.limit && filter.limit > 0) {
    filtered = filtered.slice(0, filter.limit);
  }

  return filtered;
};

export default filterArticles;
