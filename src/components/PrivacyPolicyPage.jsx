import React from "react";
import {
  Shield, Lock, Eye, Database, Share2, Bell, UserCheck, FileText, Phone, Mail,
  MapPin, ChevronRight, Menu, X, Building2, CreditCard, Wallet, Smartphone, Cookie,
  Link2, AlertTriangle, Baby, Globe2, KeyRound, Gavel, ShieldAlert, ScrollText,
  Scale, Handshake, CloudRain, RefreshCcw, Landmark, MessageSquareWarning,
} from "lucide-react";

const SECTIONS = [
  {
    id: "s1",
    title: "1. Company Details",
    icon: Building2,
    body: [
      "Company Name: Zero Commission",
      "Business Model: Loan Direct Selling Agent (DSA) / Loan Distribution Partner",
      "Registered Office: Unit No. 309, 3rd Floor, Tower-A, SAS Tower, Medicity, Sector-38, Gurgaon – 122001, Haryana, India",
      "Website: https://www.zerocommissionloan.com",
      "Customer Support Email: support@zerocommissionloan.com",
      "Privacy & Grievance Email: info@zerocommissionloan.com",
      "Customer Care: +91 99903 23833",
    ],
  },
  {
    id: "s2",
    title: "2. About Zero Commission",
    icon: Landmark,
    body: [
      "Zero Commission is a financial services platform that assists customers in applying for loans through our network of partner Banks, NBFCs, Housing Finance Companies (HFCs), and other RBI regulated financial institutions.",
      "Zero Commission is not a Bank, not an NBFC, not a Housing Finance Company, and does not directly lend money.",
      "We only facilitate loan applications between customers and our lending partners. Loan approval, rejection, interest rate, tenure, processing fee, documentation, disbursement, repayment schedule, foreclosure, and all credit decisions are solely determined by the respective lending institution.",
      "Submitting an application through Zero Commission does not guarantee loan approval.",
    ],
  },
  {
    id: "s3",
    title: "3. Information We Collect",
    icon: Database,
    body: [
      "Full Name, Father's Name, Mother's Name, Date of Birth, Gender, Marital Status",
      "Mobile Number, Alternate Mobile Number, Email Address",
      "Residential Address, Office Address, City, State, PIN Code",
      "Occupation, Employer Details, Designation, Monthly Income, Annual Income",
      "Business Information, GST Details, Business Address, Educational Qualification",
      "Loan Requirement, Existing Loan Details, Credit Card Information",
    ],
  },
  {
    id: "s4",
    title: "4. KYC Information",
    icon: CreditCard,
    body: [
      "Aadhaar Number, PAN Number, Passport Size Photograph, Live Selfie, Signature",
      "Aadhaar XML (where applicable), DigiLocker Documents (where applicable)",
      "Other Government Issued Identity Documents",
    ],
  },
  {
    id: "s5",
    title: "5. Financial Information",
    icon: Wallet,
    body: [
      "Salary Slips, Bank Statements, Income Tax Returns, GST Returns, Business Turnover",
      "Existing EMI Details, Existing Loan Accounts, Credit Bureau Information",
      "Property Related Information, Banking Information, Account Verification Details",
    ],
  },
  {
    id: "s6",
    title: "6. Documents",
    icon: FileText,
    body: [
      "Aadhaar Card, PAN Card, Selfie Photograph, Salary Slip, Bank Statement",
      "Income Tax Return, GST Registration Documents, Business Proof, Property Papers",
      "Additional documents requested by lending partners",
    ],
  },
  {
    id: "s7",
    title: "7. Device Information",
    icon: Smartphone,
    body: [
      "Device Model, Android Version, Browser Information, IP Address, Device Identifier",
      "Mobile Network, Time Zone, App Version, Crash Logs, Usage Statistics",
      "Login History, Operating System Information, Session Information",
    ],
  },
  {
    id: "s8",
    title: "8. App Permissions",
    icon: KeyRound,
    body: [
      "Photos & Media — used for uploading KYC, income, property and business documents, profile photograph, and supporting documents.",
      "Contacts — used only after permission for customer verification, loan processing where required, and fraud prevention. We do not sell or publicly disclose your contact list.",
      "SMS Permission — used with explicit consent for OTP auto-detection, bank SMS verification, income verification, loan eligibility verification and fraud prevention. We do not read personal SMS unrelated to loan processing.",
      "Location Permission — collected only after permission for identity verification, fraud detection, service availability, risk assessment and regulatory compliance.",
      "Push Notifications — used for loan updates, application status, EMI reminders, promotional offers and important service notifications. You may disable notifications anytime via device settings.",
    ],
  },
  {
    id: "s9",
    title: "9. Purpose of Collecting Information",
    icon: Eye,
    body: [
      "Loan eligibility assessment, customer & identity verification, KYC compliance",
      "Fraud detection, risk assessment, loan processing & distribution, credit evaluation",
      "Customer support, complaint resolution, regulatory compliance",
      "Service improvement, internal analytics, business intelligence, platform security",
      "Communication regarding loan applications, important notices, and promotional communications where legally permitted",
    ],
  },
  {
    id: "s10",
    title: "10. Consent",
    icon: Handshake,
    body: [
      "By registering, submitting documents, applying for a loan, or otherwise using our services, you expressly authorize us to collect, process, store, verify, analyze and share your information with lending partners and authorized service providers for the purposes described in this policy.",
      "You authorize Zero Commission to contact you through phone calls, SMS, WhatsApp, email, push notifications, or any other legally permissible channel regarding your application, updates, offers, document requirements, verification, or support.",
      "You may withdraw consent any time by contacting us; this may affect our ability to continue processing your loan application or provide certain services.",
    ],
  },
  {
    id: "s11",
    title: "11. Sharing of Information",
    icon: Share2,
    body: [
      "We do not sell, rent, trade, or commercially exploit your personal information to any third party.",
      "We may share information with partner Banks, NBFCs, HFCs and RBI-regulated financial institutions for processing your application.",
      "Also shared with Credit Bureaus, KYC/identity verification agencies, payment gateway providers, cloud hosting and technology partners, customer support providers, collection agencies, legal advisors, auditors, and government/regulatory/law-enforcement authorities where legally required.",
      "Information is shared strictly on a need-to-know basis for legitimate business, legal, regulatory, fraud prevention, security or loan processing purposes.",
    ],
  },
  {
    id: "s12",
    title: "12. Credit Bureau Verification",
    icon: ShieldAlert,
    body: [
      "By applying for any financial product, you authorize us and our lending partners to obtain, verify and review your credit information from authorized Credit Information Companies including TransUnion CIBIL, Experian, Equifax and CRIF High Mark.",
      "Your credit report may be accessed solely for evaluating eligibility, fraud prevention, underwriting, compliance and risk assessment.",
    ],
  },
  {
    id: "s13",
    title: "13. Lending Partners",
    icon: Landmark,
    body: [
      "Zero Commission acts solely as a Loan Direct Selling Agent (DSA), facilitating applications with various Banks, NBFCs, HFCs and RBI-regulated lending institutions.",
      "Loan approval, rejection, interest rate, amount, processing charges, documentation, tenure, EMI, disbursement, foreclosure, balance transfer and insurance requirements are decided exclusively by the respective lender.",
      "Zero Commission has no authority to guarantee loan approval or influence a lending institution's credit decision.",
    ],
  },
  {
    id: "s14",
    title: "14. Data Security",
    icon: Lock,
    body: [
      "We implement SSL/TLS encryption, secure HTTPS communication, firewalls, access control mechanisms and role-based access permissions.",
      "Additional safeguards include password protection, secure authentication, database security controls, periodic security monitoring, malware protection, and backup/disaster recovery procedures.",
      "Only authorized personnel may access customer information for legitimate business purposes. No internet transmission or electronic storage can be guaranteed 100% secure, and you acknowledge this inherent risk.",
    ],
  },
  {
    id: "s15",
    title: "15. Data Storage",
    icon: Database,
    body: [
      "Your personal information may be stored on secure servers located within India or in jurisdictions permitted under applicable Indian laws.",
      "Appropriate safeguards are implemented to protect your information against unauthorized access, disclosure, alteration, misuse or destruction.",
    ],
  },
  {
    id: "s16",
    title: "16. Data Retention",
    icon: FileText,
    body: [
      "We retain personal information only as long as necessary to process applications, provide services, meet contractual/legal obligations, resolve disputes, prevent fraud, and maintain audit records.",
      "On account deletion request, information is generally deleted within 30 days, except where retention is required by law, regulation, court order, fraud investigation, taxation, audit, or lending-partner contractual commitments.",
    ],
  },
  {
    id: "s17",
    title: "17. Cookies Policy",
    icon: Cookie,
    body: [
      "Our website uses cookies and similar technologies for user authentication, session management, security, analytics, performance monitoring, language and other preferences, and fraud prevention.",
      "You may disable cookies via browser settings; certain features may then not function correctly.",
    ],
  },
  {
    id: "s18",
    title: "18. Third-Party Services",
    icon: Share2,
    body: [
      "Our website and app may integrate with cloud hosting, SMS gateway, email, OTP verification, push notification, analytics, payment gateway, document/identity verification, credit bureau, and customer support service providers.",
      "Each provider is contractually required to protect your personal information and use it only for authorized purposes.",
    ],
  },
  {
    id: "s19",
    title: "19. Marketing Communications",
    icon: Bell,
    body: [
      "With your consent, we may send loan offers, credit card offers, home/business loan offers, promotional campaigns, product updates, service announcements and educational financial content.",
      "These may be sent via phone calls, SMS, WhatsApp, email and push notifications.",
      "You may opt out of promotional communications anytime via our support team or the unsubscribe option where available.",
    ],
  },
  {
    id: "s20",
    title: "20. Fraud Prevention",
    icon: AlertTriangle,
    body: [
      "We reserve the right to verify the authenticity of any information or document submitted.",
      "Submitting forged, manipulated, misleading or fraudulent documents may result in rejection, permanent suspension, and reporting to lending institutions or legal authorities.",
      "We actively monitor suspicious activities to safeguard customers, lending partners and the platform.",
    ],
  },
  {
    id: "s21",
    title: "21. Your Rights",
    icon: UserCheck,
    body: [
      "Right to access, correct, and update your personal information.",
      "Right to request deletion of personal information, subject to legal and regulatory obligations.",
      "Right to withdraw consent and to object to certain processing activities where permitted by law.",
      "Right to raise concerns and receive information about how your data is used.",
      "To exercise these rights, contact info@zerocommissionloan.com; we may verify your identity before processing your request.",
    ],
  },
  {
    id: "s22",
    title: "22. Account Deletion",
    icon: ScrollText,
    body: [
      "You may request account deletion any time via customer support or the in-app option, where available.",
      "On a valid request, your account is deactivated and personal information generally deleted within 30 days, subject to legal, regulatory, fraud-prevention, audit, dispute, or lending-partner retention requirements.",
      "Account deletion does not automatically cancel any loan application or financial obligation with a Bank or NBFC.",
    ],
  },
  {
    id: "s23",
    title: "23. Data Accuracy",
    icon: ShieldAlert,
    body: [
      "You are responsible for ensuring all submitted information and documents are accurate, complete, genuine and up to date.",
      "False, misleading, incomplete, forged or fraudulent information may result in rejection, suspension, termination, or reporting to relevant authorities.",
    ],
  },
  {
    id: "s24",
    title: "24. Children's Privacy",
    icon: Baby,
    body: [
      "Zero Commission does not knowingly provide services to individuals below 18 years of age.",
      "Our services are intended only for individuals legally competent to enter financial agreements under applicable Indian law.",
      "If we become aware a minor's information was collected without authorization, we will take reasonable steps to delete it.",
    ],
  },
  {
    id: "s25",
    title: "25. International Data Transfers",
    icon: Globe2,
    body: [
      "Zero Commission primarily operates within India.",
      "If data is processed or stored outside India through authorized service providers, this is done in accordance with applicable Indian laws, contractual safeguards and industry-standard security measures.",
    ],
  },
  {
    id: "s26",
    title: "26. Confidentiality",
    icon: Lock,
    body: [
      "All employees, consultants, contractors and authorized service providers with access to customer information must maintain strict confidentiality and comply with applicable privacy obligations.",
      "Access to customer information is granted strictly on a need-to-know basis.",
    ],
  },
  {
    id: "s27",
    title: "27. Regulatory Compliance",
    icon: Gavel,
    body: [
      "We comply with applicable Indian laws including the Digital Personal Data Protection Act, 2023 (DPDP Act), Information Technology Act, 2000, IT (Reasonable Security Practices and Sensitive Personal Data) Rules, 2011, applicable RBI guidelines on loan sourcing and customer data, and other statutory requirements in force.",
    ],
  },
  {
    id: "s28",
    title: "28. User Responsibilities",
    icon: UserCheck,
    body: [
      "Provide accurate and genuine information; do not impersonate others or upload forged/manipulated documents.",
      "Do not misuse our platform, attempt unauthorized access, or interfere with security or functionality.",
      "Comply with all applicable laws while using our services; failure may result in suspension or termination of access.",
    ],
  },
  {
    id: "s29",
    title: "29. Intellectual Property",
    icon: ScrollText,
    body: [
      "All content on our website and app — logos, trademarks, brand name, text, graphics, icons, images, software, source code, designs, layouts, UI and databases — is the exclusive property of Zero Commission or its licensors.",
      "No content may be copied, reproduced, modified, distributed, published or commercially exploited without prior written permission.",
    ],
  },
  {
    id: "s30",
    title: "30. Third-Party Links",
    icon: Link2,
    body: [
      "Our platform may contain links to third-party websites or financial institutions for your convenience.",
      "Zero Commission does not own, control, endorse, or assume responsibility for the privacy practices of such third-party websites. Review their policies before sharing personal information.",
    ],
  },
  {
    id: "s31",
    title: "31. Disclaimer of Warranties",
    icon: AlertTriangle,
    body: [
      "Our services are provided on an \"as is\" and \"as available\" basis.",
      "We do not guarantee uninterrupted, error-free service, loan approval, continuous product availability, or unchanged third-party lender information.",
      "Use of our services is at your own discretion and risk.",
    ],
  },
  {
    id: "s32",
    title: "32. Limitation of Liability",
    icon: Scale,
    body: [
      "Zero Commission acts solely as a DSA facilitating applications between customers and lending partners.",
      "We are not liable for loss, damage, delay, rejection, cancellation, non-disbursement, or any change in loan terms decided independently by a lending institution.",
      "To the maximum extent permitted by law, we are not liable for indirect, incidental, consequential, special, exemplary or punitive damages.",
    ],
  },
  {
    id: "s33",
    title: "33. Indemnification",
    icon: ShieldAlert,
    body: [
      "You agree to indemnify, defend and hold harmless Zero Commission, its directors, employees, officers, agents and affiliates from claims arising out of your violation of this Policy, submission of false/forged information, misuse of the platform, violation of law, or infringement of third-party rights.",
    ],
  },
  {
    id: "s34",
    title: "34. Force Majeure",
    icon: CloudRain,
    body: [
      "We are not responsible for delay or failure in performance resulting from events beyond our reasonable control — natural disasters, epidemics, war, government restrictions, internet/cyber failures, power outages, technical or banking network failures, and other acts of God.",
    ],
  },
  {
    id: "s35",
    title: "35. Changes to this Privacy Policy",
    icon: RefreshCcw,
    body: [
      "Zero Commission may modify, update or replace this Privacy Policy at any time without prior notice.",
      "Revised versions become effective immediately upon publication. Continued use after modification constitutes acceptance of the updated Policy.",
    ],
  },
  {
    id: "s36",
    title: "36. Governing Law",
    icon: Gavel,
    body: [
      "This Privacy Policy is governed by and interpreted in accordance with the laws of the Republic of India.",
    ],
  },
  {
    id: "s37",
    title: "37. Jurisdiction",
    icon: Scale,
    body: [
      "Any dispute relating to this Policy, our website, mobile application, or services shall be subject to the exclusive jurisdiction of the competent courts located in Gurugram, Haryana, India.",
    ],
  },
  {
    id: "s38",
    title: "38. Grievance Redressal",
    icon: MessageSquareWarning,
    body: [
      "Grievance Officer — Zero Commission, Unit No. 309, 3rd Floor, Tower-A, SAS Tower, Medicity, Sector-38, Gurgaon – 122001, Haryana, India.",
      "Email: info@zerocommissionloan.com | Customer Support: +91 99903 23833",
      "We will acknowledge your grievance promptly and make reasonable efforts to resolve it per applicable laws and internal procedures.",
    ],
  },
  {
    id: "s40",
    title: "40. Important Disclosure",
    icon: Landmark,
    body: [
      "Zero Commission is a Loan Direct Selling Agent (DSA) and Loan Facilitation Platform — not a Bank, NBFC, or HFC, and does not directly provide loans.",
      "All loan products displayed or facilitated are offered by partner Banks, NBFCs, HFCs or other RBI-regulated institutions.",
      "Submission of an enquiry or application does not guarantee loan approval or disbursement.",
    ],
  },
  {
    id: "s41",
    title: "41. Acceptance of this Privacy Policy",
    icon: UserCheck,
    body: [
      "By accessing or using our website, app or services, you confirm you have read and understood this Policy, voluntarily provide your personal information, and consent to its collection, storage, processing, sharing and use as described herein.",
      "If you do not agree with any part of this Policy, please discontinue use of our website, application and services immediately.",
    ],
  },
];

const CONTACT = {
  email: "info@zerocommissionloan.com",
  support: "support@zerocommissionloan.com",
  phone: "+91 99903 23833",
  address: "Unit No. 309, 3rd Floor, Tower-A, SAS Tower, Medicity, Sector-38, Gurgaon – 122001, Haryana, India",
};

// Sub-component for contact cards
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

// Main Page Component
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen w-full bg-[#fcfcfc] text-[#2c3e50] font-sans antialiased">
      
      {/* Hero Header Section - Navbar completely removed */}
      <section className="bg-white relative border-b border-[#f0f0f0] flex flex-col items-center justify-center text-center px-4 py-14 sm:py-16">
        {/* Title configured to Light Blue as requested */}
        <h1 className="text-[#3498db] text-4xl sm:text-5xl font-black tracking-wide uppercase mb-3">
          Privacy Policy
        </h1>
        <div className="text-[14px] font-medium text-[#333] flex items-center gap-1.5 mb-4">
          Effective Date: <span className="font-bold">30/06/2026</span>
        </div>
        <div className="w-20 h-1 bg-[#1d70b8] rounded-full mb-6" />
        <p className="text-[#555] max-w-5xl text-[15px] leading-relaxed px-2">
          Digivahan Digital India is committed to transparency. This Privacy Policy explains how we collect, store, process, use, share, protect, and manage your personal data across our applications and loan facilitation services.
        </p>
      </section>

      {/* Full-width Document Layout with reduced margins */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="space-y-6">
          
          {/* Introductory Abstract Box */}
          <section className="bg-white rounded-xl border border-[#e8e8e8] border-l-[6px] border-l-[#3498db] p-5 sm:p-6 shadow-sm">
            <p className="text-[14.5px] leading-relaxed text-[#444]">
              Welcome to Zero Commission ("Company", "we", "our", or "us").
              Your privacy is important to us. This Privacy Policy explains how we collect, store, process, use,
              share, protect, and manage your personal information when you visit our website, use our Android
              application, submit a loan enquiry, apply for any financial product, communicate with us, or use any
              service offered by Zero Commission. By accessing our website, mobile application, or using any of our
              services, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
            </p>
          </section>

          {/* Section Dynamic Cards */}
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

          {/* Grievance & Help Desk Box */}
          <section className="scroll-mt-24">
            <div className="bg-white rounded-xl border border-[#e8e8e8] border-l-[6px] border-l-[#00a859] p-5 sm:p-7 shadow-sm">
              <h2 className="text-xl font-bold tracking-tight text-[#00a859] mb-1">Contact &amp; Grievance Officer</h2>
              <p className="text-[13px] text-[#666] mb-5">
                Questions about this policy, your data data processing, or your rights under statutory laws.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ContactRow icon={Mail} label="Privacy & Grievance Email" value={CONTACT.email} />
                <ContactRow icon={Mail} label="Customer Support Email" value={CONTACT.support} />
                <ContactRow icon={Phone} label="Customer Support Number" value={CONTACT.phone} />
                <ContactRow icon={MapPin} label="Registered Office" value={CONTACT.address} />
              </div>
            </div>
          </section>

          {/* Footer Copyright block */}
          <p className="text-[11px] text-[#888] font-mono pt-4 border-t border-[#eee] text-center">
            &copy; 2026 Zero Commission. All Rights Reserved. &middot; Last Updated: 30 June 2026 &middot; Version 1.0
          </p>
        </div>
      </div>

    </div>
  );
}