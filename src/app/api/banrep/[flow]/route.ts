import { NextResponse } from "next/server";

import { badRequest, badGateway } from "@/lib/api/errors";
import { fetchFlow } from "@/lib/banrep/fetchFlow";
import { FlowId } from "@/lib/banrep/flows";
import {
  FlowParamSchema,
  ObservationsResponseSchema,
} from "@/lib/banrep/schemas";

export async function GET(
  _req: Request,
  { params }: { params: { flow: string } }
) {
  const parseFlow = FlowParamSchema.safeParse(params.flow);
  if (!parseFlow.success) {
    return badRequest(parseFlow.error.message);
  }
  const flowId = parseFlow.data as FlowId;

  try {
    const rawData = await fetchFlow(flowId);

    const parseObs = ObservationsResponseSchema.safeParse(rawData);
    if (!parseObs.success) {
      console.error("Validation error:", parseObs.error);
      return badGateway("Invalid data format from BANREP");
    }

    return NextResponse.json(parseObs.data);
  } catch (e) {
    console.error("fetch-banrep error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
