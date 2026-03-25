"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Check, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

interface LogoUploadProps {
    currentLogo?: string | null;
    onUploadComplete?: (url: string) => void;
}

export function LogoUpload({ currentLogo, onUploadComplete }: LogoUploadProps) {
    const [preview, setPreview] = useState<string | null>(currentLogo || null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation
        if (!file.type.startsWith("image/")) {
            toast({ title: "Invalid File", description: "Please upload an image file.", variant: "destructive" });
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setPreview(result);
            uploadLogo(result);
        };
        reader.readAsDataURL(file);
    };

    const uploadLogo = async (base64: string) => {
        setIsUploading(true);
        // Simulate real upload delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real app, you'd upload to Supabase Storage/S3 here
        // For now, we'll "successfully" complete the upload
        setIsUploading(false);
        toast({ title: "Logo Staged", description: "Your new logo is ready to be saved." });
        
        if (onUploadComplete) {
            onUploadComplete(base64); // Pass base64 as temporary internal URL
        }
    };

    const clearLogo = () => {
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="relative h-32 w-32 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden group hover:border-emerald-300 transition-all">
                {preview ? (
                    <>
                        <img 
                            src={preview} 
                            alt="Preview" 
                            className="h-full w-full object-contain p-2"
                        />
                        <button 
                            onClick={clearLogo}
                            className="absolute top-1 right-1 bg-rose-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                        <ImageIcon className="h-8 w-8" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">No Logo</span>
                    </div>
                )}

                {isUploading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
                    </div>
                )}
            </div>

            <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            <Button 
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl border-slate-200 font-bold text-xs h-9"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
            >
                <Upload className="h-3 w-3 mr-2" />
                {preview ? "Change Logo" : "Upload Logo"}
            </Button>
        </div>
    );
}
