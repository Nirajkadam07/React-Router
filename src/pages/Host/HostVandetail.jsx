import React from "react";
import { useParams, Link, Outlet, NavLink } from "react-router-dom";

export default function HostVanDetail() {
  const { id } = useParams();
  const [currentVan, setCurrentVan] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentVan(data.vans[0]));
  }, []);

  if (!currentVan) {
    return <h1>Loading...</h1>;
  }

  const activeStyle = {
    fontWeight: " bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <>
      <section>
        <Link to=".." relative="path" className="back-button">
          &larr; <span>Back to all vans</span>
        </Link>

        <div className="host-van-detail-layout-container">
          <div className="host-van-detail">
            <img src={currentVan.imageUrl} />
            <div className="host-van-detail-info-text">
              <i className={`van-type van-type-${currentVan.type}`}>
                {currentVan.type}
              </i>
              <h3>{currentVan.name}</h3>
              <h4>${currentVan.price}/day</h4>
            </div>
          </div>
        </div>
      </section>
      <nav className="host-van-detail-nav">
        <NavLink
          to="."
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          Details
        </NavLink>
        <NavLink
          to="pricing"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
        >
          Pricing
        </NavLink>
        <NavLink
          to="photos"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
        >
          Photos
        </NavLink>
      </nav>
      <Outlet context={{ currentVan }} />
    </>
  );
}
