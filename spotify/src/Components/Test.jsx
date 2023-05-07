import useFetchData from "./customForFetch";

function MyComponent() {
  const [loading, error, data] = useFetchData(1, "");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>My Component</h1>
      <ul>
        {data.getSongs.map((song) => (
          <li key={song._id}>
            <h2>{song.title}</h2>
            <p>{song.artist}</p>
            {/* render other song properties */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyComponent;
