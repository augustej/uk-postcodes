const PostcodeDetails = ({ details }) => {
  return (
    details && (
      <div className="card details-card" data-testid="postcode-details">
        <div className="card-header">{details.postcode}</div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Country: {details.country}</li>
            <li className="list-group-item">
              Admin district: {details.admin_district}
            </li>
            <li className="list-group-item">Longitude: {details.longitude}</li>
            <li className="list-group-item">Latitude: {details.latitude}</li>
          </ul>
        </div>
      </div>
    )
  );
};

export default PostcodeDetails;
