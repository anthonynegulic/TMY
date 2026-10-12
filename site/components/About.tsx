import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="container about">
      <div className="about-grid">
        {/* portrait slot, matching the placeholder on /about until the photo is taken */}
        <div className="about-photo">
          <div className="hatch about-hatch">
            <span>portrait pending · we&#39;re taking a good one, promise</span>
          </div>
          <div className="tag-chip about-chip">
            <span className="tag-hole" />
            THE TWO OF US
          </div>
        </div>
        <div>
          <h2 className="about-title">
            A shared eye, and a soft spot for{" "}
            <em className="accent">gold with a past</em>.
          </h2>
          <p className="about-copy">
            We started Theirs. Mine. Yours. because the pieces we loved most
            were never the ones from a mall. They were the strange, brilliant,
            one-off finds with a little wear and a lot of story. So we go
            looking, we curate hard, and we only pass on what we&#39;d happily
            keep.
          </p>
          <p className="about-pull">
            No mass production. No two the same. Just gold that was loved
            before, and will be again.
          </p>
          <Link href="/about" className="tmy-link text-link">
            Meet the two of us
          </Link>
        </div>
      </div>
    </section>
  );
}
