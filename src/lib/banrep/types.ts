export interface Observation {
  date: string;
  value: number;
}

interface ObsDimension {
  $: { value: string };
}

interface ObsValue {
  $: { value: string };
}

interface XMLObservation {
  "generic:ObsDimension": ObsDimension[];
  "generic:ObsValue": ObsValue[];
}

interface Series {
  "generic:Obs": XMLObservation[];
}

interface DataSetItem {
  "generic:Series": Series[];
}

export interface SDMXResponse {
  "message:GenericData": {
    "message:DataSet": DataSetItem[];
  };
}
