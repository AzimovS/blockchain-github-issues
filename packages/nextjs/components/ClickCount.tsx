import { useEffect, useState } from "react";
import { getTotalClicks } from "~~/utils/clickedLinks";

const ClickCount = () => {
  const [clicks, setClicks] = useState<number>(0);

  useEffect(() => {
    const fetchClicks = async () => {
      const res = await getTotalClicks();
      console.log(res);
      setClicks(res);
    };

    fetchClicks();
  }, []);

  const formatClicks = (count: number) => {
    return count >= 1000 ? (count / 1000).toFixed(1) + "k" : count.toString();
  };

  return (
    <>
      {clicks > 0 && (
        <div className="relative inline-flex items-center">
          <div className="group bg-primary font-semibold rounded-2xl px-4 py-2 inline-flex items-center cursor-pointer">
            <span>{formatClicks(clicks)}</span>
            <div className="absolute top-0 right-0 hidden group-hover:block mt-10 ml-0 w-48 max-w-sm px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-lg">
              <p className="text-sm text-gray-700">Total clicks on URLs across this website.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClickCount;
