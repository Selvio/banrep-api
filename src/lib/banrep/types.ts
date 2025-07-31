export interface Observation {
  date: string;
  value: number;
}

export interface SDMXResponse {
  "message:GenericData": {
    "message:DataSet": {
      "generic:Series": {
        "generic:Obs": Array<{
          "generic:ObsDimension": { $: { value: string } };
          "generic:ObsValue": { $: { value: string } };
        }>;
      };
    };
  };
}
