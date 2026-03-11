"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { registerInstitutionAction } from "@/lib/saas-actions";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export default function SignupPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        schoolName: "",
        adminName: "",
        email: "",
        password: "",
        domain: "",
        contactPhone: "",
        country: "Ethiopia"
    });

    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async () => {
        setLoading(true);
        try {
            // In a real app, hash password here or in the action
            const result = await registerInstitutionAction({
                ...formData,
                passwordHash: formData.password, // Temporary: using plain for demo, should be hashed
            });

            if (result.success) {
                setStep(3);
                // Redirect to their new subdomain after a delay
                setTimeout(() => {
                    const protocol = window.location.protocol;
                    const host = window.location.host.replace('localhost:3000', `${result.subdomain}.localhost:3000`);
                    window.location.href = `${protocol}//${host}/onboarding/setup`;
                }, 3000);
            }
        } catch (error) {
            console.error("Signup failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="mb-8 flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
                    <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-900 tracking-tight">EthioEdu SaaS</span>
            </div>

            <Card className="max-w-xl w-full border-none shadow-2xl overflow-hidden backdrop-blur-sm bg-white/90">
                <div className="h-1.5 w-full bg-slate-100">
                    <div
                        className="h-full bg-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                {step === 1 && (
                    <>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Register Your Institution</CardTitle>
                            <CardDescription>Start managing your school with the most advanced EMS platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="schoolName">Institution Name</Label>
                                    <Input id="schoolName" name="schoolName" placeholder="e.g. Addis Academy" value={formData.schoolName} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="domain">Desired Subdomain</Label>
                                    <div className="flex items-center">
                                        <Input id="domain" name="domain" placeholder="addis" value={formData.domain} onChange={handleInputChange} />
                                        <span className="ml-2 text-sm text-slate-400">.school.com</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Input id="country" name="country" value={formData.country} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contactPhone">Official Phone Number</Label>
                                <Input id="contactPhone" name="contactPhone" placeholder="+251..." value={formData.contactPhone} onChange={handleInputChange} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setStep(2)}>
                                Next: Admin Details <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </>
                )}

                {step === 2 && (
                    <>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Institutional Admin Account</CardTitle>
                            <CardDescription>This account will have full control over your institution's portal.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="adminName">Full Name</Label>
                                <Input id="adminName" name="adminName" placeholder="Super Admin" value={formData.adminName} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Work Email</Label>
                                <Input id="email" name="email" type="email" placeholder="admin@school.com" value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Security Password</Label>
                                <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700 h-11"
                                onClick={handleSignup}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Complete Registration"}
                            </Button>
                            <Button variant="ghost" className="w-full text-slate-500" onClick={() => setStep(1)} disabled={loading}>
                                Back to Institution info
                            </Button>
                        </CardFooter>
                    </>
                )}

                {step === 3 && (
                    <div className="py-12 px-6 text-center animate-in fade-in zoom-in duration-500">
                        <div className="mx-auto bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Institution Provisioned!</h2>
                        <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                            We've created **{formData.schoolName}** and established your secure subdomain at **{formData.domain}.schoolsystem.com**.
                        </p>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center gap-3">
                            <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                            <span className="text-sm font-medium text-slate-500 uppercase tracking-widest">
                                Redirecting to your Workspace...
                            </span>
                        </div>
                    </div>
                )}
            </Card>

            <p className="mt-8 text-sm text-slate-400">
                By registering, you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
    );
}
