import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, Upload, Image as ImageIcon, Save, Check } from "lucide-react";

export default function BrandingSettingsPage() {
    return (
        <div className="p-8 space-y-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Platform Branding</h1>
                    <p className="text-slate-500 mt-1">Configure the global default appearance, logos, and communication styles.</p>
                </div>
                <div className="flex gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Save className="h-4 w-4 mr-2" /> Save Global Changes
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-sm bg-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ImageIcon className="h-5 w-5 text-blue-500" /> Logos & Assets</CardTitle>
                    <CardDescription>Default assets used when a tenant does not provide their own custom branding.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <Label className="text-slate-700 font-bold">Primary Logo (Dark Text)</Label>
                            <div className="border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center p-8 text-center hover:bg-slate-100 transition-colors cursor-pointer">
                                <Upload className="h-8 w-8 text-slate-400 mb-3" />
                                <span className="text-sm font-medium text-blue-600">Click to upload</span>
                                <span className="text-xs text-slate-400 mt-1">SVG, PNG, or JPG (max 2MB)</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label className="text-slate-700 font-bold">Icon / Favicon</Label>
                            <div className="border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center p-8 text-center hover:bg-slate-100 transition-colors cursor-pointer">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl mb-3 flex items-center justify-center text-white font-bold">E</div>
                                <span className="text-sm font-medium text-blue-600">Change Icon</span>
                                <span className="text-xs text-slate-400 mt-1">1:1 Square (max 512px)</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-emerald-500" /> Default Color Palette</CardTitle>
                    <CardDescription>The base theme for email communications and non-whitelabeled school dashboards.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-slate-700 font-bold">Primary Brand Color</Label>
                            <div className="flex gap-3">
                                <div className="h-10 w-10 rounded-lg bg-blue-600 shadow-sm border border-slate-200 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-white" />
                                </div>
                                <Input type="text" defaultValue="#2563EB" className="font-mono text-slate-600 max-w-[120px]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-700 font-bold">Accent Color</Label>
                            <div className="flex gap-3">
                                <div className="h-10 w-10 rounded-lg bg-indigo-500 shadow-sm border border-slate-200 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-white" />
                                </div>
                                <Input type="text" defaultValue="#6366F1" className="font-mono text-slate-600 max-w-[120px]" />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-slate-50 border-t border-slate-100 rounded-b-xl px-6 py-4">
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Note: Enterprise tier schools can overwrite these defaults in their own isolated tenant settings.
                    </p>
                </CardFooter>
            </Card>

            <Card className="border-none shadow-sm bg-white">
                <CardHeader>
                    <CardTitle className="text-lg">Whitelabel Configuration</CardTitle>
                    <CardDescription>Global rules for stripping "Powered by EthioEdu".</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div>
                            <div className="font-bold text-slate-900">Enforce Platform Branding</div>
                            <div className="text-sm text-slate-500">Require platform watermark on free or standard tiers.</div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 border-none hover:bg-blue-100">Enabled</Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
