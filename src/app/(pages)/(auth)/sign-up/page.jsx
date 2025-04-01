"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Update roles to match your MongoDB schema
const roles = ["admin", "organizer"];

const signUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long").max(50),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(roles, { required_error: "Please select a role" }),
    college: z
      .string()
      .optional()
      .refine((val) => {
        if (val === undefined || val === "") return true;
        return val.length >= 3;
      }, "College name must be at least 3 characters long"),
  })
  .refine(
    (data) => {
      if (data.role === "admin") {
        return !!data.college;
      }
      return true;
    },
    {
      message: "College name is required for admin role",
      path: ["role"],
    }
  );

const SignUpPage = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      college: "",
    },
  });

  const watchRole = form.watch("role");

  const onSubmit = async (data) => {
    try {
      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      };
      // Only add college for admin role
      if (data.role === "admin") {
        formData.college = data.college;
      }

      console.log("Submitted Data:", formData);

      const res = await axios.post("/api/sign-up", formData);
      if (res.status === 201) {
        router.push("/sign-in");
      }
    } catch (error) {
      console.error(
        "Registration failed",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Create an Account
          </h1>
        </div>

        <div className="border rounded-lg p-8 bg-card shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="role"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Role</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {roles.map((role) => (
                        <label
                          key={role}
                          className={`flex items-center justify-center p-2 rounded-md cursor-pointer border ${
                            field.value === role
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-muted hover:bg-muted/80 border-muted-foreground/20"
                          }`}
                          onClick={() => field.onChange(role)}
                        >
                          <input
                            type="radio"
                            value={role}
                            checked={field.value === role}
                            onChange={() => field.onChange(role)}
                            className="sr-only"
                          />
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </label>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchRole === "admin" && (
                <>
                  <FormField
                    name="college"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your college name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
