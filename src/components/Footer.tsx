import { Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-card-border py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted text-sm">&copy; 2026 Spengo</p>
        <div className="flex items-center gap-5">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-body transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="mailto:hello@spengo.com"
            className="text-muted hover:text-body transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <span className="text-muted/50 text-xs">Built by Spengo</span>
        </div>
      </div>
    </footer>
  );
}
