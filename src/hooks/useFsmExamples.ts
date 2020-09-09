import { useAsync } from "react-use";
import { JsonFsmDef, statesFromJson } from "../utils/parseStates";
import examplesList from "../examples/examples.json";
import { useMemo } from "react";

async function loadExamplesFromServer() {
  const response = await fetch(process.env.REACT_APP_EXAMPLES_API!);
  return response.json();
}

export function useFsmExamples() {
  const { value, error, loading } = useAsync(loadExamplesFromServer);

  const examples = useMemo(() => {
    if (error) {
      return statesFromJson(examplesList as Array<JsonFsmDef>);
    }

    if (loading) {
      return null;
    }

    return statesFromJson(value as Array<JsonFsmDef>);
  }, [value, error, loading]);

  return { examples, loading };
}
