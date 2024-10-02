// animationOpenClose.ts
import gsap from "gsap";

export const animateOpenClose = (
  element: HTMLElement | null,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  isOpen: boolean
) => {
  if (!element) return;

  if (isOpen) {
    // Animación de salida
    gsap.to(element, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      onComplete: () => {
        setState(false);
      },
    });
  } else {
    // Cambiar el estado a true y aplicar la animación de entrada
    setState(true);
    
    // Espera un breve momento para permitir que el DOM se actualice
    setTimeout(() => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }, 0);
  }
};
