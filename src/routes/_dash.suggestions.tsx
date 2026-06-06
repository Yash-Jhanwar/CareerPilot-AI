import { createFileRoute } from "@tanstack/react-router";
import { Copy, Download, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui-ext/page-header";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { Reveal } from "@/components/ui-ext/reveal";
import { toast } from "sonner";

export const Route = createFileRoute("/_dash/suggestions")({
  head: () => ({ meta: [{ title: "AI Suggestions — CareerPilot AI" }] }),
  component: SuggestionsPage,
});

const original = `EXPERIENCE
Software Developer — Acme Corp (2022–Present)
- Worked on the web app
- Helped with the team
- Did bug fixes and features
- Used React and some backend stuff`;

const improved = `EXPERIENCE
Software Developer — Acme Corp (2022–Present)
- Shipped 12+ features for a React/TypeScript web app serving 40k MAU
- Cut page load time 38% by code-splitting and lazy-loading routes
- Reduced production bugs 25% by introducing unit tests (Jest, 80% coverage)
- Mentored 2 junior devs and led weekly code reviews`;

function SuggestionsPage() {
  const copy = (text: string) => {
    navigator.clipboard?.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <>
      <PageHeader
        title="AI Suggestions"
        subtitle="See your resume rewritten for measurable impact."
        action={
          <div className="flex gap-2">
            <button
              onClick={() => copy(improved)}
              className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-medium transition-transform hover:scale-[1.03] cursor-pointer"
            >
              <Copy className="h-4 w-4" /> Copy Improved
            </button>
            <button
              onClick={() => toast.success("Download started")}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground glow-ring transition-transform hover:scale-[1.03] cursor-pointer"
            >
              <Download className="h-4 w-4" /> Download DOCX
            </button>
          </div>
        }
      />

      <div className="space-y-6">
        {/* Section Badge & Title */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary border border-primary/20">
                Resume Section
              </span>
              <h2 className="text-lg font-bold font-display text-slate-200">Work Experience</h2>
            </div>
            
            {/* Visual comparison indicator */}
            <div className="flex items-center gap-2 rounded-full bg-muted/20 border border-border px-3 py-1 text-xs font-medium text-slate-400">
              <span>Original Version</span>
              <span className="text-primary font-bold">&rarr;</span>
              <span className="text-success font-bold">AI Improved Version</span>
            </div>
          </div>
        </Reveal>

        {/* Comparison Grid */}
        <div className="grid gap-6 lg:grid-cols-2 items-stretch">
          {/* Original Card */}
          <Reveal>
            <GlassCard hover={false} className="flex flex-col h-full p-6">
              {/* Card Header */}
              <div className="border-b border-border pb-4 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Original Version
                </span>
                <h3 className="mt-2 text-base font-bold font-display text-slate-200">
                  Software Developer
                </h3>
                <p className="text-xs text-secondary font-medium">
                  Acme Corp &middot; 2022&ndash;Present
                </p>
              </div>

              {/* Card Content */}
              <div className="flex-1 space-y-4">
                <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed list-none pl-0">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                    <span>Worked on the web app</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                    <span>Helped with the team</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                    <span>Did bug fixes and features</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                    <span>Used React and some backend stuff</span>
                  </li>
                </ul>
              </div>
            </GlassCard>
          </Reveal>

          {/* AI Improved Card */}
          <Reveal delay={0.1}>
            <GlassCard hover={false} glow="success" className="flex flex-col h-full p-6">
              {/* Card Header */}
              <div className="border-b border-success/20 pb-4 mb-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-success">
                    <Sparkles className="h-3.5 w-3.5" /> AI Improved Version
                  </span>
                  <button
                    onClick={() => copy(improved)}
                    title="Copy improved text"
                    className="text-success hover:opacity-85 cursor-pointer"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                
                <h3 className="mt-2 text-base font-bold font-display text-slate-100">
                  Software Developer
                </h3>
                <p className="text-xs text-success font-medium mb-3">
                  Acme Corp &middot; 2022&ndash;Present
                </p>

                {/* Highlight Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="rounded-full bg-success/10 border border-success/20 px-2 py-0.5 text-[10px] font-semibold text-success">
                    ATS Optimized
                  </span>
                  <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    Quantified Impact
                  </span>
                  <span className="rounded-full bg-secondary/10 border border-secondary/20 px-2 py-0.5 text-[10px] font-semibold text-secondary">
                    Strong Action Verbs
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex-grow space-y-4">
                <ul className="space-y-3 text-sm text-slate-200 leading-relaxed list-none pl-0 mb-6">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                    <span>Shipped 12+ features for a React/TypeScript web app serving 40k MAU</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                    <span>Cut page load time 38% by code-splitting and lazy-loading routes</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                    <span>Reduced production bugs 25% by introducing unit tests (Jest, 80% coverage)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                    <span>Mentored 2 junior devs and led weekly code reviews</span>
                  </li>
                </ul>
              </div>

              {/* Buttons at the bottom of the card, aligned via mt-auto */}
              <div className="flex items-center gap-2.5 pt-4 border-t border-success/10 mt-auto">
                <button
                  onClick={() => copy(improved)}
                  className="flex-grow rounded-xl glass px-4 py-2 text-xs font-medium hover:scale-[1.02] cursor-pointer"
                >
                  Copy Text
                </button>
                <button
                  onClick={() => toast.success("Suggestions applied to resume")}
                  className="flex-grow rounded-xl bg-gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground glow-ring hover:scale-[1.02] cursor-pointer"
                >
                  Apply Changes
                </button>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </>
  );
}
