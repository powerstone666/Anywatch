import Cards, { ROWS } from '../Common-ui/cards';
import Banner from '../Common-ui/banner';

function Shows() {
  const showRows = ROWS.filter((row) => row.mediaType === 'tv');
  
  return (
    <>
      <Banner category="trending-shows" />
      <div className="bg-black">
        <div className="px-4 md:px-8 pt-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            TV Shows
          </h2>
        </div>
        <Cards rows={showRows} />
      </div>
    </>
  );
}

export default Shows;
