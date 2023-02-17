import React, { useState, useEffect } from "react";

const Tides = () => {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [tideData, setTideData] = useState([]);

  function getTides() {
    fetch("/api/tides", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => {
        const tideStuff = JSON.parse(JSON.stringify(data));
        setTideData(tideStuff);
      });
    console.log("It ran..");
  }

  useEffect(() => {
    setInitialRenderComplete(true);
    getTides();
  }, []);

  if (!initialRenderComplete) {
    return null; // this is because a mismatch occurs when getting date from server rather than client
  } else {
    const dayToday = new Date();
    const dayTomorrow = new Date();
    dayTomorrow.setDate(dayToday.getDate() + 1);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayToday.getDate() + 2);
    return (
      <div>
        <h2 className="text-2xl">Skez Tide Times</h2>
        <table>
          <tr>
            <th>{dayToday.toDateString()}</th>
            <th>{dayTomorrow.toDateString()}</th>
            <th>{dayAfterTomorrow.toDateString()}</th>
          </tr>
          <tr>
            {tideData.slice(0, 3).map((elm) => {
              return (
                <td>
                  <div dangerouslySetInnerHTML={{ __html: elm.tides }} />
                </td>
              );
            })}
          </tr>
        </table>
      </div>
    );
  }
};

export default Tides;
