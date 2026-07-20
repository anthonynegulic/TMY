import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About · Theirs. Mine. Yours.",
  description:
    "Ally and Abrar: two Melbourne mums with a shared eye, a soft spot for gold with a past, and very different routes to the same obsession.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="container page-hero">
        <div className="kicker page-kicker">✦&nbsp;&nbsp;Who we are</div>
        <h1 className="page-title">
          A shared eye, and a soft spot for{" "}
          <em className="accent">gold with a past</em>.
        </h1>
        <div className="page-hero-grid">
          <p className="page-lede">
            Theirs. Mine. Yours. is two of us: Ally and Abrar, friends first,
            business partners a close second. Different heritage, different day
            jobs, the exact same instinct for what makes a piece special.
          </p>
          <p className="page-lede">
            Between us there&#39;s a Product Manager, a teacher, four kids, two
            cultures where gold means everything, and one shared rule: we only
            pass on what we&#39;d happily keep.
          </p>
        </div>
      </section>

      {/* photo placeholder */}
      <section className="container page-section">
        <div className="about-portrait" style={{ background: "#A9C6D6" }}>
          <div className="hatch about-hatch">
            <span>portrait pending · we&#39;re taking a good one, promise</span>
          </div>
          <div className="lot-chip about-chip">
            <span className="lot-hole" />
            THE TWO OF US
          </div>
        </div>
      </section>

      {/* Ally */}
      <section className="container page-section">
        <div className="bio">
          <div className="bio-head">
            <span className="story-num">A</span>
            <h2 className="bio-name">
              <em className="accent">Ally.</em>
            </h2>
            <span className="bio-tags">
              Melbourne born &amp; raised · Product Manager by day · mum always
            </span>
          </div>
          <div className="page-cols">
            <div>
              <p className="page-copy">
                Being a mum is the role I&#39;m most proud of. My favourite
                thing in the world is time with my kids and family: always
                together, always doing something, always making memories. I
                photograph pretty much everything because I never want to
                forget a single moment.
              </p>
              <p className="page-copy">
                My Macedonian heritage has shaped how I see jewellery my whole
                life. Growing up, gold was never just something you wore. It
                was given at the moments that mattered most, chosen with love,
                and kept forever.
              </p>
              <p className="page-copy">
                When I&#39;m not hunting the next beautiful find, you&#39;ll
                find me at the gym, curled up with a good book, exploring
                somewhere new with my family, or shopping for basically
                anything and everything. There&#39;s always a chai latte
                involved somewhere along the way.
              </p>
            </div>
            <div>
              <div className="bio-draws">
                <div className="bio-draws-title">What draws me to vintage</div>
                <ul className="bio-list">
                  <li>
                    <strong>The history.</strong>{" "}Every piece existed long
                    before you. Someone saved for it, gifted it, wore it for
                    the moments that mattered most.
                  </li>
                  <li>
                    <strong>The design.</strong>{" "}The craftsmanship of a
                    different era, with details and settings you simply
                    don&#39;t find in jewellery made today.
                  </li>
                  <li>
                    <strong>Honestly? The sparkle.</strong>{" "}High-carat vintage
                    gold catches the light in a way that stops you in your
                    tracks.
                  </li>
                </ul>
              </div>
              <p className="page-pull">
                At TMY I bring the eye, the instinct, and a genuine obsession
                with making sure beautiful vintage pieces find the people who
                will love them most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Abrar */}
      <section className="container page-section page-section-last">
        <div className="bio">
          <div className="bio-head">
            <span className="story-num">A</span>
            <h2 className="bio-name">
              <em className="accent">Abrar.</em>
            </h2>
            <span className="bio-tags">
              Egyptian by birth · raised in New Zealand · teacher · mum of two
            </span>
          </div>
          <div className="page-cols">
            <div>
              <p className="page-copy">
                I&#39;m one half of TMY and proof that a passion project can
                quietly become a business if you let it. Born in Saudi Arabia,
                raised in New Zealand, grown into who I am here in Melbourne.
                I&#39;ve moved often and far, but a few things stayed constant:
                family, gold, and an old habit of wanting to know the story
                behind things before I decide how I feel about them.
              </p>
              <p className="page-copy">
                Growing up, I watched my mum and the older women in my family
                wear their gold constantly, not carefully. Best 22k sets worn
                while hand-washing rugs. Every ring on while kneading dough for
                flatbread. Gold wasn&#39;t precious in the sense of
                untouchable. It was precious in the sense of worn, every day,
                without ceremony. I thought that was the coolest thing, and it
                stayed with me.
              </p>
              <p className="page-copy">
                Away from TMY and the classroom I&#39;m chasing
                Melbourne&#39;s best coffee with my family, trying cuisines we
                haven&#39;t had yet, hunting new playgrounds with my kids, or
                several episodes deep into an Arabic or Turkish drama.
              </p>
            </div>
            <div>
              <div className="bio-draws">
                <div className="bio-draws-title">What draws me to vintage</div>
                <ul className="bio-list">
                  <li>
                    <strong>The lives before mine.</strong>{" "}Every scratch,
                    every worn-down band, every clasp fixed twice: that&#39;s a
                    person&#39;s whole life happening while they had it on.
                  </li>
                  <li>
                    <strong>Worn, not preserved.</strong>{" "}Nothing was ever
                    &#34;too good&#34; to wear. I&#39;m not looking for
                    pristine. I&#39;m looking for clearly lived.
                  </li>
                  <li>
                    <strong>My mum&#39;s ring.</strong>{" "}A chunky engraved 22k
                    band I still wear. Every time I put it on, I think about
                    her hands in it before mine.
                  </li>
                </ul>
              </div>
              <p className="page-pull">
                I&#39;m the one who lights up when a piece finds its person,
                who&#39;ll dig through trays and estate sales for months to
                match someone with the gold they&#39;ve been quietly lusting
                over. Part matchmaker, part treasure hunter. Wish lists aren&#39;t
                a task to me. They&#39;re a hunt.
              </p>
            </div>
          </div>
          <div className="hero-ctas bio-ctas">
            <a href="/story" className="btn-dark">Read our story</a>
            <a href="/contact" className="tmy-link text-link">
              Send us a wish list
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
