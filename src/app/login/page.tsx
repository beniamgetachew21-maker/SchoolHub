"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

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
import { LogIn, Loader2, Eye, EyeOff, GraduationCap, ShieldCheck, Users, Shield } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginFormValues = z.infer<typeof formSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "admin";
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const roleConfigs = {
    admin: {
      title: "Admin Login",
      icon: <Shield className="h-10 w-10 text-white" />,
      color: "bg-brand-orange",
      redirect: "/dashboard",
      desc: "Access the institution management dashboard"
    },
    student: {
      title: "Student Portal",
      icon: <GraduationCap className="h-10 w-10 text-white" />,
      color: "bg-emerald-500",
      redirect: "/student-portal",
      desc: "Access your courses and academic records"
    },
    parent: {
      title: "Parent Portal",
      icon: <Users className="h-10 w-10 text-white" />,
      color: "bg-brand-orange",
      redirect: "/parent-portal",
      desc: "Monitor your child's progress and manage fees"
    }
  };

  const config = roleConfigs[role as keyof typeof roleConfigs] || roleConfigs.admin;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginFormValues) {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    
    // Simple mock authentication
    if (data.email.length > 0 && data.password.length > 0) {
      toast({ title: "Login Successful", description: `Welcome to the ${config.title}!` });
      router.push(config.redirect);
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please check your credentials.",
      });
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-transparent border-none p-8 space-y-8">
        
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
             <div className={`p-5 rounded-[2rem] ${config.color} shadow-2xl`}>
                {config.icon}
             </div>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight uppercase italic">{config.title}</h2>
          <p className="text-white/80 text-sm font-medium">{config.desc}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-semibold text-sm">Institutional Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="user@institution.edu"
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
                    <FormLabel className="text-white font-semibold text-sm">Security Key</FormLabel>
                    <span className="text-xs text-white/50 hover:text-white/80 cursor-pointer transition-colors">
                      Need help?
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
              className="w-full h-14 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all duration-300 bg-white text-brand-dark hover:bg-slate-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-[0.98] mt-4 uppercase italic"
            >
              {loading ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> Authenticating...</>
              ) : (
                <><LogIn className="h-5 w-5" /> Secure Access</>
              )}
            </button>
          </form>
        </Form>

        <div className="flex items-center justify-center gap-2 text-white/50 text-xs">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span className="font-bold tracking-widest uppercase italic">Encrypted Secure Session</span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-white text-center">Loading portal secure gateway...</div>}>
      <LoginForm />
    </Suspense>
  );
}