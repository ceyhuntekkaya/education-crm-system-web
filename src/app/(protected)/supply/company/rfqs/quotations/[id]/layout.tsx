'use client';

import React from 'react';
import { RFQQuotationsProvider } from './_shared';

interface LayoutProps {
  children: React.ReactNode;
}

const QuotationsLayout: React.FC<LayoutProps> = ({ children }) => {
  return <RFQQuotationsProvider>{children}</RFQQuotationsProvider>;
};

export default QuotationsLayout;
