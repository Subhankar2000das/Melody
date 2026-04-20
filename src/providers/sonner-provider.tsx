"use client";

import { Toaster } from "sonner";

const SonnerProvider = () => {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      theme="dark"
      expand={false}
    />
  );
};

export default SonnerProvider;