import { useEffect } from "react";

const useOnMount = (callback: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => callback(), []);
};

export default useOnMount;
