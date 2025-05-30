"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import UnderlineInput from "../ui/UnderlineInput";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const [error, setError] = useState("");

  const onSubmit = async (data: LoginFormValues) => {
    setError("");

    const result = await signIn("credentials", {
      redirect: false, // importante: si querés manejar el redirect manualmente
      email: data.email,
      password: data.password,
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });

    if (result?.error) {
      setError("Email o contraseña incorrectos");
    } else if (result?.url) {
      window.location.href = result.url;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-w-sm">
      <div>
        <label>Email</label>
        <UnderlineInput
          {...register("email", { required: true })}
          type="email"
          className="border-b w-full p-2"
        />
        {errors.email && <p className="text-red-500">Requerido</p>}
      </div>

      <div>
        <label>Contraseña</label>
        <UnderlineInput
          {...register("password", { required: true })}
          type="password"
          className="border-b w-full p-2"
        />
        {errors.password && <p className="text-red-500">Requerido</p>}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full bg-black text-white py-2 mt-4 rounded cursor-pointer hover:bg-black/80"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginForm;
