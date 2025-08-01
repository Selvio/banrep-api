export const ALLOWED_FLOWS = [
  // Indicador Bancario de Referencia (IBR)
  "DF_IBR_DAILY_LATEST",
  "DF_IBR_DAILY_HIST",
  // Certificados de depósito a término CDT a 90 días (DTF)
  "DF_DTF_DAILY_LATEST",
  "DF_DTF_DAILY_HIST",
  "DF_DTF_MONTHLY_LATEST",
  "DF_DTF_MONTHLY_HIST",
  "DF_DTF_TRIM_ANTICIPADO_LATEST",
  "DF_DTF_TRIM_ANTICIPADO_HIST",
  // Tasa de cambio Representativa del Mercado (TRM)
  "DF_TRM_DAILY_LATEST",
  "DF_TRM_DAILY_HIST",
  // Tasa de interés de Política Monetaria (TPM)
  "DF_CBR_DAILY_LATEST",
  "DF_CBR_DAILY_HIST",
  "DF_CBR_MONTHLY_LATEST",
  "DF_CBR_MONTHLY_HIST",
  // Tasa Interbancaria (TIB)
  "DF_IR_DAILY_LATEST",
  "DF_IR_DAILY_HIST",
  // Índice de mercado bursátil (COLCAP)
  "DF_COLCAP_MONTHLY_LATEST",
  "DF_COLCAP_MONTHLY_HIST",
  // Agregados monetarios
  "DF_MONAGG_MONTHLY_LATEST",
  "DF_MONAGG_MONTHLY_HIST",
  // Unidad de Valor Real (UVR)
  "DF_UVR_DAILY_LATEST",
  "DF_UVR_DAILY_HIST",
] as const;

export type FlowId = (typeof ALLOWED_FLOWS)[number];
