"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save, Languages, Palette, Loader2 } from "lucide-react";
import { LogoUpload } from "@/components/ui/logo-upload";
import { updateTenantBrandingAction } from "@/lib/actions/branding-actions";
import { toast } from "@/hooks/use-toast";

interface SettingsFormProps {
    tenant: {
        id: string;
        language: string;
        calendarSystem: string;
        logoUrl: string | null;
        name: string;
    }
}

export function SettingsForm({ tenant }: SettingsFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [logoUrl, setLogoUrl] = useState(tenant.logoUrl);
    const [language, setLanguage] = useState(tenant.language);
    const [calendar, setCalendar] = useState(tenant.calendarSystem);

    async function handleSave() {
        setIsSubmitting(true);
        const result = await updateTenantBrandingAction(tenant.id, {
            logoUrl: logoUrl || undefined,
            language,
            calendarSystem: calendar,
        });
        setIsSubmitting(false);

        if (result.success) {
            toast({
                title: "Settings Saved",
                description: "Global preferences have been updated.",
            });
        } else {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            });
        }
    }

    return (
        <div className="grid gap-8">
            <section className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-widest text-emerald-700 flex items-center gap-2">
                    <Languages className="h-4 w-4" /> Localization & Language
                </h2>
                <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-sm font-black text-slate-900 uppercase tracking-tight">System Language</Label>
                                <p className="text-xs text-slate-500 font-medium italic">Set the primary administrative language.</p>
                            </div>
                            <select 
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="rounded-xl h-10 border-slate-200 bg-slate-50 px-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            >
                                <option value="English">English (US)</option>
                                <option value="Amharic">Amharic (አማርኛ)</option>
                                <option value="Oromo">Oromo (Afaan Oromoo)</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <div className="space-y-1">
                                <Label className="text-sm font-black text-slate-900 uppercase tracking-tight">Calendar System</Label>
                                <p className="text-xs text-slate-500 font-medium italic">Format for dates and academic scheduling.</p>
                            </div>
                            <select 
                                value={calendar}
                                onChange={(e) => setCalendar(e.target.value)}
                                className="rounded-xl h-10 border-slate-200 bg-slate-50 px-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            >
                                <option value="Gregorian">Gregorian Calendar</option>
                                <option value="Ethiopian">Ethiopian Calendar</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>
            </section>

            <section className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-widest text-emerald-700 flex items-center gap-2">
                    <Palette className="h-4 w-4" /> Branding & UI
                </h2>
                <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-sm font-black text-slate-900 uppercase tracking-tight">Custom Dashboard Logo</Label>
                                <p className="text-xs text-slate-500 font-medium italic">Logo for the sidebar and white-labeled reports.</p>
                            </div>
                            <LogoUpload 
                                currentLogo={logoUrl} 
                                onUploadComplete={(url) => setLogoUrl(url)} 
                            />
                        </div>
                    </CardContent>
                </Card>
            </section>

            <div className="flex justify-end pt-4">
                <Button 
                    onClick={handleSave}
                    disabled={isSubmitting}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-12 h-12 font-bold shadow-lg shadow-emerald-200 transition-all uppercase tracking-tighter"
                >
                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Preferences</>}
                </Button>
            </div>
        </div>
    );
}
