import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";

const ViewEvent = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    fetch(`${API_BASE_URL}/events/get-all-community-event`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const fetchedResponse = await res.json();
        const fetchedData = fetchedResponse.data;

        console.log(fetchedData);

        setEvents(fetchedData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ backgroundColor: "#0d87f400" }}>
      <div className="bg-white" style={{ backgroundColor: "#0d87f430" }}>
        <div className="bg-white" style={{ backgroundColor: "#0d87f400" }}>
          <h2 className="text-4xl mt-10 font-bold text-gray-900 text-center">
            Community Events
          </h2>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {events.map((val, key) => (
                <EventCard
                  key={key}
                  name={val.name}
                  about={val.about}
                  coverImage={val.coverImage}
                  views={val.views}
                  eventDate={val.eventDate}
                  owner={val.owner.username}
                ></EventCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEvent;
