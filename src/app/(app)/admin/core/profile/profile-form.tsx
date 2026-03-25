"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Building, Mail, Phone, MapPin, Globe, Save, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { LogoUpload } from "@/components/ui/logo-upload";
import { updateTenantProfileAction, updateTenantBrandingAction } from "@/lib/actions/branding-actions";

const profileSchema = z.object({
  name: z.string().min(2, "School name must be at least 2 characters."),
  contactEmail: z.string().email("Invalid email address."),
  contactPhone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
    tenant: {
        id: string;
        name: string;
        contactEmail: string;
        contactPhone: string | null;
        address: string | null;
        logoUrl: string | null;
    }
}

export function ProfileForm({ tenant }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoUrl, setLogoUrl] = useState(tenant.logoUrl);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: tenant.name,
      contactEmail: tenant.contactEmail,
      contactPhone: tenant.contactPhone,
      address: tenant.address,
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    
    // 1. Update Profile text
    const profileResult = await updateTenantProfileAction(tenant.id, data);
    
    // 2. Update Logo if it changed
    if (logoUrl !== tenant.logoUrl) {
        await updateTenantBrandingAction(tenant.id, { logoUrl: logoUrl || undefined });
    }

    setIsSubmitting(false);

    if (profileResult.success) {
        toast({
            title: "Profile Updated",
            description: "Institutional identity has been synchronized.",
        });
    } else {
        toast({
            title: "Update Failed",
            description: profileResult.error,
            variant: "destructive",
        });
    }
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
              <div className="flex items-center gap-6">
                <LogoUpload 
                    currentLogo={logoUrl} 
                    onUploadComplete={(url) => setLogoUrl(url)} 
                />
                <div>
                  <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">Institutional Identity</CardTitle>
                  <CardDescription className="font-medium italic">Manage your public profile and branding.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-slate-500">School Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input className="pl-10 rounded-xl h-12 border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm font-bold" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-slate-500">Official Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input className="pl-10 rounded-xl h-12 border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-slate-500">Contact Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input 
                            className="pl-10 rounded-xl h-12 border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm" 
                            {...field} 
                            value={field.value || ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                    <FormLabel className="text-xs font-bold uppercase text-slate-500 italic block mb-2">Tenant Domain (Locked)</FormLabel>
                    <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input 
                            className="pl-10 rounded-xl h-12 border-slate-100 bg-slate-100 text-slate-400 font-mono text-sm cursor-not-allowed" 
                            value={`${tenant.id.substring(0,8)}.soi.localhost`}
                            disabled
                        />
                    </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-slate-500">Physical Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Textarea 
                          className="pl-10 rounded-xl min-h-[100px] border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm" 
                          placeholder="e.g. Sub-city, Street, Building..."
                          {...field} 
                          value={field.value || ""}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="bg-slate-50/50 p-8 border-t border-slate-100 flex justify-end gap-4 rounded-b-3xl">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-12 h-12 font-bold shadow-lg shadow-emerald-200 transition-all uppercase tracking-tighter"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Synchronizing...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
    </Form>
  );
}
