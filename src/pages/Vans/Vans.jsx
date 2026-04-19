import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

export default function Vans() {
  const [vans, setVans] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const typeFilter = searchParams.get("type");

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans();
        setVans(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, []);

  const filteredVans = typeFilter
    ? vans.filter((van) => {
        return van.type.toLowerCase() === typeFilter;
      })
    : vans;

  const vanElements = filteredVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={van.id}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
        aria-label={`View details for ${van.name}, 
                             priced at $${van.price} per day`}
      >
        <img src={van.imageUrl} alt={`Image of ${van.name}`} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => {
            handleFilterChange("type", "simple");
          }}
          className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}
        >
          Simple
        </button>
        <button
          onClick={() => {
            handleFilterChange("type", "luxury");
          }}
          className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}
        >
          Luxury
        </button>
        <button
          onClick={() => {
            handleFilterChange("type", "rugged");
          }}
          className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}
        >
          Rugged
        </button>
        {typeFilter && (
          <button
            onClick={() => {
              handleFilterChange("type", null);
            }}
            className="van-type clear-filters"
          >
            Clear filters
          </button>
        )}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
