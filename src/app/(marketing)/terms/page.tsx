
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none text-muted-foreground">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Introduction</h2>
          <p>
            Welcome to Campus Hub! These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, do not use our services.
          </p>
          
          <h2>2. Use of Our Services</h2>
          <p>
            You must use our services in compliance with all applicable laws. You may not use our services for any unlawful purpose or in any way that could harm our company, our users, or any other person. You are responsible for any content you provide and for your account's security.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            All content and materials available on Campus Hub, including but not limited to text, graphics, website name, code, images, and logos are the intellectual property of our company and are protected by applicable copyright and trademark law.
          </p>

          <h2>4. Termination</h2>
          <p>
            We may terminate or suspend your access to our services at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h2>5. Disclaimers</h2>
          <p>
            Our services are provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that the services will be uninterrupted, secure, or free from errors or omissions.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall Campus Hub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@campushub.example.com.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
