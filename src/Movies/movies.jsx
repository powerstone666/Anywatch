import Cards, { ROWS } from '../Common-ui/cards';
import Banner from '../Common-ui/banner';

function Movies() {
  const movieRows = ROWS.filter((row) => row.mediaType === 'movie');
  
  return (
    <>
      <Banner category="trending-movies" />
      <div className="bg-black">
        <div className="px-4 md:px-8 pt-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Movies
          </h2>
        </div>
        <Cards rows={movieRows} />
      </div>
    </>
  );
}

export default Movies;
