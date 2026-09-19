import React from 'react';
import { ForgeLogo } from '../ForgeLogo';
import { FORGE_APP_CONFIG } from '../../config';
import { ExternalLink } from 'lucide-react';

interface LandingFooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenApp?: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onNavigateSection,
}) => {
  return (
    <footer className="py-12 bg-[#050505] border-t border-white/[0.08] text-[#8E8E93] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/[0.06]">
          {/* Logo & Motto */}
          <div>
            <ForgeLogo size="sm" showTagline={false} />
            <p className="text-[11px] text-[#686868] mt-2 max-w-xs leading-relaxed">
              Discipline today. A stronger tomorrow.
              <br />
              Evidence-based progressive resistance training platform.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
            <div>
              <div className="font-bold text-white uppercase text-[10px] tracking-wider mb-2.5">
                Product
              </div>
              <ul className="space-y-1.5 text-[11px]">
                <li>
                  <button
                    onClick={() => onNavigateSection('section-product')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Workout Logging
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateSection('section-progress')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Progress Evidence
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateSection('section-brain')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Forge Brain
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateSection('section-session')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Gym Floor Mode
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white uppercase text-[10px] tracking-wider mb-2.5">
                Application
              </div>
              <ul className="space-y-1.5 text-[11px]">
                <li>
                  <a
                    href={FORGE_APP_CONFIG.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>FORGE Web App</span>
                    <ExternalLink className="w-2.5 h-2.5 text-[#A3A3A3]" />
                  </a>
                </li>
                <li>
                  <a
                    href={FORGE_APP_CONFIG.signInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>Athlete Portal</span>
                    <ExternalLink className="w-2.5 h-2.5 text-[#A3A3A3]" />
                  </a>
                </li>
                <li>
                  <a
                    href={FORGE_APP_CONFIG.startTrainingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF7A32] hover:text-[#FF8847] transition-colors cursor-pointer"
                  >
                    Start Training
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="font-bold text-white uppercase text-[10px] tracking-wider mb-2.5">
                Principles
              </div>
              <ul className="space-y-1.5 text-[11px] text-[#686868]">
                <li>Local-first offline logging</li>
                <li>Full data export (JSON)</li>
                <li>Objective overload tracking</li>
                <li>No vanity algorithms</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#686868]">
          <p>© {new Date().getFullYear()} FORGE Training Systems. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>TRAIN WITH EVIDENCE</span>
            <span>•</span>
            <span className="text-[#A3A3A3]">PROGRESS WITH INTENT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
