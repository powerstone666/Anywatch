import Cards, { ROWS } from '../Common-ui/cards';
import Banner from '../Common-ui/banner';

const NEW_POPULAR_IDS = [
  'trending-today-movies',
  'trending-today-shows',
  'new-on-netflix',
  'bingeworthy-tv-shows',
  'bingeworthy-movies',
  'set-in-india',
];

function NewPopular() {
  const newPopularRows = ROWS.filter((row) => NEW_POPULAR_IDS.includes(row.id));
  
  return (
    <>
      <Banner category="trending-in-india" />
      <div className="bg-black">
        <div className="px-4 md:px-8 pt-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
            New & Popular
          </h2>
        </div>
        <Cards rows={newPopularRows} />
      </div>
    </>
  );
}

export default NewPopular;
