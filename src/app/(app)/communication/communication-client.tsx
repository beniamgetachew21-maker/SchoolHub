"use client"
import * as React from "react"
import {
    Send, Bell, MessageSquare, Mail, Smartphone,
    Users, Megaphone, BookOpen, AlertCircle, CheckCircle2,
    PlusCircle, ChevronRight
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const CATEGORY_COLORS: Record<string, string> = {
    General:  "bg-blue-500/10 text-blue-600 border-blue-500/20",
    Exam:     "bg-rose-500/10 text-rose-600 border-rose-500/20",
    Homework: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    Alert:    "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

const NOTIFICATION_TEMPLATES = [
    { label: "Absence Alert",    body: "Dear Parent, your child was marked ABSENT on {date}. Please contact the school if this is an error.",      category: "Alert" },
    { label: "Exam Reminder",    body: "Reminder: {subject} examination is scheduled for {date}. Please ensure your child is prepared.",              category: "Exam" },
    { label: "Fee Due Reminder", body: "This is a reminder that the pending invoice #{invoiceId} of ETB {amount} is due on {date}.",                  category: "General" },
    { label: "PTM Notice",       body: "Parent-Teacher Meeting is scheduled on {date}. Your slot is at {time}. Please attend without fail.",           category: "General" },
    { label: "Result Published", body: "The results for {assessment} have been published. Login to the Student Portal to view your child's grades.", category: "General" },
];

export function CommunicationClient({ announcements, teachers, students }: {
    announcements: any[];
    teachers: any[];
    students: any[];
}) {
    const [notifForm, setNotifForm] = React.useState({
        channel: "email",
        audience: "all",
        subject: "",
        message: "",
        sendSMS: true,
        sendEmail: true,
    });
    const [isSending, setIsSending] = React.useState(false);
    const [announceForm, setAnnounceForm] = React.useState({
        title: "", content: "", category: "General",
    });
    const [localAnnouncements, setLocalAnnouncements] = React.useState(announcements);
    const [messageForm, setMessageForm] = React.useState({ to: "", message: "" });

    const handleSendNotification = async () => {
        if (!notifForm.message.trim()) { toast({ variant: "destructive", title: "Message required" }); return; }
        setIsSending(true);
        await new Promise(r => setTimeout(r, 1200)); // Simulate gateway
        setIsSending(false);
        const count = notifForm.audience === "all" ? students.length : 1;
        toast({
            title: "✅ Notification Dispatched",
            description: `Message sent to ${count} recipients via ${notifForm.sendSMS ? "SMS" : ""}${notifForm.sendSMS && notifForm.sendEmail ? " + " : ""}${notifForm.sendEmail ? "Email" : ""}.`,
        });
        setNotifForm(f => ({ ...f, message: "", subject: "" }));
    };

    const handlePostAnnouncement = () => {
        if (!announceForm.title.trim() || !announceForm.content.trim()) {
            toast({ variant: "destructive", title: "Fill all fields" }); return;
        }
        const newAnn = {
            id: Date.now(),
            title: announceForm.title,
            content: announceForm.content,
            category: announceForm.category,
            date: new Date().toISOString().split("T")[0],
            postedBy: "Admin",
        };
        setLocalAnnouncements(prev => [newAnn, ...prev]);
        setAnnounceForm({ title: "", content: "", category: "General" });
        toast({ title: "✅ Announcement Posted", description: `"${newAnn.title}" is now visible to all users.` });
    };

    const handleSendMessage = async () => {
        if (!messageForm.to || !messageForm.message.trim()) {
            toast({ variant: "destructive", title: "Select recipient and write a message" }); return;
        }
        await new Promise(r => setTimeout(r, 800));
        toast({ title: "✅ Message Sent", description: "Your message has been delivered to the recipient's inbox." });
        setMessageForm({ to: "", message: "" });
    };

    return (
        <Tabs defaultValue="broadcast" className="space-y-6">
            <TabsList className="bg-muted/50 border border-emerald-500/10 p-1">
                <TabsTrigger value="broadcast" className="font-black uppercase text-xs">Broadcast Alerts</TabsTrigger>
                <TabsTrigger value="announcements" className="font-black uppercase text-xs">Announcements</TabsTrigger>
                <TabsTrigger value="messages" className="font-black uppercase text-xs">Messages</TabsTrigger>
            </TabsList>

            {/* ── Broadcast Tab ── */}
            <TabsContent value="broadcast" className="animate-in fade-in duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Templates */}
                    <div className="space-y-3">
                        <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-3">Quick Templates</h3>
                        {NOTIFICATION_TEMPLATES.map(tpl => (
                            <button
                                key={tpl.label}
                                onClick={() => setNotifForm(f => ({ ...f, message: tpl.body, category: tpl.category }))}
                                className="w-full text-left p-4 rounded-2xl bg-muted/20 border border-border/30 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-black text-sm">{tpl.label}</span>
                                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600" />
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2 font-medium">{tpl.body}</p>
                            </button>
                        ))}
                    </div>

                    {/* Compose */}
                    <div className="lg:col-span-2">
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle className="font-black text-xl flex items-center gap-2">
                                    <Megaphone className="h-5 w-5 text-emerald-600" />
                                    Compose Broadcast
                                </CardTitle>
                                <CardDescription>Send alerts to students and parents via SMS and email simultaneously.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="font-black uppercase text-[10px] tracking-widest">Audience</Label>
                                        <Select value={notifForm.audience} onValueChange={v => setNotifForm(f => ({ ...f, audience: v }))}>
                                            <SelectTrigger className="bg-muted/20 border-border/50">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Students & Parents</SelectItem>
                                                <SelectItem value="grade10">Grade 10 Students</SelectItem>
                                                <SelectItem value="grade11">Grade 11 Students</SelectItem>
                                                <SelectItem value="grade12">Grade 12 Students</SelectItem>
                                                <SelectItem value="parents_only">Parents Only</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-black uppercase text-[10px] tracking-widest">Subject</Label>
                                        <Input
                                            placeholder="Email subject line…"
                                            value={notifForm.subject}
                                            onChange={e => setNotifForm(f => ({ ...f, subject: e.target.value }))}
                                            className="bg-muted/20 border-border/50"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-black uppercase text-[10px] tracking-widest">Message Body</Label>
                                    <Textarea
                                        rows={5}
                                        placeholder="Type your message here… Use {date}, {name}, {amount} as dynamic tokens."
                                        value={notifForm.message}
                                        onChange={e => setNotifForm(f => ({ ...f, message: e.target.value }))}
                                        className="bg-muted/20 border-border/50 font-medium resize-none"
                                    />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-border/20">
                                    <div className="flex gap-6">
                                        <div className="flex items-center gap-2">
                                            <Switch checked={notifForm.sendSMS} onCheckedChange={v => setNotifForm(f => ({ ...f, sendSMS: v }))} />
                                            <div className="flex items-center gap-1.5">
                                                <Smartphone className="h-4 w-4 text-emerald-600" />
                                                <span className="font-black text-xs uppercase tracking-widest">SMS</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Switch checked={notifForm.sendEmail} onCheckedChange={v => setNotifForm(f => ({ ...f, sendEmail: v }))} />
                                            <div className="flex items-center gap-1.5">
                                                <Mail className="h-4 w-4 text-blue-600" />
                                                <span className="font-black text-xs uppercase tracking-widest">Email</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        className="h-11 px-8 emerald-gradient text-white font-black rounded-xl"
                                        onClick={handleSendNotification}
                                        disabled={isSending || (!notifForm.sendSMS && !notifForm.sendEmail)}
                                    >
                                        <Send className="mr-2 h-4 w-4" />
                                        {isSending ? "Sending…" : "Send Broadcast"}
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                                    <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                                    In production: SMS via <strong>Africa&apos;s Talking</strong>, Email via <strong>SendGrid</strong>. Currently simulated.
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </TabsContent>

            {/* ── Announcements Tab ── */}
            <TabsContent value="announcements" className="animate-in fade-in duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Create */}
                    <Card className="glass-card h-fit">
                        <CardHeader>
                            <CardTitle className="font-black text-lg flex items-center gap-2">
                                <PlusCircle className="h-5 w-5 text-emerald-600" />
                                New Announcement
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="font-black uppercase text-[10px] tracking-widest">Title</Label>
                                <Input value={announceForm.title} onChange={e => setAnnounceForm(f => ({ ...f, title: e.target.value }))} className="bg-muted/20 border-border/50" placeholder="Announcement title…" />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-black uppercase text-[10px] tracking-widest">Category</Label>
                                <Select value={announceForm.category} onValueChange={v => setAnnounceForm(f => ({ ...f, category: v }))}>
                                    <SelectTrigger className="bg-muted/20 border-border/50"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {["General", "Exam", "Homework", "Alert"].map(c => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="font-black uppercase text-[10px] tracking-widest">Content</Label>
                                <Textarea rows={4} value={announceForm.content} onChange={e => setAnnounceForm(f => ({ ...f, content: e.target.value }))} className="bg-muted/20 border-border/50 resize-none" placeholder="Announcement body…" />
                            </div>
                            <Button className="w-full emerald-gradient text-white font-black h-10 rounded-xl" onClick={handlePostAnnouncement}>
                                Post Announcement
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Feed */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Published Announcements</h3>
                        {localAnnouncements.map(ann => (
                            <Card key={ann.id} className="glass-card hover:border-emerald-500/20 transition-all">
                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between gap-3">
                                        <CardTitle className="font-black text-base leading-tight">{ann.title}</CardTitle>
                                        <Badge className={cn("text-[10px] font-bold px-2 flex-shrink-0", CATEGORY_COLORS[ann.category] || "bg-muted")}>
                                            {ann.category}
                                        </Badge>
                                    </div>
                                    <CardDescription className="font-bold text-xs">
                                        {ann.postedBy} • {new Date(ann.date).toLocaleDateString()}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm font-medium text-muted-foreground">{ann.content}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </TabsContent>

            {/* ── Messages Tab ── */}
            <TabsContent value="messages" className="animate-in fade-in duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="font-black text-xl flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-emerald-600" />
                                Send Direct Message
                            </CardTitle>
                            <CardDescription>Send a private message to a teacher or staff member.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-2">
                                <Label className="font-black uppercase text-[10px] tracking-widest">Recipient</Label>
                                <Select value={messageForm.to} onValueChange={v => setMessageForm(f => ({ ...f, to: v }))}>
                                    <SelectTrigger className="bg-muted/20 border-border/50"><SelectValue placeholder="Select teacher or staff…" /></SelectTrigger>
                                    <SelectContent>
                                        {teachers.map((t: any) => (
                                            <SelectItem key={t.employeeId} value={t.employeeId}>{t.name} — {t.designation}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="font-black uppercase text-[10px] tracking-widest">Message</Label>
                                <Textarea
                                    rows={6}
                                    placeholder="Write your message here…"
                                    value={messageForm.message}
                                    onChange={e => setMessageForm(f => ({ ...f, message: e.target.value }))}
                                    className="bg-muted/20 border-border/50 font-medium resize-none"
                                />
                            </div>
                            <Button className="w-full h-12 emerald-gradient text-white font-black rounded-xl" onClick={handleSendMessage}>
                                <Send className="mr-2 h-4 w-4" /> Send Message
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Channel Overview</h3>
                        {[
                            { icon: Smartphone, label: "SMS Gateway",    desc: "Africa's Talking API",  status: "Active",      detail: "245 SMS sent this month" },
                            { icon: Mail,       label: "Email Service",  desc: "SendGrid Integration",  status: "Active",      detail: "1,203 emails sent this month" },
                            { icon: Bell,       label: "Push Alerts",    desc: "Firebase FCM",          status: "Configured",  detail: "Mobile app notifications" },
                            { icon: MessageSquare, label: "In-App MSG", desc: "Real-time WebSocket",   status: "Active",      detail: "56 active conversations" },
                        ].map(channel => (
                            <div key={channel.label} className="flex items-center gap-4 p-5 rounded-2xl bg-muted/10 border border-border/20 hover:border-emerald-500/20 transition-all">
                                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                                    <channel.icon className="h-6 w-6 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-black text-sm">{channel.label}</p>
                                    <p className="text-xs text-muted-foreground font-medium">{channel.desc}</p>
                                    <p className="text-[10px] text-muted-foreground mt-0.5">{channel.detail}</p>
                                </div>
                                <Badge className={cn("font-bold text-[10px]",
                                    channel.status === "Active" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                )}>
                                    {channel.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    );
}
