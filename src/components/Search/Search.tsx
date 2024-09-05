import SearchIcon from '@/assets/search.svg';
import { Link } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';
import { ChangeEvent, useEffect, useState } from 'react';
import searchUsers from '@/api/users/searchUsers';
import useDebounce from '@/hooks/useDebounce';

const Search = ({ fullPage = false }: { fullPage?: boolean }) => {
  const [users, setUsers] = useState<Array<string>>([]);
  const [search, setSearch] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  const onShowMore = () => {
    if (fullPage) {
      setIsExpanded(true);
    }
  };
  const getUsers = async () => {
    const users = await searchUsers(debouncedSearch, isExpanded ? 3 : 30);
    setUsers(users);
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
          className="bg-gray-100 rounded-3xl py-2.5 px-14 placeholder:text-gray-500 text-lg w-full"
          placeholder="Search Users"
          onChange={onChange}
          value={search}
        />
      </div>
      <div className="mt-8 bg-gray-100 rounded-lg p-4 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">
          {debouncedSearch ? 'Search results' : 'You might like'}
        </h2>

        {users.length ? (
          users.map(userId => <UserInfo userId={userId} showFollow={true} />)
        ) : (
          <p className="text-gray-400">No results found</p>
        )}

        {!isExpanded && (
          <Link className="mt-2" to="/search" onClick={onShowMore}>
            Show more
          </Link>
        )}
      </div>
    </div>
  );
};

export default Search;
