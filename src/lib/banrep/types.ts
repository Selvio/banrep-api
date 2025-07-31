export interface Observation {
  date: string;
  value: number;
}

export interface SDMXResponse {
  "message:GenericData": {
    "data:DataSet": {
      "generic:Series": {
        "generic:Obs": Array<{
          "generic:ObsDimension": { $: { value: string } };
          "generic:ObsValue": { $: { value: string } };
        }>;
      };
    };
  };
}
