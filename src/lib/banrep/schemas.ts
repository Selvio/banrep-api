import { z } from "zod";

import { ALLOWED_FLOWS } from "./flows";

export const FlowParamSchema = z.enum(ALLOWED_FLOWS);

export const ObservationSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format" }),
  value: z.number().finite(),
});

export const ObservationsResponseSchema = z.array(ObservationSchema);
