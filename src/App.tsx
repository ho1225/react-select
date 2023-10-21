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
  const [value1, setValue1] = useState<SelectOptions[]>([options[0]]);
  const [value2, setValue2] = useState<SelectOptions | undefined>(options[0]);
  return (
    <>
      <Select
        mutiple
        value={value1}
        options={options}
        onChange={(option) => setValue1(option)}
      />
      <Select
        value={value2}
        options={options}
        onChange={(option) => setValue2(option)}
      />
    </>
  );
}

export default App;
