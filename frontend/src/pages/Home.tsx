import { useEffect, useState } from "react"
import { Search } from "../components/Search"
import { LinkCard } from "../components/LinkCard";
import { InfoCard } from "../components/InfoCard";
import { CircularLoader } from "../components/CircularLoader";

const protocolRegex = /^https?:\/\//i;

function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!protocolRegex.test(trimmed)) {
    return "https://" + trimmed;
  }
  return trimmed;
}

const hostnameRegex = /^(?!-)(?!.*--)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/;

const validTlds = new Set([
  "com", "net", "org", "io", "co", "dev", "app", "edu", "gov",
  "info", "biz", "xyz", "online", "shop", "site", "blog"
]);

function isValidUrl(url: string): boolean {
  try {
    const normalized = normalizeUrl(url);
    const parsed = new URL(normalized);

    const hostname = parsed.hostname;

    if (!hostnameRegex.test(hostname)) {
      return false;
    }

    const parts = hostname.split(".");
    const tld = parts[parts.length - 1].toLowerCase();

    if (!validTlds.has(tld)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export interface Link { //todo: mover a un archivo types.ts o interfaces.ts
  id: number;
  original_url: string;
  short_code?: string;
  clicks: number;
  created_at: string;
  description: string | null;
}

const LOCAL_STORAGE_KEY = "links";
const MIN_RECENT_LINKS_LOADING_MS = 1000;

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLinksHydrated, setIsLinksHydrated] = useState(false);
  const [isLoadingRecentLinks, setIsLoadingRecentLinks] = useState(true);

  const [links, setLinks] = useState<Link[]>([]);

  const featureCards = [
    {
      title: "Instant Stats",
      description: "Get immediate visibility into how many people are clicking your links. No dashboard login required.",
      icon: "stats" as const,
    },
    {
      title: "Ultra Fast",
      description: "Our global edge network ensures redirects happen in milliseconds, providing a seamless experience for your visitors.",
      icon: "bolt" as const,
    },
    {
      title: "Privacy First",
      description: "We don't sell your data or track your users across the web. Your links are safe and your privacy is respected.",
      icon: "shield" as const,
    },
  ];

  const clearHistory = (): void => {
    setLinks([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  const createUrl = async (): Promise<void> => {
    if (!isValidUrl(searchTerm)) {
      setErrorMessage("Please enter a valid URL (e.g. google.com or https://example.com).");
      return;
    }

    setErrorMessage("");
    const normalizedUrl = normalizeUrl(searchTerm);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ original_url: normalizedUrl })
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/urls", options);
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not shorten this URL. Please try again.");
        return;
      }

      setLinks((prevLinks) => {
        return [...prevLinks, data];
      });
      setSearchTerm("");
    } catch {
      setErrorMessage("Connection error. Please try again in a moment.");
    }
  }

  useEffect(() => {
    let isMounted = true;

    const validateStoredLinks = async () => {
      const startedAt = Date.now();

      const finishLoading = () => {
        const elapsed = Date.now() - startedAt;
        const remaining = Math.max(0, MIN_RECENT_LINKS_LOADING_MS - elapsed);

        window.setTimeout(() => {
          if (!isMounted) {
            return;
          }

          setIsLinksHydrated(true);
          setIsLoadingRecentLinks(false);
        }, remaining);
      };

      try {
        const storedLinks = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!storedLinks) {
          setLinks([]);
          return;
        }

        const parsedLinks = JSON.parse(storedLinks) as Link[];

        if (!Array.isArray(parsedLinks) || parsedLinks.length === 0) {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          setLinks([]);
          return;
        }

        type LinkValidationResult =
          | { status: "ok"; original: Link; data: Link }
          | { status: "not_found"; original: Link }
          | { status: "error"; original: Link };

        const validationResults = await Promise.all(
          parsedLinks.map(async (link): Promise<LinkValidationResult> => {
            if (!link.short_code) {
              return { status: "ok", original: link, data: link };
            }

            try {
              const response = await fetch(`http://localhost:3000/api/v1/urls/${link.short_code}`);

              if (response.status === 404) {
                return { status: "not_found", original: link };
              }

              if (!response.ok) {
                return { status: "error", original: link };
              }

              const serverLink = await response.json();
              return { status: "ok", original: link, data: serverLink as Link };
            } catch {
              return { status: "error", original: link };
            }
          })
        );

        const notFoundCodes = new Set(
          validationResults
            .filter((result): result is { status: "not_found"; original: Link } => result.status === "not_found")
            .map((result) => result.original.short_code)
            .filter((shortCode): shortCode is string => Boolean(shortCode))
        );

        const refreshedLinksByCode = new Map(
          validationResults
            .filter((result): result is { status: "ok"; original: Link; data: Link } => result.status === "ok")
            .map((result) => [result.original.short_code, result.data] as const)
            .filter(([shortCode]) => Boolean(shortCode))
        );

        const validLinks = parsedLinks
          .filter((link) => !link.short_code || !notFoundCodes.has(link.short_code))
          .map((link) => {
            if (!link.short_code) {
              return link;
            }

            return refreshedLinksByCode.get(link.short_code) ?? link;
          });

        setLinks(validLinks);
      } catch {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setLinks([]);
      } finally {
        finishLoading();
      }
    };

    void validateStoredLinks();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLinksHydrated) {
      return;
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(links));
  }, [links, isLinksHydrated])

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }, [searchTerm])

  return (
    <div className="w-full bg-linear-to-b from-[#0d1018] via-[#0b0f19] to-[#090c14]">
      <section className="relative mx-auto flex w-full max-w-305 flex-col items-center overflow-hidden px-6 pb-24 pt-16 md:px-10">
        <div className="pointer-events-none absolute top-12 h-90 w-[62%] rounded-full bg-primary/25 blur-[150px]" />

        <h1 className="text-center text-5xl font-black leading-[0.95] text-white md:text-7xl">
          Simplify Your Links.
          <br />
          <span className="text-primary">Broaden Your Reach.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-center text-xl text-slate-400">
          No accounts, no subscriptions, no fuss. The fastest way to shorten your URLs with built-in basic tracking.
        </p>

        <div className="mt-10 w-full max-w-2xl rounded-2xl border border-white/12 bg-[#131724] p-2 shadow-[0_20px_60px_-25px_rgba(124,59,237,0.55)]">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} createUrl={createUrl} />

          {errorMessage ? (
            <p className="mt-3 px-1 text-center text-sm font-semibold text-rose-400">
              {errorMessage}
            </p>
          ) : null}

        </div>

        <section className="mt-16 w-full max-w-4xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-extrabold text-slate-100">
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#8f5cff"><path d="M240-200q-100 0-170-70T0-440q0-84 50.5-148T184-676q23-115 112-189.5T500-940q116 0 204.5 74.5T816-676q82 16 133 80t51 156q0 100-70 170t-170 70H240Zm20-80h500q66 0 113-47t47-113q0-66-47-113t-113-47h-26v-40q0-100-70-170t-170-70q-100 0-170 70t-70 170v40h-24q-66 0-113 47t-47 113q0 66 47 113t113 47Zm220-200Z"/></svg>
              Recent Links
            </h2>

            <button
              type="button"
              onClick={clearHistory}
              className="text-sm font-semibold text-primary hover:text-primary/80"
            >
              Clear history
            </button>
          </div>

          <div className="space-y-3">
            {isLoadingRecentLinks ? (
              <div className="rounded-xl border border-dashed border-slate-700 bg-[#141825] px-6 py-12 text-center">
                <CircularLoader label="Loading recent links..." />
              </div>
            ) : links.length > 0 ? (
              links.map((link: Link) => (
                <LinkCard key={link.id} link={link} />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-700 bg-[#141825] px-6 py-10 text-center">
                <div className="mx-auto mb-4 w-fit rounded-full bg-white/5 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 24 24" width="30" fill="#62748e"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M21,8c-1.45,0-2.26,1.44-1.93,2.51l-3.55,3.56c-0.3-0.09-0.74-0.09-1.04,0l-2.55-2.55C12.27,10.45,11.46,9,10,9 c-1.45,0-2.27,1.44-1.93,2.52l-4.56,4.55C2.44,15.74,1,16.55,1,18c0,1.1,0.9,2,2,2c1.45,0,2.26-1.44,1.93-2.51l4.55-4.56 c0.3,0.09,0.74,0.09,1.04,0l2.55,2.55C12.73,16.55,13.54,18,15,18c1.45,0,2.27-1.44,1.93-2.52l3.56-3.55 C21.56,12.26,23,11.45,23,10C23,8.9,22.1,8,21,8z"/><polygon points="15,9 15.94,6.93 18,6 15.94,5.07 15,3 14.08,5.07 12,6 14.08,6.93"/><polygon points="3.5,11 4,9 6,8.5 4,8 3.5,6 3,8 1,8.5 3,9"/></g></g></svg>
                </div>
                <p className="text-lg font-bold text-slate-100">No links shortened yet</p>
                <p className="mt-2 text-sm text-slate-400">Your shortened link and analytics will appear here once you process a URL.</p>
              </div>
            )}
          </div>
        </section>
      </section>

      <section className="border-y border-white/6 bg-[#090d17] py-20">
        <div className="mx-auto w-full max-w-305 px-6 md:px-10">
          <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Everything you need, for free.</h2>
          <p className="mt-6 max-w-3xl text-lg text-slate-400">
            We believe link management should be accessible to everyone without barriers or hidden fees.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {featureCards.map((feature) => (
              <InfoCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
            

          <article className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-primary/30 bg-[#121628] px-8 py-9 md:flex-row md:items-center">
            <div>
              <h3 className="text-3xl font-extrabold">100% Free Forever</h3>
              <p className="mt-2 text-slate-400">
                Our core link shortening service is supported by donations and will always remain free for individual use.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="#8f5cff"><path d="M480-80q-139-35-229.5-160T160-520v-280l320-120 320 120v280q0 155-90.5 280T480-80Zm0-84q104-33 172-132.5T720-520v-224l-240-90-240 90v224q0 124 68 223.5T480-164Zm0-316Z"/></svg>
              No Account Needed
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
