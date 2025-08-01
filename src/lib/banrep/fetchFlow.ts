import { parseStringPromise } from "xml2js";

import { SDMXResponse, Observation } from "./types";

export async function fetchFlow(
  flowId: string,
  startPeriod = "2020"
): Promise<Observation[]> {
  // For monthly data, use a more recent start period
  const adjustedStartPeriod = flowId.includes("MONTHLY") ? "2020" : startPeriod;

  const baseUrl = "https://totoro.banrep.gov.co/nsi-jax-ws/rest/data";
  const url = `${baseUrl}/ESTAT,${flowId},1.0/all/ALL/?startPeriod=${adjustedStartPeriod}&dimensionAtObservation=TIME_PERIOD&detail=full`;

  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();

    // Special handling for COLCAP data which seems to be unavailable
    if (flowId.includes("COLCAP")) {
      throw new Error(
        `COLCAP data is currently unavailable. The BANREP server returned error ${res.status}. This may be due to data availability or server issues.`
      );
    }

    throw new Error(`Failed to fetch ${flowId}: ${res.status} - ${errorText}`);
  }
  const xml = await res.text();

  const data: SDMXResponse = await parseStringPromise(xml);

  // Handle different XML structures
  const genericData = data["message:GenericData"];
  if (!genericData) {
    throw new Error("Invalid response structure: missing GenericData");
  }

  const dataSet = genericData["message:DataSet"];
  if (!dataSet) {
    throw new Error("Invalid response structure: missing DataSet");
  }

  const series = dataSet[0]?.["generic:Series"];
  if (!series) {
    console.log("Available keys in dataSet:", Object.keys(dataSet));
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
      // Extract date from ObsDimension (array)
      const obsDimension = o["generic:ObsDimension"];
      const date = obsDimension[0]?.$?.value;

      // Extract value from ObsValue (array)
      const obsValue = o["generic:ObsValue"];
      const value = obsValue[0]?.$?.value;

      // Handle different date formats
      const dateStr = String(date);
      let formattedDate: string;

      if (dateStr.match(/^\d{4}-\d{2}$/)) {
        // Monthly data: YYYY-MM format (already correct)
        formattedDate = dateStr;
      } else if (dateStr.match(/^\d{4}\d{2}\d{2}$/)) {
        // Daily data: YYYYMMDD format -> YYYY-MM-DD
        formattedDate = dateStr.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
      } else {
        // Fallback: try to format as is
        formattedDate = dateStr;
      }

      return {
        date: formattedDate,
        value: Number(value),
      };
    });
    allObservations.push(...mappedObs);
  }

  return allObservations;
}
