import React from "react";

const EmbeddedMap = ({ mapHtml }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: mapHtml }}
      style={{ width: "100%", height: "600px" }}
    ></div>
  );
};

export default EmbeddedMap;
