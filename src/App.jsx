import { useState } from "react";

const TABS = [
  { id: "overview", label: "System Overview" },
  { id: "products", label: "Products & Metrics" },
  { id: "stages", label: "Evaluation Stages" },
  { id: "platforms", label: "Platforms" },
  { id: "promotion", label: "Promotion Process" },
  { id: "teams", label: "Teams" },
];

const LINKS = {
  linear: "https://linear.app/getheidi/project/llm-evaluations-offline-and-online-7f3bbf2a5568",
  mod844: "https://linear.app/getheidi/issue/MOD-844",
  databricks: "#platforms",
  iaExperiments: "#platforms",
  omni: "#platforms",
};

/* ───────── small reusable bits ───────── */

function Badge({ children, color = "blue" }) {
  const colors = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    amber: "bg-amber-100 text-amber-800",
    red: "bg-red-100 text-red-800",
    purple: "bg-purple-100 text-purple-800",
    gray: "bg-gray-100 text-gray-700",
    indigo: "bg-indigo-100 text-indigo-800",
    rose: "bg-rose-100 text-rose-800",
    teal: "bg-teal-100 text-teal-800",
    cyan: "bg-cyan-100 text-cyan-800",
  };
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
}

function ExtLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline decoration-dotted underline-offset-2">
      {children}
    </a>
  );
}

function SectionCard({ title, children, accent = "border-l-blue-500" }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 border-l-4 ${accent} p-5 shadow-sm`}>
      {title && <h3 className="text-base font-semibold text-gray-900 mb-3">{title}</h3>}
      {children}
    </div>
  );
}

function Arrow({ direction = "right", className = "" }) {
  if (direction === "right") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
          <path d="M0 12H40M40 12L32 4M40 12L32 20" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className={`flex items-center justify-center py-1 ${className}`}>
      <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
        <path d="M12 0V28M12 28L4 20M12 28L20 20" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function MetricTag({ name, type }) {
  const typeColors = {
    core: "blue",
    judge: "purple",
    user: "green",
    proxy: "amber",
    proposed: "gray",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded mr-1.5 mb-1.5 bg-${typeColors[type] || "gray"}-50 text-${typeColors[type] || "gray"}-700 border border-${typeColors[type] || "gray"}-200`}>
      {name}
    </span>
  );
}

/* ───────── TAB: System Overview ───────── */

function OverviewTab({ onNavigate }) {
  return (
    <div className="space-y-8">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
        <span className="font-semibold">Regulatory context:</span> Heidi's Scribe is currently classified as a Class 1 medical device in the UK. A shift to Class 2A/2B is expected within 12 months, requiring significantly higher PMS evidence. Without active, structured monitoring beyond CSAT, UK market access is at risk.
      </div>

      {/* Three-stage pipeline */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Evaluation pipeline</h3>
        <div className="flex items-stretch gap-0">
          {/* Stage 1 */}
          <div className="flex-1 bg-blue-50 border-2 border-blue-300 rounded-l-xl p-5 cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => onNavigate("stages")}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</div>
              <h4 className="font-semibold text-blue-900">Pre-deployment</h4>
            </div>
            <p className="text-sm text-blue-800 mb-3">Confirm no regression across core metrics before any real user sees the change.</p>
            <div className="space-y-1">
              <Badge color="blue">CEEV</Badge>{" "}
              <Badge color="purple">LLM judges</Badge>{" "}
              <Badge color="blue">WER / WRR</Badge>
            </div>
            <div className="mt-3 pt-3 border-t border-blue-200 text-xs text-blue-700">
              <span className="font-medium">Platforms:</span> IA Experiments, Engineering scripts
            </div>
          </div>

          <Arrow direction="right" className="self-center -mx-2 z-10" />

          {/* Stage 2 */}
          <div className="flex-1 bg-amber-50 border-2 border-amber-300 p-5 cursor-pointer hover:bg-amber-100 transition-colors" onClick={() => onNavigate("stages")}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold">2</div>
              <h4 className="font-semibold text-amber-900">Canary release</h4>
            </div>
            <p className="text-sm text-amber-800 mb-3">Controlled rollout to free/beta users. Validate dev results hold in production.</p>
            <div className="space-y-1">
              <Badge color="blue">CEEV</Badge>{" "}
              <Badge color="purple">LLM judges</Badge>{" "}
              <Badge color="green">BERT / ROUGE</Badge>{" "}
              <Badge color="green">Side-by-side</Badge>{" "}
              <Badge color="green">CSAT</Badge>
            </div>
            <div className="mt-3 pt-3 border-t border-amber-200 text-xs text-amber-700">
              <span className="font-medium">Platforms:</span> Databricks, IA Experiments
            </div>
          </div>

          <Arrow direction="right" className="self-center -mx-2 z-10" />

          {/* Stage 3 */}
          <div className="flex-1 bg-green-50 border-2 border-green-300 rounded-r-xl p-5 cursor-pointer hover:bg-green-100 transition-colors" onClick={() => onNavigate("stages")}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">3</div>
              <h4 className="font-semibold text-green-900">Post-market surveillance</h4>
            </div>
            <p className="text-sm text-green-800 mb-3">Continuous monitoring across all users. Source of truth for regulatory PMS reports.</p>
            <div className="space-y-1">
              <Badge color="blue">CEEV</Badge>{" "}
              <Badge color="purple">LLM judges</Badge>{" "}
              <Badge color="green">BERT / ROUGE</Badge>{" "}
              <Badge color="green">Side-by-side</Badge>{" "}
              <Badge color="green">CSAT</Badge>{" "}
              <Badge color="amber">Feature-specific</Badge>
            </div>
            <div className="mt-3 pt-3 border-t border-green-200 text-xs text-green-700">
              <span className="font-medium">Platforms:</span> Databricks + Omni
            </div>
          </div>
        </div>
      </div>

      {/* Three platforms */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Three platforms</h3>
        <p className="text-sm text-gray-500 mb-4">Databricks is the satellite (full lay of the land). IA Experiments is the helicopter (specific areas). Engineering scripts are the ground team.</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border-2 border-indigo-200 rounded-xl p-5 hover:border-indigo-400 transition-colors cursor-pointer" onClick={() => onNavigate("platforms")}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <h4 className="font-semibold text-gray-900">Databricks + Omni</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">High-volume continuous monitoring. PMS source of truth.</p>
            <div className="text-xs text-gray-500 space-y-1">
              <div><span className="font-medium">Owner:</span> Rohan (strategy), Joyce (pipelines), Sagal (dashboards)</div>
              <div><span className="font-medium">Users:</span> Regulatory, MK, Product</div>
            </div>
          </div>

          <div className="bg-white border-2 border-teal-200 rounded-xl p-5 hover:border-teal-400 transition-colors cursor-pointer" onClick={() => onNavigate("platforms")}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-teal-500"></div>
              <h4 className="font-semibold text-gray-900">IA Experiments</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Ad-hoc testing, hypothesis testing, quick answers from production data.</p>
            <div className="text-xs text-gray-500 space-y-1">
              <div><span className="font-medium">Features:</span> Production evals, prompt/model testing</div>
              <div><span className="font-medium">Users:</span> MK, Product, CS, Regulatory</div>
            </div>
          </div>

          <div className="bg-white border-2 border-orange-200 rounded-xl p-5 hover:border-orange-400 transition-colors cursor-pointer" onClick={() => onNavigate("platforms")}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <h4 className="font-semibold text-gray-900">Engineering scripts</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Pre-deployment validation in engineering workflows. Must include core PMS metrics.</p>
            <div className="text-xs text-gray-500 space-y-1">
              <div><span className="font-medium">Owner:</span> Model Pod</div>
              <div><span className="font-medium">Users:</span> Engineering teams</div>
            </div>
          </div>
        </div>
      </div>

      {/* Graduation pathway diagram */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Judge graduation pathway</h3>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="bg-teal-100 border-2 border-teal-300 rounded-lg px-6 py-4 mb-2">
                <div className="text-sm font-semibold text-teal-900">IA Experiments</div>
                <div className="text-xs text-teal-700 mt-1">Develop and test new judges</div>
              </div>
              <div className="text-xs text-gray-500">Starting point</div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-2">
                <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
                  <path d="M0 12H72M72 12L64 4M72 12L64 20" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-xs text-gray-500 whitespace-nowrap">Graduate to continuous</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
                  <path d="M0 12H72M72 12L64 4M72 12L64 20" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-xs text-gray-500 whitespace-nowrap">Graduate to gates</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-indigo-100 border-2 border-indigo-300 rounded-lg px-6 py-3">
                <div className="text-sm font-semibold text-indigo-900">Databricks</div>
                <div className="text-xs text-indigo-700 mt-1">Continuous PMS monitoring</div>
              </div>
              <div className="bg-orange-100 border-2 border-orange-300 rounded-lg px-6 py-3">
                <div className="text-sm font-semibold text-orange-900">Engineering scripts</div>
                <div className="text-xs text-orange-700 mt-1">Pre-deployment gates</div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">Graduation is a decision, not a pipeline. When a judge proves useful in IA Experiments, the relevant team implements it in Databricks or engineering scripts. Judge prompt and backing model must stay consistent across all platforms.</p>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Key links" accent="border-l-gray-400">
          <div className="space-y-2 text-sm">
            <div><ExtLink href={LINKS.linear}>Linear: LLM Evaluations - Offline & Online</ExtLink></div>
            <div><ExtLink href={LINKS.mod844}>MOD-844: Databricks monitoring (holding ticket)</ExtLink></div>
          </div>
        </SectionCard>
        <SectionCard title="Core design principle" accent="border-l-gray-400">
          <p className="text-sm text-gray-700">The same metrics used in production monitoring are used in pre-deployment testing, so results are directly comparable across stages. Consistent framework first, judge validation second.</p>
        </SectionCard>
      </div>
    </div>
  );
}

/* ───────── TAB: Products & Metrics ───────── */

const PRODUCTS = [
  {
    name: "Transcription (STT)",
    desc: "Turns audio into transcript. Foundation of Scribe.",
    color: "blue",
    metrics: [
      { name: "WER (Word Error Rate)", type: "core" },
      { name: "WRR (Word Recall Rate)", type: "core" },
      { name: "Clinical term F1", type: "core" },
    ],
    stages: { pre: true, canary: true, pms: true },
    notes: null,
  },
  {
    name: "Note generation",
    desc: "Primary Scribe focus. Clinical notes from transcript + context.",
    color: "indigo",
    metrics: [
      { name: "CEEV (accuracy + detail)", type: "core" },
      { name: "BERT score", type: "core" },
      { name: "ROUGE score", type: "core" },
      { name: "Template adherence judge", type: "judge" },
      { name: "Binary safety judges", type: "judge" },
      { name: "Accuracy judge (1-5)", type: "judge" },
      { name: "Detail judge (1-5)", type: "judge" },
      { name: "CSAT", type: "user" },
      { name: "Side-by-side", type: "user" },
    ],
    stages: { pre: true, canary: true, pms: true },
    notes: "BERT/ROUGE only available post-deployment (require user editing). Accuracy/detail judges falling out of favour in favour of CEEV.",
  },
  {
    name: "Document generation",
    desc: "Referral letters, sick notes, patient explainers. Generated from the clinical note.",
    color: "purple",
    metrics: [
      { name: "CEEV (accuracy focus)", type: "core" },
      { name: "Template adherence judge", type: "judge" },
      { name: "Safety judge", type: "judge" },
      { name: "BERT / ROUGE", type: "proxy" },
    ],
    stages: { pre: true, canary: true, pms: true },
    notes: "Accuracy more important than detail here - documents intentionally omit irrelevant information. Open question: do we store original + edited document pairs?",
  },
  {
    name: "Tasks",
    desc: "Tasks generated from consultation. Must not stray into clinical decision support.",
    color: "teal",
    metrics: [
      { name: "Accuracy judge (per-task JSON)", type: "proposed" },
      { name: "Recall judge", type: "proposed" },
      { name: "Safety judge (no CDS)", type: "proposed" },
    ],
    stages: { pre: true, canary: true, pms: true },
    notes: "Full CEEV not needed - simpler judge-based approach is more appropriate.",
  },
  {
    name: "RCM / Coding",
    desc: "Billing codes from clinical notes. Must accurately represent what was communicated.",
    color: "amber",
    metrics: [
      { name: "Coding team's own framework", type: "core" },
    ],
    stages: { pre: true, canary: false, pms: false },
    notes: "Shreyank, Tyler, Harry, and Salma have their own evaluation interface. Need to consult and align with the shared framework.",
  },
  {
    name: "Evidence",
    desc: "Tool calls + evidence retrieval. Complex, expensive to evaluate.",
    color: "rose",
    metrics: [
      { name: "Binary safety judges", type: "judge" },
      { name: "Quality judges", type: "judge" },
      { name: "Comprehensiveness judges", type: "judge" },
    ],
    stages: { pre: true, canary: false, pms: true },
    notes: "Christopher Winestock's team already runs binary judges. Near-term plan: sync Evidence chats into IA Experiments, then set up Databricks monitoring.",
  },
  {
    name: "Comms / Calls",
    desc: "AI agent conversations. Safety and scope adherence are key.",
    color: "cyan",
    metrics: [
      { name: "Binary safety judge", type: "proposed" },
      { name: "Goal completion judge", type: "proposed" },
      { name: "Scope adherence judge", type: "proposed" },
    ],
    stages: { pre: true, canary: false, pms: false },
    notes: null,
  },
];

function StageIndicator({ active, label }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs ${active ? "text-gray-700" : "text-gray-300"}`}>
      <div className={`w-2 h-2 rounded-full ${active ? "bg-green-500" : "bg-gray-200"}`}></div>
      {label}
    </div>
  );
}

function ProductsTab() {
  const [expanded, setExpanded] = useState(null);
  const metricLegend = [
    { type: "core", label: "Core metric", color: "bg-blue-100 text-blue-700 border-blue-200" },
    { type: "judge", label: "LLM judge", color: "bg-purple-100 text-purple-700 border-purple-200" },
    { type: "user", label: "User signal", color: "bg-green-100 text-green-700 border-green-200" },
    { type: "proposed", label: "Proposed", color: "bg-gray-100 text-gray-600 border-gray-200" },
    { type: "proxy", label: "Proxy / TBC", color: "bg-amber-100 text-amber-700 border-amber-200" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
        <span className="text-xs font-medium text-gray-500 self-center mr-1">Legend:</span>
        {metricLegend.map((m) => (
          <span key={m.type} className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded border ${m.color}`}>{m.label}</span>
        ))}
      </div>

      <div className="space-y-3">
        {PRODUCTS.map((p, i) => {
          const isOpen = expanded === i;
          const borderColors = {
            blue: "border-l-blue-500",
            indigo: "border-l-indigo-500",
            purple: "border-l-purple-500",
            teal: "border-l-teal-500",
            amber: "border-l-amber-500",
            rose: "border-l-rose-500",
            cyan: "border-l-cyan-500",
          };
          return (
            <div key={i} className={`bg-white rounded-lg border border-gray-200 border-l-4 ${borderColors[p.color]} shadow-sm overflow-hidden`}>
              <div className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between" onClick={() => setExpanded(isOpen ? null : i)}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-semibold text-gray-900">{p.name}</h3>
                    <div className="flex gap-2">
                      <StageIndicator active={p.stages.pre} label="Pre-deploy" />
                      <StageIndicator active={p.stages.canary} label="Canary" />
                      <StageIndicator active={p.stages.pms} label="PMS" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{p.desc}</p>
                </div>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {isOpen && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                  <div className="mb-3">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Metrics</div>
                    <div className="flex flex-wrap">
                      {p.metrics.map((m, j) => {
                        const typeColors = {
                          core: "bg-blue-50 text-blue-700 border border-blue-200",
                          judge: "bg-purple-50 text-purple-700 border border-purple-200",
                          user: "bg-green-50 text-green-700 border border-green-200",
                          proposed: "bg-gray-50 text-gray-600 border border-gray-200",
                          proxy: "bg-amber-50 text-amber-700 border border-amber-200",
                        };
                        return (
                          <span key={j} className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded mr-1.5 mb-1.5 ${typeColors[m.type]}`}>
                            {m.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  {p.notes && (
                    <div className="bg-gray-50 rounded p-3 text-sm text-gray-600">
                      {p.notes}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CEEV explainer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h4 className="font-semibold text-blue-900 mb-2">What is CEEV?</h4>
        <p className="text-sm text-blue-800 mb-3">Clinical Entity Extraction and Verification. The core evaluation method for note and document generation.</p>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="bg-white rounded p-3 border border-blue-200">
            <div className="font-medium text-blue-900 mb-1">Step 1: Extract</div>
            <div className="text-blue-700">Extract an entities array from all input data (transcript, context, prior notes).</div>
          </div>
          <div className="bg-white rounded p-3 border border-blue-200">
            <div className="font-medium text-blue-900 mb-1">Step 2: Verify</div>
            <div className="text-blue-700">Compare each entity against the output. Mark true/false for presence.</div>
          </div>
          <div className="bg-white rounded p-3 border border-blue-200">
            <div className="font-medium text-blue-900 mb-1">Step 3: Grade</div>
            <div className="text-blue-700">Score accuracy (hallucinated entities) and detail (missing entities). Hallucinations graded: high / medium / low severity.</div>
          </div>
        </div>
      </div>

      {/* BERT/ROUGE explainer */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-5">
        <h4 className="font-semibold text-green-900 mb-2">BERT / ROUGE interpretation</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3 border border-green-200">
            <div className="font-medium text-green-900 mb-1">BERT close to ROUGE</div>
            <div className="text-green-700">Editing is primarily for meaning (correcting inaccuracies). The semantic and surface changes are similar in magnitude.</div>
          </div>
          <div className="bg-white rounded p-3 border border-green-200">
            <div className="font-medium text-green-900 mb-1">ROUGE much lower than BERT</div>
            <div className="text-green-700">Editing is primarily stylistic. Lots of word changes, but meaning is largely preserved. ROUGE 1.0 excluded (no editing).</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── TAB: Evaluation Stages ───────── */

function StagesTab() {
  const stages = [
    {
      num: 1,
      name: "Pre-deployment / Development",
      color: "blue",
      purpose: "Confirm a new model or prompt does not regress performance across core metrics, within a defined threshold.",
      available: ["CEEV (accuracy + detail)", "LLM judges (safety binary, template adherence)", "CER / WER / WRR (transcription)", "Feature-specific judges"],
      notAvailable: ["BERT / ROUGE (requires user editing)"],
      how: "Test against production data as inputs. New model/prompt generates outputs, evaluated using the same judges that run in production. Compare against production baseline.",
      platforms: ["IA Experiments", "Engineering scripts"],
      threshold: "A change may degrade one metric slightly while improving another. In such cases, a strong rationale must accompany the proposal with data showing it achieves its stated purpose.",
    },
    {
      num: 2,
      name: "Canary release",
      color: "amber",
      purpose: "Controlled real-world rollout to validate development results hold in production conditions, and to gather user preference data.",
      available: ["All pre-deployment metrics", "BERT / ROUGE scores (users now editing)", "Side-by-side comparisons", "CSAT (thumbs up/down)"],
      notAvailable: [],
      how: "Serve to canary group (typically free users or beta testers in less regulated markets). Compare continuous metrics against both pre-deployment results and production baseline. User preference data provides additional signal.",
      platforms: ["Databricks", "IA Experiments"],
      threshold: "Canary data consistent with pre-deployment expectations and user preference neutral-to-positive.",
    },
    {
      num: 3,
      name: "Post-market surveillance / Full production",
      color: "green",
      purpose: "Continuous monitoring across all users. Basis for regulatory PMS reports and ongoing quality assurance.",
      available: ["CEEV (accuracy + detail) - daily sample", "BERT / ROUGE (on edited notes, excl. ROUGE 1.0)", "LLM judges (safety, template adherence, binary)", "Side-by-side comparisons", "CSAT", "Feature-specific metrics"],
      notAvailable: [],
      how: "Daily automated runs on a sample of production data. Results segmented by model (and potentially specialty/region). Detect degradation early. Feed into PMS reports.",
      platforms: ["Databricks + Omni"],
      threshold: "Promoted models continue to perform consistently with what was observed during development and canary phases.",
    },
  ];

  const colorMap = {
    blue: { bg: "bg-blue-50", border: "border-blue-300", badge: "bg-blue-600", text: "text-blue-900", light: "text-blue-800", divider: "border-blue-200" },
    amber: { bg: "bg-amber-50", border: "border-amber-300", badge: "bg-amber-600", text: "text-amber-900", light: "text-amber-800", divider: "border-amber-200" },
    green: { bg: "bg-green-50", border: "border-green-300", badge: "bg-green-600", text: "text-green-900", light: "text-green-800", divider: "border-green-200" },
  };

  return (
    <div className="space-y-6">
      {/* Visual pipeline */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500"></div>
            <span className="text-xs font-medium text-gray-600">Available pre-deployment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-xs font-medium text-gray-600">Unlocked at canary / production</span>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-2 pr-4 font-medium text-gray-600 w-48">Metric</th>
                <th className="text-center py-2 px-4 font-medium text-blue-700 w-36">Pre-deploy</th>
                <th className="text-center py-2 px-4 font-medium text-amber-700 w-36">Canary</th>
                <th className="text-center py-2 px-4 font-medium text-green-700 w-36">PMS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: "CEEV", pre: true, canary: true, pms: true },
                { name: "LLM judges (safety, template)", pre: true, canary: true, pms: true },
                { name: "WER / WRR / CER", pre: true, canary: true, pms: true },
                { name: "BERT / ROUGE", pre: false, canary: true, pms: true },
                { name: "Side-by-side", pre: false, canary: true, pms: true },
                { name: "CSAT", pre: false, canary: true, pms: true },
              ].map((m, i) => (
                <tr key={i}>
                  <td className="py-2 pr-4 font-medium text-gray-800">{m.name}</td>
                  {[m.pre, m.canary, m.pms].map((active, j) => (
                    <td key={j} className="text-center py-2 px-4">
                      {active ? (
                        <span className={`inline-flex w-6 h-6 rounded-full items-center justify-center ${j === 0 || m.pre ? "bg-blue-500" : "bg-green-500"} text-white text-xs`}>✓</span>
                      ) : (
                        <span className="inline-flex w-6 h-6 rounded-full items-center justify-center bg-gray-100 text-gray-300 text-xs">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stage detail cards */}
      {stages.map((s) => {
        const c = colorMap[s.color];
        return (
          <div key={s.num} className={`${c.bg} border-2 ${c.border} rounded-xl p-6`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full ${c.badge} text-white flex items-center justify-center text-lg font-bold`}>{s.num}</div>
              <div>
                <h3 className={`text-lg font-semibold ${c.text}`}>{s.name}</h3>
                <p className={`text-sm ${c.light}`}>{s.purpose}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">Available metrics</div>
                <div className="space-y-1">
                  {s.available.map((m, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                      {m}
                    </div>
                  ))}
                  {s.notAvailable.map((m, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0"></div>
                      {m}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">How it works</div>
                <p className="text-sm text-gray-700 mb-3">{s.how}</p>
                <div className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">Platforms</div>
                <div className="flex gap-1.5">
                  {s.platforms.map((p, i) => (
                    <Badge key={i} color={p.includes("Databricks") ? "indigo" : p.includes("IA") ? "teal" : "amber"}>{p}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {s.threshold && (
              <div className={`mt-4 pt-3 border-t ${c.divider} text-sm text-gray-600`}>
                <span className="font-medium">Threshold:</span> {s.threshold}
              </div>
            )}
          </div>
        );
      })}

      {/* Future: human review */}
      <div className="bg-gray-50 border border-gray-200 border-dashed rounded-lg p-4 text-sm text-gray-500">
        <span className="font-medium text-gray-700">Future addition:</span> Human review and labelling during canary (or pre-canary). Internal team members run mock audio through the new model, review generated notes using standardised templates, and provide structured feedback. Deferred for now due to capacity constraints.
      </div>
    </div>
  );
}

/* ───────── TAB: Platforms ───────── */

function PlatformsTab() {
  return (
    <div className="space-y-6">
      {/* Databricks */}
      <div className="bg-white rounded-xl border-2 border-indigo-200 overflow-hidden">
        <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-lg font-bold">D</div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-900">Databricks + Omni</h3>
                <p className="text-sm text-indigo-700">High-volume continuous production monitoring. PMS source of truth.</p>
              </div>
            </div>
            <Badge color="indigo">The satellite view</Badge>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Strengths</h4>
              <div className="space-y-1.5 text-sm text-gray-700">
                <div className="flex items-start gap-2"><span className="text-green-500 mt-0.5">+</span> Mirror of MongoDB - safe to query without straining production</div>
                <div className="flex items-start gap-2"><span className="text-green-500 mt-0.5">+</span> Can join data from multiple sources (CSAT, Intercom, sessions, model metadata)</div>
                <div className="flex items-start gap-2"><span className="text-green-500 mt-0.5">+</span> Connected to Omni for dashboards and visualisations</div>
                <div className="flex items-start gap-2"><span className="text-green-500 mt-0.5">+</span> Handles large-scale daily processing runs</div>
                <div className="flex items-start gap-2"><span className="text-green-500 mt-0.5">+</span> Isolated from production infrastructure</div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Weaknesses</h4>
              <div className="space-y-1.5 text-sm text-gray-700">
                <div className="flex items-start gap-2"><span className="text-red-500 mt-0.5">-</span> Complex setup (requires notebooks, SQL knowledge)</div>
                <div className="flex items-start gap-2"><span className="text-red-500 mt-0.5">-</span> Not suited for quick ad-hoc questions</div>
                <div className="flex items-start gap-2"><span className="text-red-500 mt-0.5">-</span> Not the right tool for simple hypothesis testing</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">What lives here</h4>
            <div className="flex flex-wrap gap-2">
              <Badge color="indigo">Continuous PMS metric runs</Badge>
              <Badge color="indigo">Production baselines</Badge>
              <Badge color="indigo">PMS dashboards (via Omni)</Badge>
              <Badge color="indigo">Joined datasets (CSAT + sessions + Intercom)</Badge>
              <Badge color="indigo">Long-term results collections</Badge>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Ownership</h4>
            <div className="grid grid-cols-4 gap-3 text-sm">
              <div className="bg-indigo-50 rounded p-2.5">
                <div className="font-medium text-indigo-900">Rohan</div>
                <div className="text-xs text-indigo-700">Strategy - ensures pipelines and outputs meet consuming teams' needs</div>
              </div>
              <div className="bg-indigo-50 rounded p-2.5">
                <div className="font-medium text-indigo-900">Joyce</div>
                <div className="text-xs text-indigo-700">Pipeline engineering - building and maintaining Databricks pipelines</div>
              </div>
              <div className="bg-indigo-50 rounded p-2.5">
                <div className="font-medium text-indigo-900">Sagal</div>
                <div className="text-xs text-indigo-700">Dashboards - Omni visualisations and front-end reporting</div>
              </div>
              <div className="bg-indigo-50 rounded p-2.5">
                <div className="font-medium text-indigo-900">Kieran</div>
                <div className="text-xs text-indigo-700">Clinical direction - judge design and metric definitions</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3 text-sm">
            <ExtLink href={LINKS.linear}>Linear: LLM Evaluations project</ExtLink>
            <span className="text-gray-300">|</span>
            <ExtLink href={LINKS.mod844}>MOD-844 (holding ticket)</ExtLink>
          </div>
        </div>
      </div>

      {/* IA Experiments */}
      <div className="bg-white rounded-xl border-2 border-teal-200 overflow-hidden">
        <div className="bg-teal-50 px-6 py-4 border-b border-teal-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center text-lg font-bold">IA</div>
              <div>
                <h3 className="text-lg font-semibold text-teal-900">IA Experiments (Internal Admin)</h3>
                <p className="text-sm text-teal-700">Low-volume ad-hoc testing, hypothesis testing, quick answers from production data.</p>
              </div>
            </div>
            <Badge color="teal">The helicopter view</Badge>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
              <h4 className="text-sm font-semibold text-teal-900 mb-1">Production evaluations</h4>
              <p className="text-sm text-teal-700">Sample sessions from production (by session ID or random), run an LLM judge, get results in a table. Answer a specific question about production data without SQL.</p>
            </div>
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
              <h4 className="text-sm font-semibold text-teal-900 mb-1">Prompt and model testing</h4>
              <p className="text-sm text-teal-700">Take a prompt (from Prompt Teams or pasted), choose multiple models, run against production sessions. Multi-model comparison, prompt variant testing, complaint investigation.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Strengths</h4>
              <div className="space-y-1.5 text-sm text-gray-700">
                <div className="flex items-start gap-2"><span className="text-green-500 mt-0.5">+</span> Accessible to non-technical users</div>
                <div className="flex items-start gap-2"><span className="text-green-500 mt-0.5">+</span> Compliant (data stays in region, not used for training)</div>
                <div className="flex items-start gap-2"><span className="text-green-500 mt-0.5">+</span> Results saved to experiments collection (long-term)</div>
                <div className="flex items-start gap-2"><span className="text-green-500 mt-0.5">+</span> Session ID-based sampling for specific trusts/groups</div>
                <div className="flex items-start gap-2"><span className="text-green-500 mt-0.5">+</span> Can load prompts from any Prompt Teams branch</div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Weaknesses</h4>
              <div className="space-y-1.5 text-sm text-gray-700">
                <div className="flex items-start gap-2"><span className="text-red-500 mt-0.5">-</span> Must remain low-volume - reads/writes hit production MongoDB</div>
                <div className="flex items-start gap-2"><span className="text-red-500 mt-0.5">-</span> Not suited for complex multi-source data joins</div>
                <div className="flex items-start gap-2"><span className="text-red-500 mt-0.5">-</span> Basic visualisations compared to Omni</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 text-sm">
            <ExtLink href={LINKS.linear}>Linear: IA Experiments build (Milestone 3, ~85% complete)</ExtLink>
          </div>
        </div>
      </div>

      {/* Engineering Scripts */}
      <div className="bg-white rounded-xl border-2 border-orange-200 overflow-hidden">
        <div className="bg-orange-50 px-6 py-4 border-b border-orange-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-600 text-white flex items-center justify-center text-lg font-bold">E</div>
              <div>
                <h3 className="text-lg font-semibold text-orange-900">Engineering Scripts (Model Pod)</h3>
                <p className="text-sm text-orange-700">Pre-deployment validation during development. Flexible implementation, shared metrics.</p>
              </div>
            </div>
            <Badge color="amber">The ground team</Badge>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">How it works</h4>
              <p className="text-sm text-gray-700">Engineering teams implement evaluation scripts in whatever way suits their workflow. The only requirement: scripts must include the agreed-upon core metrics (CEEV, safety judges, template adherence) used in production PMS monitoring. Teams are free to add additional judges.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Results storage</h4>
              <p className="text-sm text-gray-700">Reports attached to model/prompt change requests. These serve as long-term evidence for the promotion decision and form part of the regulatory audit trail.</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="bg-orange-50 rounded p-3 text-sm text-orange-800">
              <span className="font-medium">Key constraint:</span> Must include the minimum required PMS metrics so that development results are directly comparable to production baselines.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── TAB: Promotion Process ───────── */

function PromotionTab() {
  const devToCanary = [
    { step: 1, text: "Engineer or product team makes a model or prompt change" },
    { step: 2, text: "Test via engineering scripts (model pod) or IA Experiments (product/MK)" },
    { step: 3, text: "Compile results: production baseline (Databricks) vs test results" },
    { step: 4, text: "Metrics at or above threshold and meets shared safety definition?" },
    { step: 5, text: "If any metric below threshold: include rationale and supporting data" },
    { step: 6, text: "Present proposal to approval group" },
    { step: 7, text: "Approval group decides on canary release" },
  ];

  const canaryToProd = [
    { step: 1, text: "Collect canary data over defined rollout period" },
    { step: 2, text: "Compare continuous metrics against pre-deployment results and baseline" },
    { step: 3, text: "Review user preference data (side-by-side, CSAT)" },
    { step: 4, text: "Analyse BERT/ROUGE scores (available for first time)" },
    { step: 5, text: "Approval group reviews canary data and decides on full rollout" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-sm text-gray-700">
        <span className="font-semibold">Mechanism:</span> Promotion is managed through Linear as a medical device change request. The model team raises a ticket with evaluation reports, the approval group reviews evidence and records the decision - providing a documented audit trail for regulatory purposes.
      </div>

      {/* Flow diagram */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Promotion flow</h3>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start gap-8">
            {/* Dev to Canary */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</div>
                <h4 className="font-semibold text-gray-900">Development to canary</h4>
              </div>
              <div className="space-y-0">
                {devToCanary.map((s, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${s.step === 4 ? "bg-amber-100 text-amber-700 border-2 border-amber-300" : s.step === 7 ? "bg-green-100 text-green-700 border-2 border-green-300" : "bg-blue-100 text-blue-700 border border-blue-200"}`}>
                          {s.step}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 pt-1">{s.text}</p>
                    </div>
                    {i < devToCanary.length - 1 && (
                      <div className="ml-3.5 h-4 border-l-2 border-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-gray-200 self-stretch"></div>

            {/* Canary to Prod */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold">2</div>
                <h4 className="font-semibold text-gray-900">Canary to full production</h4>
              </div>
              <div className="space-y-0">
                {canaryToProd.map((s, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${s.step === 5 ? "bg-green-100 text-green-700 border-2 border-green-300" : "bg-amber-100 text-amber-700 border border-amber-200"}`}>
                          {s.step}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 pt-1">{s.text}</p>
                    </div>
                    {i < canaryToProd.length - 1 && (
                      <div className="ml-3.5 h-4 border-l-2 border-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approval group */}
      <SectionCard title="Approval group" accent="border-l-green-500">
        <div className="flex flex-wrap gap-2">
          {["Amanthi", "Mounir", "Model Pod", "Scribe Pod", "Clinical Safety", "Regulatory team"].map((name) => (
            <span key={name} className="inline-flex items-center text-sm font-medium px-3 py-1.5 rounded-lg bg-green-50 text-green-800 border border-green-200">
              {name}
            </span>
          ))}
        </div>
      </SectionCard>

      {/* Safety definition */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-5">
        <h4 className="font-semibold text-red-900 mb-2">Open problem: shared definition of "safe"</h4>
        <p className="text-sm text-red-800 mb-3">A foundational requirement that does not yet have a formal answer: what does it mean for a clinical note to be "safe"?</p>
        <div className="grid grid-cols-2 gap-3 text-sm text-red-800">
          <div className="bg-white rounded p-3 border border-red-200">Sets the minimum standard all models must meet before reaching production users.</div>
          <div className="bg-white rounded p-3 border border-red-200">Separates safety from preference - CSAT conflates both.</div>
          <div className="bg-white rounded p-3 border border-red-200">Underpins pre-deployment safety gates and canary promotion thresholds.</div>
          <div className="bg-white rounded p-3 border border-red-200">Informs fine-tuning decisions - need to know what "safe" looks like in training data.</div>
        </div>
        <p className="text-sm text-red-700 mt-3">Likely expressed as binary safety conditions (e.g. "no medications not referenced in input," "no unsupported diagnoses"). Maps directly to binary safety judges.</p>
      </div>

      {/* Future automation */}
      <SectionCard title="Future: automated CI-like testing" accent="border-l-gray-400">
        <div className="text-sm text-gray-700 space-y-2">
          <p>Long-term vision: a prompt or model change triggers an automated evaluation run against production data using all core metrics, compared against baselines across all models currently in production (currently six). If thresholds pass, an automated report is generated and attached to the change request.</p>
          <p className="text-amber-700 font-medium">Automation of testing and reporting is near-term. Automation of the approval decision requires regulatory alignment and should not be rushed.</p>
        </div>
      </SectionCard>
    </div>
  );
}

/* ───────── TAB: Teams ───────── */

function TeamsTab() {
  const teams = [
    {
      name: "Regulatory / SAMD",
      color: "indigo",
      primary: "PMS dashboards, compliance evidence, trend monitoring, regulatory reports",
      platforms: ["Databricks + Omni (primary)", "IA Experiments (ad-hoc)"],
      activities: [
        "Consume Databricks/Omni dashboards for continuous PMS monitoring",
        "Generate PMS reports for MHRA and other regulators",
        "Review promotion proposals and data before approving changes",
        "Define the approval process and thresholds",
        "Spot-check specific sessions or trusts via IA Experiments",
      ],
      highlight: "Most directly affected by the potential Class 1 to 2A/2B shift - their ability to produce adequate PMS evidence determines continued market access.",
    },
    {
      name: "Medical Knowledge / Clinical Safety",
      color: "teal",
      primary: "Investigate complaints, test safety hypotheses, validate judges, monitor quality trends",
      platforms: ["IA Experiments (primary)", "Databricks (baselines and trends)"],
      activities: [
        "Investigate user complaints (e.g. 'Is this hallucination model-specific or universal?')",
        "Run multi-model comparisons to understand model behaviour",
        "Test new judges and validate existing ones ('finger prick test')",
        "Provide labelled expectations for binary safety judge auto-optimisation (Muna, Leolyn, Sam)",
        "Review production baselines for quality trends",
        "Participate in promotion decisions (clinical safety review)",
      ],
      highlight: null,
    },
    {
      name: "Product Teams (Scribe Pod)",
      color: "purple",
      primary: "Test prompt changes, compare prompt variants, validate feature improvements",
      platforms: ["IA Experiments (primary)"],
      activities: [
        "Prompt variant testing (load from any Prompt Teams branch or paste)",
        "Basic model testing when evaluating feature behaviour across models",
        "Review feature-specific metrics to guide product decisions",
        "Present data in prompt change request proposals",
      ],
      highlight: null,
    },
    {
      name: "Engineering / Model Pod",
      color: "amber",
      primary: "Pre-deployment model validation, development-phase testing, fast iteration",
      platforms: ["Engineering scripts (primary)", "IA Experiments (supplementary)"],
      activities: [
        "Run engineering scripts during development to validate model changes",
        "Use production data as inputs for testing",
        "Generate reports with results for promotion proposals",
        "Ensure scripts include agreed-upon core PMS metrics",
        "Add feature-specific or experiment-specific judges beyond the core set",
      ],
      highlight: null,
    },
    {
      name: "Customer Success",
      color: "rose",
      primary: "Trust-specific performance data for enterprise customers",
      platforms: ["IA Experiments (current)", "Databricks/Omni dashboards (future)"],
      activities: [
        "Sample sessions by session IDs for a specific trust",
        "Generate trust-specific performance reports",
        "In future, direct enterprise customers to self-service dashboards",
      ],
      highlight: null,
    },
  ];

  const colorMap = {
    indigo: { bg: "bg-indigo-50", border: "border-indigo-200", badge: "bg-indigo-600", text: "text-indigo-900", light: "text-indigo-700" },
    teal: { bg: "bg-teal-50", border: "border-teal-200", badge: "bg-teal-600", text: "text-teal-900", light: "text-teal-700" },
    purple: { bg: "bg-purple-50", border: "border-purple-200", badge: "bg-purple-600", text: "text-purple-900", light: "text-purple-700" },
    amber: { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-600", text: "text-amber-900", light: "text-amber-700" },
    rose: { bg: "bg-rose-50", border: "border-rose-200", badge: "bg-rose-600", text: "text-rose-900", light: "text-rose-700" },
  };

  return (
    <div className="space-y-6">
      {/* Platform-to-team matrix */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Platform usage by team</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-2.5 px-4 font-medium text-gray-600">Team</th>
                <th className="text-center py-2.5 px-4 font-medium text-indigo-700">Databricks + Omni</th>
                <th className="text-center py-2.5 px-4 font-medium text-teal-700">IA Experiments</th>
                <th className="text-center py-2.5 px-4 font-medium text-orange-700">Engineering scripts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { team: "Regulatory / SAMD", db: "primary", ia: "ad-hoc", eng: "" },
                { team: "MK / Clinical Safety", db: "baselines", ia: "primary", eng: "" },
                { team: "Product (Scribe Pod)", db: "", ia: "primary", eng: "" },
                { team: "Engineering / Model Pod", db: "", ia: "supplementary", eng: "primary" },
                { team: "Customer Success", db: "future", ia: "current", eng: "" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-medium text-gray-800">{row.team}</td>
                  {[row.db, row.ia, row.eng].map((val, j) => (
                    <td key={j} className="text-center py-2.5 px-4">
                      {val === "primary" ? (
                        <span className="inline-flex items-center justify-center w-20 text-xs font-semibold py-1 rounded-full bg-green-100 text-green-800">Primary</span>
                      ) : val === "ad-hoc" || val === "supplementary" || val === "baselines" || val === "current" ? (
                        <span className="inline-flex items-center justify-center w-24 text-xs font-medium py-1 rounded-full bg-blue-50 text-blue-700">{val.charAt(0).toUpperCase() + val.slice(1)}</span>
                      ) : val === "future" ? (
                        <span className="inline-flex items-center justify-center w-20 text-xs font-medium py-1 rounded-full bg-gray-100 text-gray-500 border border-dashed border-gray-300">Future</span>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team cards */}
      <div className="space-y-4">
        {teams.map((t) => {
          const c = colorMap[t.color];
          return (
            <div key={t.name} className={`bg-white rounded-lg border border-gray-200 overflow-hidden`}>
              <div className={`${c.bg} px-5 py-3 border-b ${c.border}`}>
                <h3 className={`font-semibold ${c.text}`}>{t.name}</h3>
                <p className={`text-sm ${c.light}`}>{t.primary}</p>
              </div>
              <div className="p-5">
                <div className="flex gap-2 mb-3">
                  {t.platforms.map((p, i) => (
                    <Badge key={i} color={p.includes("Databricks") || p.includes("Omni") ? "indigo" : p.includes("IA") ? "teal" : "amber"}>{p}</Badge>
                  ))}
                </div>
                <div className="space-y-1.5">
                  {t.activities.map((a, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0"></div>
                      {a}
                    </div>
                  ))}
                </div>
                {t.highlight && (
                  <div className="mt-3 bg-amber-50 rounded p-3 text-sm text-amber-800 border border-amber-200">
                    {t.highlight}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───────── MAIN APP ───────── */

export default function EvalFrameworkDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const navigate = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-900">Heidi Evaluations Framework</h1>
          <p className="text-sm text-gray-500 mt-1">Interactive overview of how Heidi evaluates its AI/ML systems across product features, evaluation stages, platforms, and teams.</p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigate(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        {activeTab === "overview" && <OverviewTab onNavigate={navigate} />}
        {activeTab === "products" && <ProductsTab />}
        {activeTab === "stages" && <StagesTab />}
        {activeTab === "platforms" && <PlatformsTab />}
        {activeTab === "promotion" && <PromotionTab />}
        {activeTab === "teams" && <TeamsTab />}
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-gray-400 border-t border-gray-200 mt-8">
        Last updated: April 2026. Source: evaluations-framework/framework-overview.md
      </div>
    </div>
  );
}
