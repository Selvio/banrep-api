import { parseStringPromise } from "xml2js";

import { SDMXResponse, Observation } from "./types";

export async function fetchFlow(
  flowId: string,
  startPeriod = "2020"
): Promise<Observation[]> {
  const url = `${process.env.BANREP_BASE_URL}/ESTAT,${flowId},${process.env.BANREP_API_VERSION}/all/ALL/?startPeriod=${startPeriod}&dimensionAtObservation=TIME_PERIOD&detail=full`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${flowId}: ${res.status}`);
  const xml = await res.text();
  const data = (await parseStringPromise(xml)) as SDMXResponse;
  
  // Handle different XML structures
  const genericData = data["message:GenericData"];
  if (!genericData) {
    throw new Error("Invalid response structure: missing GenericData");
  }
  
  const dataSet = genericData["data:DataSet"];
  if (!dataSet) {
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
    const observations = s["data:Obs"];
    if (!observations) continue;
    
    const obsArray = Array.isArray(observations) ? observations : [observations];
    const mappedObs = obsArray.map((o) => ({
      date: o["generic:ObsDimension"]?.$?.value || o["generic:ObsDimension"],
      value: Number(o["generic:ObsValue"]?.$?.value || o["generic:ObsValue"]),
    }));
    allObservations.push(...mappedObs);
  }
  
  return allObservations;
}
