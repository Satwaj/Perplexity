import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "./features/auth/services/api.auth";
import { setUser, setLoading, setError } from "./features/auth/auth.slice";
import Loading from "./features/auth/pages/Loading";
import gsap from "gsap";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Set initial offscreen coordinates
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });

    const xToRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });

    const handleMouseMove = (e) => {
      xToDot(e.clientX);
      yToDot(e.clientY);

      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const handleMouseDown = () => {
      gsap.to(ring, { scale: 0.65, duration: 0.18, ease: "power2.out" });
      gsap.to(dot, { scale: 1.4, duration: 0.18, ease: "power2.out" });
    };

    const handleMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.25, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.25, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const addHoverListeners = () => {
      const clickables = document.querySelectorAll(
        "a, button, input, textarea, [role='button'], .cursor-pointer, select"
      );
      clickables.forEach((el) => {
        // Prevent duplicate listener attachments
        if (el.dataset.hasCursorListeners) return;
        el.dataset.hasCursorListeners = "true";

        el.addEventListener("mouseenter", () => {
          gsap.to(ring, {
            scale: 1.6,
            borderColor: "rgba(139, 92, 246, 0.45)",
            backgroundColor: "rgba(139, 92, 246, 0.06)",
            duration: 0.22,
            ease: "power2.out",
          });
          gsap.to(dot, { scale: 0, duration: 0.18, ease: "power2.out" });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(ring, {
            scale: 1,
            borderColor: "rgba(139, 92, 246, 0.2)",
            backgroundColor: "transparent",
            duration: 0.22,
            ease: "power2.out",
          });
          gsap.to(dot, { scale: 1, duration: 0.18, ease: "power2.out" });
        });
      });
    };

    // Watch for DOM node injection to bind cursor hovers to lazy loaded buttons
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-violet-500 rounded-full pointer-events-none z-[9999] mix-blend-screen hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-violet-500/20 rounded-full pointer-events-none z-[9998] mix-blend-screen hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    const init = async () => {
      const startTime = Date.now();
      const minDuration = 1800; // 1.8 seconds minimum animation time
      
      const storedToken = localStorage.getItem("authToken");
      if (!storedToken) {
        await new Promise((resolve) => setTimeout(resolve, minDuration));
        setInitializing(false);
        return;
      }
      try {
        dispatch(setLoading(true));
        const data = await getMe();
        dispatch(setUser(data.user));
      } catch (err) {
        dispatch(setError(err.response?.data?.message || "Failed to fetch user data"));
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = minDuration - elapsed;
        if (remaining > 0) {
          await new Promise((resolve) => setTimeout(resolve, remaining));
        }
        setInitializing(false);
        dispatch(setLoading(false));
      }
    };

    init();
  }, [dispatch]);

  if (initializing) {
    return <Loading />;
  }

  return (
    <>
      <CustomCursor />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
