import { FlowId } from "@/lib/banrep/flows";

export const FLOW_DESCRIPTIONS: Record<FlowId, string> = {
  // Indicador Bancario de Referencia (IBR)
  DF_IBR_DAILY_LATEST:
    "Latest daily Banking Reference Indicator (IBR) - Current data only",
  DF_IBR_DAILY_HIST:
    "Historical daily Banking Reference Indicator (IBR) - Historical data",

  // Certificados de depósito a término CDT a 90 días (DTF)
  DF_DTF_DAILY_LATEST: "Latest daily CDT 90-day rate (DTF) - Current data only",
  DF_DTF_DAILY_HIST: "Historical daily CDT 90-day rate (DTF) - Historical data",
  DF_DTF_MONTHLY_LATEST:
    "Latest monthly CDT 90-day rate (DTF) - Current data only",
  DF_DTF_MONTHLY_HIST:
    "Historical monthly CDT 90-day rate (DTF) - Historical data",
  DF_DTF_TRIM_ANTICIPADO_LATEST:
    "Latest quarterly anticipated DTF - Current data only",
  DF_DTF_TRIM_ANTICIPADO_HIST:
    "Historical quarterly anticipated DTF - Historical data",

  // Tasa de cambio Representativa del Mercado (TRM)
  DF_TRM_DAILY_LATEST: "Latest daily exchange rate (TRM) - Current data only",
  DF_TRM_DAILY_HIST: "Historical daily exchange rate (TRM) - Historical data",

  // Tasa de interés de Política Monetaria (TPM)
  DF_CBR_DAILY_LATEST:
    "Latest daily monetary policy rate (TPM) - Current data only",
  DF_CBR_DAILY_HIST:
    "Historical daily monetary policy rate (TPM) - Historical data",
  DF_CBR_MONTHLY_LATEST:
    "Latest monthly monetary policy rate (TPM) - Current data only",
  DF_CBR_MONTHLY_HIST:
    "Historical monthly monetary policy rate (TPM) - Historical data",

  // Tasa Interbancaria (TIB)
  DF_IR_DAILY_LATEST: "Latest daily interbank rate (TIB) - Current data only",
  DF_IR_DAILY_HIST: "Historical daily interbank rate (TIB) - Historical data",

  // Índice de mercado bursátil (COLCAP)
  DF_COLCAP_MONTHLY_LATEST:
    "Latest monthly COLCAP stock index - Currently unavailable",
  DF_COLCAP_MONTHLY_HIST:
    "Historical monthly COLCAP stock index - Currently unavailable",

  // Agregados monetarios
  DF_MONAGG_MONTHLY_LATEST:
    "Latest monthly monetary aggregates (M1, M2, M3) - Current data only",
  DF_MONAGG_MONTHLY_HIST:
    "Historical monthly monetary aggregates (M1, M2, M3) - Historical data",

  // Unidad de Valor Real (UVR)
  DF_UVR_DAILY_LATEST: "Latest daily Real Value Unit (UVR) - Current data only",
  DF_UVR_DAILY_HIST: "Historical daily Real Value Unit (UVR) - Historical data",
};

export const FLOW_CATEGORIES: Record<string, FlowId[]> = {
  "Exchange Rates": ["DF_TRM_DAILY_LATEST", "DF_TRM_DAILY_HIST"],
  "Interest Rates": [
    "DF_IBR_DAILY_LATEST",
    "DF_IBR_DAILY_HIST",
    "DF_DTF_DAILY_LATEST",
    "DF_DTF_DAILY_HIST",
    "DF_DTF_MONTHLY_LATEST",
    "DF_DTF_MONTHLY_HIST",
    "DF_DTF_TRIM_ANTICIPADO_LATEST",
    "DF_DTF_TRIM_ANTICIPADO_HIST",
    "DF_CBR_DAILY_LATEST",
    "DF_CBR_DAILY_HIST",
    "DF_CBR_MONTHLY_LATEST",
    "DF_CBR_MONTHLY_HIST",
    "DF_IR_DAILY_LATEST",
    "DF_IR_DAILY_HIST",
  ],
  "Monetary Aggregates": ["DF_MONAGG_MONTHLY_LATEST", "DF_MONAGG_MONTHLY_HIST"],
  "Real Value Unit": ["DF_UVR_DAILY_LATEST", "DF_UVR_DAILY_HIST"],
  "Stock Market": ["DF_COLCAP_MONTHLY_LATEST", "DF_COLCAP_MONTHLY_HIST"],
};

export const START_PERIOD_OPTIONS = [
  { value: "1990", label: "Desde 1990" },
  { value: "2000", label: "Desde 2000" },
  { value: "2010", label: "Desde 2010" },
  { value: "2015", label: "Desde 2015" },
  { value: "2020", label: "Desde 2020" },
  { value: "2023", label: "Desde 2023" },
] as const; 