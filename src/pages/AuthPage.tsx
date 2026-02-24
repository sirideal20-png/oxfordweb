import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, GraduationCap, Mail, Lock, User, Phone, FileText, Calendar, Globe, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type AuthMode = 'login' | 'signup' | 'forgot' | 'recover';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<AuthMode>(() => {
    const m = searchParams.get('mode');
    if (m === 'signup' || m === 'forgot' || m === 'recover') return m;
    return 'login';
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [phone, setPhone] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [nationality, setNationality] = useState('');
  const [motherName, setMotherName] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [children, setChildren] = useState('');
  const [lastQualification, setLastQualification] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [religion, setReligion] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkDuplicate = async () => {
    if (!passportNumber && !dateOfBirth) return false;
    try {
      const { data, error } = await supabase.rpc('check_duplicate_applicant', {
        _passport_number: passportNumber || null,
        _date_of_birth: dateOfBirth || null,
      });
      if (error) return false;
      const result = data as any;
      if (result?.duplicate) {
        setDuplicateWarning(
          `An account already exists${result.reason === 'passport' ? ' with this passport number' : ''}. Please sign in or recover your account.`
        );
        return true;
      }
      setDuplicateWarning(null);
      return false;
    } catch {
      return false;
    }
  };

  const handleSignup = async () => {
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    const isDuplicate = await checkDuplicate();
    if (isDuplicate) return;

    const extraData: Record<string, string> = {};
    if (phone.trim()) extraData.phone = phone.trim();
    if (passportNumber.trim()) extraData.passport_number = passportNumber.trim();
    if (dateOfBirth) extraData.date_of_birth = dateOfBirth;
    if (nationality.trim()) extraData.nationality = nationality.trim();
    if (fatherName.trim()) extraData.father_name = fatherName.trim();
    if (motherName.trim()) extraData.mother_name = motherName.trim();
    if (gender) extraData.gender = gender;
    if (maritalStatus) extraData.marital_status = maritalStatus;
    if (children.trim()) extraData.children = children.trim();
    if (lastQualification.trim()) extraData.last_qualification = lastQualification.trim();
    if (postalCode.trim()) extraData.postal_code = postalCode.trim();
    if (country.trim()) extraData.country = country.trim();
    if (bloodGroup) extraData.blood_group = bloodGroup;
    if (religion.trim()) extraData.religion = religion.trim();
    if (address.trim()) extraData.address = address.trim();

    const { error } = await signUp(email, password, firstName.trim(), lastName.trim(), extraData);
    if (error) {
      if (error.message?.includes('already registered')) {
        setDuplicateWarning('This email is already registered. Please sign in or recover your account.');
        return;
      }
      toast({ title: 'Signup failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Account created!', description: 'Please check your email to verify your account.' });
      setMode('login');
      setDuplicateWarning(null);
    }
  };

  const handleLogin = async () => {
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Welcome back!' });
      navigate('/student-portal');
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      toast({ title: 'Please enter your email', variant: 'destructive' });
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth`,
    });
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setResetSent(true);
      toast({ title: 'Reset link sent!', description: 'Check your email for the password reset link.' });
    }
  };

  const handleRecoverWithOtp = async () => {
    if (!otpEmail.trim()) {
      toast({ title: 'Please enter your email', variant: 'destructive' });
      return;
    }
    const { error } = await supabase.auth.signInWithOtp({ email: otpEmail });
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setOtpSent(true);
      toast({ title: 'Magic link sent!', description: 'Check your email for a login link. No password needed.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === 'login') await handleLogin();
      else if (mode === 'signup') await handleSignup();
      else if (mode === 'forgot') await handleForgotPassword();
      else if (mode === 'recover') await handleRecoverWithOtp();
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setPassword('');
    setDuplicateWarning(null);
    setResetSent(false);
    setOtpSent(false);
  };

  const titles: Record<AuthMode, string> = {
    login: 'Welcome Back',
    signup: 'Create Account',
    forgot: 'Forgot Password',
    recover: 'Recover Account',
  };
  const subtitles: Record<AuthMode, string> = {
    login: 'Sign in to your student portal',
    signup: 'Register as a new student',
    forgot: 'Reset your password via email',
    recover: 'Get a magic login link via email',
  };

  return (
    <div className="min-h-screen flex items-center justify-center animate-fadeIn pb-12 font-sans">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary px-6 py-8 text-center">
            <div className="w-14 h-14 bg-primary-foreground/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <GraduationCap size={28} className="text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary-foreground">{titles[mode]}</h1>
            <p className="text-primary-foreground/70 text-sm mt-1">{subtitles[mode]}</p>
          </div>

          {/* Duplicate Warning */}
          {duplicateWarning && (
            <div className="px-6 pt-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  {duplicateWarning}
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => switchMode('login')}>Sign In</Button>
                    <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => switchMode('forgot')}>Forgot Password</Button>
                    <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => switchMode('recover')}>Recover</Button>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4" autoComplete="off">
            {/* === SIGNUP FIELDS === */}
            {mode === 'signup' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName" className="text-xs">First Name *</Label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="John" className="pl-9 text-sm" required autoComplete="new-first-name" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName" className="text-xs">Last Name *</Label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Doe" className="pl-9 text-sm" required autoComplete="new-last-name" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="fatherName" className="text-xs">Father's Name</Label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input id="fatherName" value={fatherName} onChange={e => setFatherName(e.target.value)} placeholder="Father's name" className="pl-9 text-sm" autoComplete="off" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs">Contact Number *</Label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 234 567 8900" className="pl-9 text-sm" required autoComplete="new-phone" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="passport" className="text-xs">Passport Number</Label>
                    <div className="relative">
                      <FileText size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="passport" value={passportNumber} onChange={e => setPassportNumber(e.target.value)} placeholder="AB1234567" className="pl-9 text-sm" autoComplete="off" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="dob" className="text-xs">Date of Birth</Label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="dob" type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} className="pl-9 text-sm" autoComplete="off" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="motherName" className="text-xs">Mother's Name</Label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input id="motherName" value={motherName} onChange={e => setMotherName(e.target.value)} placeholder="Mother's name" className="pl-9 text-sm" autoComplete="off" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="gender" className="text-xs">Gender *</Label>
                    <select id="gender" value={gender} onChange={e => setGender(e.target.value)} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground" required>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="maritalStatus" className="text-xs">Marital Status</Label>
                    <select id="maritalStatus" value={maritalStatus} onChange={e => setMaritalStatus(e.target.value)} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground">
                      <option value="">Select</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                </div>
                {maritalStatus === 'married' && (
                  <div className="space-y-1.5">
                    <Label htmlFor="children" className="text-xs">Number of Children</Label>
                    <Input id="children" value={children} onChange={e => setChildren(e.target.value)} placeholder="e.g. 2" className="text-sm" />
                  </div>
                )}
                <div className="space-y-1.5">
                  <Label htmlFor="lastQualification" className="text-xs">Last Qualification</Label>
                  <Input id="lastQualification" value={lastQualification} onChange={e => setLastQualification(e.target.value)} placeholder="e.g. Bachelor's in Computer Science" className="text-sm" autoComplete="off" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address" className="text-xs">Residential Address</Label>
                  <Input id="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Full address" className="text-sm" autoComplete="off" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="postalCode" className="text-xs">Postal Code</Label>
                    <Input id="postalCode" value={postalCode} onChange={e => setPostalCode(e.target.value)} placeholder="e.g. SW1A 1AA" className="text-sm" autoComplete="off" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="nationality" className="text-xs">Nationality</Label>
                    <Input id="nationality" value={nationality} onChange={e => setNationality(e.target.value)} placeholder="e.g. British" className="text-sm" autoComplete="off" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="country" className="text-xs">Country</Label>
                    <Input id="country" value={country} onChange={e => setCountry(e.target.value)} placeholder="e.g. United Kingdom" className="text-sm" autoComplete="off" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="bloodGroup" className="text-xs">Blood Group</Label>
                    <select id="bloodGroup" value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground">
                      <option value="">Select</option>
                      <option value="A+">A+</option><option value="A-">A-</option>
                      <option value="B+">B+</option><option value="B-">B-</option>
                      <option value="AB+">AB+</option><option value="AB-">AB-</option>
                      <option value="O+">O+</option><option value="O-">O-</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="religion" className="text-xs">Religion</Label>
                  <Input id="religion" value={religion} onChange={e => setReligion(e.target.value)} placeholder="e.g. Islam, Christianity" className="text-sm" autoComplete="off" />
                </div>
              </>
            )}

            {/* === EMAIL (all modes except recover) === */}
            {mode !== 'recover' && (
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">Email *</Label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="student@example.com" className="pl-9 text-sm" required autoComplete="new-email" />
                </div>
              </div>
            )}

            {/* === PASSWORD (login + signup only) === */}
            {(mode === 'login' || mode === 'signup') && (
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs">Password *</Label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="pl-9 pr-10 text-sm" required minLength={6} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            )}

            {/* === RECOVER EMAIL === */}
            {mode === 'recover' && (
              <div className="space-y-1.5">
                <Label htmlFor="otpEmail" className="text-xs">Your registered email *</Label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="otpEmail" type="email" value={otpEmail} onChange={e => setOtpEmail(e.target.value)} placeholder="student@example.com" className="pl-9 text-sm" required />
                </div>
                {otpSent && (
                  <p className="text-xs text-green-600 mt-1">✅ Magic login link sent! Check your inbox.</p>
                )}
              </div>
            )}

            {/* === FORGOT CONFIRMATION === */}
            {mode === 'forgot' && resetSent && (
              <p className="text-xs text-green-600">✅ Password reset email sent! Check your inbox.</p>
            )}

            {/* === SUBMIT BUTTON === */}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Please wait...' :
                mode === 'login' ? 'Sign In' :
                mode === 'signup' ? 'Create Account' :
                mode === 'forgot' ? 'Send Reset Link' :
                'Send Magic Link'}
            </Button>

            {/* === NEW USER GUIDANCE (login mode) === */}
            {mode === 'login' && (
              <div className="bg-muted/60 border border-border rounded-lg p-3 text-center space-y-1.5">
                <p className="text-xs font-medium text-foreground">New User here? You need to sign up first!</p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Create an account to access the Student Portal, Online Transactions, Dashboard and more.
                </p>
                <Button type="button" variant="outline" size="sm" className="mt-1 text-xs h-7 px-4" onClick={() => switchMode('signup')}>
                  Create Your Account →
                </Button>
              </div>
            )}

            {/* === FORGOT PASSWORD LINK (login mode) === */}
            {mode === 'login' && (
              <p className="text-center">
                <button type="button" onClick={() => switchMode('forgot')} className="text-xs text-muted-foreground hover:text-primary hover:underline">
                  Forgot your password?
                </button>
              </p>
            )}

            {/* === MODE SWITCHER === */}
            <div className="border-t border-border pt-4 space-y-2">
              {mode !== 'login' && (
                <p className="text-center text-xs text-muted-foreground">
                  Already have an account?{' '}
                  <button type="button" onClick={() => switchMode('login')} className="text-primary font-semibold hover:underline">Sign In</button>
                </p>
              )}
              {mode !== 'signup' && (
                <p className="text-center text-xs text-muted-foreground">
                  Don't have an account?{' '}
                  <button type="button" onClick={() => switchMode('signup')} className="text-primary font-semibold hover:underline">Sign Up</button>
                </p>
              )}
              {mode !== 'recover' && (
                <p className="text-center text-xs text-muted-foreground">
                  Can't access your email?{' '}
                  <button type="button" onClick={() => switchMode('recover')} className="text-primary font-semibold hover:underline">Recover Account</button>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
