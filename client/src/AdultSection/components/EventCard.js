import { Link } from "react-router-dom";

const EventCard = ({
  name,
  about,
  coverImage,
  views,
  eventDate,
  owner,
}) => {
  return (
    <Link
      to="/"
      className="group"
      style={{
        backgroundColor: "#12e0b738",
        padding: "30px",
        borderRadius: "20px",
      }}
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={coverImage}
          alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h2
        className="text-xl font-bold tracking-tight text-gray-700"
        style={{ textAlign: "center", margin: "5px" }}
      >
        {name}
      </h2>
      <div className="col-span-4 grid grid-cols-4 justify-center">
        <div className="col-span-2 text-sm text-gray-500">{views}</div>
        <div className="col-span-2 text-sm text-gray-500">{eventDate ? new Date(eventDate).toLocaleDateString() : ""}</div>
      </div>
      <div className="text-sm text-gray-500">{owner}</div>
      <h3
        className="mt-4 text-sm text-gray-700"
        style={{ marginBottom: "34px" }}
      >
        {about}
      </h3>
      <Link
        to="/"
        className="rounded-md bg-[#0D79F4] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-100 hover:text-[#0D79F4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        RSVP
      </Link>
    </Link>
  );
};

export default EventCard;
