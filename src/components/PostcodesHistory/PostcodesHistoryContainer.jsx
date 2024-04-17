import React, { useCallback } from "react";
import PostcodesHistory from "./PostcodesHistory";

const PostcodesHistoryContainer = ({
  postcodes,
  activePostcode,
  showDetails,
  deleteFromHistory,
}) => {
  const isActive = useCallback(
    (postcode) => {
      return activePostcode === postcode;
    },
    [activePostcode]
  );

  return (
    <PostcodesHistory
      postcodes={postcodes}
      isActive={isActive}
      showDetails={showDetails}
      deleteFromHistory={deleteFromHistory}
    />
  );
};

export default PostcodesHistoryContainer;
