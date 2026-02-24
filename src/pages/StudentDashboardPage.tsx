import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  FileText, MessageCircle, Bell, BarChart, Calendar, CreditCard,
  User, LogOut, Clock, CheckCircle, AlertCircle, XCircle, Plus, Send,
  Camera, Heart, BookOpen, MapPin, Globe, Droplets, Star, Baby, GraduationCap, Mail, Phone,
  Edit3, X, Save, Headphones
} from 'lucide-react';

const statusIcon = (status: string) => {
  switch (status) {
    case 'approved': case 'paid': case 'resolved': case 'present': return <CheckCircle size={14} className="text-emerald-500" />;
    case 'pending': case 'open': case 'under_review': case 'in_progress': return <Clock size={14} className="text-amber-500" />;
    case 'rejected': case 'overdue': case 'absent': case 'closed': return <XCircle size={14} className="text-destructive" />;
    default: return <AlertCircle size={14} className="text-muted-foreground" />;
  }
};

const GenderSymbol = ({ gender }: { gender: string }) => {
  if (gender === 'male') return <span className="text-blue-500 text-lg font-bold">♂</span>;
  if (gender === 'female') return <span className="text-pink-500 text-lg font-bold">♀</span>;
  return <span className="text-muted-foreground text-lg">⚧</span>;
};

const ProfileField = ({ index, icon: Icon, label, value, bgStyle, iconColor }: { index: number; icon: any; label: string; value: string; bgStyle: string; iconColor: string }) => (
  <div className={`flex items-start gap-3 p-4 rounded-xl border-[2.5px] ${iconColor.replace('text-', 'border-').replace('700', '500').replace('600', '500')} transition-all duration-200 hover:-translate-y-1`}
    style={{
      backgroundColor: bgStyle,
      boxShadow: 'inset 0 -8px 12px -4px rgba(0,0,0,0.12), inset 0 4px 8px 0 rgba(255,255,255,0.7), inset 4px 0 6px -2px rgba(255,255,255,0.3), inset -4px 0 6px -2px rgba(0,0,0,0.05), 0 6px 12px -3px rgba(0,0,0,0.12), 0 3px 6px -2px rgba(0,0,0,0.06)',
    }}
  >
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-white/70 ${iconColor}`}>
      <Icon size={18} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5 mb-0.5">
        <span className="w-5 h-5 rounded-full bg-white/60 text-[9px] font-bold flex items-center justify-center shrink-0 text-foreground">{index}</span>
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
      </div>
      <p className="text-sm font-semibold text-foreground truncate">{value || 'Not set'}</p>
    </div>
  </div>
);
const FIELD_CONFIG = [
  { key: 'first_name', label: 'First Name', icon: User, bgStyle: '#dbeafe', iconColor: 'text-blue-700' },          // blue
  { key: 'last_name', label: 'Last Name', icon: User, bgStyle: '#f5d0fe', iconColor: 'text-fuchsia-700' },          // fuchsia
  { key: 'father_name', label: "Father's Name", icon: User, bgStyle: '#fef3c7', iconColor: 'text-amber-700' },      // amber
  { key: 'mother_name', label: "Mother's Name", icon: User, bgStyle: '#ede9fe', iconColor: 'text-violet-700' },      // violet
  { key: 'phone', label: 'Contact No.', icon: Phone, bgStyle: '#ccfbf1', iconColor: 'text-teal-700' },               // teal
  { key: 'marital_status', label: 'Marital Status', icon: Heart, bgStyle: '#fce7f3', iconColor: 'text-pink-700', type: 'select', options: ['single', 'married', 'divorced', 'widowed'] }, // pink
  { key: 'children', label: 'Children', icon: Baby, bgStyle: '#ffedd5', iconColor: 'text-orange-700' },              // orange
  { key: 'last_qualification', label: 'Last Qualification', icon: GraduationCap, bgStyle: '#e0e7ff', iconColor: 'text-indigo-700' }, // indigo
  { key: 'address', label: 'Residential Address', icon: MapPin, bgStyle: '#ffe4e6', iconColor: 'text-rose-700' },    // rose
  { key: 'postal_code', label: 'Postal Code', icon: MapPin, bgStyle: '#ecfccb', iconColor: 'text-lime-700' },        // lime-yellow
  { key: 'nationality', label: 'Nationality', icon: Globe, bgStyle: '#cffafe', iconColor: 'text-cyan-700' },         // cyan
  { key: 'country', label: 'Country', icon: Globe, bgStyle: '#d1fae5', iconColor: 'text-emerald-700' },              // emerald
  { key: 'blood_group', label: 'Blood Group', icon: Droplets, bgStyle: '#fee2e2', iconColor: 'text-red-700', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] }, // red
  { key: 'religion', label: 'Religion', icon: Star, bgStyle: '#fef9c3', iconColor: 'text-yellow-700' },              // yellow
  { key: 'date_of_birth', label: 'Date of Birth', icon: Calendar, bgStyle: '#e0f2fe', iconColor: 'text-sky-700', type: 'date' }, // sky
  { key: 'passport_number', label: 'Passport No.', icon: FileText, bgStyle: '#f1f5f9', iconColor: 'text-slate-700' }, // slate
];

const StudentDashboardPage = () => {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applications, setApplications] = useState<any[]>([]);
  const [queries, setQueries] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [fees, setFees] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [querySubject, setQuerySubject] = useState('');
  const [queryMessage, setQueryMessage] = useState('');
  const [submittingQuery, setSubmittingQuery] = useState(false);
  const [uploadingPic, setUploadingPic] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update info state
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [updateRequests, setUpdateRequests] = useState<any[]>([]);
  const [supportRequests, setSupportRequests] = useState<any[]>([]);
  const [submittingUpdate, setSubmittingUpdate] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading]);

  // Profile picture URL resolution
  const rawPicUrl = (profile as any)?.profile_picture_url || '';
  useEffect(() => {
    if (!rawPicUrl) { setProfilePicUrl(null); return; }
    if (rawPicUrl.startsWith('http')) { setProfilePicUrl(rawPicUrl); return; }
    const { data } = supabase.storage.from('profile-pictures').getPublicUrl(rawPicUrl);
    setProfilePicUrl(data?.publicUrl || null);
  }, [rawPicUrl]);

  useEffect(() => {
    if (!user) return;
    const fetchAll = async () => {
      const [apps, qs, anns, recs, att, fp, ur, sr] = await Promise.all([
        supabase.from('applications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('student_queries').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('announcements').select('*').eq('published', true).order('created_at', { ascending: false }).limit(10),
        supabase.from('academic_records').select('*').eq('user_id', user.id).order('academic_year', { ascending: false }),
        supabase.from('attendance').select('*').eq('user_id', user.id).order('date', { ascending: false }).limit(50),
        supabase.from('fee_payments').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('profile_update_requests').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('support_requests').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      ]);
      setApplications(apps.data || []);
      setQueries(qs.data || []);
      setAnnouncements(anns.data || []);
      setRecords(recs.data || []);
      setAttendance(att.data || []);
      setFees(fp.data || []);
      setUpdateRequests(ur.data || []);
      setSupportRequests(sr.data || []);
    };
    fetchAll();
  }, [user]);

  const submitQuery = async () => {
    if (!querySubject.trim() || !queryMessage.trim() || !user) return;
    setSubmittingQuery(true);
    const { error } = await supabase.from('student_queries').insert({ user_id: user.id, subject: querySubject.trim(), message: queryMessage.trim() });
    if (error) {
      toast({ title: 'Failed to submit', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Query submitted!' });
      setQuerySubject(''); setQueryMessage('');
      const { data } = await supabase.from('student_queries').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      setQueries(data || []);
    }
    setSubmittingQuery(false);
  };

  const handleProfilePicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploadingPic(true);
    const filePath = `${user.id}/avatar.${file.name.split('.').pop()}`;
    const { error: uploadError } = await supabase.storage.from('profile-pictures').upload(filePath, file, { upsert: true });
    if (uploadError) {
      toast({ title: 'Upload failed', description: uploadError.message, variant: 'destructive' });
    } else {
      // Store the file path, not a public URL, since the bucket is private
      await supabase.from('profiles').update({ profile_picture_url: filePath }).eq('user_id', user.id);
      toast({ title: 'Profile picture updated!' });
      window.location.reload();
    }
    setUploadingPic(false);
  };

  const startEditing = () => {
    const p = profile as any;
    const vals: Record<string, string> = {};
    FIELD_CONFIG.forEach(f => { vals[f.key] = p?.[f.key] || ''; });
    setEditValues(vals);
    setEditing(true);
  };

  const submitUpdateRequest = async () => {
    if (!user) return;
    const p = profile as any;
    const changes: Record<string, { old: string; new: string }> = {};
    FIELD_CONFIG.forEach(f => {
      const oldVal = p?.[f.key] || '';
      const newVal = editValues[f.key] || '';
      if (oldVal !== newVal) {
        changes[f.key] = { old: oldVal, new: newVal };
      }
    });
    if (Object.keys(changes).length === 0) {
      toast({ title: 'No changes detected' });
      return;
    }
    setSubmittingUpdate(true);
    const { error } = await supabase.from('profile_update_requests').insert({
      user_id: user.id,
      requested_changes: changes,
    });
    if (error) {
      toast({ title: 'Failed to submit', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Update request submitted!', description: 'Your changes are under review by the admin.' });
      setEditing(false);
      const { data } = await supabase.from('profile_update_requests').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      setUpdateRequests(data || []);
    }
    setSubmittingUpdate(false);
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><p className="text-muted-foreground">Loading...</p></div>;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'overview', label: 'Overview', icon: BarChart },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'academics', label: 'Academics', icon: BarChart },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'fees', label: 'Fees', icon: CreditCard },
    { id: 'queries', label: 'Support', icon: MessageCircle },
    { id: 'announcements', label: 'Notices', icon: Bell },
  ];

  const attendanceRate = attendance.length > 0
    ? Math.round((attendance.filter(a => a.status === 'present' || a.status === 'late').length / attendance.length) * 100)
    : 0;

  const p = profile as any;
  const gender = p?.gender || '';
  const initials = `${(p?.first_name || '')[0] || ''}${(p?.last_name || '')[0] || ''}`.toUpperCase();

  // Build numbered profile fields
  const profileFields: { icon: any; label: string; value: string; bgStyle: string; iconColor: string }[] = [
    { icon: User, label: 'Applicant Name', value: `${p?.first_name || ''} ${p?.last_name || ''}`, bgStyle: '#dbeafe', iconColor: 'text-blue-700' },
    { icon: User, label: "Father's Name", value: p?.father_name, bgStyle: '#fef3c7', iconColor: 'text-amber-700' },
    { icon: User, label: "Mother's Name", value: p?.mother_name, bgStyle: '#ede9fe', iconColor: 'text-violet-700' },
    { icon: Mail, label: 'Email', value: p?.email, bgStyle: '#cffafe', iconColor: 'text-cyan-700' },
    { icon: Phone, label: 'Contact No.', value: p?.phone, bgStyle: '#ccfbf1', iconColor: 'text-teal-700' },
    { icon: Heart, label: 'Marital Status', value: p?.marital_status ? `${p.marital_status}${p.marital_status === 'married' && p.children ? ` — ${p.children} children` : ''}` : '', bgStyle: '#fce7f3', iconColor: 'text-pink-700' },
  ];
  if (p?.marital_status === 'married' && p?.children) {
    profileFields.push({ icon: Baby, label: 'Children', value: p?.children, bgStyle: '#ffedd5', iconColor: 'text-orange-700' });
  }
  profileFields.push(
    { icon: GraduationCap, label: 'Last Qualification', value: p?.last_qualification, bgStyle: '#e0e7ff', iconColor: 'text-indigo-700' },
    { icon: MapPin, label: 'Residential Address', value: p?.address, bgStyle: '#ffe4e6', iconColor: 'text-rose-700' },
    { icon: MapPin, label: 'Postal Code', value: p?.postal_code, bgStyle: '#ecfccb', iconColor: 'text-lime-700' },
    { icon: Globe, label: 'Nationality', value: p?.nationality, bgStyle: '#d1fae5', iconColor: 'text-emerald-700' },
    { icon: Globe, label: 'Country', value: p?.country, bgStyle: '#bae6fd', iconColor: 'text-sky-700' },
    { icon: Droplets, label: 'Blood Group', value: p?.blood_group, bgStyle: '#fee2e2', iconColor: 'text-red-700' },
    { icon: Star, label: 'Religion', value: p?.religion, bgStyle: '#fef9c3', iconColor: 'text-yellow-700' },
    { icon: Calendar, label: 'Date of Birth', value: p?.date_of_birth, bgStyle: '#e0f2fe', iconColor: 'text-sky-600' },
    { icon: FileText, label: 'Passport No.', value: p?.passport_number, bgStyle: '#f1f5f9', iconColor: 'text-slate-700' },
    { icon: Clock, label: 'Member Since', value: p?.created_at ? new Date(p.created_at).toLocaleDateString() : '', bgStyle: '#f3f4f6', iconColor: 'text-gray-600' },
    { icon: Camera, label: 'Picture', value: profilePicUrl ? 'Uploaded' : 'Not set', bgStyle: '#f5d0fe', iconColor: 'text-fuchsia-700' },
  );

  const pendingUpdateRequest = updateRequests.find(r => r.status === 'pending');

  return (
    <div className="space-y-0 animate-fadeIn font-sans min-h-screen pb-12">
      {/* Header with gradient */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 py-5 sm:py-8 px-4 sm:px-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="relative shrink-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center overflow-hidden shadow-lg">
                  {profilePicUrl ? (
                    <img src={profilePicUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg sm:text-xl font-bold text-white">{initials}</span>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <GenderSymbol gender={gender} />
                </div>
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl md:text-3xl font-bold flex items-center gap-2 truncate">
                  {p?.first_name || ''} {p?.last_name || ''}
                </h1>
                <p className="text-white/70 text-xs sm:text-sm mt-0.5 truncate">{p?.email}</p>
                {p?.last_qualification && <p className="text-white/60 text-[10px] sm:text-xs mt-0.5 flex items-center gap-1 truncate"><GraduationCap size={12} /> {p.last_qualification}</p>}
              </div>
            </div>
            <Button size="sm" onClick={() => { signOut(); navigate('/'); }} className="bg-white/15 border border-white/30 text-white hover:bg-white/25 backdrop-blur-sm self-end sm:self-auto shrink-0">
              <LogOut size={14} className="mr-1" /> Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex flex-wrap gap-0.5 sm:gap-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1 px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === t.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
              <t.icon size={12} className="hidden sm:block" /> {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Profile - FIRST TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                Your Profile <GenderSymbol gender={gender} />
              </h2>
              {!editing && (
                <Button size="sm" onClick={startEditing} className="rounded-xl" disabled={!!pendingUpdateRequest}>
                  <Edit3 size={14} className="mr-1" /> {pendingUpdateRequest ? 'Update Under Review' : 'Update Information'}
                </Button>
              )}
              {editing && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditing(false)} className="rounded-xl">
                    <X size={14} className="mr-1" /> Cancel
                  </Button>
                  <Button size="sm" onClick={submitUpdateRequest} disabled={submittingUpdate} className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Save size={14} className="mr-1" /> {submittingUpdate ? 'Submitting...' : 'Submit for Approval'}
                  </Button>
                </div>
              )}
            </div>

            {/* Pending update banner */}
            {pendingUpdateRequest && (
              <div className="bg-red-50 dark:bg-red-950/40 border-2 border-red-400 dark:border-red-700 rounded-2xl p-4 flex items-start gap-3">
                <Clock size={18} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-red-600 dark:text-red-400">⚠️ Updation Under Review</p>
                  <p className="text-xs text-red-500 dark:text-red-400 mt-0.5 font-medium">Your profile update request submitted on {new Date(pendingUpdateRequest.created_at).toLocaleDateString()} is being reviewed by the admin.</p>
                </div>
              </div>
            )}

            {/* Show rejected requests */}
            {updateRequests.filter(r => r.status === 'rejected').slice(0, 1).map(r => (
              <div key={r.id} className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-2xl p-4 flex items-start gap-3">
                <XCircle size={18} className="text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-800 dark:text-red-300">Update Request Rejected</p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">{r.admin_notes || 'Your update request was not approved.'}</p>
                </div>
              </div>
            ))}

            {/* Avatar section */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative group">
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/20 flex items-center justify-center overflow-hidden shadow-lg">
                  {profilePicUrl ? (
                    <img src={profilePicUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-primary">{initials}</span>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPic}
                  className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Camera size={16} />
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProfilePicUpload} />
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground flex items-center gap-2 justify-center">
                  {p?.first_name} {p?.last_name} <GenderSymbol gender={gender} />
                </p>
                <p className="text-xs text-muted-foreground">{p?.email}</p>
              </div>
            </div>

            {/* Edit Mode */}
            {editing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {FIELD_CONFIG.map(f => (
                  <div key={f.key} className={`p-4 rounded-xl border-[2.5px] ${f.iconColor.replace('text-', 'border-').replace('700', '500').replace('600', '500')}`}
                    style={{
                      backgroundColor: f.bgStyle,
                      boxShadow: 'inset 0 -8px 12px -4px rgba(0,0,0,0.12), inset 0 4px 8px 0 rgba(255,255,255,0.7), inset 4px 0 6px -2px rgba(255,255,255,0.3), inset -4px 0 6px -2px rgba(0,0,0,0.05), 0 6px 12px -3px rgba(0,0,0,0.12), 0 3px 6px -2px rgba(0,0,0,0.06)',
                    }}
                  >
                    <label className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      <f.icon size={12} /> {f.label}
                    </label>
                    {f.type === 'select' ? (
                      <select
                        value={editValues[f.key] || ''}
                        onChange={e => setEditValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                        className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground"
                      >
                        <option value="">Select...</option>
                        {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input
                        type={f.type || 'text'}
                        value={editValues[f.key] || ''}
                        onChange={e => setEditValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                        className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* View Mode - Desktop responsive grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {profileFields.map((f, i) => (
                  <ProfileField key={i} index={i + 1} icon={f.icon} label={f.label} value={f.value} bgStyle={f.bgStyle} iconColor={f.iconColor} />
                ))}
              </div>
            )}

            {/* Update request history */}
            {updateRequests.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-bold text-foreground mb-3">Update Request History</h3>
                <div className="space-y-2">
                  {[...updateRequests]
                    .sort((a, b) => new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime())
                    .map(r => (
                    <div key={r.id} className="bg-card border border-border rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1 text-xs font-semibold capitalize">
                          {statusIcon(r.status)} {r.status}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(r.updated_at || r.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-foreground mb-1.5">Profile Update Request</p>
                      <div className="space-y-1">
                        <p className="text-xs">
                          <span className="font-medium text-blue-600 dark:text-blue-400">Submitted by User:</span>{' '}
                          <span className="text-muted-foreground">{new Date(r.created_at).toLocaleString()}</span>
                        </p>
                        {r.reviewed_at && (
                          <p className="text-xs">
                            <span className="font-medium text-foreground">{r.status === 'approved' ? 'Approved by Admin:' : r.status === 'rejected' ? 'Rejected by Admin:' : 'Reviewed by Admin:'}</span>{' '}
                            <span className="text-muted-foreground">{new Date(r.reviewed_at).toLocaleString()}</span>
                          </p>
                        )}
                        <p className="text-[10px] text-muted-foreground">
                          Fields: {Object.keys(r.requested_changes || {}).join(', ')}
                        </p>
                        {r.admin_notes && <p className="text-[10px] text-primary mt-0.5">Admin Note: {r.admin_notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200/50 dark:border-blue-800/30 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2"><FileText size={16} className="text-blue-500" /><p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Applications</p></div>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{applications.length}</p>
              <p className="text-[10px] text-blue-500/70 mt-1">{applications.filter(a => a.status === 'pending').length} pending</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border border-purple-200/50 dark:border-purple-800/30 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2"><BookOpen size={16} className="text-purple-500" /><p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Courses</p></div>
              <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{records.length}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/30 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-800/30 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2"><Calendar size={16} className="text-amber-500" /><p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Attendance</p></div>
              <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">{attendanceRate}%</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-950/30 dark:to-pink-900/20 border border-rose-200/50 dark:border-rose-800/30 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2"><CreditCard size={16} className="text-rose-500" /><p className="text-xs text-rose-600 dark:text-rose-400 font-medium">Pending Fees</p></div>
              <p className="text-3xl font-bold text-rose-700 dark:text-rose-300">£{fees.filter(f => f.status === 'pending' || f.status === 'overdue').reduce((s: number, f: any) => s + Number(f.amount), 0).toFixed(0)}</p>
            </div>

            {announcements.length > 0 && (
              <div className="col-span-full bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/20 dark:to-violet-900/10 border border-indigo-200/50 dark:border-indigo-800/30 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><Bell size={16} className="text-indigo-500" /> Latest Announcements</h3>
                <div className="space-y-2">
                  {announcements.slice(0, 3).map(a => (
                    <div key={a.id} className="flex items-start gap-2 p-3 bg-white/60 dark:bg-white/5 rounded-xl border border-border/30">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${a.priority === 'urgent' ? 'bg-destructive animate-pulse' : a.priority === 'high' ? 'bg-amber-500' : 'bg-primary'}`} />
                      <div>
                        <p className="text-xs font-semibold text-foreground">{a.title}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{a.content?.slice(0, 100)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Applications */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center"><FileText size={16} className="text-white" /></div>
                Your Applications
              </h2>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">{applications.length} total</span>
            </div>
            {applications.length === 0 ? (
              <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/30 dark:border-blue-800/20 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4"><FileText size={28} className="text-blue-400" /></div>
                <p className="text-sm font-semibold text-foreground">No Applications Yet</p>
                <p className="text-xs text-muted-foreground mt-1">Your submitted applications will appear here with their status.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {applications.map(app => {
                  const statusColors: Record<string, string> = {
                    approved: 'from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border-emerald-200/50 dark:border-emerald-800/30',
                    rejected: 'from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-red-200/50 dark:border-red-800/30',
                    pending: 'from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-200/50 dark:border-amber-800/30',
                    under_review: 'from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20 border-sky-200/50 dark:border-sky-800/30',
                  };
                  const bg = statusColors[app.status] || 'from-muted/30 to-muted/10 border-border';
                  return (
                    <div key={app.id} className={`bg-gradient-to-br ${bg} border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-foreground truncate">{app.program_name}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">{app.program_type}</p>
                        </div>
                        <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          app.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                          : app.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                          : app.status === 'under_review' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                        }`}>
                          {statusIcon(app.status)} {app.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(app.submitted_at).toLocaleDateString()}</span>
                        {app.documents_submitted && <span className="flex items-center gap-1"><CheckCircle size={10} className="text-emerald-500" /> Docs Submitted</span>}
                      </div>
                      {app.admin_notes && (
                        <div className="mt-3 p-2.5 bg-white/60 dark:bg-white/5 rounded-xl border border-border/30">
                          <p className="text-[10px] font-semibold text-primary mb-0.5">Admin Note</p>
                          <p className="text-xs text-foreground">{app.admin_notes}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Academics */}
        {activeTab === 'academics' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center"><BookOpen size={16} className="text-white" /></div>
                Academic Records
              </h2>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">{records.length} courses</span>
            </div>
            {records.length === 0 ? (
              <div className="bg-gradient-to-br from-purple-50/50 to-violet-50/50 dark:from-purple-950/20 dark:to-violet-950/20 border border-purple-200/30 dark:border-purple-800/20 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4"><BookOpen size={28} className="text-purple-400" /></div>
                <p className="text-sm font-semibold text-foreground">No Academic Records</p>
                <p className="text-xs text-muted-foreground mt-1">Your courses, grades, and credits will appear here once added by the admin.</p>
              </div>
            ) : (
              <>
                {/* Summary cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border border-purple-200/50 dark:border-purple-800/30 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{records.length}</p>
                    <p className="text-[10px] text-purple-500 font-medium uppercase tracking-wider">Courses</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/20 border border-indigo-200/50 dark:border-indigo-800/30 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{records.reduce((s: number, r: any) => s + (Number(r.credits) || 0), 0)}</p>
                    <p className="text-[10px] text-indigo-500 font-medium uppercase tracking-wider">Total Credits</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{records.filter((r: any) => r.grade && !['F', 'FF'].includes(r.grade)).length}</p>
                    <p className="text-[10px] text-emerald-500 font-medium uppercase tracking-wider">Passed</p>
                  </div>
                  <div className="bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-950/30 dark:to-sky-900/20 border border-sky-200/50 dark:border-sky-800/30 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-sky-700 dark:text-sky-300">{[...new Set(records.map((r: any) => r.academic_year))].length}</p>
                    <p className="text-[10px] text-sky-500 font-medium uppercase tracking-wider">Academic Years</p>
                  </div>
                </div>
                {/* Records table */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-xs">
                    <thead className="bg-gradient-to-r from-purple-100/60 to-violet-100/40 dark:from-purple-900/20 dark:to-violet-900/10">
                      <tr>
                        <th className="text-left p-3.5 font-bold text-foreground">#</th>
                        <th className="text-left p-3.5 font-bold text-foreground">Course</th>
                        <th className="text-left p-3.5 font-bold text-foreground">Code</th>
                        <th className="text-left p-3.5 font-bold text-foreground">Grade</th>
                        <th className="text-left p-3.5 font-bold text-foreground">Credits</th>
                        <th className="text-left p-3.5 font-bold text-foreground">Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((r, idx) => (
                        <tr key={r.id} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="p-3.5"><span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] font-bold flex items-center justify-center">{idx + 1}</span></td>
                          <td className="p-3.5 font-semibold text-foreground">{r.course_name}</td>
                          <td className="p-3.5 text-muted-foreground font-mono">{r.course_code || '—'}</td>
                          <td className="p-3.5">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              r.grade === 'A' || r.grade === 'AA' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                              : r.grade === 'F' || r.grade === 'FF' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                              : 'bg-muted text-foreground'
                            }`}>{r.grade || '—'}</span>
                          </td>
                          <td className="p-3.5 text-muted-foreground">{r.credits}</td>
                          <td className="p-3.5 text-muted-foreground">{r.academic_year || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* Attendance */}
        {activeTab === 'attendance' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"><Calendar size={16} className="text-white" /></div>
                Attendance
              </h2>
              {attendance.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className={`px-4 py-2 rounded-xl text-sm font-bold ${
                    attendanceRate >= 75 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : attendanceRate >= 50 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {attendanceRate}% Rate
                  </div>
                </div>
              )}
            </div>
            {attendance.length === 0 ? (
              <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200/30 dark:border-amber-800/20 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4"><Calendar size={28} className="text-amber-400" /></div>
                <p className="text-sm font-semibold text-foreground">No Attendance Records</p>
                <p className="text-xs text-muted-foreground mt-1">Your attendance will be tracked here once recorded by the admin.</p>
              </div>
            ) : (
              <>
                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{attendance.filter(a => a.status === 'present').length}</p>
                    <p className="text-[10px] text-emerald-500 font-medium uppercase">Present</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/30 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-red-700 dark:text-red-300">{attendance.filter(a => a.status === 'absent').length}</p>
                    <p className="text-[10px] text-red-500 font-medium uppercase">Absent</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-amber-700 dark:text-amber-300">{attendance.filter(a => a.status === 'late').length}</p>
                    <p className="text-[10px] text-amber-500 font-medium uppercase">Late</p>
                  </div>
                  <div className="bg-sky-50 dark:bg-sky-950/20 border border-sky-200/50 dark:border-sky-800/30 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-sky-700 dark:text-sky-300">{attendance.filter(a => a.status === 'excused').length}</p>
                    <p className="text-[10px] text-sky-500 font-medium uppercase">Excused</p>
                  </div>
                </div>
                {/* Attendance list as cards on mobile, table on desktop */}
                <div className="hidden md:block bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-xs">
                    <thead className="bg-gradient-to-r from-amber-100/60 to-orange-100/40 dark:from-amber-900/20 dark:to-orange-900/10">
                      <tr>
                        <th className="text-left p-3.5 font-bold text-foreground">#</th>
                        <th className="text-left p-3.5 font-bold text-foreground">Date</th>
                        <th className="text-left p-3.5 font-bold text-foreground">Course</th>
                        <th className="text-left p-3.5 font-bold text-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance.map((a, idx) => (
                        <tr key={a.id} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="p-3.5 text-muted-foreground">{idx + 1}</td>
                          <td className="p-3.5 font-medium text-foreground">{new Date(a.date).toLocaleDateString()}</td>
                          <td className="p-3.5 text-muted-foreground">{a.course_name}</td>
                          <td className="p-3.5">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              a.status === 'present' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                              : a.status === 'absent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                              : a.status === 'late' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                              : 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'
                            }`}>{statusIcon(a.status)} {a.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Mobile card view */}
                <div className="md:hidden space-y-2">
                  {attendance.map((a, idx) => (
                    <div key={a.id} className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-muted text-muted-foreground text-[10px] font-bold flex items-center justify-center">{idx + 1}</span>
                        <div>
                          <p className="text-xs font-semibold text-foreground">{a.course_name}</p>
                          <p className="text-[10px] text-muted-foreground">{new Date(a.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        a.status === 'present' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : a.status === 'absent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        : a.status === 'late' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                        : 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'
                      }`}>{statusIcon(a.status)} {a.status}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Fees */}
        {activeTab === 'fees' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center"><CreditCard size={16} className="text-white" /></div>
                Fee Payments
              </h2>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">{fees.length} records</span>
            </div>
            {fees.length === 0 ? (
              <div className="bg-gradient-to-br from-rose-50/50 to-pink-50/50 dark:from-rose-950/20 dark:to-pink-950/20 border border-rose-200/30 dark:border-rose-800/20 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-4"><CreditCard size={28} className="text-rose-400" /></div>
                <p className="text-sm font-semibold text-foreground">No Fee Records</p>
                <p className="text-xs text-muted-foreground mt-1">Your tuition fees and payment history will appear here.</p>
              </div>
            ) : (
              <>
                {/* Fee summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl p-4">
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium uppercase tracking-wider">Paid</p>
                    <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">£{fees.filter(f => f.status === 'paid').reduce((s: number, f: any) => s + Number(f.amount), 0).toFixed(2)}</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200/50 dark:border-amber-800/30 rounded-xl p-4">
                    <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium uppercase tracking-wider">Pending</p>
                    <p className="text-xl font-bold text-amber-700 dark:text-amber-300 mt-1">£{fees.filter(f => f.status === 'pending').reduce((s: number, f: any) => s + Number(f.amount), 0).toFixed(2)}</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border border-red-200/50 dark:border-red-800/30 rounded-xl p-4">
                    <p className="text-[10px] text-red-600 dark:text-red-400 font-medium uppercase tracking-wider">Overdue</p>
                    <p className="text-xl font-bold text-red-700 dark:text-red-300 mt-1">£{fees.filter(f => f.status === 'overdue').reduce((s: number, f: any) => s + Number(f.amount), 0).toFixed(2)}</p>
                  </div>
                </div>
                {/* Fee cards */}
                <div className="space-y-2">
                  {fees.map((f, idx) => (
                    <div key={f.id} className={`bg-card border rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all ${
                      f.status === 'paid' ? 'border-emerald-200/50 dark:border-emerald-800/30' 
                      : f.status === 'overdue' ? 'border-red-200/50 dark:border-red-800/30' 
                      : 'border-border'
                    }`}>
                      <span className="w-8 h-8 rounded-xl bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center shrink-0">{idx + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{f.description}</p>
                        <div className="flex items-center gap-3 mt-0.5 text-[10px] text-muted-foreground">
                          {f.due_date && <span className="flex items-center gap-1"><Calendar size={10} /> Due: {new Date(f.due_date).toLocaleDateString()}</span>}
                          {f.paid_at && <span className="flex items-center gap-1"><CheckCircle size={10} className="text-emerald-500" /> Paid: {new Date(f.paid_at).toLocaleDateString()}</span>}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-foreground">{f.currency} {Number(f.amount).toFixed(2)}</p>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-0.5 ${
                          f.status === 'paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                          : f.status === 'overdue' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                        }`}>{statusIcon(f.status)} {f.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Support Queries */}
        {activeTab === 'queries' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"><MessageCircle size={16} className="text-white" /></div>
                Support Queries
              </h2>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">{queries.filter(q => q.status === 'open').length} open</span>
            </div>

            {/* Submit form */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-900/10 border border-emerald-200/50 dark:border-emerald-800/30 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><Plus size={14} className="text-emerald-600 dark:text-emerald-400" /> Submit a New Query</h3>
              <input value={querySubject} onChange={e => setQuerySubject(e.target.value)} placeholder="Subject" className="w-full border border-input rounded-xl px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              <textarea value={queryMessage} onChange={e => setQueryMessage(e.target.value)} placeholder="Describe your issue in detail..." rows={3} className="w-full border border-input rounded-xl px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              <Button size="sm" onClick={submitQuery} disabled={submittingQuery} className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">
                <Send size={14} className="mr-1" /> {submittingQuery ? 'Sending...' : 'Submit Query'}
              </Button>
            </div>

            {/* Query list */}
            {queries.length === 0 ? (
              <div className="bg-gradient-to-br from-emerald-50/30 to-teal-50/30 dark:from-emerald-950/10 dark:to-teal-950/10 border border-emerald-200/20 dark:border-emerald-800/10 rounded-2xl p-8 text-center">
                <p className="text-sm text-muted-foreground">No queries submitted yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {queries.map((q, idx) => (
                  <div key={q.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                        <div>
                          <p className="text-sm font-bold text-foreground">{q.subject}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{new Date(q.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${
                        q.status === 'resolved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : q.status === 'closed' ? 'bg-muted text-muted-foreground'
                        : q.status === 'in_progress' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                      }`}>{statusIcon(q.status)} {q.status.replace('_', ' ')}</span>
                    </div>
                    <p className="text-xs text-muted-foreground ml-10">{q.message}</p>
                    {q.admin_response && (
                      <div className="mt-3 ml-10 p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/10">
                        <p className="text-[10px] font-bold text-primary flex items-center gap-1"><MessageCircle size={10} /> Admin Response</p>
                        <p className="text-xs text-foreground mt-1">{q.admin_response}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Support Requests from Support Page */}
            {supportRequests.length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Headphones size={16} className="text-primary" /> Support Page Requests
                </h3>
                {supportRequests.map((sr, idx) => (
                  <div key={sr.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-bold text-foreground capitalize">{sr.category}</p>
                            {sr.ticket_number && (
                              <span className="font-mono text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{sr.ticket_number}</span>
                            )}
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{new Date(sr.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${
                        sr.status === 'resolved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : sr.status === 'in_progress' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                      }`}>{statusIcon(sr.status)} {sr.status.replace('_', ' ')}</span>
                    </div>
                    <p className="text-xs text-muted-foreground ml-10">{sr.message}</p>
                    {sr.admin_notes && (
                      <div className="ml-10 mt-2 bg-primary/5 border border-primary/20 rounded-lg p-2.5">
                        <p className="text-[10px] font-bold text-primary mb-0.5">Admin Response</p>
                        <p className="text-xs text-foreground">{sr.admin_notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Announcements */}
        {activeTab === 'announcements' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center"><Bell size={16} className="text-white" /></div>
                Notices & Announcements
              </h2>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">{announcements.length} notices</span>
            </div>
            {announcements.length === 0 ? (
              <div className="bg-gradient-to-br from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/20 border border-indigo-200/30 dark:border-indigo-800/20 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4"><Bell size={28} className="text-indigo-400" /></div>
                <p className="text-sm font-semibold text-foreground">No Announcements</p>
                <p className="text-xs text-muted-foreground mt-1">Important notices from the university will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {announcements.map((a, idx) => {
                  const priorityStyles: Record<string, string> = {
                    urgent: 'border-l-red-500 bg-gradient-to-r from-red-50/50 to-transparent dark:from-red-950/20',
                    high: 'border-l-amber-500 bg-gradient-to-r from-amber-50/50 to-transparent dark:from-amber-950/20',
                    normal: 'border-l-primary bg-gradient-to-r from-primary/5 to-transparent',
                    low: 'border-l-muted-foreground bg-gradient-to-r from-muted/30 to-transparent',
                  };
                  return (
                    <div key={a.id} className={`bg-card border border-border border-l-4 ${priorityStyles[a.priority] || priorityStyles.normal} rounded-2xl p-5 shadow-sm hover:shadow-md transition-all`}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-start gap-3">
                          <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${a.priority === 'urgent' ? 'bg-red-500 animate-pulse' : a.priority === 'high' ? 'bg-amber-500' : 'bg-primary'}`} />
                          <div>
                            <p className="text-sm font-bold text-foreground">{a.title}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</span>
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                a.priority === 'urgent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                : a.priority === 'high' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                                : 'bg-muted text-muted-foreground'
                              }`}>{a.priority}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground ml-6 leading-relaxed">{a.content}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboardPage;
