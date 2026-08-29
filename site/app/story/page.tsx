import type { Metadata } from "next";
import WaveDivider from "@/components/WaveDivider";

export const metadata: Metadata = {
  title: "The story · Theirs. Mine. Yours.",
  description:
    "Two first-time mums, two cultures where gold is a love language, and a name that describes the journey every piece takes.",
};

const PINK = "#F7DCE6";
const LIME = "#BBC471";

export default function StoryPage() {
  return (
    <div>
      {/* how we met */}
      <section className="container page-hero">
        <h1 className="page-title">
          It started on <em className="accent">mat leave</em>.
        </h1>
        <div className="page-hero-grid">
          <p className="page-lede">
            We met the way so many great friendships do: through a mutual
            friend, two first-time mums navigating the beautiful chaos of
            maternity leave together.
          </p>
          <p className="page-lede">
            But what really bonded us went deeper than nap schedules and play
            dates. We both come from cultures where gold is so much more than
            something you wear. It&#39;s a love language. It&#39;s heritage
            passed down through generations, tradition worn on the body,
            stories told without words.
          </p>
        </div>
      </section>

      <WaveDivider fill={PINK} bg={LIME} />

      {/* gold as a love language */}
      <section className="story">
        <div className="container story-inner">
          <div className="story-head">
            <div>
              <h2 className="story-title">Gold as a love language.</h2>
            </div>
            <div className="story-aside">
              Chosen carefully, kept forever, and passed down with intention.
            </div>
          </div>
          <div className="page-cols">
            <p>
              Growing up, gold wasn&#39;t costume jewellery and it wasn&#39;t
              fast fashion. In Egyptian and Macedonian culture, gold is
              something you receive at your christening, your engagement, your
              wedding. It marks the moments that matter.
            </p>
            <p>
              So when we source, we&#39;re instinctively drawn to pieces made
              with that same weight of meaning. High-carat gold, 18ct and 22ct,
              the kind our grandmothers would have recognised and approved of.
              Real craftsmanship, real presence. Things made to last a
              lifetime, because in our cultures that&#39;s exactly what
              jewellery is supposed to do.
            </p>
          </div>
          <div className="heritage-cards">
            <div className="heritage-card" style={{ background: "#E5A06B" }}>
              <div className="hatch" />
              <div className="lot-chip">
                <span className="lot-hole" />
                EGYPT
              </div>
              <div className="heritage-card-caption">
                Bold, ornate goldwork
              </div>
            </div>
            <div className="heritage-card" style={{ background: "#A9C6D6" }}>
              <div className="hatch" />
              <div className="lot-chip">
                <span className="lot-hole" />
                THE BALKANS
              </div>
              <div className="heritage-card-caption">
                Richly detailed pieces
              </div>
            </div>
            <div className="heritage-note">
              <p>
                We&#39;re not just looking for pretty things. We&#39;re looking
                for pieces that feel significant. That&#39;s just how we were
                raised to see gold.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill={LIME} bg={PINK} />

      {/* no lightning bolt */}
      <section className="container page-section">
        <div className="page-split">
          <div>
            <h2 className="page-h2">
              There was no lightning bolt.
            </h2>
            <p className="page-copy">
              Honestly? There wasn&#39;t one moment. It was more that every
              time we found something beautiful, our first instinct was to
              share it with each other.
            </p>
            <p className="page-copy">
              We have a deep, genuine love for vintage jewellery: the history
              it carries, the craftsmanship of a different era, the fact that
              something made a hundred years ago can still take your breath
              away.
            </p>
            <p className="page-copy">
              TMY was never really a business decision. It was a natural
              extension of who we already were. Two people who couldn&#39;t
              stop finding beautiful things, and couldn&#39;t stop wanting
              others to love them too.
            </p>
          </div>
          <div className="pull-tag" style={{ background: "#EFD27E" }}>
            <div className="hatch" />
            <div className="lot-chip">
              <span className="lot-hole" />
              FIELD NOTE
            </div>
            <blockquote className="pull-tag-quote">
              &#34;Omg, look at this. Can you believe it?&#34;
              <footer>every single time, both of us</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* the name */}
      <section className="container page-section">
        <div className="name-band">
          <div className="name-band-words">
            <span className="name-band-word">Theirs.</span>
            <span className="name-band-word">Mine.</span>
            <span className="name-band-word">Yours.</span>
          </div>
          <p className="name-band-copy">
            It isn&#39;t just a name. It&#39;s the journey every single piece
            takes: the life it lived before, the moment it passes through our
            hands, and the person it was always headed for. We get to be the
            middle chapter, and the ones who make sure the story keeps going.
          </p>
        </div>
      </section>

      {/* the friendship */}
      <section className="container page-section page-section-last">
        <div className="page-split page-split-reverse">
          <div className="pull-tag" style={{ background: "#BBC471" }}>
            <div className="hatch" />
            <div className="lot-chip">
              <span className="lot-hole" />
              THE TWO OF US
            </div>
            <blockquote className="pull-tag-quote">
              No questions, no guilt, no scorecards.
              <footer>how we work</footer>
            </blockquote>
          </div>
          <div>
            <h2 className="page-h2">We laugh. Constantly.</h2>
            <p className="page-copy">
              At the pieces we find, at each other, at our kids when they
              interrupt our business meetings. We have the same eye, the same
              taste, the same instinct for what makes a piece special. We often
              find the same thing at the same time.
            </p>
            <p className="page-copy">
              What we&#39;re most proud of is how we show up for each other.
              We&#39;re both working mums who know what the juggle looks like
              from the inside. When life gets loud and one of us needs to step
              back, the other steps forward.
            </p>
            <p className="page-pull">
              TMY isn&#39;t just a business we built together. It&#39;s proof
              of what happens when the right friendship finds the right idea.
            </p>
            <div className="hero-ctas">
              <a href="/about" className="btn-dark">Meet the two of us</a>
              <a href="/shop" className="tmy-link text-link">
                Shop the collection
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
