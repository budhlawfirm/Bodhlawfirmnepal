import {
  Clock,
  ExternalLink,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck
} from 'lucide-react';
import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { ContactInfo, PracticeArea } from '../types';

interface ContactPageProps {
  contactInfo: ContactInfo;
  practiceAreas: PracticeArea[];
  prefilledPracticeArea?: string;
  onNavigate: (sectionId: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  contactInfo,
  practiceAreas,
  prefilledPracticeArea = '',
  onNavigate
}) => {
  return (
    <div className="animate-in fade-in duration-300 pt-4">
      {/* Main Contact Section with Multi-Channel Hub and Interactive Form */}

      {/* Main Contact Section with Multi-Channel Hub and Interactive Form */}
      <ContactSection
        contactInfo={contactInfo}
        practiceAreas={practiceAreas}
        prefilledPracticeArea={prefilledPracticeArea}
      />
    </div>
  );
};
