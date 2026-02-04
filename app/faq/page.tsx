import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HelpCircle, ChevronDown } from "lucide-react";

export const metadata = {
    title: "FAQ - Frequently Asked Questions | DesireHub",
    description: "Find answers to common questions about DesireHub, memberships, content, creators, and more.",
};

const faqs = [
    {
        category: "Getting Started",
        questions: [
            {
                q: "What is DesireHub?",
                a: "DesireHub is a premium adult entertainment platform that connects content creators with their audience. We offer exclusive 4K videos, live shows, direct messaging, and personalized content from verified creators worldwide.",
            },
            {
                q: "How do I create an account?",
                a: "Click the 'Sign Up' button in the top right corner. You can register using your email, Google, or GitHub account. Choose whether you want to be a regular user or a content creator during signup.",
            },
            {
                q: "Is DesireHub free to use?",
                a: "Yes! We offer a free tier that gives you access to basic content. However, premium memberships unlock exclusive features like 4K quality, ad-free viewing, direct messaging with creators, and access to premium-only content.",
            },
            {
                q: "What are the age requirements?",
                a: "You must be 18 years or older to create an account and use DesireHub. We take age verification seriously and may request additional verification at any time.",
            },
        ],
    },
    {
        category: "Membership & Billing",
        questions: [
            {
                q: "What membership plans are available?",
                a: "We offer three plans: Free (basic features), Premium ($19.99/month - full HD access, ad-free, messaging), and VIP Elite ($49.99/month - everything in Premium plus exclusive content, 8K quality, custom requests, and VIP events).",
            },
            {
                q: "How do I upgrade my membership?",
                a: "Visit the Pricing page and select your desired plan. Payment is processed securely, and your upgrade takes effect immediately.",
            },
            {
                q: "Can I cancel my subscription anytime?",
                a: "Absolutely! There are no long-term contracts. You can cancel your subscription at any time from your account settings. You'll retain access until the end of your current billing period.",
            },
            {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and select cryptocurrencies. All payments are processed securely through industry-standard payment processors.",
            },
            {
                q: "Do you offer refunds?",
                a: "Due to the nature of digital content, we generally don't offer refunds. However, if you experience technical issues or billing errors, please contact our support team within 7 days of purchase.",
            },
        ],
    },
    {
        category: "Content & Creators",
        questions: [
            {
                q: "How do I find creators I like?",
                a: "Browse our Creators page, explore Categories, check out Trending content, or use the Search feature to find specific creators, categories, or tags. You can also subscribe to your favorites to get notified of new content.",
            },
            {
                q: "Can I interact with creators?",
                a: "Yes! Premium members can send direct messages to creators. VIP Elite members get priority responses, custom content requests, and access to exclusive private shows.",
            },
            {
                q: "How often is new content added?",
                a: "New content is added daily! We have thousands of active creators uploading fresh videos, photos, and live shows every day.",
            },
            {
                q: "Can I download videos for offline viewing?",
                a: "Premium and VIP Elite members can download content for offline viewing within our mobile and desktop apps. Downloads are DRM-protected and can only be viewed within the DesireHub app.",
            },
        ],
    },
    {
        category: "Becoming a Creator",
        questions: [
            {
                q: "How do I become a creator on DesireHub?",
                a: "Create an account and select 'Creator' as your account type. Complete the verification process, set up your profile, and start uploading content. Our Creator Guide walks you through every step.",
            },
            {
                q: "How much can I earn as a creator?",
                a: "Earnings vary based on your subscriber count, content quality, and engagement. Top creators earn $10,000+ per month. You earn from subscriptions, tips, custom content requests, and revenue share from views.",
            },
            {
                q: "What percentage does DesireHub take?",
                a: "We have one of the most creator-friendly revenue shares in the industry. Creators keep 80% of all subscription revenue and 90% of tips and custom content payments.",
            },
            {
                q: "When do I get paid?",
                a: "Payments are processed weekly to your verified payment method. There's a minimum payout threshold of $50. You can track all earnings in real-time through your Creator Dashboard.",
            },
            {
                q: "What content guidelines should I follow?",
                a: "All content must comply with our Community Guidelines and Terms of Service. We prohibit illegal content, non-consensual material, and content featuring minors. Review our full guidelines before uploading.",
            },
        ],
    },
    {
        category: "Privacy & Security",
        questions: [
            {
                q: "Is my personal information safe?",
                a: "Yes! We use bank-level 256-bit SSL encryption for all data transmission and storage. We never sell your personal information to third parties. Read our Privacy Policy for full details.",
            },
            {
                q: "Will my credit card statement show 'DesireHub'?",
                a: "No. For your privacy, billing appears as a discreet company name on your statement, not 'DesireHub' or any adult-related terms.",
            },
            {
                q: "Can I browse anonymously?",
                a: "Free users can browse public content without an account. However, to access most features, you'll need to create an account. We offer privacy settings to control your profile visibility.",
            },
            {
                q: "How do you verify creator identities?",
                a: "All creators must complete a verification process including government ID verification and selfie confirmation. This ensures all creators are 18+ and protects against impersonation.",
            },
        ],
    },
    {
        category: "Technical Support",
        questions: [
            {
                q: "What video quality do you support?",
                a: "We support multiple quality levels: SD (480p) for free users, HD (1080p) for Premium, and up to 8K for VIP Elite members (when available). Player automatically adjusts based on your connection speed.",
            },
            {
                q: "Which devices can I use?",
                a: "DesireHub works on any modern web browser (Chrome, Firefox, Safari, Edge). We also have native apps for iOS, Android, Smart TVs, and desktop (Windows, macOS).",
            },
            {
                q: "I'm having playback issues. What should I do?",
                a: "Try refreshing your browser, clearing cache, checking your internet connection, or lowering video quality. If issues persist, contact support with your device info and error message.",
            },
            {
                q: "How do I contact customer support?",
                a: "Email support@desirehub.com or use the live chat in your account dashboard. Premium members get priority support with 24-hour response time. VIP Elite members get dedicated support.",
            },
        ],
    },
];

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-12 px-4 container mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full border-neon-pink/30 bg-neon-pink/10 backdrop-blur-sm">
                    <HelpCircle className="w-4 h-4 text-neon-pink" />
                    <span className="text-sm font-medium text-neon-pink">Help Center</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white font-kanit mb-6">
                    Frequently Asked{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-deep via-neon-pink to-crimson">
                        Questions
                    </span>
                </h1>

                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Find answers to common questions about DesireHub. Can't find what you're looking for? Contact our support team.
                </p>
            </section>

            {/* FAQ Content */}
            <section className="pb-20 px-4 container mx-auto max-w-4xl">
                <div className="space-y-12">
                    {faqs.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                            {/* Category Title */}
                            <h2 className="text-2xl font-bold text-white font-kanit mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-violet-deep to-neon-pink text-sm">
                                    {sectionIndex + 1}
                                </span>
                                {section.category}
                            </h2>

                            {/* Questions */}
                            <div className="space-y-4">
                                {section.questions.map((faq, faqIndex) => (
                                    <details
                                        key={faqIndex}
                                        className="group bg-gray-900/30 rounded-xl border border-white/5 overflow-hidden hover:border-neon-pink/30 transition-all"
                                    >
                                        <summary className="p-6 cursor-pointer flex items-center justify-between gap-4 hover:text-neon-pink transition-colors">
                                            <span className="text-white font-semibold text-left">
                                                {faq.q}
                                            </span>
                                            <ChevronDown className="w-5 h-5 text-neon-pink flex-shrink-0 group-open:rotate-180 transition-transform" />
                                        </summary>
                                        <div className="px-6 pb-6">
                                            <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="mt-16 p-8 bg-gradient-to-br from-violet-deep/20 to-neon-pink/20 rounded-2xl border border-white/10 text-center">
                    <h3 className="text-2xl font-bold text-white font-kanit mb-3">
                        Still Have Questions?
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Our support team is here to help you 24/7
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="mailto:support@desirehub.com"
                            className="px-6 py-3 bg-neon-pink hover:bg-neon-pink/80 text-white rounded-lg font-semibold transition-colors"
                        >
                            Email Support
                        </a>
                        <a
                            href="/contact"
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors border border-white/20"
                        >
                            Live Chat
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
