import { useAsync } from "react-use";
import { JsonFsmDef, statesFromJson } from "../utils/parseStates";
import examplesList from "../examples/examples.json";
import { useMemo } from "react";

async function dummyLoader(delay: number = 1000) {
  // A dummy loader to activate the loading animation
  await new Promise((r) => setTimeout(r, delay));
  return examplesList;
}

export function useFsmExamples() {
  const { value, loading } = useAsync(dummyLoader);

  const examples = useMemo(
    () => (loading ? null : statesFromJson(value as Array<JsonFsmDef>)),
    [value, loading]
  );

  return { examples, loading };
}
