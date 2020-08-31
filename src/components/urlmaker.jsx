export default function urlMaker(filters) {
  function languageCorrect() {
    let filterLanguage = '';

    switch (filters.language) {
      case 'C++':
        filterLanguage = 'language:C%2B%2B';
        break;
      case 'C#':
        filterLanguage = 'language:C%23';
        break;
      case 'All':
        filterLanguage = '';
        break;
      case 'C#':
        filterLanguage = 'language:C%23';
        break;
      default:
        filterLanguage = `language:${filters.language}`;
    }

    return filterLanguage;
  }

  const url = `https://api.github.com/search/repositories?q=${
    filters.keyword
  } stars:>=${filters.stars} ${languageCorrect()} sort:stars`;

  return url;
}
