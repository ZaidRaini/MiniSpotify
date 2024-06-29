import React from "react";

const Loader = ({ className }: { className: string }) => {
    return (
      <section className="flex justify-center p-4">
        <div className={`loading loading03 flex space-x-1 ${className}`}>
          <span className="block">L</span>
          <span className="block">O</span>
          <span className="block">A</span>
          <span className="block">D</span>
          <span className="block">I</span>
          <span className="block">N</span>
          <span className="block">G</span>
          <span className="block">.</span>
          <span className="block">.</span>
          <span className="block">.</span>
        </div>
      </section>
    );
  };
  
  export const GlobalSyncingData: React.FC = () => {
    return (
      <div className="bg-primary-opacity-90 fixed right-1 top-1 z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-b-4 border-t-4 border-primary-darkOrg"></div>
        </div>
      </div>
    );
  };
  
  export default Loader;