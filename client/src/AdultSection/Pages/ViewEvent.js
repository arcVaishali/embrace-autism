import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";

const ViewEvent = () => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [errors, setErrors] = useState({});

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

    fetch(`${API_BASE_URL}/events/get-upcoming-community-event`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const fetchedResponse = await res.json();
        const fetchedData = fetchedResponse.data;

        console.log(fetchedData);

        setUpcomingEvents(fetchedData);
      })
      .catch((err) => console.log(err));

    fetch(`${API_BASE_URL}/users/registered-community-events`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(async (res) => {
        if (res.ok) {
          const fetchedResponse = await res.json();
          const fetchedData = fetchedResponse.data;

          console.log(fetchedData);

          setRegisteredEvents(fetchedData);
        } else {
          // check to know if fetch failed due to failed user authentication
          // or other errors
          setErrors({
            ...errors,
            userAuth: false ,
          });
        }
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
          Upcoming events
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {upcomingEvents
                ? "There are no upcoming events"
                : upcomingEvents.map((val, key) => (
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
          Registered Events
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {!errors.userAuth ? (
                <div>Kindly Login to view your events</div>
              ) : registeredEvents ? (
                "You have not registered in any event"
              ) : (
                registeredEvents.map((val, key) => (
                  <EventCard
                    key={key}
                    name={val.name}
                    about={val.about}
                    coverImage={val.coverImage}
                    views={val.views}
                    eventDate={val.eventDate}
                    owner={val.owner.username}
                  ></EventCard>
                ))
              )}
            </div>
          </div>
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
