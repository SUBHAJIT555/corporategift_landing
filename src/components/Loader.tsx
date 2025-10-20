import React from "react";
// get idea from this
// https://css-loaders.com/filling

const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            Loading...
        </div>
    );
};

export default Loader;


