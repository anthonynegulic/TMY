const STEPS = [
  {
    num: "1",
    word: "Theirs.",
    body: "It belonged to someone before: worn to weddings, passed across a counter, tucked in a drawer for decades. It carried a story we'll never fully know.",
  },
  {
    num: "2",
    word: "Mine.",
    body: "Then it found its way to us. We only keep the solid-gold pieces with real character: cleaned, checked, and chosen because we'd happily wear it ourselves.",
  },
  {
    num: "3",
    word: "Yours.",
    body: "And now we get to pass it on to the person it was always meant for. That's where you come in, and where its next life starts.",
  },
];

export default function StoryBand() {
  return (
    <section id="story" className="story">
      <div className="container story-inner">
        <div className="story-head">
          <div>
            <div className="kicker story-kicker">✦&nbsp;&nbsp;How it finds you</div>
            <h2 className="story-title">Every piece has lived a life before yours.</h2>
          </div>
          <div className="story-aside">
            Theirs, then mine, then the good part: yours.
          </div>
        </div>

        <div className="story-steps">
          {STEPS.map((step) => (
            <div key={step.num} className="story-step">
              <div className="story-step-head">
                <span className="story-num">{step.num}</span>
                <span className="story-word">{step.word}</span>
              </div>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
