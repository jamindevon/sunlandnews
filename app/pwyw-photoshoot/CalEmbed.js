'use client';

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"pwywtwo"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  return (
    <div className="w-full">
      <Cal 
        namespace="pwywtwo"
        calLink="sunlandcompany/pwywtwo?overlayCalendar=true"
        style={{width:"100%",height:"600px",overflow:"scroll"}}
        config={{"layout":"month_view"}}
        className="border border-gray-200 rounded-lg"
      />
    </div>
  );
}