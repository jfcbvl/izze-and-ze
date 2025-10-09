import { Router } from 'wouter';
import LanguageSwitcher from '../LanguageSwitcher';

export default function LanguageSwitcherExample() {
  return (
    <Router>
      <div className="min-h-screen bg-background relative">
        <LanguageSwitcher />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground font-sans">
            Language switcher positioned in top-right corner
          </p>
        </div>
      </div>
    </Router>
  );
}
