import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Gem,
  Handshake,
  Headphones,
  LockKeyhole,
  Mail,
  Menu,
  MapPin,
  MapPinned,
  PackageCheck,
  Phone,
  Route,
  Scale,
  ScrollText,
  ShieldCheck,
  Target,
  Truck,
  X,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import institutionalImage from "@/assets/ds-pharma-institutional.jpg";
import dsPharmaLogo from "@/assets/ds-pharma-logo.png";

type IconItem = {
  icon: LucideIcon;
  title: string;
  text?: string;
};

const navItems = [
  { to: "/institucional", label: "Institucional" },
  { to: "/produtos", label: "Produtos / Soluções" },
  { to: "/compliance", label: "Compliance" },
  { to: "/cadastro-b2b", label: "Cadastro B2B" },
  { to: "/contato", label: "Contato" },
];

const headerNavClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "bg-secondary text-secondary-foreground" : "text-steel hover:bg-muted hover:text-ink"
  }`;

const differentials: IconItem[] = [
  { icon: ShieldCheck, title: "Exclusivo B2B", text: "Atendimento direcionado a empresas, distribuidores e setor governamental." },
  { icon: ClipboardCheck, title: "Controle de qualidade", text: "Critérios técnicos para conferência, documentação e padronização operacional." },
  { icon: Route, title: "Rastreabilidade", text: "Acompanhamento organizado da origem, transporte, armazenamento e entrega." },
  { icon: FileText, title: "Documentação técnica", text: "Materiais regulatórios e certificados estruturados para análise corporativa." },
  { icon: BadgeCheck, title: "Conformidade", text: "Operação alinhada às normas brasileiras e às exigências dos parceiros." },
  { icon: Headphones, title: "Suporte especializado", text: "Time técnico e comercial preparado para processos empresariais." },
];

const audiences: IconItem[] = [
  { icon: Building2, title: "Clínicas médicas" },
  { icon: PackageCheck, title: "Farmácias e drogarias" },
  { icon: Truck, title: "Distribuidores" },
  { icon: ShieldCheck, title: "Empresas de saúde" },
  { icon: Handshake, title: "Instituições e associações" },
];

const products = [
  {
    name: "Canabidiol Standard B2B",
    summary: "Solução de fornecimento corporativo com documentação técnica organizada e controle de procedência.",
    concentration: "Conforme especificação comercial",
    format: "Importação e distribuição empresarial",
    docs: "Ficha técnica, laudos e certificados aplicáveis",
  },
  {
    name: "Linha Governamental",
    summary: "Modelo de distribuição estruturado para demandas institucionais com rastreabilidade operacional.",
    concentration: "Sob demanda regulatória",
    format: "Distribuição para programas e instituições",
    docs: "Dossiê técnico e documentação de conformidade",
  },
  {
    name: "Solução Distribuidor",
    summary: "Atendimento para parceiros autorizados com suporte técnico, comercial e documental.",
    concentration: "Portfólio consultivo",
    format: "Fornecimento recorrente B2B",
    docs: "Pacote técnico por categoria de produto",
  },
];

const complianceTabs = [
  {
    key: "licenciamento",
    label: "Licenciamento",
    icon: FileCheck2,
    items: ["Autorizações aplicáveis", "Documentos societários", "Conferência regulatória"],
  },
  {
    key: "certificacoes",
    label: "Certificações",
    icon: BadgeCheck,
    items: ["Certificados de análise", "Comprovantes de qualidade", "Registros de lote"],
  },
  {
    key: "downloads",
    label: "Downloads",
    icon: Download,
    items: ["Ficha técnica", "Dossiê documental", "Pacote de certificados"],
  },
];

const checklist: IconItem[] = [
  { icon: Building2, title: "Dados da empresa", text: "CNPJ, razão social, endereço e responsáveis." },
  { icon: ScrollText, title: "Regulatórios", text: "Licenças, autorizações e documentos aplicáveis." },
  { icon: Boxes, title: "Produtos", text: "Categorias, volumes e previsão de demanda." },
  { icon: Scale, title: "Jurídico", text: "Contratos, termos e conformidade operacional." },
  { icon: Handshake, title: "Comercial", text: "Condições, canais e fluxo de atendimento." },
];

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-surface/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="DS Pharma Home">
            <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-button">
              <ShieldCheck className="size-5" />
            </span>
            <span className="leading-tight">
              <strong className="block text-lg font-semibold tracking-normal text-ink">DS Pharma</strong>
              <span className="text-xs font-medium text-steel">Importação e distribuição</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "bg-secondary text-secondary-foreground" : "text-steel hover:bg-muted hover:text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Button asChild variant="hero" size="sm" className="hidden md:inline-flex">
            <Link to="/cadastro-b2b">Solicitar cadastro</Link>
          </Button>
        </div>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function SectionHeader({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow && <p className="mb-3 text-sm font-semibold text-primary">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold tracking-normal text-ink md:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-7 text-steel md:text-lg">{text}</p>}
    </div>
  );
}

function IconCard({ item }: { item: IconItem }) {
  const Icon = item.icon;
  return (
    <article className="group rounded-lg border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
      <div className="mb-5 flex size-12 items-center justify-center rounded-md bg-secondary text-primary transition-transform duration-300 group-hover:scale-105">
        <Icon className="size-6" />
      </div>
      <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
      {item.text && <p className="mt-3 leading-7 text-steel">{item.text}</p>}
    </article>
  );
}

function AudienceCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCarouselState = () => {
      setCurrent(api.selectedScrollSnap());
      setCount(api.scrollSnapList().length);
    };

    updateCarouselState();
    api.on("select", updateCarouselState);
    api.on("reInit", updateCarouselState);

    return () => {
      api.off("select", updateCarouselState);
      api.off("reInit", updateCarouselState);
    };
  }, [api]);

  return (
    <div className="mx-auto max-w-6xl">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", containScroll: "trimSnaps", dragFree: false }}
        className="px-0 lg:px-14"
        aria-label="Públicos atendidos pela DS Pharma"
      >
        <CarouselContent className="-ml-4 py-2 md:-ml-5">
          {audiences.map((item) => {
            const Icon = item.icon;

            return (
              <CarouselItem key={item.title} className="basis-[88%] pl-4 sm:basis-1/2 md:pl-5 lg:basis-1/3">
                <article className="group flex min-h-[210px] flex-col justify-between rounded-lg border border-border bg-card p-7 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-card">
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-secondary text-primary transition-transform duration-300 ease-out group-hover:scale-105">
                      <Icon className="size-7" />
                    </div>
                    <span className="mt-1 h-1.5 w-10 rounded-full bg-primary/20 transition-colors duration-300 group-hover:bg-primary" />
                  </div>
                  <div className="pt-8">
                    <h3 className="text-xl font-semibold tracking-normal text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-steel">Atendimento estruturado para demandas corporativas, técnicas e institucionais.</p>
                  </div>
                </article>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-0 hidden border-border bg-card text-ink shadow-card hover:border-primary hover:bg-secondary hover:text-primary lg:inline-flex" />
        <CarouselNext className="right-0 hidden border-border bg-card text-ink shadow-card hover:border-primary hover:bg-secondary hover:text-primary lg:inline-flex" />
      </Carousel>

      <div className="mt-8 flex items-center justify-center gap-2" aria-label="Indicadores do carrossel">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => api?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ease-out ${
              current === index ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/50"
            }`}
            aria-label={`Ir para posição ${index + 1}`}
            aria-current={current === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.3fr_1fr_1fr] md:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3 text-ink">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground"><ShieldCheck className="size-5" /></span>
            <strong className="text-lg">DS Pharma</strong>
          </div>
          <p className="max-w-md leading-7 text-steel">Importadora e distribuidora especializada no fornecimento de canabidiol para pessoas jurídicas no Brasil.</p>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-ink">Empresa</h3>
          <div className="grid gap-2 text-sm text-steel">
            <Link to="/institucional" className="hover:text-primary">Institucional</Link>
            <Link to="/produtos" className="hover:text-primary">Produtos / Soluções</Link>
            <Link to="/compliance" className="hover:text-primary">Compliance</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-ink">Contato</h3>
          <div className="grid gap-2 text-sm text-steel">
            <span>comercial@dspharma.com.br</span>
            <span>Atendimento B2B e institucional</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function HomePage() {
  return (
    <Layout>
      <section className="signature-scan relative min-h-[88vh] overflow-hidden bg-hero text-hero-foreground">
        <img src={institutionalImage} alt="Ambiente corporativo farmacêutico com controle de qualidade e logística" className="absolute inset-0 h-full w-full object-cover" width={1600} height={1000} />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-4 py-24 md:px-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="mb-5 inline-flex rounded-md border border-hero-foreground/20 bg-hero-foreground/10 px-4 py-2 text-sm font-medium backdrop-blur-md">Canabidiol para pessoas jurídicas</p>
            <h1 className="text-4xl font-bold tracking-normal md:text-6xl">Canabidiol com procedência, conformidade e segurança para o seu negócio</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-hero-foreground/82">A DS Pharma é uma importadora e distribuidora especializada no fornecimento de canabidiol para empresas, com rigor técnico, controle de qualidade e atuação alinhada às normas brasileiras</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="xl"><Link to="/cadastro-b2b">Solicitar cadastro empresarial <ArrowRight className="size-4" /></Link></Button>
              <Button asChild variant="glass" size="xl"><Link to="/contato">Falar com o time comercial</Link></Button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-sm font-medium">
              {["Qualidade", "Rastreabilidade", "Compliance"].map((label) => (
                <div key={label} className="flex items-center gap-2 rounded-md border border-hero-foreground/15 bg-hero-foreground/10 px-3 py-3 backdrop-blur-md"><CheckCircle2 className="size-4 text-accent" />{label}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">Institucional</p>
            <h2 className="text-3xl font-semibold text-ink md:text-4xl">Operação dedicada ao mercado corporativo</h2>
            <p className="mt-5 text-lg leading-8 text-steel">A DS Pharma atua na importação e distribuição de canabidiol no Brasil, com foco exclusivo no atendimento a pessoas jurídicas e à distribuição para o setor governamental.</p>
          </div>
          <img src={institutionalImage} alt="Equipe farmacêutica em ambiente técnico de logística" loading="lazy" className="h-[420px] w-full rounded-lg object-cover shadow-card" width={1600} height={1000} />
        </div>
      </section>

      <section className="noise-texture bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeader eyebrow="Diferenciais" title="Controle, documentação e suporte em cada etapa" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{differentials.map((item) => <IconCard key={item.title} item={item} />)}</div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeader eyebrow="Público atendido" title="Atuação B2B e institucional" />
          <AudienceCarousel />
        </div>
      </section>

      <ComplianceCta />
    </Layout>
  );
}

export function InstitutionalPage() {
  const pillars: IconItem[] = [
    { icon: Target, title: "Missão", text: "Fornecer canabidiol para empresas com segurança, clareza documental e rigor técnico." },
    { icon: Eye, title: "Visão", text: "Ser referência nacional em distribuição corporativa responsável e rastreável." },
    { icon: Gem, title: "Valores", text: "Conformidade, transparência, qualidade, colaboração e responsabilidade operacional." },
  ];
  return (
    <Layout>
      <PageHero title="Estrutura sólida e operação responsável" text="Modelo institucional focado em empresas, controle técnico e distribuição alinhada às normas brasileiras." />
      <section className="bg-surface py-20"><div className="mx-auto max-w-4xl px-4 text-center md:px-8"><p className="text-lg leading-8 text-steel">A DS Pharma combina processos de importação, documentação técnica e distribuição especializada para atender pessoas jurídicas com previsibilidade, segurança e organização.</p></div></section>
      <section className="bg-background py-20"><div className="mx-auto max-w-7xl px-4 md:px-8"><SectionHeader title="Missão, visão e valores" /><div className="grid gap-5 md:grid-cols-3">{pillars.map((item) => <IconCard key={item.title} item={item} />)}</div></div></section>
    </Layout>
  );
}

export function ProductsPage() {
  return (
    <Layout>
      <PageHero title="Soluções com controle e procedência" text="Portfólio corporativo para fornecimento, distribuição e atendimento institucional de canabidiol." />
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.name} className="rounded-lg border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:border-primary/40">
                <img src={institutionalImage} alt={`Imagem representativa de ${product.name}`} loading="lazy" className="h-48 w-full rounded-t-lg object-cover" width={1600} height={1000} />
                <div className="p-6"><h2 className="text-xl font-semibold text-ink">{product.name}</h2><p className="mt-3 leading-7 text-steel">{product.summary}</p><Button variant="premium" className="mt-5">Ver detalhes</Button></div>
              </article>
            ))}
          </div>
          <ProductDetails />
        </div>
      </section>
    </Layout>
  );
}

function ProductDetails() {
  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary text-secondary-foreground"><tr><th className="p-4 font-semibold">Solução</th><th className="p-4 font-semibold">Aplicação</th><th className="p-4 font-semibold">Documentação</th></tr></thead>
          <tbody>{products.map((product) => <tr key={product.name} className="border-t border-border"><td className="p-4 font-medium text-ink">{product.name}</td><td className="p-4 text-steel">{product.format}</td><td className="p-4 text-steel">{product.docs}</td></tr>)}</tbody>
        </table>
      </div>
      <aside className="rounded-lg border border-border bg-card p-6 shadow-card"><h3 className="text-xl font-semibold text-ink">Certificados</h3><p className="mt-3 leading-7 text-steel">Pacote documental para avaliação técnica e comercial.</p><div className="mt-5 grid gap-3"><Button variant="outline"><Download className="size-4" /> Download de certificados</Button><Button variant="outline"><FileText className="size-4" /> Ficha técnica</Button></div></aside>
    </section>
  );
}

export function CompliancePage() {
  const [active, setActive] = useState(complianceTabs[0].key);
  const current = useMemo(() => complianceTabs.find((tab) => tab.key === active) ?? complianceTabs[0], [active]);
  const CurrentIcon = current.icon;
  return (
    <Layout>
      <PageHero title="Conformidade e transparência em cada etapa" text="Documentação organizada para apoiar decisões técnicas, jurídicas e comerciais." />
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="grid gap-3">{complianceTabs.map((tab) => <button key={tab.key} onClick={() => setActive(tab.key)} className={`flex items-center gap-3 rounded-md border p-4 text-left font-medium transition-all ${active === tab.key ? "border-primary bg-secondary text-secondary-foreground" : "border-border bg-card text-steel hover:border-primary/40 hover:text-ink"}`}><tab.icon className="size-5" />{tab.label}</button>)}</div>
            <div className="rounded-lg border border-border bg-card p-8 shadow-card"><CurrentIcon className="mb-5 size-10 text-primary" /><h2 className="text-2xl font-semibold text-ink">{current.label}</h2><div className="mt-6 grid gap-3">{current.items.map((item) => <div key={item} className="flex items-center justify-between rounded-md border border-border bg-surface-elevated p-4"><span className="font-medium text-ink">{item}</span><Button variant="outline" size="sm">Visualizar</Button></div>)}</div></div>
          </div>
          <Traceability />
        </div>
      </section>
    </Layout>
  );
}

function Traceability() {
  const steps: IconItem[] = [{ icon: MapPinned, title: "Origem" }, { icon: Route, title: "Transporte" }, { icon: Boxes, title: "Armazenamento" }, { icon: CheckCircle2, title: "Entrega" }];
  return <section className="mt-12 rounded-lg bg-secondary p-8"><h2 className="mb-8 text-2xl font-semibold text-ink">Rastreabilidade</h2><div className="grid gap-4 md:grid-cols-4">{steps.map((step) => <IconCard key={step.title} item={step} />)}</div></section>;
}

export function B2BRegisterPage() {
  const [step, setStep] = useState(1);
  const submit = (event: FormEvent) => { event.preventDefault(); setStep(3); };
  return (
    <Layout>
      <PageHero title="Solicitação de cadastro empresarial" text="Fluxo inicial para análise comercial e documental de parceiros B2B." />
      <section className="bg-background py-20"><div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[0.8fr_1.2fr] md:px-8"><div><SectionHeader title="Checklist de informações obrigatórias" text="Blocos organizados para agilizar a análise empresarial." /> <div className="grid gap-4">{checklist.map((item) => <IconCard key={item.title} item={item} />)}</div></div><form onSubmit={submit} className="rounded-lg border border-border bg-card p-6 shadow-card"><div className="mb-6 flex gap-2">{[1,2,3].map((item) => <span key={item} className={`h-2 flex-1 rounded-full ${item <= step ? "bg-primary" : "bg-border"}`} />)}</div>{step === 1 && <FormStep title="Dados da empresa" fields={["Razão social", "CNPJ", "Segmento", "Volume estimado"]} onNext={() => setStep(2)} />}{step === 2 && <FormStep title="Contato" fields={["Nome do responsável", "E-mail corporativo", "Telefone", "Mensagem"]} onNext={() => setStep(3)} submit />}{step === 3 && <div className="py-12 text-center"><CheckCircle2 className="mx-auto mb-5 size-14 text-primary" /><h2 className="text-2xl font-semibold text-ink">Cadastro recebido</h2><p className="mt-3 text-steel">O time comercial retornará com as próximas etapas de análise.</p></div>}</form></div></section>
    </Layout>
  );
}

function FormStep({ title, fields, onNext, submit }: { title: string; fields: string[]; onNext: () => void; submit?: boolean }) {
  return <div><h2 className="mb-6 text-2xl font-semibold text-ink">{title}</h2><div className="grid gap-4">{fields.map((field) => <label key={field} className="grid gap-2 text-sm font-medium text-ink">{field}<input required className="h-11 rounded-md border border-input bg-background px-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>)}</div><Button type={submit ? "submit" : "button"} onClick={submit ? undefined : onNext} variant="hero" className="mt-6">{submit ? "Enviar solicitação" : "Continuar"}</Button></div>;
}

export function ContactPage() {
  return (
    <Layout>
      <PageHero title="Fale com a DS Pharma" text="Atendimento comercial especializado para empresas, distribuidores e instituições." />
      <section className="bg-background py-20"><div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-8"><div className="grid content-start gap-5">{[{ icon: Phone, title: "Telefone", text: "Atendimento comercial" }, { icon: Mail, title: "E-mail", text: "comercial@dspharma.com.br" }, { icon: MapPin, title: "Localização", text: "Brasil" }, { icon: Handshake, title: "WhatsApp", text: "Canal B2B" }].map((item) => <IconCard key={item.title} item={item} />)}</div><form className="rounded-lg border border-border bg-card p-6 shadow-card"><h2 className="mb-6 text-2xl font-semibold text-ink">Contato comercial</h2><div className="grid gap-4">{["Nome", "Empresa", "E-mail", "Telefone"].map((field) => <label key={field} className="grid gap-2 text-sm font-medium text-ink">{field}<input required className="h-11 rounded-md border border-input bg-background px-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>)}<label className="grid gap-2 text-sm font-medium text-ink">Mensagem<textarea required className="min-h-32 rounded-md border border-input bg-background p-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20" /></label></div><Button variant="hero" className="mt-6">Enviar mensagem</Button></form></div></section>
    </Layout>
  );
}

function ComplianceCta() {
  return <section className="bg-secondary py-20"><div className="mx-auto max-w-4xl px-4 text-center md:px-8"><LockKeyhole className="mx-auto mb-5 size-12 text-primary" /><h2 className="text-3xl font-semibold text-ink md:text-4xl">Compliance como base da operação</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-steel">Trabalhamos com rigor técnico e documentação completa, garantindo segurança jurídica e operacional para nossos parceiros</p><Button asChild variant="premium" size="xl" className="mt-8"><Link to="/compliance">Ver documentação e certificações</Link></Button></div></section>;
}

function PageHero({ title, text }: { title: string; text: string }) {
  return <section className="relative overflow-hidden bg-hero py-24 text-hero-foreground"><img src={institutionalImage} alt="Operação farmacêutica institucional" className="absolute inset-0 h-full w-full object-cover opacity-30" width={1600} height={1000} /><div className="hero-overlay absolute inset-0" /><div className="relative mx-auto max-w-7xl px-4 md:px-8"><h1 className="max-w-3xl text-4xl font-bold tracking-normal md:text-5xl">{title}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-hero-foreground/82">{text}</p></div></section>;
}