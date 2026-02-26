import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiClient } from "@/api/apiClient";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (forgotPassword) {
        // Placeholder for real forgot password logic
        toast({ title: "Check your email", description: "If an account exists with that email, we've sent a reset link." });
        setForgotPassword(false);
        return;
      }

      if (isLogin) {
        const data = await apiClient.post("/auth/login", { email, password });
        login(data);
        toast({ title: "Welcome back!" });
        navigate("/");
      } else {
        await apiClient.post("/auth/signup", {
          email,
          password,
          display_name: displayName,
        });
        toast({ title: "Account created!", description: "You can now sign in with your credentials." });
        setIsLogin(true);
      }
    } catch (error: any) {
      toast({ title: forgotPassword ? "Request failed" : isLogin ? "Login failed" : "Signup failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border rounded-lg p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-foreground font-bold text-lg">E</span>
            </div>
            <h1 className="text-xl font-bold">
              {forgotPassword ? "Reset Password" : isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {forgotPassword
                ? "Enter your email to receive a reset link"
                : isLogin
                  ? "Sign in to your Electros account"
                  : "Join Electros for the best deals"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !forgotPassword && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-md text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-md text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            {!forgotPassword && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border rounded-md text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            )}

            {isLogin && !forgotPassword && (
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : forgotPassword
                  ? "Send Reset Link"
                  : isLogin
                    ? "Sign In"
                    : "Create Account"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            {forgotPassword ? (
              <button onClick={() => setForgotPassword(false)} className="text-primary hover:underline">
                Back to login
              </button>
            ) : (
              <p className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
