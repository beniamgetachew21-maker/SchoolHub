"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { LogIn, Loader2, Eye, EyeOff, GraduationCap, ShieldCheck } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginFormValues) {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    if (data.email.toLowerCase() === "admin@globalacademy.com") {
      toast({ title: "Login Successful", description: "Welcome back, Admin!" });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "The email or password you entered is incorrect.",
      });
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Transparent card */}
      <div className="bg-transparent border-none p-8 space-y-8">
        
        {/* Card header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
             <img src="/logo.png" alt="Logo" className="h-24 w-auto object-contain bg-transparent" />
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight">Admin Login</h2>
          <p className="text-white/80 text-sm">Enter your credentials to access the dashboard</p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-semibold text-sm">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="admin@institution.com"
                      className="h-12 bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-white/60 rounded-xl transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-white font-semibold text-sm">Password</FormLabel>
                    <span className="text-xs text-white/50 hover:text-white/80 cursor-pointer transition-colors">
                      Forgot password?
                    </span>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-white/60 rounded-xl pr-12 transition-all"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 bg-white text-[#003366] hover:bg-white/90 active:scale-[0.98] shadow-lg disabled:opacity-70 mt-2"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</>
              ) : (
                <><LogIn className="h-4 w-4" /> Sign In</>
              )}
            </button>
          </form>
        </Form>

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-2 text-white/50 text-xs">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Secured with enterprise-grade encryption</span>
        </div>
      </div>
    </div>
  );
}