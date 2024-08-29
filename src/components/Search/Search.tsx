import SearchIcon from '@/assets/search.svg';

const Search = () => {
  return (
    <div>
      <div className="flex relative">
        <img
          src={SearchIcon}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        />
        <input
          className="bg-gray-100 rounded-3xl py-2.5 px-14 placeholder:text-gray-500 text-lg"
          placeholder="Search Twits"
        />
      </div>
      <div className="mt-8 h-52 bg-gray-100 rounded-lg"></div>
    </div>
  );
};

export default Search;
