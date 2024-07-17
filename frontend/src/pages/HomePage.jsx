import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import toast from "react-hot-toast";
import { useCallback } from "react";
import Spinner from "../components/Spinner";

function HomePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const [sortType, setSortType] = useState("recent");
  const getUserProfileAndRepos = useCallback(
    async (username = "Tusharfv15") => {
      setLoading(true);
      setUserNotFound(false);
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        if (res.status === 404) {
          setUserNotFound(true);
          setLoading(false);
          return;
        }
        const { userProfile, repos } = await res.json();

        setUserProfile(userProfile);

        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRepos(repos);
       
        setLoading(false);
        return { userProfile, repos };
      } catch (error) {
        toast.error("User not found");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  const onSearch = async (e, username) => {
    e.preventDefault();
    setLoading(true);
    setUserNotFound(false);
    setRepos([]);
    setUserProfile(null);
    const { userProfile, repos } = await getUserProfileAndRepos(username);
    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
  };

  const onSort = (sortType) => {
    //descending order
    if (sortType == "recent") {
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortType == "stars") {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortType == "forks") {
      repos.sort((a, b) => b.forks_count - a.forks_count);
    }
    setSortType(sortType);
    setRepos([...repos]);
  };
  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      {repos?.length > 0 && <SortRepos sortType={sortType} onSort={onSort} />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {loading && <Spinner />}
        {userNotFound ? (
          <p>User not found</p>
        ) : (
          <>
            {userProfile && !loading && (
              <ProfileInfo userProfile={userProfile} />
            )}
            {!loading && <Repos repos={repos} />}
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
