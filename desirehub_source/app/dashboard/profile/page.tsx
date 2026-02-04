import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Mail, Camera } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white font-kanit mb-2">Profile Information</h1>
                <p className="text-gray-400">Update your personal details and public profile.</p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-8">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative group cursor-pointer">
                        <div className="w-32 h-32 rounded-full bg-gray-800 border-4 border-midnight overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                </div>

                {/* Form */}
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">First Name</label>
                            <Input defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Last Name</label>
                            <Input defaultValue="Doe" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input type="email" defaultValue="john.doe@example.com" className="pl-10" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Bio</label>
                        <textarea
                            className="w-full min-h-[100px] rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-neon-pink"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
                        <Button variant="ghost">Cancel</Button>
                        <Button>Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
