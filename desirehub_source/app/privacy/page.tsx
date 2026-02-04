import Navbar from "@/components/layout/Navbar";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 pt-24 pb-20 max-w-4xl">
                <h1 className="text-4xl font-bold text-white font-kanit mb-8">Privacy Policy</h1>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                        <p>
                            We collect information you provide directly to us, such as when you create an account, subscribe, or contact support. This may include your name, email address, and payment information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
                        <p>
                            We use cookies and similar tracking technologies to track the activity on our service and hold certain information to enhance your experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
                        <p>
                            We may employ third-party companies and individuals to facilitate our service, to provide the service on our behalf, or to assist us in analyzing how our service is used.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
