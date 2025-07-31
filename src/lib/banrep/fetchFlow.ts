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
  const obsArray =
    data["message:GenericData"]["data:DataSet"]["generic:Series"]["data:Obs"];
  return obsArray.map((o) => ({
    date: o["generic:ObsDimension"].$.value,
    value: Number(o["generic:ObsValue"].$.value),
  }));
}
