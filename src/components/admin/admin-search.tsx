"use client";

import { useState } from "react";
import Input from "@/components/ui/input";

type Props = {
  onSearch: (value: string) => void;
};

const AdminSearch = ({ onSearch }: Props) => {
  const [value, setValue] = useState("");

  return (
    <Input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onSearch(e.target.value);
      }}
      placeholder="Search..."
    />
  );
};

export default AdminSearch;