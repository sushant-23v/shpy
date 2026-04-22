import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container heroInner">
        <div className="heroCopy">
          <div className="pill">Fresh • Fast • Flavorful</div>
          <h1>
            Restaurant vibes.
            <br />
            Chef-level taste.
          </h1>
          <p className="muted">
            Explore our comfort classics and seasonal specials—crafted to look
            beautiful and taste even better.
          </p>

          <div className="heroCtas">
            <Button onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>
              Explore Menu
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Today’s Picks
            </Button>
          </div>

          <div className="heroStats">
            <div className="stat">
              <div className="statValue">4.8★</div>
              <div className="muted">Avg rating</div>
            </div>
            <div className="stat">
              <div className="statValue">25 min</div>
              <div className="muted">Typical prep</div>
            </div>
            <div className="stat">
              <div className="statValue">50+</div>
              <div className="muted">Menu items</div>
            </div>
          </div>
        </div>

        <div className="heroArt" aria-hidden="true">
          <div className="heroCard">
            <div className="heroCardTitle">Chef’s note</div>
            <div className="muted">
              “Balance your plate: crunch, heat, acid, and something creamy.”
            </div>
          </div>

          <div className="heroBlob" />
        </div>
      </div>
    </section>
  );
}