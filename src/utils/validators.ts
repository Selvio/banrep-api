import { FlowId } from "@/lib/banrep/flows";

export const isColcapFlow = (flow: FlowId) => flow.includes("COLCAP");

export const isValidFlow = (flow: string): flow is FlowId => {
  const validFlows = [
    "DF_IBR_DAILY_LATEST",
    "DF_IBR_DAILY_HIST",
    "DF_DTF_DAILY_LATEST",
    "DF_DTF_DAILY_HIST",
    "DF_DTF_MONTHLY_LATEST",
    "DF_DTF_MONTHLY_HIST",
    "DF_DTF_TRIM_ANTICIPADO_LATEST",
    "DF_DTF_TRIM_ANTICIPADO_HIST",
    "DF_TRM_DAILY_LATEST",
    "DF_TRM_DAILY_HIST",
    "DF_CBR_DAILY_LATEST",
    "DF_CBR_DAILY_HIST",
    "DF_CBR_MONTHLY_LATEST",
    "DF_CBR_MONTHLY_HIST",
    "DF_IR_DAILY_LATEST",
    "DF_IR_DAILY_HIST",
    "DF_COLCAP_MONTHLY_LATEST",
    "DF_COLCAP_MONTHLY_HIST",
    "DF_MONAGG_MONTHLY_LATEST",
    "DF_MONAGG_MONTHLY_HIST",
    "DF_UVR_DAILY_LATEST",
    "DF_UVR_DAILY_HIST",
  ];
  return validFlows.includes(flow as FlowId);
};

export const isValidStartPeriod = (period: string): boolean => {
  const validPeriods = ["1990", "2000", "2010", "2015", "2020", "2023"];
  return validPeriods.includes(period);
}; 