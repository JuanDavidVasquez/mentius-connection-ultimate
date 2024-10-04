import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MyCheckbox, MyTextInput } from "../../utils/forms";
import NeuronParticles from "../../utils/animations/neuronParticle";
import { useDispatch } from 'react-redux';
import { login } from '../../store/auth/thunk';

const tl = gsap.timeline({ repeat: -1, yoyo: true });

const animateLetters = (element: HTMLHeadingElement) => {
  tl.fromTo(
    element.children,
    {
      opacity: 0,
      y: -50,
      stagger: 0.1,
      duration: 1,
      ease: "power2.out",
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 1,
    }
  );
};

export const Login = () => {
  const dispatch = useDispatch();
  const titleLogin = "Login";
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (titleRef.current) {
      animateLetters(titleRef.current);
    }
    if (canvasRef.current) {
      new NeuronParticles(canvasRef.current);
    }
  }, []);

  // Función para animar el cierre del formulario
  const animateLoginIn = () => {
    const tl = gsap.timeline();
    tl.to(".particleCanvas", {
      duration: 2,
      scale: 5,
    }).to(".login", {
      duration: 1,
      opacity: 0,
      display: "none",
    });
  };

  return (
    <div className="login">
      <canvas ref={canvasRef} className="particleCanvas"></canvas>
      <h1 ref={titleRef} className="titleLogin">
        {titleLogin.split("").map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </h1>
      <div className="mentius-title">Mentius Connection</div>
      <div className="container-login">
      <Formik
  initialValues={{
    user_name: "",
    password: "",
    terms: false,
  }}
  onSubmit={async (values) => {
    const response = await dispatch(login(values)); // Espera la respuesta

    if (response.success) { // Verifica si el inicio de sesión fue exitoso
      animateLoginIn(); // Ejecuta la animación
    } else {
      // Maneja el error, por ejemplo, mostrando un mensaje de error
      console.error('Login failed:', response.error);
      // Puedes mostrar el error al usuario, por ejemplo, con un state de error
    }
  }}
  validationSchema={Yup.object().shape({
    user_name: Yup.string()
      .required("Required")
      .min(3, "Minimum 3 characters")
      .max(15, "Maximum 15 characters"),
    password: Yup.string().required("Password is Required"),
    terms: Yup.boolean().oneOf(
      [true],
      "Must Accept Terms and Conditions"
    ),
  })}
>
  {(formik) => (
    <Form>
      <MyTextInput
        label="user_name"
        name="user_name"
        type="text"
        placeholder="user_name"
      />
      <MyTextInput
        label="Password"
        name="password"
        type="password"
        placeholder="Password"
      />
      <MyCheckbox name="terms" label="Accept Terms and Conditions" />
      <button type="submit" className="submit">
        Login In
      </button>
    </Form>
  )}
      </Formik>

      </div>
    </div>
  );
};
