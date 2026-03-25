import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plug, Zap, Check, AlertCircle } from "lucide-react";
import { getGlobalIntegrations } from "@/lib/saas/integration-actions";

export default async function IntegrationsPage() {
    const config = await getGlobalIntegrations();
    const stripe = config.find(x => x.provider === 'Stripe');
    const twilio = config.find(x => x.provider === 'Twilio');
    const sendgrid = config.find(x => x.provider === 'SendGrid');

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Integrations & API</h1>
                    <p className="text-slate-500 mt-1">Manage global webhooks, third-party API keys, and service connected to the platform.</p>
                </div>
                <div className="flex gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plug className="h-4 w-4 mr-2" /> Add Connection
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stripe */}
                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2 border-b border-slate-100">
                        <div className="w-12 h-12 bg-[#635BFF] rounded-lg items-center justify-center flex shrink-0">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <div>
                            <CardTitle className="text-lg">Stripe Billing</CardTitle>
                            <CardDescription>Payment gateway for SaaS subscriptions.</CardDescription>
                        </div>
                        <Badge className={`ml-auto border-none ${stripe?.status === 'Connected' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                            {stripe?.status || 'Disconnected'}
                        </Badge>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-2 text-sm text-slate-600">
                        <div className="flex justify-between">
                            <span className="font-medium text-slate-900">Environment</span>
                            <span>{stripe?.env || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-slate-900">Webhook Status</span>
                            <span className={stripe?.status === 'Connected' ? "flex items-center text-emerald-600" : "text-slate-500"}>
                                {stripe?.status === 'Connected' ? <><Check className="h-3 w-3 mr-1" /> 100% Success</> : 'Not Active'}
                            </span>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50 border-t border-slate-100 py-3 rounded-b-xl flex justify-between">
                        <span className="text-xs text-slate-400">Last synced: 2 mins ago</span>
                        <Button variant="ghost" size="sm" className="text-blue-600 h-8">Configure</Button>
                    </CardFooter>
                </Card>

                {/* Twilio */}
                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2 border-b border-slate-100">
                        <div className="w-12 h-12 bg-rose-500 rounded-lg items-center justify-center flex shrink-0">
                            <span className="text-white font-bold text-xl">T</span>
                        </div>
                        <div>
                            <CardTitle className="text-lg">Twilio SMS</CardTitle>
                            <CardDescription>Global SMS gateway for parent alerts.</CardDescription>
                        </div>
                        <Badge variant="outline" className={`ml-auto gap-1 border-none ${twilio?.status === 'Critical' ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {twilio?.status === 'Critical' && <AlertCircle className="h-3 w-3" />} {twilio?.status || 'Disconnected'}
                        </Badge>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-2 text-sm text-slate-600">
                        <div className="flex justify-between">
                            <span className="font-medium text-slate-900">Environment</span>
                            <span>{twilio?.env || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-slate-900">Balance</span>
                            <span className={twilio?.status === 'Critical' ? "text-rose-600 font-bold" : "text-slate-600"}>
                                {twilio?.status === 'Critical' ? 'Br 280.00 (Critical)' : 'Healthy'}
                            </span>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50 border-t border-slate-100 py-3 rounded-b-xl flex justify-between">
                        <span className="text-xs text-slate-400">Last synced: 5 mins ago</span>
                        <Button variant="ghost" size="sm" className="text-blue-600 h-8">Review</Button>
                    </CardFooter>
                </Card>

                {/* SendGrid */}
                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2 border-b border-slate-100">
                        <div className="w-12 h-12 bg-sky-500 rounded-lg items-center justify-center flex shrink-0">
                            <span className="text-white font-bold text-xl">SG</span>
                        </div>
                        <div>
                            <CardTitle className="text-lg">SendGrid</CardTitle>
                            <CardDescription>Transactional emails & newsletters.</CardDescription>
                        </div>
                        <Badge className={`ml-auto border-none ${sendgrid?.status === 'Connected' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                            {sendgrid?.status || 'Disconnected'}
                        </Badge>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-2 text-sm text-slate-600">
                        <div className="flex justify-between">
                            <span className="font-medium text-slate-900">Monthly Usage</span>
                            <span>42K / 100K Emails</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-slate-900">Reputation</span>
                            <span className={sendgrid?.status === 'Connected' ? "text-emerald-600" : "text-slate-500"}>
                                {sendgrid?.status === 'Connected' ? '99.8%' : 'N/A'}
                            </span>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50 border-t border-slate-100 py-3 rounded-b-xl flex justify-between">
                        <span className="text-xs text-slate-400">Last synced: 1 hour ago</span>
                        <Button variant="ghost" size="sm" className="text-blue-600 h-8">Configure</Button>
                    </CardFooter>
                </Card>

                {/* Webhooks */}
                <Card className="border-none shadow-sm bg-slate-50 border-dashed border-2 border-slate-200 flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                        <Zap className="h-6 w-6 text-slate-300" />
                    </div>
                    <CardTitle className="text-slate-500">Global Webhooks</CardTitle>
                    <CardDescription className="max-w-[250px] mt-2 mb-4">Configure custom endpoints to receive tenant events in real-time.</CardDescription>
                    <Button variant="outline" className="bg-white">Configure Endpoints</Button>
                </Card>
            </div>
        </div>
    );
}
