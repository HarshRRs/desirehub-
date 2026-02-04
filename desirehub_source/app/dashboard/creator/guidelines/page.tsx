import { Check, X, AlertTriangle } from "lucide-react";

export default function GuidelinesPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white font-kanit mb-2">Content Guidelines</h1>
                <p className="text-gray-400">Please review our rules before uploading content.</p>
            </div>

            <div className="space-y-6">
                <section className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
                    <h2 className="text-xl font-bold text-green-400 font-kanit mb-4 flex items-center gap-2">
                        <Check className="w-6 h-6" /> Allowed Content
                    </h2>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                            <span>Original adult content created by you or with consent.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                            <span>Solo, couple, and group performances (all participants 18+).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                            <span>Artistic nudity and photoshoots.</span>
                        </li>
                    </ul>
                </section>

                <section className="p-6 rounded-2xl bg-crimson/10 border border-crimson/20">
                    <h2 className="text-xl font-bold text-crimson font-kanit mb-4 flex items-center gap-2">
                        <X className="w-6 h-6" /> Prohibited Content
                    </h2>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-crimson mt-2" />
                            <span>Content featuring minors or anyone appearing to be under 18.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-crimson mt-2" />
                            <span>Non-consensual content (revenge porn, spy cams).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-crimson mt-2" />
                            <span>Violence, abuse, or illegal acts.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-crimson mt-2" />
                            <span>Copyrighted material you do not own.</span>
                        </li>
                    </ul>
                </section>

                <section className="p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
                    <h2 className="text-xl font-bold text-yellow-400 font-kanit mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6" /> Important Notes
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        All content is reviewed by our moderation team. Violating these guidelines will result in immediate account suspension and potential legal action. We use AI detection tools to scan for prohibited content upon upload.
                    </p>
                </section>
            </div>
        </div>
    );
}
