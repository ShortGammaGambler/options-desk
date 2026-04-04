import { AlertTriangle } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="w-full bg-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 flex items-center gap-2 text-[11px] text-amber-400/90">
      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
      <span>
        <strong>Disclaimer:</strong> For informational and educational purposes only. Not financial advice. Options trading involves substantial risk of loss. Past performance does not guarantee future results.
      </span>
    </div>
  );
}

export function DisclaimerFooter() {
  return (
    <footer className="border-t border-border px-6 py-4 mt-auto">
      <p className="text-[11px] text-muted-foreground text-center leading-relaxed max-w-4xl mx-auto">
        <strong className="text-amber-500/80">Important Disclaimer:</strong> Options Desk provides data and analytics for informational and educational purposes only. Nothing on this platform constitutes financial advice, investment recommendation, or solicitation to buy or sell securities. Options trading involves substantial risk of loss and is not suitable for all investors. Past performance does not guarantee future results. Always consult a qualified financial advisor before making investment decisions.
      </p>
    </footer>
  );
}
