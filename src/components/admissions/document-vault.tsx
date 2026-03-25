"use client";

import React, { useState } from "react";
import { 
    UploadCloud, 
    FileText, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    ShieldCheck,
    Camera,
    FileCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type DocumentStatus = "pending" | "uploaded" | "verified" | "rejected";

export interface RequiredDocument {
    id: string;
    name: string;
    type: "pdf" | "image" | "mixed";
    status: DocumentStatus;
    isRequired: boolean;
    lastUpdated?: string;
    rejectionReason?: string;
}

interface DocumentVaultProps {
    documents: RequiredDocument[];
    className?: string;
}

export function DocumentVault({ documents, className }: DocumentVaultProps) {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        // Handle file drop logic here
    };

    const getStatusConfig = (status: DocumentStatus) => {
        switch(status) {
            case "verified": return { icon: CheckCircle2, bg: "bg-emerald-500", text: "text-white", border: "border-emerald-500", label: "Verified", iconBg: "bg-emerald-50" };
            case "uploaded": return { icon: Clock, bg: "bg-blue-500", text: "text-white", border: "border-blue-500", label: "Under Review", iconBg: "bg-blue-50" };
            case "rejected": return { icon: AlertCircle, bg: "bg-rose-500", text: "text-white", border: "border-rose-500", label: "Rejected", iconBg: "bg-rose-50" };
            case "pending": default: return { icon: UploadCloud, bg: "bg-white", text: "text-slate-400", border: "border-slate-200", label: "Pending Upload", iconBg: "bg-slate-50" };
        }
    };

    const isComplete = documents.every(d => d.status === "verified");

    return (
        <div className={cn("premium-glass-card rounded-[3rem] p-8 lg:p-12 border border-white/80 shadow-2xl shadow-slate-200/50 relative overflow-hidden group", className)}>
            {/* Background Security Watermark */}
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none -z-10 group-hover:scale-110 transition-transform duration-700">
                <ShieldCheck className="h-64 w-64 text-emerald-600" />
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full mb-3">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Encrypted Storage</span>
                    </div>
                    <h3 className="text-3xl font-black text-[#0F172A] tracking-tight">Document Vault</h3>
                    <p className="text-sm font-medium text-slate-500 mt-2 max-w-md leading-relaxed">Securely upload and manage requisite applicant records. All files are encrypted end-to-end.</p>
                </div>
                
                {isComplete && (
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-2xl font-bold border border-emerald-100 shadow-sm">
                        <FileCheck className="h-5 w-5" /> All files verified
                    </div>
                )}
            </div>

            {/* Upload Zone */}
            <div 
                className={cn(
                    "border-2 border-dashed rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center transition-all duration-300 relative overflow-hidden mb-10",
                    dragActive ? "border-emerald-500 bg-emerald-50/50 scale-[1.02]" : "border-emerald-200/60 bg-emerald-50/20 hover:bg-emerald-50/40 hover:border-emerald-300"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                <div className="h-16 w-16 bg-white rounded-[20px] shadow-xl shadow-emerald-900/5 flex items-center justify-center mb-5 group-hover/zone:scale-110 transition-transform relative">
                    <div className={cn("absolute inset-0 bg-emerald-400 opacity-20 blur-xl rounded-full scale-150 transition-opacity", dragActive ? "opacity-40 animate-pulse" : "")} />
                    <UploadCloud className="h-8 w-8 text-emerald-600 relative z-10" />
                </div>
                <h4 className="text-lg font-black text-[#0F172A] mb-1">Drag requisite files here</h4>
                <p className="text-sm font-medium text-slate-500">or click to browse from device</p>
                <div className="mt-4 flex gap-2 justify-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">PDF</span>
                    <span className="bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">JPG</span>
                    <span className="bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">PNG</span>
                </div>
            </div>

            {/* Document List */}
            <div className="space-y-4">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Required Submissions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documents.map((doc) => {
                        const style = getStatusConfig(doc.status);
                        return (
                            <div key={doc.id} className={cn("flex flex-col justify-between p-5 bg-white rounded-[24px] border border-slate-200 shadow-sm transition-all hover:shadow-md", doc.status === "pending" ? "hover:border-slate-300" : "hover:border-emerald-200")}>
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={cn("h-12 w-12 rounded-[16px] flex items-center justify-center shrink-0", style.iconBg)}>
                                        {doc.name.toLowerCase().includes("photo") ? <Camera className={cn("h-6 w-6", doc.status !== "pending" ? "text-emerald-600" : "text-slate-400")} /> : <FileText className={cn("h-6 w-6", doc.status !== "pending" ? "text-emerald-600" : "text-slate-400")} />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-black text-slate-900 leading-tight">{doc.name}</p>
                                            {doc.isRequired && <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">*</span>}
                                        </div>
                                        {doc.lastUpdated && <p className="text-[10px] font-bold text-slate-400 mt-1">Updated {doc.lastUpdated}</p>}
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
                                    <Badge className={cn("px-3 py-1 font-black text-[10px] uppercase tracking-widest shadow-none", style.bg, style.text, style.border, doc.status !== "pending" && "border-none shadow-sm")}>
                                        <span className="flex items-center gap-1.5">
                                            <style.icon className="h-3 w-3" /> {style.label}
                                        </span>
                                    </Badge>
                                    
                                    {doc.status === "rejected" && doc.rejectionReason && (
                                        <span className="text-[10px] font-bold text-rose-500">{doc.rejectionReason}</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
