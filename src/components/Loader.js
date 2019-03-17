import React from "react";
import { PropagateLoader } from "react-spinners";
import { Box } from "gestalt";

const Loader = ({ show }) => {
  return (
    show && (
      <Box
        position="fixed"
        dangerouslySetInlineStyle={{
          __style: {
            bottom: 300,
            left: "50%",
            transform: "translateX(-50%)"
          }
        }}
      >
        <PropagateLoader color="darkorange" size={20} margin="3px" />
      </Box>
    )
  );
};

export default Loader;
