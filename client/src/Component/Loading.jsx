import React from 'react';

function Loading() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="w-16 h-16 border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;