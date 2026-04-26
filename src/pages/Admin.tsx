import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  adminLogin,
  adminLogout,
  isAdminLoggedIn,
  useContent,
  SiteContent,
} from "@/lib/content-store";
import {
  LogOut,
  Save,
  RotateCcw,
  Eye,
  Lock,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Plus,
  Trash2,
  ImageIcon,
} from "lucide-react";

/* ───────── Default fallback images (shown as preview if no custom image) ───────── */
import fallback0 from "@/assets/work-2.png";
import fallback1 from "@/assets/work-3.png";
import fallback2 from "@/assets/work-4.png";
import fallback3 from "@/assets/work-5.png";
import fallback4 from "@/assets/work-6.png";
import fallback5 from "@/assets/work-1.png";
const fallbackImages = [fallback0, fallback1, fallback2, fallback3, fallback4, fallback5];

/* ───────── Login Screen ───────── */
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (adminLogin(pw)) {
        onLogin();
      } else {
        setError("Wrong password");
        setTimeout(() => setError(null), 2000);
      }
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "var(--gradient-gold)" }}
          >
            <Lock className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-1">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">
            Enter password to continue
          </p>
        </div>

        <form onSubmit={submit}>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            className={`w-full px-4 py-3 rounded-xl bg-surface border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4 transition-colors ${
              error ? "border-red-500 ring-2 ring-red-500/30" : "border-border"
            }`}
            autoFocus
          />
          {error && (
            <p className="text-red-400 text-sm mb-3 text-center">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-medium text-primary-foreground transition-opacity hover:opacity-90"
            style={{ background: "var(--gradient-gold)" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

/* ───────── Collapsible Section ───────── */
const Section = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-background/50 transition-colors"
      >
        <span className="font-display font-bold text-lg">{title}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      {open && <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">{children}</div>}
    </div>
  );
};

/* ───────── Field helpers ───────── */
const Field = ({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) => (
  <div>
    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
      {label}
    </label>
    {multiline ? (
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
      />
    ) : (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    )}
  </div>
);

/* ───────── Dashboard ───────── */
const Dashboard = () => {
  const navigate = useNavigate();
  const { content, setContent, resetContent } = useContent();
  const [draft, setDraft] = useState<SiteContent>(() => JSON.parse(JSON.stringify(content)));
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Deep updater
  const update = (path: string, value: unknown) => {
    const next = JSON.parse(JSON.stringify(draft));
    const keys = path.split(".");
    let obj: Record<string, unknown> = next;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]] as Record<string, unknown>;
    }
    obj[keys[keys.length - 1]] = value;
    setDraft(next as SiteContent);
  };

  const save = async () => {
    setIsSaving(true);
    try {
      await setContent(draft);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save to database. Check console for details.");
    } finally {
      setIsSaving(false);
    }
  };

  const reset = async () => {
    if (confirm("Reset all content to defaults? This cannot be undone.")) {
      await resetContent();
      setDraft(JSON.parse(JSON.stringify(content)));
      window.location.reload();
    }
  };

  const logout = () => {
    adminLogout();
    navigate("/admin");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-surface/95 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Lock className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">Admin Panel</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-background/50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Preview</span>
            </a>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-background/50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={save}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : saved ? "Saved!" : "Save"}
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        {/* ── Hero ── */}
        <Section title="🏠 Hero Section" defaultOpen>
          <Field label="Title Line 1" value={draft?.hero?.title1 || ""} onChange={(v) => update("hero.title1", v)} />
          <Field label="Title Line 2 (Gold)" value={draft?.hero?.title2 || ""} onChange={(v) => update("hero.title2", v)} />
          <Field label="Title Line 3" value={draft?.hero?.title3 || ""} onChange={(v) => update("hero.title3", v)} />
          <Field label="Subtitle" value={draft?.hero?.subtitle || ""} onChange={(v) => update("hero.subtitle", v)} multiline />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Button 1 Text" value={draft?.hero?.cta1 || ""} onChange={(v) => update("hero.cta1", v)} />
            <Field label="Button 2 Text" value={draft?.hero?.cta2 || ""} onChange={(v) => update("hero.cta2", v)} />
          </div>
        </Section>

        {/* ── Services ── */}
        <Section title="⚡ Services">
          <Field label="Section Label" value={draft?.services?.label || ""} onChange={(v) => update("services.label", v)} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Heading" value={draft?.services?.heading || ""} onChange={(v) => update("services.heading", v)} />
            <Field label="Heading (Gold)" value={draft?.services?.headingGold || ""} onChange={(v) => update("services.headingGold", v)} />
          </div>
          <Field label="Subtitle" value={draft?.services?.subtitle || ""} onChange={(v) => update("services.subtitle", v)} multiline />

          {draft?.services?.items?.map((item, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-background/50 border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">Service {idx + 1}</span>
              </div>
              <Field
                label="Title"
                value={item.title}
                onChange={(v) => {
                  const items = [...draft.services.items];
                  items[idx] = { ...items[idx], title: v };
                  update("services.items", items);
                }}
              />
              <Field
                label="Description"
                value={item.description}
                onChange={(v) => {
                  const items = [...draft.services.items];
                  items[idx] = { ...items[idx], description: v };
                  update("services.items", items);
                }}
                multiline
              />
              <Field
                label="Features (comma-separated)"
                value={item.features.join(", ")}
                onChange={(v) => {
                  const items = [...draft.services.items];
                  items[idx] = { ...items[idx], features: v.split(",").map((s) => s.trim()) };
                  update("services.items", items);
                }}
              />
            </div>
          ))}
        </Section>

        {/* ── Work ── */}
        <Section title="🎨 Portfolio / Work">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Label" value={draft?.work?.label || ""} onChange={(v) => update("work.label", v)} />
            <Field label="Heading" value={draft?.work?.heading || ""} onChange={(v) => update("work.heading", v)} />
          </div>
          <Field label="Heading (Gold)" value={draft?.work?.headingGold || ""} onChange={(v) => update("work.headingGold", v)} />

          {draft?.work?.projects?.map((p, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-background/50 border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">Project {idx + 1}</span>
                <button
                  onClick={() => {
                    const projects = draft.work.projects.filter((_, i) => i !== idx);
                    update("work.projects", projects);
                  }}
                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <Field
                label="Category / Title"
                value={p.category}
                onChange={(v) => {
                  const projects = [...draft.work.projects];
                  projects[idx] = { ...projects[idx], category: v };
                  update("work.projects", projects);
                }}
              />

              {/* Image upload */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
                  Project Image
                </label>
                <div className="flex items-start gap-3">
                  {/* Preview — always show current image (custom or fallback) */}
                  <div className="relative w-28 rounded-lg overflow-hidden border border-border shrink-0" style={{ height: "72px" }}>
                    <img
                      src={p.customImage || fallbackImages[idx % fallbackImages.length]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {/* Badge: custom vs default */}
                    <span className={`absolute bottom-1 left-1 text-[9px] px-1.5 py-0.5 rounded font-medium ${p.customImage ? "bg-green-500/80 text-white" : "bg-black/60 text-muted-foreground"}`}>
                      {p.customImage ? "Custom" : "Default"}
                    </span>
                    {/* Remove custom image button */}
                    {p.customImage && (
                      <button
                        onClick={() => {
                          const projects = [...draft.work.projects];
                          projects[idx] = { ...projects[idx], customImage: "" };
                          update("work.projects", projects);
                        }}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] hover:bg-red-400"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Upload button */}
                  <div className="flex-1">
                    <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors cursor-pointer">
                      <ImageIcon className="w-4 h-4" />
                      {p.customImage ? "Change Image" : "Upload Image"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          // Resize and compress to fit localStorage
                          const reader = new FileReader();
                          reader.onload = () => {
                            const img = new Image();
                            img.onload = () => {
                              const canvas = document.createElement("canvas");
                              const maxW = 800;
                              const scale = Math.min(1, maxW / img.width);
                              canvas.width = img.width * scale;
                              canvas.height = img.height * scale;
                              const ctx = canvas.getContext("2d")!;
                              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                              const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
                              const projects = [...draft.work.projects];
                              projects[idx] = { ...projects[idx], customImage: dataUrl };
                              update("work.projects", projects);
                            };
                            img.src = reader.result as string;
                          };
                          reader.readAsDataURL(file);
                          e.target.value = "";
                        }}
                      />
                    </label>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      JPG, PNG — auto-compressed to fit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const projects = [...draft.work.projects, { category: "New Project", customImage: "" }];
              update("work.projects", projects);
            }}
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </Section>

        {/* ── Contact ── */}
        <Section title="📞 Contact / WhatsApp">
          <Field label="Heading Line 1" value={draft?.contact?.heading1 || ""} onChange={(v) => update("contact.heading1", v)} />
          <Field label="Heading Line 2 (Gold)" value={draft?.contact?.heading2 || ""} onChange={(v) => update("contact.heading2", v)} />
          <Field label="Subtitle" value={draft?.contact?.subtitle || ""} onChange={(v) => update("contact.subtitle", v)} multiline />

          {draft?.contact?.whatsapp?.map((wa, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-background/50 border border-border space-y-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">{wa.label}</span>
                {draft.contact.whatsapp.length > 1 && (
                  <button
                    onClick={() => {
                      const whatsapp = draft.contact.whatsapp.filter((_, i) => i !== idx);
                      update("contact.whatsapp", whatsapp);
                    }}
                    className="ml-auto p-1 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <Field
                label="Label"
                value={wa.label}
                onChange={(v) => {
                  const whatsapp = [...draft.contact.whatsapp];
                  whatsapp[idx] = { ...whatsapp[idx], label: v };
                  update("contact.whatsapp", whatsapp);
                }}
              />
              <Field
                label="Number (with country code)"
                value={wa.number}
                onChange={(v) => {
                  const whatsapp = [...draft.contact.whatsapp];
                  whatsapp[idx] = { ...whatsapp[idx], number: v };
                  update("contact.whatsapp", whatsapp);
                }}
              />
              <Field
                label="Display Format"
                value={wa.display}
                onChange={(v) => {
                  const whatsapp = [...draft.contact.whatsapp];
                  whatsapp[idx] = { ...whatsapp[idx], display: v };
                  update("contact.whatsapp", whatsapp);
                }}
              />
            </div>
          ))}
          <button
            onClick={() => {
              const whatsapp = [
                ...draft.contact.whatsapp,
                { label: `WhatsApp ${draft.contact.whatsapp.length + 1}`, number: "", display: "" },
              ];
              update("contact.whatsapp", whatsapp);
            }}
            className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add WhatsApp Number
          </button>
        </Section>

        {/* ── Footer ── */}
        <Section title="📋 Footer">
          <Field label="TikTok URL" value={draft?.footer?.tiktok || ""} onChange={(v) => update("footer.tiktok", v)} />
          <Field label="TikTok Handle" value={draft?.footer?.tiktokHandle || ""} onChange={(v) => update("footer.tiktokHandle", v)} />
          <Field label="Description" value={draft?.footer?.description || ""} onChange={(v) => update("footer.description", v)} multiline />
        </Section>
      </div>
    </div>
  );
};

/* ───────── Main Admin Page ───────── */
const AdminPage = () => {
  const [authed, setAuthed] = useState(isAdminLoggedIn());

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <Dashboard />;
};

export default AdminPage;
