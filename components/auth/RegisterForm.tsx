"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { register as registerUser } from "@/actions/register";
import UnderlineInput from "../ui/UnderlineInput";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (data: unknown) => {
    setError("");
    setSuccess("");

    try {
      const result = await registerUser(data);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess("Registro exitoso");
      }
    } catch (error) {
      console.error(error);
      setError("Error al registrar");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 min-w-sm">
      <div>
        <label>Nombre</label>
        <UnderlineInput
          {...register("name", { required: true })}
          type="text"
          placeholder="Tu nombre"
        />
        {errors.name && <p className="text-red-500 text-sm">Campo requerido</p>}
      </div>

      <div>
        <label>Email</label>
        <UnderlineInput
          {...register("email", { required: true })}
          type="email"
          placeholder="correo@ejemplo.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">Campo requerido</p>
        )}
      </div>

      <div>
        <label>Contraseña</label>
        <UnderlineInput
          {...register("password", { required: true })}
          type="password"
          placeholder="********"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">Campo requerido</p>
        )}
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded cursor-pointer"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
