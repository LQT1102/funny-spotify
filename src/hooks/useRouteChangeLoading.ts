import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function useRouteChangeLoading (){
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => { setPageLoading(true); };
    let handleComplete = () => {
       setPageLoading(false);
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
}, [router]);

  return pageLoading;
}
