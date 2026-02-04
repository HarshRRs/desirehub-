import Navbar from "@/components/layout/Navbar";

export default function FAQPage() {
    const faqs = [
        {
            q: "Is DesireHub free to use?",
            a: "Yes, you can browse and watch a selection of free content. However, to access premium 4K videos, exclusive creator content, and ad-free streaming, you'll need a subscription."
        },
        {
            q: "How does the age verification work?",
            a: "We use a strict age gate to ensure all visitors are 18+. For creators and premium members, we may require ID verification (KYC) to comply with legal regulations."
        },
        {
            q: "Can I cancel my subscription anytime?",
            a: "Absolutely. There are no long-term contracts. You can cancel your subscription from your dashboard settings at any time."
        },
        {
            q: "How do I become a creator?",
            a: "Navigate to the 'Creators' section and click 'Become a Creator'. You'll need to verify your identity and agree to our content guidelines before you can start uploading."
        },
        {
            q: "Is my payment information secure?",
            a: "Yes, we use industry-standard SSL encryption and trusted payment processors. We do not store your full credit card details on our servers."
        }
    ];

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 pt-24 pb-20 max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white font-kanit mb-4">Frequently Asked Questions</h1>
                    <p className="text-gray-400">Got questions? We've got answers.</p>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-bold text-white font-kanit mb-3">{faq.q}</h3>
                            <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
