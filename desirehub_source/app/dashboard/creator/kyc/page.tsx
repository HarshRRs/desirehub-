import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ShieldCheck, Upload, CheckCircle } from "lucide-react";

export default function KYCPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white font-kanit mb-2">Identity Verification</h1>
                <p className="text-gray-400">Verify your identity to start earning and uploading content.</p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex gap-4">
                <ShieldCheck className="w-8 h-8 text-blue-400 flex-shrink-0" />
                <div>
                    <h3 className="text-lg font-bold text-blue-400 mb-1">Why do we need this?</h3>
                    <p className="text-sm text-blue-300">
                        To comply with international laws and age verification regulations, all creators must provide valid government-issued ID. Your data is encrypted and securely stored.
                    </p>
                </div>
            </div>

            <form className="space-y-8">
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-white font-kanit">Personal Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Legal First Name</label>
                            <Input />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Legal Last Name</label>
                            <Input />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Date of Birth</label>
                        <Input type="date" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Address</label>
                        <Input placeholder="Street Address" />
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-white font-kanit">Document Upload</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-neon-pink/50 hover:bg-white/5 transition-all cursor-pointer">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-white font-medium">Front of ID</p>
                            <p className="text-xs text-gray-500">JPG, PNG or PDF</p>
                        </div>
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-neon-pink/50 hover:bg-white/5 transition-all cursor-pointer">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-white font-medium">Back of ID</p>
                            <p className="text-xs text-gray-500">JPG, PNG or PDF</p>
                        </div>
                    </div>

                    <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-neon-pink/50 hover:bg-white/5 transition-all cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-white font-medium">Selfie with ID</p>
                        <p className="text-xs text-gray-500">Hold your ID next to your face</p>
                    </div>
                </section>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                    <input type="checkbox" className="mt-1 rounded border-gray-600 bg-white/5 text-neon-pink focus:ring-neon-pink" />
                    <p className="text-sm text-gray-400">
                        I certify that the information provided is accurate and the documents are valid. I understand that providing false information will result in a permanent ban.
                    </p>
                </div>

                <Button className="w-full h-12 text-lg">Submit for Verification</Button>
            </form>
        </div>
    );
}
