
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none text-muted-foreground">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, register a student, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide. We also collect technical data automatically, such as IP address and browsing behavior.
          </p>
          
          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services. This includes:
          </p>
          <ul>
            <li>Facilitating account creation and logon process.</li>
            <li>Managing student and staff information for educational purposes.</li>
            <li>Processing payments and financial transactions.</li>
            <li>Sending administrative information, such as updates to our terms or policies.</li>
            <li>Responding to your comments, questions, and requests.</li>
          </ul>

          <h2>3. Sharing Your Information</h2>
          <p>
            We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf. We may also share information in response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law or legal process.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights under local data protection laws. These may include the right to access, correct, update, or request deletion of your personal information.
          </p>
          
          <h2>6. Changes to This Policy</h2>
          <p>
            We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.
          </p>
          
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@campushub.example.com.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
