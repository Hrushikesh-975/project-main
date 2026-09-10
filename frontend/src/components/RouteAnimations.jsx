import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteAnimations() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Scroll to top of page on route change
    window.scrollTo(0, 0);

    // 2. Setup intersection observer for scroll-trigger animations (.fade-up, .reveal)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    // Find and observe animated elements
    document.querySelectorAll('.fade-up, .reveal').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
