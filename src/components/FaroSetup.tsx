'use client';

import { initFaro } from '@/utils/faro-init';
import { useEffect } from 'react';

export function FaroSetup() {
  useEffect(() => {
    initFaro();
  }, []);

  return null;
}