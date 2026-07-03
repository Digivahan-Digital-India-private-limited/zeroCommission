import React from "react";
import {
  Shield, Lock, Eye, Database, Share2, Bell, UserCheck, FileText, Phone, Mail,
  MapPin, ChevronRight, Menu, X, Building2, Wallet, Smartphone, Globe2, Gavel,
  Scale, Handshake, AlertTriangle, RefreshCcw, Landmark, MessageSquareWarning,
  ReceiptText, ShieldCheck, ShieldAlert, Link2,
} from "lucide-react";

const SECTIONS = [
  {
    id: "s1",
    title: "1. Acceptance of Terms",
    icon: ShieldCheck,
    body: [
      "By accessing or using the Zero Commission website, mobile application, or any related services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.",
      "If you do not agree with any part of these Terms, you must stop using the platform immediately.",
    ],
  },
  {
    id: "s2",
    title: "2. About the Service",
    icon: Building2,
    body: [
      "Zero Commission is a Loan Direct Selling Agent (DSA) and loan facilitation platform that helps customers connect with partner Banks, NBFCs, Housing Finance Companies, and other RBI-regulated lenders.",
      "We do not provide loans directly, and we do not guarantee approval, sanction, disbursement, or the terms of any loan product.",
      "All final credit decisions, interest rates, processing charges, eligibility rules, tenure, EMI calculations, and loan approval outcomes are solely determined by the lending partner.",
    ],
  },
  {
    id: "s3",
    title: "3. Eligibility and User Responsibilities",
    icon: UserCheck,
    body: [
      "You must be at least 18 years of age and legally competent to enter into a financial agreement under applicable Indian law.",
      "You agree to provide accurate, complete, and genuine information and supporting documents during registration, KYC, and application processing.",
      "You are responsible for ensuring that all information submitted to Zero Commission or its lending partners is truthful, current, and lawful.",
    ],
  },
  {
    id: "s4",
    title: "4. Application Submission and Processing",
    icon: FileText,
    body: [
      "By submitting an application or enquiry, you authorize Zero Commission to share your information with selected lending partners for eligibility checks, application review, and related processing activities.",
      "Zero Commission may request additional documents, clarifications, or verification details to process your application.",
      "Any delay, rejection, or non-approval by a lender is outside Zero Commission's control and does not amount to a breach of these Terms.",
    ],
  },
  {
    id: "s5",
    title: "5. Fees, Charges, and No Hidden Commission",
    icon: ReceiptText,
    body: [
      "Zero Commission is committed to a zero-commission model for customers and does not charge additional platform fees for loan facilitation services unless expressly disclosed in writing.",
      "Any processing charges, interest, foreclosure charges, documentation charges, or other applicable lender-specific fees shall be as communicated by the respective lender.",
      "You agree to review and accept all charges communicated by the lender before proceeding with any loan agreement.",
    ],
  },
  {
    id: "s6",
    title: "6. Privacy and Data Use",
    icon: Lock,
    body: [
      "Your personal data will be handled in accordance with our Privacy Policy and applicable Indian laws, including the Digital Personal Data Protection Act, 2023.",
      "By using the platform, you consent to the collection, storage, processing, verification, and sharing of relevant data with lending partners, KYC providers, credit bureaus, and service providers as needed for the intended service.",
    ],
  },
  {
    id: "s7",
    title: "7. Communication Consent",
    icon: Bell,
    body: [
      "You agree that Zero Commission may contact you through phone, SMS, WhatsApp, email, or push notification for application updates, verification requests, document reminders, support, and service-related communication.",
      "You may opt out of promotional communication where applicable, while transactional and regulatory communications may continue.",
    ],
  },
  {
    id: "s8",
    title: "8. Account Security",
    icon: Shield,
    body: [
      "You are responsible for maintaining the confidentiality of your password, OTPs, device credentials, and access details.",
      "You agree not to share your account credentials with any third party and to notify us immediately if you suspect unauthorized access.",
    ],
  },
  {
    id: "s9",
    title: "9. Third-Party Links and Services",
    icon: Link2,
    body: [
      "The platform may contain links to third-party websites, lenders, or payment/verification providers.",
      "Zero Commission is not responsible for the content, privacy policies, or service terms of such third-party platforms.",
    ],
  },
  {
    id: "s10",
    title: "10. Intellectual Property",
    icon: Scale,
    body: [
      "All website content, trademarks, logos, images, software, UX/UI elements, and text are the property of Zero Commission or its licensors, and may not be reused without permission.",
    ],
  },
  {
    id: "s11",
    title: "11. Limitation of Liability",
    icon: AlertTriangle,
    body: [
      "Zero Commission shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the platform, loan application, or reliance on lender decisions.",
      "We do not guarantee uninterrupted service, error-free performance, or loan approval.",
    ],
  },
  {
    id: "s12",
    title: "12. Indemnity",
    icon: ShieldAlert,
    body: [
      "You agree to indemnify and hold harmless Zero Commission, its affiliates, representatives, and directors from any claims, losses, or legal actions arising from false information, fraud, misuse of the platform, or violation of these Terms.",
    ],
  },
  {
    id: "s13",
    title: "13. Governing Law and Dispute Resolution",
    icon: Gavel,
    body: [
      "These Terms shall be governed by and construed in accordance with the laws of India.",
      "Any disputes arising from these Terms or the services shall be subject to the exclusive jurisdiction of competent courts in Gurugram, Haryana, India.",
    ],
  },
  {
    id: "s14",
    title: "14. Changes to Terms",
    icon: RefreshCcw,
    body: [
      "Zero Commission reserves the right to modify, update, or revise these Terms at any time.",
      "Continued use after changes are made shall constitute acceptance of the revised Terms.",
    ],
  },
];

const CONTACT = {
  email: "info@zerocommissionloan.com",
  support: "support@zerocommissionloan.com",
  phone: "+91 99903 23833",
  address: "Unit No. 309, 3rd Floor, Tower-A, SAS Tower, Medicity, Sector-38, Gurgaon – 122001, Haryana, India",
};

// Sub-component for contact details layout
function ContactRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 bg-[#fafafa] p-3 rounded-lg border border-[#f0f0f0]">
      <div className="w-8 h-8 rounded-md bg-white border border-[#e6e6e6] flex items-center justify-center text-[#00a859] shrink-0 mt-0.5 shadow-sm">
        <Icon size={14} />
      </div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#999]">{label}</div>
        <div className="text-[13px] font-medium text-[#222] mt-0.5 break-words">{value}</div>
      </div>
    </div>
  );
}

// Main Refactored Component
export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen w-full bg-[#fcfcfc] text-[#2c3e50] font-sans antialiased">
      
      {/* Hero Content Section */}
      <section className="bg-white relative border-b border-[#f0f0f0] flex flex-col items-center justify-center text-center px-4 py-14 sm:py-16">
        <h1 className="text-[#3498db] text-4xl sm:text-5xl font-black tracking-wide uppercase mb-3">
          Terms &amp; Conditions
        </h1>
        <div className="text-[14px] font-medium text-[#333] flex items-center gap-1.5 mb-4">
          Effective Date: <span className="font-bold">30/06/2026</span>
        </div>
        <div className="w-20 h-1 bg-[#1d70b8] rounded-full mb-6" />
        <p className="text-[#555] max-w-4xl text-[15px] leading-relaxed px-2">
          Digivahan Digital India is committed to transparency. These Terms &amp; Conditions explain how we run, protect, and safeguard your journey across our application and loan facilitation services.
        </p>
      </section>

      {/* Full-width Document Body with minimal margins */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="space-y-6">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <section 
                key={s.id} 
                className="bg-white rounded-xl border border-[#e8e8e8] border-l-[6px] border-l-[#fbb03b] p-5 sm:p-7 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-md bg-[#f9f9f9] border border-[#eee] flex items-center justify-center text-[#00a859] shrink-0">
                    <Icon size={14} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-[#00a859]">
                    {s.title}
                  </h2>
                </div>
                
                <ul className="space-y-2.5 mt-3">
                  {s.body.map((line, j) => (
                    <li key={j} className="text-[14.5px] leading-relaxed text-[#444] flex items-start gap-2.5">
                      <ChevronRight size={15} className="text-[#00a859] shrink-0 mt-1" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          {/* Support Section Card */}
          <section className="scroll-mt-24">
            <div className="bg-white rounded-xl border border-[#e8e8e8] border-l-[6px] border-l-[#00a859] p-5 sm:p-7 shadow-sm">
              <h2 className="text-xl font-bold tracking-tight text-[#00a859] mb-1">Contact &amp; Support</h2>
              <p className="text-[13px] text-[#666] mb-5">
                Questions about these terms, loan service usage, or account matters.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ContactRow icon={Mail} label="Support Email" value={CONTACT.support} />
                <ContactRow icon={Mail} label="Privacy & Grievance Email" value={CONTACT.email} />
                <ContactRow icon={Phone} label="Customer Care" value={CONTACT.phone} />
                <ContactRow icon={MapPin} label="Registered Office" value={CONTACT.address} />
              </div>
            </div>
          </section>

          {/* Page Footer */}
          <p className="text-[11px] text-[#888] font-mono pt-4 border-t border-[#eee] text-center">
            &copy; 2026 Zero Commission. All Rights Reserved. &middot; Last Updated: 30 June 2026 &middot; Version 1.0
          </p>
        </div>
      </div>

    </div>
  );
}