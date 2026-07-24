import FunnelScripts from "./FunnelScripts";

/* Small inline line-icons (C11) — one stroke weight, currentColor. */
const Ico = {
  check: (
    <svg viewBox="0 0 22 22" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11.5l4.5 4.5L18 6" /></svg>
  ),
  cross: (
    <svg viewBox="0 0 22 22" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l10 10M16 6L6 16" /></svg>
  ),
  arrow: (
    <span className="cta-arrow"><svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h11M11 5.5L15.5 10 11 14.5" /></svg></span>
  ),
  shield: (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.6l8 3v5.4c0 4.6-3.1 8-8 9.4-4.9-1.4-8-4.8-8-9.4V5.6z" /><path d="M8.5 12l2.4 2.4L16 9.4" /></svg>
  ),
  shieldSm: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.6l8 3v5.4c0 4.4-3 7.6-8 8.8-5-1.2-8-4.4-8-8.8V5.6z" /><path d="M9 12l2 2 4-4.2" /></svg>
  ),
  plus: (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 4v12M4 10h12" /></svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="12" height="12" rx="2.5" /><path d="M15 10.5l5.5-3.2v9.4L15 13.5z" /></svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="10.5" width="14" height="9" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.4" /><path d="M5.5 19.5c0-3.7 3-5.7 6.5-5.7s6.5 2 6.5 5.7" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.4" /><path d="M12 7.6V12l3 1.8" /></svg>
  ),
};

/* Energy wave: a few smooth frequency waves interweaving and glowing, swelling
   with energy toward the centre and settling at the edges. On-brand for the
   Frequency Lab. Pure vector, owned. */
function EnergyWave() {
  const W = 1600, H = 420, mid = 210, SAMPLES = 220, TAU = Math.PI * 2;
  const env = (u: number) => 0.28 + 0.72 * Math.sin(Math.PI * u); // energy swells to the centre
  const waves: { f: number; a: number; p: number; sw: number; op: number }[] = [
    { f: 2.0, a: 74, p: 0.0, sw: 2.4, op: 0.92 }, // carrier, brightest
    { f: 1.4, a: 96, p: 2.1, sw: 1.5, op: 0.5 },
    { f: 3.0, a: 48, p: 0.8, sw: 1.4, op: 0.55 },
    { f: 4.3, a: 30, p: 1.2, sw: 1.0, op: 0.4 },
    { f: 2.6, a: 60, p: 3.5, sw: 1.1, op: 0.36 },
  ];
  const build = (w: { f: number; a: number; p: number }) => {
    let pts = "";
    for (let s = 0; s <= SAMPLES; s++) {
      const u = s / SAMPLES, x = u * W;
      const y = mid + env(u) * w.a * Math.sin((w.f * u + w.p) * TAU);
      pts += `${x.toFixed(1)},${y.toFixed(1)} `;
    }
    return pts;
  };
  const lines = waves.map((w) => ({ ...w, pts: build(w) }));

  return (
    <svg className="wave-bg" aria-hidden="true" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="enGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
          <stop offset="0%" stopColor="#8B7CFF" />
          <stop offset="48%" stopColor="#7CE8E1" />
          <stop offset="100%" stopColor="#87C5F2" />
        </linearGradient>
        <filter id="enGlow" x="-3%" y="-60%" width="106%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      {/* neon bloom */}
      <g filter="url(#enGlow)" opacity="0.5">
        {lines.map((l, i) => (
          <polyline key={`b${i}`} points={l.pts} fill="none" stroke="url(#enGrad)" strokeWidth={l.sw + 1.4} />
        ))}
      </g>
      {/* crisp frequency waves */}
      {lines.map((l, i) => (
        <polyline key={i} points={l.pts} fill="none" stroke="url(#enGrad)"
          strokeWidth={l.sw} opacity={l.op} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

const PRIMARY_HREF = "#book"; // booking not wired yet — see CONFIRM list

function PrimaryCTA({ breathe, micro }: { breathe?: boolean; micro?: React.ReactNode }) {
  return (
    <div className="hero-cta">
      <a className={`cta${breathe ? " cta--breathe" : ""}`} href={PRIMARY_HREF}>
        <span>Book My Session</span>
        {Ico.arrow}
      </a>
      {micro}
    </div>
  );
}

const LAB_TESTIMONIALS = [
  {
    photo: "Regan.jpg",
    pos: "38% 16%",
    name: "Regan Hillyer",
    title: "Global Wellness Celebrity & Manifestation Coach",
    quote: "About 4 years ago I met Govind and he introduced me to some of the best biohacking tools in the market. The Lucia No 3 is my favourite.",
  },
  {
    photo: "Eric.jpg",
    pos: "50% 18%",
    name: "Eric Edmeades",
    title: "Global Wellness Celebrity & Founder of WildFit",
    quote: "I was invited with my family by Govind to visit The Frequency Lab in Dubai and we truly had a rejuvenating experience. Hope to be back soon.",
  },
  {
    photo: "Agon.png",
    pos: "50% 22%",
    name: "Agon",
    title: "Global Influencer & Founder of Project Nightfall",
    quote: "I visited The Frequency Lab along with Sonya and had a severe back pain from a padel game the previous day. In one hour my back pain disappeared totally and I was a brand new man. Amazing work you are doing there, Govind.",
  },
  {
    photo: "Camelia.jpg",
    pos: "50% 32%",
    name: "Camelia Mohebi",
    title: "Multidisciplinary Artist & Founder of The Sima Collective",
    quote: "I met Govind during a 9D breathwork workshop he was co-hosting. The experience with the Lucia Light was so incredible that I decided to buy it. We recently ran a Light & Journal workshop for artists from across the region which elicited a great response. Looking forward to many more wonderful collaborations.",
  },
  {
    photo: "Saliha.jpg",
    pos: "50% 32%",
    name: "Dr Saliha Afridi",
    title: "Clinical Psychologist & Founder of Lighthouse Arabia",
    quote: "Govind introduced me to the Lucia No 3 and it is one of my most prized possessions. The visual journey through time and space is both healing and invigorating at the same time.",
  },
  {
    photo: "Barkha.jpg",
    pos: "50% 16%",
    name: "Barkha Shewakramani",
    title: "Global Socialite & Founder of Barkha Beauty",
    quote: "I had taken serious steps to enhance my health, and it was at this juncture that I was introduced to Govind and The Frequency Lab. I have incorporated some of this wellness tech into my daily practices and in less than a month it has started reflecting in a good way on my health. I am now sharing this wisdom with all my friends and family.",
  },
  {
    photo: "Robert.jpg",
    pos: "50% 30%",
    name: "Robert Simic",
    title: "Global NLP Coach & Founder of the RS Method",
    quote: "I experienced the beauty of the Lucia No 3 through Govind and later he introduced me to PEMF therapy too. These biohacking tools ensure that my mental and physical health remain in top shape.",
  },
];

const FAQS = [
  {
    q: "Is this spiritual or religious?",
    a: "No robes, no mysticism, no guru language. It is a body-first, rational method built on the nervous system and how the mind actually works.",
  },
  {
    q: "Is the session online or in person?",
    a: "It is a live, one-on-one online session with Govind, so you can do it from anywhere. The Frequency Lab, his physical space in Dubai, is a separate in-person experience.",
    most: true,
  },
  {
    q: "Is this just a sales call in disguise?",
    a: "No. It is a paid session with a real deliverable: your biggest alignment gap and a plan to close it. There is no pitch in the session. What it does or does not lead to afterward is entirely your call.",
  },
  {
    q: "Do I have to believe in any of it for it to work?",
    a: "No. The session is designed to produce a felt result while you are in it, whether you arrive a believer or a skeptic.",
  },
  {
    q: "I have genuinely tried everything. Why would this be different?",
    a: "Because everything you tried worked on your thinking. This starts with the body and the part of the mind underneath it, which is why it lands when talk-based methods slid off.",
  },
  {
    q: "What exactly do I walk away with?",
    a: "The experience of a felt shift, your single biggest alignment gap identified, and a clear action plan.",
  },
  {
    q: "Will my privacy be protected?",
    a: "Completely. Sessions are one-on-one and confidential. Nothing you bring into the session leaves it.",
  },
];

export default function Page() {
  return (
    <>
      {/* ============ [1] HERO ============ */}
      <section className="hero stage">
        <span className="grain" aria-hidden="true" />
        <EnergyWave />
        {/* brand lockup lives on the dark stage so it reads light-on-dark */}
        <header className="brand">
          <span className="brand-name">Govind Das</span>
          <span className="brand-tag">Consciousness Coaching</span>
        </header>
        <div className="hero-inner">
          <span className="eyebrow hero-eyebrow reveal">
            For the founder or senior executive in Dubai who has won the material game
          </span>
          <h1 className="hero-h1 reveal d1">
            You got everything you wanted. And you feel <span className="em">none</span> of it.
          </h1>
          <p className="hero-sub reveal d2">
            <span className="lede">You have done all the reading. This is the part you have to feel.</span> One
            paid session with Govind, live and one-on-one, where the shift happens in real time, not in another
            book you will finish and forget.
          </p>

          {/* VSL — the lit focal object */}
          <div className="vsl reveal d2" id="vsl" role="button" aria-label="Play the 5-minute film" tabIndex={0}>
            <div className="vsl-poster" aria-hidden="true" />
            <span className="vsl-play pulse" aria-hidden="true" />
            <span className="vsl-time">5:00</span>
            {/* drop the real file in /public and the script swaps poster → <video> */}
            <video data-vsl-src className="vsl-poster" style={{ display: "none" }} playsInline preload="none" />
          </div>

          <PrimaryCTA
            breathe
            micro={
              <>
                <ul className="cta-points">
                  <li>{Ico.video}<span>Live, one-on-one, online</span></li>
                  <li>{Ico.lock}<span>Held with a deposit</span></li>
                  <li>{Ico.shieldSm}<span>Felt-shift guarantee, or your fee is returned</span></li>
                </ul>
                <a className="cta-soft soft-door" href="#vsl">
                  Not ready to book? Watch the 5-minute film first
                </a>
              </>
            }
          />
        </div>
      </section>

      {/* ============ [2] THE MIRROR ============ */}
      <section className="section mirror">
        <div className="inner-narrow">
          <p className="reveal">
            You got everything you said you wanted. The exit, the title, the life that looks complete from the
            outside.
          </p>
          <p className="reveal">
            And inside, you feel none of it. Tired, off, hollow, and unable to name exactly why.
          </p>
          <p className="tried reveal">
            You have tried the obvious answers. Therapy. Coaching. The meditation apps. The retreats. A shelf of
            books you can quote and still cannot act on. Each one touched a single layer. Nothing held.
          </p>
          <p className="verdict reveal">
            This is not in your head, and it is not a discipline problem.
          </p>
        </div>
      </section>

      {/* ============ [3] WHY NOTHING HELD ============ */}
      <section className="section section--soft why">
        <div className="inner-narrow">
          <div className="sec-head reveal">
            <span className="eyebrow">Why nothing held</span>
            <h2 className="sec-h2">
              Willpower was never the problem. You were handed a map of{" "}
              <span className="em">one-tenth</span> of the territory.
            </h2>
          </div>
          <p className="reveal">
            Here is the part no one told you. Every method you tried worked on your <b>thinking</b>, maybe ten
            percent of what actually runs you.
          </p>

          <figure className="fig reveal">
            <img
              src="/assets/why-nothing-held.png"
              alt="Ten percent: the thinking mind of thoughts, habits, behaviors and emotions, where every method worked. Ninety percent: the nervous system core that actually runs you, which none of them ever reached."
              width={1536}
              height={801}
            />
          </figure>

          <p className="reveal">
            None of them reached the ninety percent underneath, or the body that has run in overdrive for years.
            You are not weak. You were never given the manual for the rest of it.
          </p>
          <p className="verdict reveal">That is what this is.</p>
        </div>
      </section>

      {/* ============ [4] THE FRAMEWORK ============ */}
      <section className="section frame">
        <div className="inner">
          <div className="sec-head reveal">
            <span className="eyebrow">The framework</span>
            <h2 className="sec-h2">
              The one that is blocked is quietly costing you the other <span className="em">two.</span>
            </h2>
            <p className="sec-deck">
              Most successful people have one or two of three things. A strong body and relationships. Real wealth.
              Genuine inner peace. Almost no one has all three.
            </p>
          </div>

          <figure className="fig reveal">
            <img
              src="/assets/the-framework.png"
              alt="The Holistic Success Framework. At the core, Holistic Success, ringed by the three things: Inner Peace, Body and Relationships, and Real Wealth, where one being blocked quietly drains the other two. Beneath them, the five dimensions aligned at once: physical energy, mental clarity, intellectual wisdom, emotional stability, and spiritual purpose."
              width={1536}
              height={1024}
            />
          </figure>

          <p className="center reveal" style={{ maxWidth: "62ch", margin: "0 auto clamp(30px,4vw,44px)", color: "var(--ink-2)", fontSize: "clamp(16px,1.6vw,19px)", lineHeight: 1.64 }}>
            Govind calls the work that changes this the <b style={{ color: "var(--ink)" }}>Holistic Success
            Framework</b>: five dimensions, aligned at once (physical energy, mental clarity, intellectual wisdom,
            emotional stability, spiritual purpose). Not another thing to add on top of a busy life. The operating
            system underneath it.
          </p>

          <p className="frame-foot reveal">
            It starts where talk cannot reach: the body and the nervous system. Raise the body&rsquo;s state, and a
            new pattern finally has something to anchor into.
          </p>
        </div>
      </section>

      {/* ============ [5] WHY IT WORKS WHERE TALK DIDN'T ============ */}
      <section className="section section--soft">
        <div className="inner">
          <div className="sec-head reveal">
            <span className="eyebrow">Why it works where talk did not</span>
            <h2 className="sec-h2">You do not have to take any of this on <span className="em">faith.</span></h2>
            <p className="sec-deck">It is grounded in things you can test.</p>
          </div>

          <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
            <defs>
              <linearGradient id="iconGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7CE8E1" />
                <stop offset="55%" stopColor="#87C5F2" />
                <stop offset="100%" stopColor="#A99BFF" />
              </linearGradient>
            </defs>
          </svg>

          <div className="reasons reveal">
            <div className="reason">
              <span className="reason-glyph" aria-hidden="true">
                <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="url(#iconGrad)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="20" cy="20" r="14" />
                  <circle cx="24.5" cy="15.5" r="3" />
                  <circle cx="25" cy="15.8" r="0.7" fill="url(#iconGrad)" stroke="none" />
                  <path d="M10 19 c1.5 -1.5 3 0 4.5 -1.5" />
                  <ellipse cx="15" cy="26" rx="2.6" ry="1.6" transform="rotate(35 15 26)" />
                  <circle cx="13" cy="14" r="1" />
                  <circle cx="27" cy="25" r="1.2" />
                  <circle cx="20.5" cy="27" r="0.9" />
                </svg>
              </span>
              <div className="reason-tag"><span className="reason-n">01</span>Cell biology</div>
              <div className="reason-body">
                Your body runs on <b>measurable electrical activity.</b> When a cell&rsquo;s charge drops, the body
                struggles to function. Established cell biology, not metaphor.
              </div>
            </div>
            <div className="reason">
              <span className="reason-glyph" aria-hidden="true">
                <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="url(#iconGrad)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M27 31.5 L27 25.5 C30.8 23.6 32.5 19.2 32.5 15.5 C32.5 9.2 27.3 5 20.8 5 C14.3 5 9 9.8 9 16.2 C9 19 10.4 21 12 22.3 L10.6 24.6 C10.1 25.4 10.6 26.2 11.5 26.2 L14 26.2 L14 30" />
                  <path d="M17.5 21 c-2 0.3 -3.6 -1.6 -2.9 -3.5 c-1.4 -1.3 -0.7 -3.7 1.2 -4 c0.4 -1.8 2.5 -2.6 4 -1.5 c1.3 -1 3.2 -0.3 3.6 1.3 c1.9 0.1 2.8 2.3 1.5 3.7 c0.6 1.7 -0.9 3.4 -2.6 3 M20 11.8 V22 M16.6 16.4 q2 1.2 3.4 0 M21 15.2 q1.6 1 3 0" />
                </svg>
              </span>
              <div className="reason-tag"><span className="reason-n">02</span>The mind</div>
              <div className="reason-body">
                Your mind runs largely <b>below conscious awareness.</b> Talk reaches the small, conscious part. The
                rest pulls the other way, which is why willpower keeps failing you, and what the session actually
                works with.
              </div>
            </div>
            <div className="reason">
              <span className="reason-glyph" aria-hidden="true">
                <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="url(#iconGrad)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11.5 13.5 A12 12 0 1 1 9.2 23" strokeDasharray="0.1 3.2" />
                  <path d="M14.5 11.4 A12 12 0 0 1 33 20.5 A12 12 0 0 1 21 32.5" />
                  <path d="M14.5 11.4 L9.5 11.2 L11.5 16 Z" fill="url(#iconGrad)" stroke="none" />
                  <path d="M21 14 L21 20.5 L26.5 20.5" />
                </svg>
              </span>
              <div className="reason-tag"><span className="reason-n">03</span>The session</div>
              <div className="reason-body">
                The session is <b>a guided experience, live</b>, that works with the body and the nervous system
                first. That is why a felt shift happens in real time, instead of another insight you understand and
                still cannot act on.
              </div>
            </div>
          </div>

          <div className="pullquote reveal">
            <p>
              &ldquo;A prized possession.&rdquo; A clinical psychologist who has been through the Lab owns the device
              and keeps one at home. When a clinician does that, you are past the question of whether the work is
              real.
            </p>
            <span className="pq-cite">
              <b>Dr Saliha Afridi</b> &middot; Founder, Lighthouse Arabia <span style={{ opacity: 0.6 }}>[confirm sign-off]</span>
            </span>
          </div>

          <div className="labnote reveal">
            <span className="labnote-kicker">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <path d="M14 3v6h6" />
                <path d="M8 13h8M8 17h5" />
              </svg>
              Note
            </span>
            <p className="labnote-claim">
              And this is not a guru with a microphone. Govind also runs <b>The Frequency Lab</b> in Dubai, a real,
              physical space built on measurable biohacking technology, with a clientele of global wellness names.
            </p>
            <p className="labnote-clarify">
              <span className="labnote-tag">Online vs the Lab</span>
              The Lab is the in-person side of his work. Your Experiential Session is delivered live online.
            </p>
          </div>
        </div>
      </section>

      {/* ============ [6] FROM THE BOARDROOM TO THE ROOM ============ */}
      <section className="section stage">
        <span className="grain" aria-hidden="true" />
        <div className="inner" style={{ position: "relative", zIndex: 2 }}>
          <div className="sec-head reveal">
            <span className="eyebrow">From the boardroom to the room</span>
            <h2 className="sec-h2">
              He won at your game first. Then went <span className="em">deeper.</span>
            </h2>
          </div>

          <div className="auth-dual">
            <div className="auth-track reveal">
              <div className="auth-num">24</div>
              <div className="auth-track-lab">years winning inside<br />corporate sales</div>
            </div>
            <div className="auth-arrow reveal d1" aria-hidden="true">
              <span className="auth-arrow-lab">then</span>
              <svg viewBox="0 0 120 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="7" x2="110" y2="7" />
                <path d="M103 2.5 L113 7 L103 11.5" />
              </svg>
            </div>
            <div className="auth-track reveal d2">
              <div className="auth-num">20</div>
              <div className="auth-track-lab">years of disciplined<br />study under a master</div>
            </div>
          </div>

          <p className="auth-body reveal">
            That dual track is the difference. <b>No other coach in the region can speak to the boardroom and the
            body with equal authority</b>, the strategy you respect and the part underneath it that no spreadsheet
            reaches.
          </p>
          <p className="auth-coda reveal">
            No robes. No microphone and big claims. A man who succeeded at your game, then went looking for what
            success could not buy, and found it.
          </p>
        </div>
      </section>

      {/* ============ [7] WHAT THE SESSION IS ============ */}
      <section className="section">
        <div className="inner">
          <div className="sec-head reveal">
            <span className="eyebrow">What the session is</span>
            <h2 className="sec-h2">A <span className="em">diagnostic</span> for your inner operating system.</h2>
          </div>

          <div className="lede-card reveal">
            <p className="k">
              In one session, Govind finds where you are leaking energy across the five dimensions, names your single
              biggest alignment gap, and shows you exactly how to close it. You leave with a clear action plan, and
              the experience of what aligned success actually feels like.
            </p>
          </div>

          <div className="traits reveal">
            <div className="trait">
              <p className="trait-is">A felt experience that changes your state in the session.</p>
              <p className="trait-not">Not another course, call, or book to get through.</p>
            </div>
            <div className="trait">
              <p className="trait-is">A body-first, rational method.</p>
              <p className="trait-not">Not robes, mysticism, or ashram language.</p>
            </div>
            <div className="trait">
              <p className="trait-is">Led by someone who won at your game first, then went deeper.</p>
              <p className="trait-not">Not a one-year guru with a microphone and big claims.</p>
            </div>
            <div className="trait">
              <p className="trait-is">One paid session that proves itself before you commit to anything.</p>
              <p className="trait-not">Not a free call where the real agenda is to sell you.</p>
            </div>
          </div>

          <div className="paidfree reveal">
            <p>
              <b>Why it is paid, not free:</b> a free call is a sales call, and you can smell it from the first
              minute. When you pay for the session, you do not arrive as a prospect being pitched. You arrive as a
              client already in the session.
            </p>
            <span className="nopitch">There is no pitch in the session.</span>
          </div>
        </div>
      </section>

      {/* ============ [8] PROOF ============ */}
      <section className="section section--soft">
        <div className="inner">
          <div className="sec-head reveal">
            <span className="eyebrow">On the work itself</span>
            <h2 className="sec-h2">Two <span className="em">decades</span> of sessions. Run entirely on word of mouth.</h2>
          </div>

          <figure className="tcard tcard--lead reveal">
            <blockquote className="tcard-quote">
              When I was at a crossroads once and looking for clarity, a three-hour coaching session with Govind
              really helped me unravel a lot and finally see things in the right perspective. I would highly
              recommend a personal coaching session with him over multiple hours of talk therapy with a psychologist.
            </blockquote>
            <figcaption className="tcard-cite">
              <img className="tcard-photo" src="/assets/Meenakshi.jpg" alt="Meenakshi Arora" style={{ objectPosition: "50% 32%" }} />
              <span className="tcard-who">
                <span className="tcard-name">Meenakshi Arora</span>
                <span className="tcard-title">Head, Learning &amp; Development, UAE firm</span>
              </span>
            </figcaption>
          </figure>

          <div className="assoc reveal">
            <div className="lab-head">
              <h3 className="assoc-head">Real results from The <span className="em">Frequency Lab</span></h3>
            </div>
            <div className="tgrid">
              {LAB_TESTIMONIALS.map((t) => (
                <figure className="tcard" key={t.name}>
                  <blockquote className="tcard-quote">{t.quote}</blockquote>
                  <figcaption className="tcard-cite">
                    <img className="tcard-photo" src={`/assets/${t.photo}`} alt={t.name} style={{ objectPosition: t.pos }} />
                    <span className="tcard-who">
                      <span className="tcard-name">{t.name}</span>
                      <span className="tcard-title">{t.title}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ [9] WHO THIS IS FOR ============ */}
      <section className="section">
        <div className="inner">
          <div className="sec-head reveal">
            <span className="eyebrow">Who this is for</span>
            <h2 className="sec-h2">Read it carefully. This is a <span className="em">narrow</span> door.</h2>
          </div>

          <div className="fit-grid">
            <div className="fit-card yes reveal">
              <div className="fit-head">This session is for you if</div>
              <div className="fit-li">{Ico.check}<span>You have won the material game, the income, the title, the life, and the feeling you expected never arrived</span></div>
              <div className="fit-li">{Ico.check}<span>You have read it, tried it, can quote all of it, and still cannot get yourself to move</span></div>
              <div className="fit-li">{Ico.check}<span>You do not want another therapist. You want someone who can actually tell you what is going on</span></div>
            </div>
            <div className="fit-card no reveal d1">
              <div className="fit-head">It is not for you if</div>
              <div className="fit-li">{Ico.cross}<span>You are looking for motivation, robes, or another framework to read</span></div>
              <div className="fit-li">{Ico.cross}<span>You want a free call to &ldquo;explore options&rdquo;</span></div>
            </div>
          </div>

          <p className="fit-coda reveal">
            You do not have to believe any of this works. You only have to be curious enough to feel it once.
          </p>
        </div>
      </section>

      {/* ============ [10] GUARANTEE + CTA ============ */}
      <section className="section stage gbar midband">
        <span className="grain" aria-hidden="true" />
        <EnergyWave />
        <div className="inner" style={{ position: "relative", zIndex: 2 }}>
          <div className="gseal reveal" aria-hidden="true">{Ico.shield}</div>
          <span className="eyebrow reveal d1">Our guarantee</span>
          <h2 className="reveal d1">Feel the shift, or it is <span className="em">free.</span></h2>
          <p className="reveal d2">
            If you leave the session without feeling a real change, your fee is returned. The risk is entirely ours,
            because the session reliably does what no ad ever could.
          </p>
          <PrimaryCTA
            micro={
              <ul className="cta-points">
                <li>{Ico.lock}<span>Held with a deposit</span></li>
                <li>{Ico.shieldSm}<span>Felt-shift guarantee</span></li>
                <li>{Ico.user}<span>Led personally by Govind</span></li>
              </ul>
            }
          />
        </div>
      </section>

      {/* ============ [11] FAQ ============ */}
      <section className="section">
        <div className="inner">
          <div className="sec-head reveal">
            <span className="eyebrow">Questions, answered plainly</span>
            <h2 className="sec-h2">Before you <span className="em">book.</span></h2>
          </div>
          <div className="faq" id="faq">
            {FAQS.map((f, i) => (
              <div className={`faq-item${f.most ? " open" : ""}`} key={i}>
                <button className="faq-q" type="button" aria-expanded={f.most ? "true" : "false"}>
                  <span className="qn" aria-hidden="true" />
                  <span className="qtxt">
                    {f.q}
                    {f.most && (
                      <span className="most"><span className="dot" /> Most asked</span>
                    )}
                  </span>
                  <span className="faq-ico" aria-hidden="true">{Ico.plus}</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-in">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ [12] FINALE ============ */}
      <section className="section stage finale">
        <span className="grain" aria-hidden="true" />
        <div className="finale-inner">
          <span className="eyebrow reveal" style={{ display: "inline-block", marginBottom: 22 }}>One last thing</span>
          <h2 className="reveal d1">You were told the goal was to <span className="em">succeed.</span></h2>
          <p className="reveal d2">
            Nobody told you that succeeding without the rest of the framework just makes the emptiness more
            expensive. And it compounds, quietly, until a crisis forces the reckoning you could take on your own
            terms today.
          </p>
          <p className="dream reveal d2">
            It is wiser to be a warrior in the garden than a gardener in the war. Come and feel it once. Be the monk
            who keeps his Ferrari.
          </p>
          <PrimaryCTA
            micro={
              <ul className="cta-points">
                <li>{Ico.lock}<span>Held with a deposit</span></li>
                <li>{Ico.shieldSm}<span>Felt-shift guarantee</span></li>
                <li>{Ico.user}<span>Led personally by Govind</span></li>
              </ul>
            }
          />
        </div>
      </section>

      {/* sticky CTA */}
      <div className="scta" id="scta">
        <div className="scta-in">
          <span className="scta-txt">
            <b>You feel none of it.</b> &nbsp;One session. Feel the shift, or it is free.
          </span>
          <a className="cta" href={PRIMARY_HREF}>
            <span>Book My Session</span>
            {Ico.arrow}
          </a>
        </div>
      </div>

      <FunnelScripts />
    </>
  );
}
