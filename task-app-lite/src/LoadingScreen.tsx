import React from "react";
import { CircularProgress } from "./react-custom-ui-components/main";
export default function LoadingScreen() {
  return (
    <div className="loadingScreen">
      <CircularProgress />
    </div>
  );
}

