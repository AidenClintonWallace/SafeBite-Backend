import Splash from "@/src/screens/Splash";
import { useEffect, useState } from "react";
import Navbar from "../src/components/Navbar";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Splash />;
  }

  return <Navbar />;
}
