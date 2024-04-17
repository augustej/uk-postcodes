const PostcodeDetails = ({ details }) => {
  return (
    details && (
      <div>
        <p>{details.country}</p>
        <p>{details.admin_district}</p>
        <p>{details.postcode}</p>
        <p>{details.longitude}</p>
        <p>{details.latitude}</p>
      </div>
    )
  );
};

export default PostcodeDetails;
