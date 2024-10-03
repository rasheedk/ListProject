import React, { useEffect, useState, useCallback } from 'react';
import fetchClient from '../api/FetchClient';
import GistsView from '../views/GistsView';

/**
 * @returns Container wrapping the logic to fetch data via api and handle the pagination
 */
const GistsContainer = () => {
  const [gists, setGists] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchGists();
  }, []);

  /**
   * 
   * @param {*} nextPage - page number
   * @returns - sets the render ready data
   */
  const fetchGists = async (nextPage = 1) => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const data = await fetchClient.request(`gists/public?page=${nextPage}&per_page=30`);
      const processedGists = data?.map((gist) => {
        const owner = gist?.owner ?? {};
        const files = gist?.files ?? {};
        const firstFileName = Object.keys(files).length > 0 ? Object.keys(files)[0] : 'Unknown file';

        return {
          id: gist?.id || Math.random().toString(), 
          avatar_url: owner?.avatar_url || 'https://via.placeholder.com/40',
          file_name: firstFileName,
        };
      });

      if (processedGists.length > 0) {
        setGists((prevGists) => [...prevGists, ...processedGists]);
        setPage(nextPage);
      } else {
        setHasMore(false); 
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Used to load next set of paginated data
   */
  const loadMoreData = () => {
    if (hasMore && !loading) {
      fetchGists(page + 1);
    }
  };

  return (
    <GistsView
      gists={gists}
      loading={loading}
      loadMoreData={loadMoreData}
    />
  );
};

export default GistsContainer;
