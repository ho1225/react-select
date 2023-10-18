import { useState } from "react";
import Select, { SelectOptions } from "./Components/Select";

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
  { label: "Sixth", value: 6 },
];

function App() {
  const [value, setValue] = useState<SelectOptions | undefined>(options[0]);
  return (
    <Select
      value={value}
      options={options}
      onChange={(option) => setValue(option)}
    />
  );
}

export default App;
