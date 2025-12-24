'use client';

import { useState, useEffect } from 'react';
import Toast from './Toast';
import { useToast } from '@/hooks/useToast';

export default function NotificationCenter() {
  const { toast, hideToast } = useToast();

  if (!toast) return null;

  return (
    <Toast
      message={toast.message}
      type={toast.type}
      onClose={hideToast}
      duration={3000}
    />
  );
}

