import { parseStringPromise } from "xml2js";

import { SDMXResponse, Observation } from "./types";

export async function fetchFlow(
  flowId: string,
  startPeriod = "2020"
): Promise<Observation[]> {
  const baseUrl = "https://totoro.banrep.gov.co/nsi-jax-ws/rest/data";
  const url = `${baseUrl}/ESTAT,${flowId},1.0/all/ALL/?startPeriod=${startPeriod}&dimensionAtObservation=TIME_PERIOD&detail=full`;

  console.log(`Fetching from URL: ${url}`);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${flowId}: ${res.status}`);
  const xml = await res.text();

  console.log(`XML response length: ${xml.length} characters`);

  const data = (await parseStringPromise(xml)) as SDMXResponse;

  console.log("Parsed XML structure keys:", Object.keys(data));

  // Handle different XML structures
  const genericData = data["message:GenericData"];
  if (!genericData) {
    console.log("Available keys in data:", Object.keys(data));
    throw new Error("Invalid response structure: missing GenericData");
  }

  console.log("GenericData keys:", Object.keys(genericData));

  const dataSet = genericData["message:DataSet"];
  if (!dataSet) {
    console.log("Available keys in genericData:", Object.keys(genericData));
    throw new Error("Invalid response structure: missing DataSet");
  }

  const series = dataSet["generic:Series"];
  if (!series) {
    throw new Error("Invalid response structure: missing Series");
  }

  // Handle both single and multiple series
  const seriesArray = Array.isArray(series) ? series : [series];
  const allObservations: Observation[] = [];

  for (const s of seriesArray) {
    const observations = s["generic:Obs"];
    if (!observations) continue;

    const obsArray = Array.isArray(observations)
      ? observations
      : [observations];
    const mappedObs = obsArray.map((o) => {
      // Extract date from ObsDimension
      const obsDimension = o["generic:ObsDimension"];
      const date = obsDimension?.$?.value || obsDimension;

      // Extract value from ObsValue
      const obsValue = o["generic:ObsValue"];
      const value = obsValue?.$?.value || obsValue;

      return {
        date: String(date),
        value: Number(value),
      };
    });
    allObservations.push(...mappedObs);
  }

  return allObservations;
}
