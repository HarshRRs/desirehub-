import { Bell, Heart, Video, Star, MessageSquare } from "lucide-react";

export default function NotificationsPage() {
    const notifications = [
        {
            type: "upload",
            icon: Video,
            color: "text-blue-400",
            title: "New Upload from Angelina Rose",
            message: "Angelina Rose just uploaded: 'Exclusive Photoshoot Behind Scenes'",
            time: "2 hours ago"
        },
        {
            type: "like",
            icon: Heart,
            color: "text-crimson",
            title: "Someone liked your comment",
            message: "User123 liked your comment on 'Summer Vibes 2023'",
            time: "5 hours ago"
        },
        {
            type: "system",
            icon: Star,
            color: "text-neon-pink",
            title: "Welcome to Premium!",
            message: "Thank you for subscribing to the Premium plan. Enjoy your benefits.",
            time: "1 day ago"
        },
        {
            type: "reply",
            icon: MessageSquare,
            color: "text-green-400",
            title: "New Reply",
            message: "Creator Name replied to your comment.",
            time: "2 days ago"
        }
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-kanit mb-2">Notifications</h1>
                    <p className="text-gray-400">Stay updated with your favorite creators and activity.</p>
                </div>
                <button className="text-sm text-neon-pink hover:underline">Mark all as read</button>
            </div>

            <div className="space-y-4">
                {notifications.map((notif, i) => {
                    const Icon = notif.icon;
                    return (
                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                            <div className={`p-3 rounded-full bg-white/5 h-fit ${notif.color}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-white font-bold">{notif.title}</h3>
                                    <span className="text-xs text-gray-500">{notif.time}</span>
                                </div>
                                <p className="text-gray-400 text-sm">{notif.message}</p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-neon-pink mt-2" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
