import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_ALL_SONGS = gql`
  query Query($playlistId: Int!, $search: String) {
    getPlaylists {
      id
      title
    }
    getSongs(playlistId: $playlistId, search: $search) {
      _id
      artist
      duration
      photo
      title
      url
    }
  }
`;

function useFetchData(playlistId, search) {
    
  const { loading, error, data, refetch } = useQuery(GET_ALL_SONGS, {
    variables: { playlistId, search },
  });

  useEffect(() => {
    refetch();
  }, [playlistId, search]);

  console.log(data);

  return [loading, error, data];
}

export default useFetchData;
