import { gql } from "@apollo/client";

export const GET_ALL_SONGS = gql`
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
