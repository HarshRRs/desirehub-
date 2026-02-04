import Navbar from "@/components/layout/Navbar";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 pt-24 pb-20 max-w-4xl">
                <h1 className="text-4xl font-bold text-white font-kanit mb-8">Terms of Service</h1>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using DesireHub ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this Website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Age Restriction</h2>
                        <p>
                            You must be at least 18 years of age (or the age of majority in your jurisdiction) to access this Website. By accessing the Website, you represent and warrant that you are at least 18 years old.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. User Content</h2>
                        <p>
                            Users are solely responsible for the content they upload, post, or otherwise transmit via the Website. DesireHub does not claim ownership of user-generated content but requires a license to display and distribute such content on the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Prohibited Content</h2>
                        <p>
                            The following content is strictly prohibited:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Content involving minors or anyone under the age of 18.</li>
                            <li>Non-consensual sexual content.</li>
                            <li>Violence, hate speech, or illegal acts.</li>
                            <li>Copyrighted material without authorization.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Disclaimer</h2>
                        <p>
                            The Website is provided "as is" without warranties of any kind. We do not guarantee that the Website will be error-free or uninterrupted.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
