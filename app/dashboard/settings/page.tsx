import { Button } from "@/components/ui/Button";
import { Moon, Bell, Shield, Smartphone } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white font-kanit mb-2">Settings</h1>
                <p className="text-gray-400">Manage your preferences and account security.</p>
            </div>

            <div className="space-y-6">
                {/* Appearance */}
                <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <Moon className="w-5 h-5 text-neon-pink" />
                        <h2 className="text-xl font-bold text-white font-kanit">Appearance</h2>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-white font-medium">Dark Mode</h3>
                            <p className="text-sm text-gray-400">Toggle between light and dark themes</p>
                        </div>
                        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-neon-pink">
                            <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                        </div>
                    </div>
                </section>

                {/* Notifications */}
                <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <Bell className="w-5 h-5 text-neon-pink" />
                        <h2 className="text-xl font-bold text-white font-kanit">Notifications</h2>
                    </div>
                    <div className="space-y-4">
                        {["New Video Recommendations", "Creator Updates", "Account Activity", "Promotional Offers"].map((item) => (
                            <div key={item} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <span className="text-gray-300">{item}</span>
                                <input type="checkbox" defaultChecked className="rounded border-gray-600 bg-white/5 text-neon-pink focus:ring-neon-pink" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Security */}
                <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="w-5 h-5 text-neon-pink" />
                        <h2 className="text-xl font-bold text-white font-kanit">Security</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                                <p className="text-sm text-gray-400">Add an extra layer of security</p>
                            </div>
                            <Button variant="outline" size="sm">Enable</Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-medium">Change Password</h3>
                                <p className="text-sm text-gray-400">Last changed 3 months ago</p>
                            </div>
                            <Button variant="outline" size="sm">Update</Button>
                        </div>
                    </div>
                </section>

                {/* Delete Account */}
                <section className="p-6 rounded-2xl border border-crimson/30 bg-crimson/5">
                    <h3 className="text-crimson font-bold mb-2">Danger Zone</h3>
                    <p className="text-sm text-gray-400 mb-4">Permanently delete your account and all of your content.</p>
                    <Button variant="outline" className="border-crimson text-crimson hover:bg-crimson hover:text-white">
                        Delete Account
                    </Button>
                </section>
            </div>
        </div>
    );
}
