import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request:Request){
    const url=new URL(request.url);
    const page=parseInt(url.searchParams.get('page')||'1',10);
    const limit=parseInt(url.searchParams.get('limit')|| '10',10);
    const currentYear = new Date(Date.now()).getFullYear();
    const previousYear=currentYear-1;
    const skip =(page-1)*limit;
    const take=limit;
    try{
        const movies = await prisma.tvShow.findMany({
            where: {
              createdAt: {
                gte: new Date(`${previousYear}-01-01T00:00:00.000Z`),  // Start of previous year
                lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`), // Start of next year
              },
            },
            skip,
            take,
          });
        
        return NextResponse.json(movies,{status:200});
    } catch(error){
        console.error("Error fetching movies",error);
        return NextResponse.json(
            {error:"Failed to fetch movies"},
            {status:500}
        );
    }
}