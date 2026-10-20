import React from 'react';
import { DirectOutreachSection } from './DirectOutreachSection';
import { PortfolioConfig } from '../types';

interface CoverLetterSectionProps {
  config: PortfolioConfig;
  onSelectPrintCoverLetter?: () => void;
}

export const CoverLetterSection: React.FC<CoverLetterSectionProps> = ({ config }) => {
  return <DirectOutreachSection config={config} />;
};
