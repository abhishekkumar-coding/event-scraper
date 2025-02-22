const EventSkeleton = () => {
    return (
      <div className="event-card w-full bg-gray-200 shadow-md rounded-lg p-4 animate-pulse">
        <div className="w-full h-60 bg-gray-300 rounded-md"></div>
        <div className="h-6 bg-gray-300 rounded mt-2 w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded mt-2 w-1/2"></div>
        <div className="h-10 bg-gray-300 rounded mt-3"></div>
        <div className="h-10 bg-gray-400 rounded mt-3 w-full"></div>
      </div>
    );
  };
  
  export default EventSkeleton