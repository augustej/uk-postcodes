import React from "react";

const PostcodesHistory = ({
  postcodes,
  isActive,
  showDetails,
  deleteFromHistory,
}) => {
  return (
    <div className="search-history">
      {postcodes.length > 0 && (
        <>
          <h2 className="mt-4 mb-3">Search History</h2>
          <ul className="list-group">
            {postcodes.map((postcode, index) => {
              const active = isActive(postcode);
              return (
                <li
                  key={index}
                  className={`d-flex justify-content-between align-items-center list-group-item ${
                    active ? "list-group-item-dark" : ""
                  }`}
                  data-testid={`${active ? "isActive" : ""}`}
                  aria-current={active}
                >
                  <p className="mt-0 mb-0 me-4">{postcode}</p>
                  <div>
                    <button
                      onClick={() => showDetails(postcode)}
                      className={`m-2 btn show-details-button ${
                        active ? "btn-primary" : "btn-outline-primary"
                      }`}
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteFromHistory(postcode)}
                      className={`btn ${
                        active ? "btn-dark" : "btn-outline-dark"
                      }`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default PostcodesHistory;
