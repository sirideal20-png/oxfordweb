import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';

interface AuthGateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectPath?: string;
}

const AuthGateModal = ({ open, onOpenChange, redirectPath }: AuthGateModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const resetForm = () => {
    setEmail(''); setPassword(''); setFirstName(''); setLastName(''); setPhone('');
    setShowPassword(false); setSubmitting(false);
  };

  const handleLogin = async () => {
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Welcome back!' });
      onOpenChange(false);
      resetForm();
      if (redirectPath) navigate(redirectPath);
    }
  };

  const handleSignup = async () => {
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    const { error } = await signUp(email, password, firstName.trim(), lastName.trim(), { phone: phone.trim() });
    if (error) {
      toast({ title: 'Signup failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Account created!', description: 'Please check your email to verify your account.' });
      setMode('login');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === 'login') await handleLogin();
      else await handleSignup();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) resetForm(); }}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-6 py-6 text-center">
          <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center mx-auto mb-2">
            <GraduationCap size={24} className="text-primary-foreground" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary-foreground">
              {mode === 'login' ? 'Sign In' : 'Sign Up Required'}
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/70 text-sm">
              {mode === 'login'
                ? 'Welcome back! Sign in to continue'
                : 'Create an account first to access this section'}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4" autoComplete="off">
          {mode === 'signup' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="gate-first" className="text-xs">First Name *</Label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input id="gate-first" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="John" className="pl-9 text-sm" required autoComplete="new-first-name" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="gate-last" className="text-xs">Last Name *</Label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input id="gate-last" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Doe" className="pl-9 text-sm" required autoComplete="new-last-name" />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="gate-phone" className="text-xs">Contact Number *</Label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="gate-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 234 567 8900" className="pl-9 text-sm" required autoComplete="new-phone" />
                </div>
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="gate-email" className="text-xs">Email *</Label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input id="gate-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="student@example.com" className="pl-9 text-sm" required autoComplete="new-email" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="gate-password" className="text-xs">Password *</Label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input id="gate-password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="pl-9 pr-9 text-sm" required autoComplete="new-password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

           <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>

          <div className="text-center space-y-2">
            {mode === 'signup' ? (
              <>
                <p className="text-xs text-muted-foreground">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setMode('login')} className="text-primary font-semibold hover:underline">Sign In</button>
                </p>
              </>
            ) : (
              <>
                <div className="bg-muted/60 border border-border rounded-lg p-2.5 space-y-1">
                  <p className="text-[11px] font-medium text-foreground">New User here? Sign up first to get access!</p>
                  <p className="text-[10px] text-muted-foreground leading-snug">
                    Create an account to access the Student Portal, Online Transactions, Dashboard and more.
                  </p>
                  <button type="button" onClick={() => setMode('signup')} className="text-xs text-primary font-semibold hover:underline">
                    Create Your Account →
                  </button>
                </div>
                <p>
                  <button type="button" onClick={() => { onOpenChange(false); navigate('/auth?mode=forgot'); }} className="text-[11px] text-muted-foreground hover:text-primary hover:underline">
                    Forgot your password?
                  </button>
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Can't access your email?{' '}
                  <button type="button" onClick={() => { onOpenChange(false); navigate('/auth?mode=recover'); }} className="text-primary font-semibold hover:underline">Recover Account</button>
                </p>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthGateModal;
