export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footerInner">
        <div>
          <div className="footerTitle">Saffron & Stone</div>
          <div className="muted">
            Modern comfort food • Fresh ingredients • Fast service
          </div>
        </div>

        <div className="footerCols">
          <div>
            <div className="footerColTitle">Hours</div>
            <div className="muted">Mon–Fri: 11am – 10pm</div>
            <div className="muted">Sat–Sun: 10am – 11pm</div>
          </div>
          <div>
            <div className="footerColTitle">Location</div>
            <div className="muted">123 Market Street</div>
            <div className="muted">Your City</div>
          </div>
        </div>
      </div>
    </footer>
  );
}