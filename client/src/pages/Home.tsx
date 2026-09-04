/* Design philosophy: Caderno Executivo de Travessia — the interface feels like a guided review of an important professional document, never a generic form. */
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleDot,
  Compass,
  FileText,
  Flag,
  Layers3,
  Link2,
  Loader2,
  MapPin,
  Network,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxhtx5N7CxFhV5CnkY6oRsi2-tZyQ8CiK2n1OvBublev3HNp9jIURq1_VgGvKux8kmvOg/exec";

const chapters = [
  { id: "contexto", label: "Contexto", eyebrow: "01", icon: UserRound },
  { id: "trajetoria", label: "Trajetória", eyebrow: "02", icon: MapPin },
  { id: "evidencias", label: "Evidências", eyebrow: "03", icon: Layers3 },
  { id: "direcao", label: "Direção", eyebrow: "04", icon: Compass },
  { id: "sintese", label: "Síntese", eyebrow: "05", icon: Sparkles },
];

const initialForm = {
  name: "",
  role: "",
  company: "",
  objective: "",
  turningPoint: "",
  nextChapter: "",
};

export default function Home() {
  const [activeChapter, setActiveChapter] = useState("contexto");
  const [form, setForm] = useState(initialForm);
  const [connection, setConnection] = useState<"idle" | "checking" | "online" | "error">("idle");
  const [presentationOpen, setPresentationOpen] = useState(false);
  const [savedLocally, setSavedLocally] = useState(false);

  const currentIndex = chapters.findIndex((chapter) => chapter.id === activeChapter);
  const currentChapter = chapters[currentIndex] ?? chapters[0];
  const progress = Math.round(((currentIndex + 1) / chapters.length) * 100);

  const hasContext = useMemo(
    () => Boolean(form.name.trim() || form.role.trim() || form.objective.trim()),
    [form],
  );

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSavedLocally(false);
  };

  const checkConnection = async () => {
    setConnection("checking");
    try {
      const response = await fetch(`${APPS_SCRIPT_URL}?action=health`, { method: "GET" });
      if (!response.ok) throw new Error("Resposta indisponível");
      const payload = await response.json();
      if (!payload.ok) throw new Error("Serviço não confirmou saúde");
      setConnection("online");
      toast.success("Base AILS conectada", {
        description: `Apps Script ativo · versão ${payload.version}`,
      });
    } catch {
      setConnection("error");
      toast.error("Não foi possível conectar agora", {
        description: "Confira a implantação do Apps Script e tente novamente.",
      });
    }
  };

  const saveDraft = () => {
    localStorage.setItem("ails-career-founder-draft", JSON.stringify(form));
    setSavedLocally(true);
    toast.success("Rascunho preservado neste navegador", {
      description: "A gravação na base será ativada com o próximo contrato de escrita.",
    });
  };

  const goNext = () => {
    if (currentIndex < chapters.length - 1) {
      setActiveChapter(chapters[currentIndex + 1].id);
      return;
    }
    setPresentationOpen(true);
  };

  const connectionLabel = {
    idle: "Verificar base",
    checking: "Verificando…",
    online: "Base conectada",
    error: "Tentar novamente",
  }[connection];

  return (
    <main className="min-h-screen bg-[#f5f1e9] text-[#1e2926]">
      <div className="mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 lg:grid-cols-[250px_1fr]">
        <aside className="relative flex flex-col border-r border-[#d8d0c3] bg-[#eee8dc] px-6 py-7 lg:min-h-screen">
          <div className="flex items-center gap-3">
            <img src="/manus-storage/ails-mark_6e3ab553.png" alt="" className="h-10 w-10 rounded-xl object-contain" />
            <div>
              <p className="font-display text-lg leading-none text-[#1e2926]">AILs⁺</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#7e776c]">Career intelligence</p>
            </div>
          </div>

          <div className="mt-14">
            <p className="eyebrow">Caderno 01</p>
            <h1 className="mt-3 font-display text-3xl leading-[0.98] text-[#27352f]">Evolução<br />pessoal</h1>
            <p className="mt-4 text-sm leading-6 text-[#746e65]">Uma leitura guiada da sua trajetória para tornar o próximo movimento mais nítido.</p>
          </div>

          <nav className="mt-14 space-y-2" aria-label="Capítulos da avaliação">
            {chapters.map((chapter, index) => {
              const Icon = chapter.icon;
              const isActive = chapter.id === activeChapter;
              const isDone = index < currentIndex;
              return (
                <button
                  key={chapter.id}
                  onClick={() => setActiveChapter(chapter.id)}
                  className={`chapter-nav ${isActive ? "chapter-nav-active" : ""}`}
                  type="button"
                >
                  <span className={`chapter-number ${isActive ? "chapter-number-active" : ""}`}>
                    {isDone ? <Check size={13} strokeWidth={3} /> : chapter.eyebrow}
                  </span>
                  <Icon size={16} strokeWidth={1.8} />
                  <span>{chapter.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto hidden border-t border-[#d8d0c3] pt-5 lg:block">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a8175]">
              <span>Progresso</span><span>{progress}%</span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#d8d0c3]">
              <div className="h-full rounded-full bg-[#b95f45] transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#8a8175]">Seus dados permanecem sob revisão. A IA sugere; você decide.</p>
          </div>
        </aside>

        <section className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[300px] bg-[#f5f1e9]">
            <img src="/manus-storage/ails-paper-trace_8741d505.jpg" alt="" className="h-full w-full object-cover opacity-25 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f5f1e9]/50 to-[#f5f1e9]" />
          </div>

          <header className="relative flex items-center justify-between border-b border-[#ddd5c8] px-6 py-5 sm:px-10 lg:px-14">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#777166]">
              <span className="h-2 w-2 rounded-full bg-[#b95f45]" />
              Caso fundador <span className="text-[#b3aa9d]">/</span> Evolução pessoal
            </div>
            <div className="flex items-center gap-3">
              <button className="quiet-button" type="button" onClick={checkConnection} disabled={connection === "checking"}>
                {connection === "checking" ? <Loader2 size={14} className="animate-spin" /> : <Link2 size={14} />}
                {connectionLabel}
              </button>
              <button className="icon-button" type="button" aria-label="Abrir apresentação" onClick={() => setPresentationOpen(true)}>
                <FileText size={17} />
              </button>
            </div>
          </header>

          <div className="relative px-6 pb-20 pt-12 sm:px-10 lg:px-14 lg:pt-16">
            <div className="max-w-4xl animate-rise">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#b95f45]">
                <span>{currentChapter.eyebrow}</span><span className="h-px w-10 bg-[#b95f45]/50" /><span>{currentChapter.label}</span>
              </div>
              <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[0.96] tracking-[-0.035em] text-[#26332e] sm:text-6xl lg:text-7xl">
                Sua trajetória já contém sinais de liderança.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6d685f]">Vamos organizar esses sinais, separar fatos de hipóteses e tornar o próximo movimento executivo mais visível.</p>
            </div>

            <div className="mt-12 grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div className="paper-card p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 border-b border-[#e4ddd2] pb-5">
                  <div>
                    <p className="eyebrow">Comece pelo contexto</p>
                    <h3 className="mt-2 font-display text-3xl text-[#293830]">Onde você está agora?</h3>
                  </div>
                  <span className="chapter-stamp">Rascunho</span>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <label className="field-label">Seu nome<input value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Como você quer ser chamado?" /></label>
                  <label className="field-label">Cargo atual<input value={form.role} onChange={(event) => updateField("role", event.target.value)} placeholder="Ex.: Gerente de Operações" /></label>
                  <label className="field-label">Organização atual<input value={form.company} onChange={(event) => updateField("company", event.target.value)} placeholder="Onde sua atuação acontece hoje?" /></label>
                  <label className="field-label">Próximo horizonte<input value={form.nextChapter} onChange={(event) => updateField("nextChapter", event.target.value)} placeholder="Que posição ou escopo deseja explorar?" /></label>
                </div>

                <label className="field-label mt-5 block">O que você deseja compreender nesta leitura?<textarea value={form.objective} onChange={(event) => updateField("objective", event.target.value)} rows={4} placeholder="Escreva com suas palavras. Ainda não é necessário ter uma resposta pronta." /></label>
                <label className="field-label mt-5 block">Qual foi um ponto de inflexão importante na sua trajetória?<textarea value={form.turningPoint} onChange={(event) => updateField("turningPoint", event.target.value)} rows={4} placeholder="Uma mudança, decisão, crise ou conquista que alterou seu caminho." /></label>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#e4ddd2] pt-5">
                  <div className="flex items-center gap-2 text-xs text-[#817a70]">
                    <ShieldCheck size={15} className="text-[#718778]" />
                    <span>Você revisará toda interpretação antes da apresentação.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="secondary-button" type="button" onClick={saveDraft}><BookOpen size={15} />{savedLocally ? "Rascunho salvo" : "Salvar rascunho"}</button>
                    <button className="primary-button" type="button" onClick={goNext}>Continuar <ArrowRight size={16} /></button>
                  </div>
                </div>
              </div>

              <aside className="space-y-4">
                <div className="side-note">
                  <div className="flex items-center gap-2 text-[#b95f45]"><CircleDot size={16} /><span className="eyebrow text-[#b95f45]">Como funciona</span></div>
                  <p className="mt-4 font-display text-xl leading-tight text-[#35433b]">Fato primeiro.<br />Interpretação depois.</p>
                  <p className="mt-3 text-sm leading-6 text-[#7d766c]">A base registra sua resposta original. O motor organiza evidências. A IA sugere conexões para você revisar.</p>
                </div>
                <div className="side-note side-note-dark">
                  <div className="flex items-center justify-between"><span className="eyebrow text-[#d8b2a3]">Próximo capítulo</span><ChevronRight size={16} className="text-[#d8b2a3]" /></div>
                  <p className="mt-4 font-display text-xl leading-tight text-[#f5f1e9]">A linha do tempo que explica suas escolhas.</p>
                  <div className="mt-5 flex items-center gap-2 text-xs text-[#b9c2b9]"><Target size={14} /> Trajetória e evidências</div>
                </div>
              </aside>
            </div>

            <div className="mt-14 flex items-center justify-between border-t border-[#d8d0c3] pt-5">
              <p className="text-xs text-[#8e877d]">AILs⁺ · Caderno Executivo de Travessia</p>
              <button className="text-button" type="button" onClick={() => setPresentationOpen(true)}><Sparkles size={14} /> Prévia da apresentação</button>
            </div>
          </div>
        </section>
      </div>

      {presentationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18211d]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Prévia da apresentação">
          <div className="presentation-shell relative max-h-[92vh] w-full max-w-5xl overflow-auto bg-[#f5f1e9] shadow-2xl">
            <button className="presentation-close" type="button" aria-label="Fechar apresentação" onClick={() => setPresentationOpen(false)}>×</button>
            <div className="grid min-h-[620px] lg:grid-cols-[0.78fr_1.22fr]">
              <div className="relative overflow-hidden bg-[#26352e] p-8 sm:p-12">
                <img src="/manus-storage/ails-paper-trace_8741d505.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-10 mix-blend-screen" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center gap-3 text-[#e8ddd0]"><img src="/manus-storage/ails-mark_6e3ab553.png" alt="" className="h-10 w-10 object-contain" /><span className="font-display text-xl">AILs⁺</span></div>
                  <div><p className="eyebrow text-[#d8b2a3]">Caderno Executivo · 01</p><h2 className="mt-5 font-display text-5xl leading-[0.95] text-[#f5f1e9]">Evolução<br />pessoal</h2><p className="mt-6 max-w-sm text-sm leading-6 text-[#c2cbc2]">Uma leitura visual da trajetória, das evidências e do próximo movimento.</p></div>
                  <div className="flex items-center gap-2 text-xs text-[#b9c2b9]"><Flag size={14} /> Versão em revisão</div>
                </div>
              </div>
              <div className="flex flex-col justify-between p-8 sm:p-12">
                <div><p className="eyebrow">Resumo de trabalho</p><h3 className="mt-4 font-display text-4xl leading-tight text-[#293830]">O que sua trajetória está tentando dizer?</h3><p className="mt-5 text-base leading-7 text-[#6d685f]">A análise aparecerá aqui depois que você preencher o contexto, revisar as evidências e aprovar as interpretações sugeridas.</p></div>
                <div className="mt-10 space-y-3">
                  {["Trajetória e momentos de inflexão", "Evidências de impacto e liderança", "Próximo capítulo executivo"].map((item, index) => <div key={item} className="flex items-center gap-3 border-t border-[#e1d9cc] py-4 text-sm text-[#536157]"><span className="font-mono text-xs text-[#b95f45]">0{index + 1}</span><span>{item}</span><span className="ml-auto h-2 w-2 rounded-full bg-[#d8d0c3]" /></div>)}
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-[#e1d9cc] pt-5"><span className="text-xs text-[#8d857a]">{hasContext ? "Contexto iniciado" : "Aguardando contexto"}</span><button className="secondary-button" type="button" onClick={() => setPresentationOpen(false)}><RefreshCw size={14} /> Voltar à revisão</button></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
