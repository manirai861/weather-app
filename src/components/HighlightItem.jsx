import PropTypes from "prop-types";
function HighlightItem({ highlightData }) {
  return (
    <div className="highlights grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-2 mr-5 lg:h-screen">
      {highlightData.map((item, index) => (
        <div key={index} className="p-2">
          <div className="bg-white rounded-lg p-4 flex flex-col h-full dark:bg-zinc-700">
            <h2 className="text-gray-500 dark:text-white">{item.title}</h2>
            <div className="mt-auto">
              <p className="sm:text-4xl text-3xl text-center">{item.value}</p>
            </div>
            <div className="mt-auto">
              <p className="text-xs mt-4">{item.unit}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
HighlightItem.propTypes = {
  highlightData: PropTypes.object.isRequired,
};

export default HighlightItem;
