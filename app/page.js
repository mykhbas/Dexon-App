"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PipingTable = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('./pages/IndexPage');
  }, [router]);

  return null; 
};

export default PipingTable;
