import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Copy, Check, Linkedin, AlertCircle, CheckCircle2, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui-ext/page-header";
import { GlassCard } from "@/components/ui-ext/glass-card";
import { Reveal } from "@/components/ui-ext/reveal";
import { toast } from "sonner";

export const Route = createFileRoute("/_dash/linkedin")({
  head: () => ({ meta: [{ title: "LinkedIn Optimizer — CareerPilot AI" }] }),
  component: LinkedinPage,
});

const sections = [
  {
    label: "Headline",
    current: "Software Developer at Acme Corp",
    improved:
      "Full-Stack Engineer · React + TypeScript · Building scalable web apps for 40k+ users",
  },
  {
    label: "About",
    current:
      "I am a developer who likes coding and building things. I work with web technologies.",
    improved:
      "Full-stack engineer with 3+ years shipping production React/TypeScript apps. I cut load times by 38%, raised test coverage to 80%, and mentor junior devs. Passionate about clean architecture and measurable impact.",
  },
  {
    label: "Skills",
    current: "JavaScript, HTML, CSS",
    improved:
      "React · TypeScript · Node.js · REST APIs · System Design · CI/CD · Testing (Jest) · Tailwind CSS",
  },
];

function LinkedinPage() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const copy = (t: string) => {
    navigator.clipboard?.writeText(t);
    toast.success("Copied");
  };

  const isValidLinkedIn = linkedinUrl.trim() === "" ? null : /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/.test(linkedinUrl.trim());

  const handleAnalyze = () => {
    if (!linkedinUrl.trim()) {
      toast.error("Please enter a LinkedIn Profile URL");
      return;
    }
    if (!isValidLinkedIn) {
      toast.error("Please enter a valid LinkedIn Profile URL");
      return;
    }
    
    setAnalyzing(true);
    
    // Extensibility Hook: Future API integration or scraping logic should be connected here
    // example: 
    // scrapeLinkedInProfile(linkedinUrl)
    //   .then(data => { setSections(data); setAnalyzing(false); })
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Connecting to LinkedIn API and evaluating profile appeal...",
        success: () => {
          setAnalyzing(false);
          return "Profile analyzed! Suggestions loaded below.";
        },
        error: () => {
          setAnalyzing(false);
          return "Failed to fetch LinkedIn profile details.";
        }
      }
    );
  };

  return (
    <>
      <PageHeader
        title="LinkedIn Optimizer"
        subtitle="Sharpen your profile for keyword density and recruiter appeal."
        action={
          <span className="inline-flex items-center gap-2 rounded-xl bg-secondary/15 px-4 py-2.5 text-sm font-medium text-secondary">
            <Linkedin className="h-4 w-4" /> Profile strength: 72%
          </span>
        }
      />

      <div className="space-y-6">
        {/* LinkedIn URL Input Section */}
        <Reveal>
          <GlassCard hover={false} className="p-6 md:p-8">
            <div className="max-w-xl space-y-2">
              <div>
                <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
                  <Linkedin className="h-5 w-5 text-[#0A66C2]" /> LinkedIn Profile Optimizer
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Paste LinkedIn Profile URL to generate recommendations
                </p>
              </div>
              
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start pt-2">
                <div className="flex-1">
                  <div className="relative">
                    <Linkedin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="linkedin-url"
                      type="text"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="h-11 w-full rounded-xl border border-border bg-muted/20 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/50 text-slate-200 placeholder:text-muted-foreground transition-all"
                    />
                  </div>
                  {linkedinUrl.trim() !== "" && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs pl-1">
                      {isValidLinkedIn ? (
                        <span className="flex items-center gap-1 text-success font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5" /> ✓ Valid LinkedIn URL
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-destructive font-medium">
                          <AlertCircle className="h-3.5 w-3.5" /> ⚠ Invalid LinkedIn URL format
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 text-sm font-semibold text-primary-foreground glow-ring hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer shrink-0"
                >
                  {analyzing ? "Analyzing..." : "Analyze LinkedIn Profile"}
                </button>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* Comparison Section Cards */}
        {sections.map((s, i) => (
          <Reveal key={s.label} delay={(i + 1) * 0.08}>
            <div className="space-y-3">
              <h3 className="text-base font-bold font-display text-slate-200 pl-1">{s.label}</h3>
              <div className="grid gap-6 md:grid-cols-2 items-stretch">
                {/* Current Card */}
                <GlassCard hover={false} className="flex flex-col h-full p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    Current
                  </span>
                  <p className="flex-1 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {s.current}
                  </p>
                </GlassCard>

                {/* Improved Card */}
                <GlassCard hover={false} glow="success" className="flex flex-col h-full p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-success">
                      <Sparkles className="h-3.5 w-3.5" /> Improved
                    </span>
                    <button onClick={() => copy(s.improved)} title="Copy improved text" className="text-success hover:opacity-85 cursor-pointer">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="flex-grow text-sm text-slate-200 leading-relaxed whitespace-pre-wrap mb-6">
                    {s.improved}
                  </p>
                  
                  {/* Buttons at the bottom of the card, aligned via mt-auto */}
                  <div className="flex items-center gap-2.5 pt-4 border-t border-success/10 mt-auto">
                    <button
                      onClick={() => copy(s.improved)}
                      className="flex-grow rounded-xl glass px-4 py-2 text-xs font-medium hover:scale-[1.02] cursor-pointer"
                    >
                      Copy Text
                    </button>
                    <button
                      onClick={() => toast.success(`${s.label} updated`)}
                      className="flex-grow rounded-xl bg-gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground glow-ring hover:scale-[1.02] cursor-pointer"
                    >
                      Apply Changes
                    </button>
                  </div>
                </GlassCard>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
