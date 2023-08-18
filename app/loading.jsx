const Loading = () => {
    return (
      <div
        style={{ height: '50vh' }}
        className="w-full flex justify-center items-center"
      >
        <img
          src="/mini-logo.svg"
          className="w-12 animate-bounce" // Apply the animation class here
          alt="Loading Logo"
        />
      </div>
    );
  };
  
  export default Loading;
  