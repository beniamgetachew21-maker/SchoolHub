
"use client";
import * as React from "react";
import Image from "next/image";
import { UserCircle2 } from "lucide-react";
import QRCode from 'qrcode';
import { type Student, type Employee } from "@/app/lib/data";
import Barcode from 'react-barcode';

type UserType = {
    id: string;
    name: string;
    avatarUrl: string;
    role: string;
    type: 'Student' | 'Staff' | 'Visitor';
    email?: string;
    dob?: string;
    address?: string;
    medical?: {
        allergies?: string[];
        conditions?: string[];
        bloodGroup: string;
        emergencyContact: {
            name: string;
            relation: string;
            phone: string;
        }
    }
}

interface IdCardDisplayProps {
  user: UserType | null;
  generationState: "idle" | "generated";
}

export function IdCardDisplay({ user, generationState }: IdCardDisplayProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState('');
  const cardAspectRatio = 85.6 / 54; // Standard ID-1 card ratio
  const cardHeight = "250px";

  React.useEffect(() => {
    if (user && generationState === 'generated') {
        const qrData = JSON.stringify({ id: user.id, name: user.name, type: user.type, email: user.email });
        QRCode.toDataURL(qrData, { width: 60, margin: 1 })
            .then(url => {
                setQrCodeDataUrl(url);
            })
            .catch(err => {
                console.error(err);
            });
    }
  }, [user, generationState]);

  const renderCardContent = () => {
    if (generationState === "idle" || !user) {
      return (
        <div className="bg-muted w-full h-full flex flex-col items-center justify-center text-muted-foreground text-center p-4 rounded-lg">
          <UserCircle2 className="h-16 w-16 mb-4" />
          <p>Select a person and click "Generate Card" to create an ID card.</p>
        </div>
      );
    }

    return (
      <div id="id-card-front" className="id-card-print-area relative w-full h-full text-white shadow-lg rounded-lg overflow-hidden font-sans bg-gradient-to-br from-primary to-accent">
        <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
        <div className="relative p-4 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
                <div>
                     <h2 className="text-xl font-bold font-headline">Global Academy</h2>
                     <p className="text-xs opacity-80">{user.type} ID Card</p>
                </div>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-white/80"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            </div>
            <div className="flex items-center gap-4">
                 {user.avatarUrl ? (
                    <Image src={user.avatarUrl} alt={user.name} width={80} height={100} objectFit="cover" className="rounded-md border-2 border-white/80" />
                ) : (
                    <div className="w-[80px] h-[100px] flex items-center justify-center bg-black/20 rounded-md border-2 border-white/50">
                        <UserCircle2 className="w-12 h-12 text-white/50" />
                    </div>
                )}
                <div className="flex-1">
                    <p className="text-sm opacity-80">Name</p>
                    <p className="font-bold text-lg leading-tight">{user.name}</p>
                     <p className="text-sm opacity-80 mt-2">ID Number</p>
                    <p className="font-mono text-sm">{user.id}</p>
                </div>
            </div>
             <div>
                <p className="text-xs opacity-80">{user.type === 'Student' ? 'Class' : 'Designation'}</p>
                <p className="font-semibold text-sm">{user.role}</p>
             </div>
        </div>
      </div>
    );
  }

  const renderBackContent = () => {
     if (generationState === "idle" || !user) {
      return (
        <div className="bg-muted w-full h-full flex flex-col items-center justify-center text-muted-foreground text-center p-4 rounded-lg">
          <UserCircle2 className="h-16 w-16 mb-4" />
          <p>Card back will appear here.</p>
        </div>
      );
    }
    return (
        <div id="id-card-back" className="id-card-print-area relative w-full h-full bg-white rounded-lg shadow-lg text-black font-sans p-4 flex flex-col">
            <div className="h-6 bg-primary -mx-4 mt-[-1rem]"/>
            <div className="text-xs space-y-2 mt-4 flex-grow">
                {user.dob && <p><strong className="font-semibold">DOB:</strong> {user.dob}</p>}
                {user.address && <p><strong className="font-semibold">Address:</strong> {user.address}</p>}
                {user.medical?.bloodGroup && <p><strong className="font-semibold">Blood Group:</strong> {user.medical.bloodGroup}</p>}
                {user.medical?.emergencyContact && <p><strong className="font-semibold">Emergency Contact:</strong><br/>{user.medical.emergencyContact.name} ({user.medical.emergencyContact.relation})<br/>{user.medical.emergencyContact.phone}</p>}
            </div>
             <div className="flex justify-between items-end mt-4">
                <div className="text-xs text-muted-foreground">
                    <p>If found, please return to:</p>
                    <p className="font-semibold">Global Academy</p>
                    <p>123 Education Lane, Knowledge City</p>
                </div>
                <div className="flex flex-col items-center">
                    {qrCodeDataUrl && <Image src={qrCodeDataUrl} alt="QR Code" width={60} height={60} />}
                    <Barcode value={user.id} height={20} width={1} displayValue={false} margin={0} />
                </div>
             </div>
        </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-8 justify-center items-start">
        <div className="card">
            <h3 className="font-semibold text-center mb-2">Front</h3>
            <div className="relative" style={{ height: cardHeight, aspectRatio: cardAspectRatio.toString() }}>
                {renderCardContent()}
            </div>
        </div>
        <div className="card">
            <h3 className="font-semibold text-center mb-2">Back</h3>
            <div className="relative" style={{ height: cardHeight, aspectRatio: cardAspectRatio.toString() }}>
                {renderBackContent()}
            </div>
        </div>
    </div>
  );
}
