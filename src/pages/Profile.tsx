import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, Shield, LogOut, Calendar } from "lucide-react";
import { format } from "date-fns";

const Profile = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        navigate("/auth");
        return null;
    }

    const handleSignOut = () => {
        signOut();
        navigate("/");
    };

    return (
        <main className="container py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - User Info Card */}
                <div className="md:col-span-1">
                    <div className="bg-card border rounded-xl p-6 text-center shadow-sm">
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border-4 border-primary/20">
                            {user.avatar_url ? (
                                <img src={user.avatar_url} alt={user.display_name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <User className="w-12 h-12 text-primary" />
                            )}
                        </div>
                        <h2 className="text-xl font-bold">{user.display_name}</h2>
                        <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider font-semibold">{user.role}</p>

                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center justify-center gap-2 border border-destructive text-destructive py-2 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors font-medium text-sm"
                        >
                            <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                    </div>
                </div>

                {/* Right Column - User Details */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold mb-6 border-b pb-2">Account Information</h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                                    <User className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Full Name</p>
                                    <p className="font-semibold text-lg">{user.display_name}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Email Address</p>
                                    <p className="font-semibold text-lg">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                                    <Shield className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Account Role</p>
                                    <p className="font-semibold text-lg capitalize">{user.role}</p>
                                </div>
                            </div>

                            {user.created_at && (
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                                        <Calendar className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase">Member Since</p>
                                        <p className="font-semibold text-lg">
                                            {format(new Date(user.created_at), 'MMMM d, yyyy')}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                        <h3 className="font-semibold text-primary mb-2">Order History</h3>
                        <p className="text-sm text-muted-foreground">Detailed order history and management coming soon in the next update!</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;
