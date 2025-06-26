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

import { UserPlus, Mail, KeyRound, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSignup } from "../customs/hooks/authentication/useSignup";

const SignupForm = () => {
  const { signup, isPending } = useSignup(); // Assuming useSignup is defined in your hooks
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder={`${
                  errors?.fullName?.message
                    ? errors?.fullName?.message
                    : "Your Full Name"
                }`}
                className="pl-10"
                {...register("fullName", {
                  required: "Full name is required",
                })}
                style={
                  errors?.fullName?.message
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
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please provide a valid email address",
                  },
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
            <Label htmlFor="password">Password</Label>
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder={`${
                  errors?.passwordConfirm?.message
                    ? errors?.passwordConfirm?.message
                    : "••••••••"
                }`}
                className="pl-10"
                {...register("passwordConfirm", {
                  required: "Comfirm Password is required",
                  validate: (value) =>
                    value === getValues("password") || "Password need to match",
                })}
                style={
                  errors?.passwordConfirm?.message &&
                  getValues("passwordConfirm") === ""
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
            {errors?.passwordConfirm?.message &&
            getValues("passwordConfirm") !== "" ? (
              <p
                className="text-sm p-1 pl-3 mt-3 rounded-md"
                style={{
                  backgroundColor: "rgb(254 226 226 / var(--tw-bg-opacity, 1))",
                  color: "rgb(185 28 28 / var(--tw-text-opacity, 1))",
                  borderBottom:
                    "2px solid rgb(239 68 68 / var(--tw-border-opacity, 1))",
                }}
              >
                {errors?.passwordConfirm?.message}
              </p>
            ) : null}
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
                Creating Account...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <UserPlus className="mr-2 h-4 w-4" />
                Create Account
              </span>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col">
        <div className="mt-2 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
