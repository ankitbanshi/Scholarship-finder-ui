import { data } from "@/data/dummydata";

export async function GET() {
    return Response.json(data);
}