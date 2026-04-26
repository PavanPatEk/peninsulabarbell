import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SiGmail, SiInstagram } from 'react-icons/si';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './App.css'; 

const galleryImages = [
  'dog1.jpg', 'gym1.jpg', 'gym2.jpg', 'Squat1.jpg', 'Squat2.jpg', 'group1.jpg', 'groupdeadlifting.jpg'
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [animateMemberships, setAnimateMemberships] = useState(false);
  const membershipSectionRef = useRef(null);

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  // Animation Observer for Membership Cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateMemberships(true);
          observer.unobserve(entry.target); // Only animate once for a clean look
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (membershipSectionRef.current) {
      observer.observe(membershipSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') setCurrentIndex(null);
    };

    const handleWheel = (e) => {
      e.preventDefault(); 
      if (e.deltaY > 0 || e.deltaX > 0) showNext();
      else showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    document.body.style.overflow = 'hidden'; 

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = 'auto'; 
    };
  }, [currentIndex, showNext, showPrev]);

  return (
    <>
<header className="header">
  <div className="brand">
    <img src="/pb-logo.png" alt="Peninsula Barbell Logo" className="logo-hover" />
  </div>
  <nav>
    <a href="#home">Home</a>
    <a href="#gallery">Gallery</a>
    <a href="#memberships">Memberships</a>
    <a href="https://www.equaldist.com/">Merch</a>
    <a href="#contact">Contact</a>
  </nav>
</header>

      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-title">HIT YOUR PB'S <br /> @ PENINSULA BARBELL</div>
          <div className="hero-features">
            <span>Powerlifting Equipment</span><span className="dot">•</span>
            <span>24/7 Access</span><span className="dot">•</span>
            <span>Amazing Community</span>
          </div>
        </div>
      </section>

      <section className="section" id="gallery">
        <div className="section-title">OUR COMMUNITY</div>
        <div className="section-text">Check out our mascot, gym, and community!</div>
        <div className="horizontal-gallery-wrapper">
          <div className="horizontal-scroll-container">
            {galleryImages.map((img, index) => (
              <img key={index} src={img} className="gallery-item" onClick={() => setCurrentIndex(index)} />
            ))}
          </div>
        </div>

        {currentIndex !== null && (
          <div className="lightbox-overlay" onClick={() => setCurrentIndex(null)}>
            <div className="lightbox-content">
              <img src={galleryImages[currentIndex]} className="lightbox-image" onClick={(e) => e.stopPropagation()} />
            </div>
          </div>
        )}
      </section>

      {/* MEMBERSHIP SECTION WITH ANIMATION REF */}
      <section className="section dark" id="memberships" ref={membershipSectionRef}>
        <div className="section-title">MEMBERSHIP OPTIONS</div>
        <div className="section-text">
          Discounts available to students, military, and sign ups for duos.<br />
          Autopay requires a minimum 2-month commitment.
        </div>
        <div className={`memberships-grid ${animateMemberships ? 'slide-in' : ''}`}>
          <div className="membership-card"><h3>Day Pass</h3><div className="price">$25</div><ul><li>1 Day Use</li><li>By appointment only</li></ul></div>
          <div className="membership-card"><h3>1 Month</h3><div className="price">$130</div><ul><li>Standard Monthly</li><li>$115/mo with Autopay</li></ul></div>
          <div className="membership-card"><h3>6 Months</h3><div className="price">$650</div><ul><li>Paid in full</li><li>No setup fees</li></ul></div>
          <div className="membership-card"><h3>12 Months</h3><div className="price">$1180</div><ul><li>Paid in full</li><li>Best value overall</li></ul></div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="section-title">CONTACT US</div>
        <div className="contact-grid">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=adrianggar1@gmail.com" target="_blank" rel="noopener noreferrer" className="brand-card gmail"><SiGmail className="brand-icon" /><span>EMAIL US</span></a>
          <a href="https://instagram.com/peninsulabarbellssf" target="_blank" rel="noreferrer" className="brand-card instagram"><SiInstagram className="brand-icon" /><span>FOLLOW US</span></a>
        </div>
        <div className="map-container">
          <iframe title="Peninsula Barbell Location" src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=233%20S%20Maple%20Ave%20%2339,%20South%20San%20Francisco,%20CA%2094080&t=&z=15&ie=UTF8&iwloc=B&output=embed" width="100%" height="350" style={{ border: 0, borderRadius: '12px' }} allowFullScreen="" loading="lazy"></iframe>
        </div>
        <div className="section-text" style={{ marginTop: '20px' }}>
          <a href="https://www.google.com/maps/place/233+S+Maple+Ave+%2339,+South+San+Francisco,+CA+94080" target="_blank" rel="noreferrer" className="address-link"><FaMapMarkerAlt className="pin-icon" />233 S Maple Ave #39, South San Francisco, CA 94080</a>
        </div>
      </section>
      
      <footer>
        <img src="/pb-logo.png" alt="Peninsula Barbell Logo" className="footer-logo" />
        <div className="footer-info">© Peninsula Barbell SSF All Rights Reserved. <br />Website Created By: Pavan</div>
      </footer>
    </>
  );
}

export default App;