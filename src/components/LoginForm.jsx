import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { LogIn, KeyRound, Mail } from "lucide-react";
import { useLogin } from "../customs/hooks/authentication/useSignin";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { login, isPending } = useLogin();
  const { register, formState, getValues, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "", // Set your desired default here
    },
  });
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    login({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder={`${
                  errors?.email?.message
                    ? errors?.email?.message
                    : "name@example.com"
                }`}
                className="pl-10"
                {...register("email", {
                  required: "Email is required",
                })}
                style={
                  errors?.email?.message
                    ? {
                        backgroundColor:
                          "rgb(254 226 226 / var(--tw-bg-opacity, 1))",
                        color: "rgb(185 28 28 / var(--tw-text-opacity, 1))",
                        borderBottom:
                          "2px solid rgb(239 68 68 / var(--tw-border-opacity, 1))",
                      }
                    : {}
                }
                disabled={isPending}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder={`${
                  errors?.password?.message
                    ? errors?.password?.message
                    : "••••••••"
                }`}
                className="pl-10"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password needs a minimum of 8 characters",
                  },
                })}
                style={
                  errors?.password?.message && getValues("password") === ""
                    ? {
                        backgroundColor:
                          "rgb(254 226 226 / var(--tw-bg-opacity, 1))",
                        color: "rgb(185 28 28 / var(--tw-text-opacity, 1))",
                        borderBottom:
                          "2px solid rgb(239 68 68 / var(--tw-border-opacity, 1))",
                      }
                    : {}
                }
                disabled={isPending}
                default
              />
              {errors?.password?.message && getValues("password") !== "" ? (
                <p
                  className="text-sm p-1 pl-3 mt-3 rounded-md"
                  style={{
                    backgroundColor:
                      "rgb(254 226 226 / var(--tw-bg-opacity, 1))",
                    color: "rgb(185 28 28 / var(--tw-text-opacity, 1))",
                    borderBottom:
                      "2px solid rgb(239 68 68 / var(--tw-border-opacity, 1))",
                  }}
                >
                  {errors?.password?.message}
                </p>
              ) : null}
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing In...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </span>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="mt-2 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
