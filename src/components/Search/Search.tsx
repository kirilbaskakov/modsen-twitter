import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import searchUsers from '@/api/users/searchUsers';
import SearchIcon from '@/assets/search.svg';
import useDebounce from '@/hooks/useDebounce';

import Loader from '../Loader/Loader';
import UserInfo from '../UserInfo/UserInfo';

const Search = ({ fullPage = false }: { fullPage?: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<Array<string>>([]);
  const [search, setSearch] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  const onShowMore = () => {
    if (fullPage) {
      setIsExpanded(isExpanded => !isExpanded);
    }
  };
  const getUsers = async () => {
    setIsLoading(true);
    const users = await searchUsers(debouncedSearch, isExpanded ? 30 : 3);
    setUsers(users);
    setIsLoading(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getUsers();
  }, [debouncedSearch, isExpanded]);

  return (
    <div>
      <div className="flex relative">
        <img
          src={SearchIcon}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        />
        <input
          className="bg-gray-100 rounded-3xl py-2.5 px-14 placeholder:text-gray-500 text-lg w-full dark:bg-gray-900"
          placeholder="Search Users"
          onChange={onChange}
          value={search}
        />
      </div>
      <div className="mt-8 bg-gray-100 rounded-lg p-4 flex flex-col gap-4 dark:bg-gray-900">
        <h2 className="text-2xl font-bold">
          {debouncedSearch ? 'Search results' : 'You might like'}
        </h2>
        {isLoading ? (
          <Loader />
        ) : users.length ? (
          users.map(userId => <UserInfo userId={userId} showFollow={true} />)
        ) : (
          <p className="text-gray-400">No results found</p>
        )}

        <Link className="mt-2" to="/search" onClick={onShowMore}>
          {isExpanded ? 'Show less' : 'Show more'}
        </Link>
      </div>
    </div>
  );
};

export default Search;
