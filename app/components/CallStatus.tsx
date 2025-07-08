import React, { ReactNode } from "react";

interface CallStatusProps {
  status: string;
  children?: ReactNode;
}

const CallStatus: React.FC<CallStatusProps> = ({ status, children }) => {
  return (
    <div className="flex flex-col bg-[#FFFFFF] border border-[#CCCCCC] rounded-r-[1px] p-4 w-full lg:w-1/3">
      <div className="mt-2">
        <h2 className="text-xl font-semibold mb-2 text-black">Patient</h2>
        {/* <p className="text-lg font-mono text-gray-700"> 
        Status: <span className="text-black text-base">{status}</span> 
         </p> */}
        <div className="mt-4 space-y-1">
          <p className="font-mono text-gray-700">
            Name: <span className="text-black text-base">N/A</span>
          </p>
          <p className="font-mono text-gray-700">
            Sex: <span className="text-black text-base">N/A</span>
          </p>
          <p className="font-mono text-gray-700">
            Age: <span className="text-black text-base">N/A</span>
          </p>
          <p className="font-mono text-gray-700">
            Weight: <span className="text-black text-base">N/A</span>
          </p>
          <p className="font-mono text-gray-700">
            Height: <span className="text-black text-base">N/A</span>
          </p>
        </div>
        {/* TODO <p className="font-mono text-gray-700">Latency: <span className="text-gray-500">N/A</span></p> */}
        {/* TODO <p className="font-mono text-gray-700">00:00</p> */}
      </div>

      {/* Optional Children */}
      {children}
    </div>
  );
};

export default CallStatus;
