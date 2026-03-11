import { getApplicationById } from "@/lib/actions";
import { notFound } from "next/navigation";
import { ApplicationDetailsClient } from "./application-details-client";

export default async function ApplicationDetailPage({ params }: { params: Promise<{ applicationId: string }> }) {
    const { applicationId } = await params;
    const application = await getApplicationById(applicationId);

    if (!application) {
        notFound();
    }

    return (
        <div className="p-6">
            <ApplicationDetailsClient application={application} />
        </div>
    );
}
