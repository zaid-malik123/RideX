import { NextResponse } from "next/server";


export const ApiResponse = ({
    success,
    message,
    data=null,
    status=200,
    error=null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => { 

    return NextResponse.json(
    {
      success,
      message,
      data,
      error,
    },
    { status }
  );

}