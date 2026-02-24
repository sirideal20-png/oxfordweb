import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  FileText, MessageCircle, Bell, BarChart, Calendar, CreditCard,
  User, ArrowLeft, CheckCircle, Clock, AlertCircle, XCircle,
  Heart, BookOpen, MapPin, Globe, Droplets, Star, Baby, GraduationCap, Mail, Phone,
  Shield, Camera
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

const AdminViewStudentPortalPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [fees, setFees] = useState<any[]>([]);
  const [queries, setQueries] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [updateRequests, setUpdateRequests] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate('/auth');
  }, [user, isAdmin, loading]);

  useEffect(() => {
    if (!userId || !user || !isAdmin) return;
    const fetchAll = async () => {
      setDataLoading(true);
      const [p, apps, recs, att, fp, qs, anns, ur] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', userId).single(),
        supabase.from('applications').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
        supabase.from('academic_records').select('*').eq('user_id', userId).order('academic_year', { ascending: false }),
        supabase.from('attendance').select('*').eq('user_id', userId).order('date', { ascending: false }).limit(50),
        supabase.from('fee_payments').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
        supabase.from('student_queries').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
        supabase.from('announcements').select('*').eq('published', true).order('created_at', { ascending: false }).limit(10),
        supabase.from('profile_update_requests').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      ]);
      setProfile(p.data);
      setApplications(apps.data || []);
      setRecords(recs.data || []);
      setAttendance(att.data || []);
      setFees(fp.data || []);
      setQueries(qs.data || []);
      setAnnouncements(anns.data || []);
      setUpdateRequests(ur.data || []);

      const rawPic = p.data?.profile_picture_url || '';
      if (!rawPic) setProfilePicUrl(null);
      else if (rawPic.startsWith('http')) setProfilePicUrl(rawPic);
      else {
        const { data: pubData } = supabase.storage.from('profile-pictures').getPublicUrl(rawPic);
        setProfilePicUrl(pubData?.publicUrl || null);
      }
      setDataLoading(false);
    };
    fetchAll();
  }, [userId, user, isAdmin]);

  if (loading || dataLoading) return <div className="flex items-center justify-center min-h-screen"><p className="text-muted-foreground">Loading student portal...</p></div>;
  if (!profile) return <div className="flex items-center justify-center min-h-screen"><p className="text-muted-foreground">Student not found.</p></div>;

  const p = profile;
  const gender = p?.gender || '';
  const initials = `${(p?.first_name || '')[0] || ''}${(p?.last_name || '')[0] || ''}`.toUpperCase();

  const attendanceRate = attendance.length > 0
    ? Math.round((attendance.filter((a: any) => a.status === 'present' || a.status === 'late').length / attendance.length) * 100)
    : 0;

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

  return (
    <div className="space-y-0 animate-fadeIn font-sans min-h-screen pb-12">
      {/* Admin banner */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 py-3 px-6 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={16} />
            <span className="text-sm font-semibold">Admin View</span>
            <span className="text-xs text-amber-200">— Viewing as {p.first_name} {p.last_name} (Read-Only)</span>
          </div>
          <Button size="sm" variant="outline" onClick={() => navigate('/admin')} className="h-7 text-xs bg-white/10 border-white/30 text-white hover:bg-white/20">
            <ArrowLeft size={12} className="mr-1" /> Back to Admin
          </Button>
        </div>
      </div>

      {/* Student header - matching student portal */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 py-8 px-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="max-w-7xl mx-auto flex items-center gap-4 relative z-10">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center overflow-hidden shadow-lg">
              {profilePicUrl ? (
                <img src={profilePicUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-bold text-white">{initials}</span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1">
              <GenderSymbol gender={gender} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              {p.first_name} {p.last_name}
            </h1>
            <p className="text-white/70 text-sm mt-0.5">{p.email}</p>
            {p?.last_qualification && <p className="text-white/60 text-xs mt-0.5 flex items-center gap-1"><GraduationCap size={12} /> {p.last_qualification}</p>}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto no-scrollbar">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === t.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'}`}>
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Avatar section */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/20 flex items-center justify-center overflow-hidden shadow-lg">
                {profilePicUrl ? (
                  <img src={profilePicUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-primary">{initials}</span>
                )}
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground flex items-center gap-2 justify-center">
                  {p?.first_name} {p?.last_name} <GenderSymbol gender={gender} />
                </p>
                <p className="text-xs text-muted-foreground">{p?.email}</p>
              </div>
            </div>

            {/* Cushion-styled profile fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {profileFields.map((f, i) => (
                <ProfileField key={i} index={i + 1} icon={f.icon} label={f.label} value={f.value} bgStyle={f.bgStyle} iconColor={f.iconColor} />
              ))}
            </div>

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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200/50 dark:border-blue-800/30 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2"><FileText size={16} className="text-blue-500" /><p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Applications</p></div>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{applications.length}</p>
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
              <div className="flex items-center gap-2 mb-2"><CreditCard size={16} className="text-rose-500" /><p className="text-xs text-rose-600 dark:text-rose-400 font-medium">Fee Records</p></div>
              <p className="text-3xl font-bold text-rose-700 dark:text-rose-300">{fees.length}</p>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-3">
            {applications.length === 0 && <EmptyState icon={FileText} text="No applications" />}
            {applications.map(app => (
              <div key={app.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground">{app.program_name}</h3>
                  <span className="flex items-center gap-1 text-xs capitalize">{statusIcon(app.status)} {app.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">{app.program_type} • Submitted {new Date(app.submitted_at || app.created_at).toLocaleDateString()}</p>
                {app.admin_notes && <p className="text-xs mt-2 bg-muted/50 rounded p-2 text-muted-foreground italic">Admin: {app.admin_notes}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Academics Tab */}
        {activeTab === 'academics' && (
          <div className="space-y-3">
            {records.length === 0 && <EmptyState icon={BarChart} text="No academic records" />}
            {records.length > 0 && (
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold">#</th>
                      <th className="text-left p-3 font-semibold">Course</th>
                      <th className="text-left p-3 font-semibold">Code</th>
                      <th className="text-left p-3 font-semibold">Grade</th>
                      <th className="text-left p-3 font-semibold">Credits</th>
                      <th className="text-left p-3 font-semibold">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r, i) => (
                      <tr key={r.id} className="border-t border-border">
                        <td className="p-3 text-muted-foreground">{i + 1}</td>
                        <td className="p-3 font-medium">{r.course_name}</td>
                        <td className="p-3">{r.course_code || '—'}</td>
                        <td className="p-3 font-semibold">{r.grade || '—'}</td>
                        <td className="p-3">{r.credits}</td>
                        <td className="p-3">{r.academic_year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="space-y-3">
            {attendance.length > 0 && (
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${attendanceRate >= 80 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : attendanceRate >= 60 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                  {attendanceRate}% Attendance Rate
                </span>
              </div>
            )}
            {attendance.length === 0 && <EmptyState icon={Calendar} text="No attendance records" />}
            {attendance.length > 0 && (
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Course</th>
                      <th className="text-left p-3 font-semibold">Date</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map(a => (
                      <tr key={a.id} className="border-t border-border">
                        <td className="p-3">{a.course_name}</td>
                        <td className="p-3">{a.date}</td>
                        <td className="p-3 capitalize flex items-center gap-1">{statusIcon(a.status)} {a.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Fees Tab */}
        {activeTab === 'fees' && (
          <div className="space-y-3">
            {fees.length === 0 && <EmptyState icon={CreditCard} text="No fee records" />}
            {fees.map(f => (
              <div key={f.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{f.description}</p>
                  <p className="text-xs text-muted-foreground">
                    £{Number(f.amount).toFixed(2)} • {f.due_date ? `Due: ${f.due_date}` : 'No due date'}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-xs capitalize">{statusIcon(f.status)} {f.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'queries' && (
          <div className="space-y-3">
            {queries.length === 0 && <EmptyState icon={MessageCircle} text="No support queries" />}
            {queries.map(q => (
              <div key={q.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-foreground">{q.subject}</h3>
                  <span className="flex items-center gap-1 text-xs capitalize">{statusIcon(q.status)} {q.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">{q.message}</p>
                {q.admin_response && (
                  <p className="text-xs mt-2 bg-muted/50 rounded p-2 text-muted-foreground italic">Admin: {q.admin_response}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Notices Tab */}
        {activeTab === 'announcements' && (
          <div className="space-y-3">
            {announcements.length === 0 && <EmptyState icon={Bell} text="No announcements" />}
            {announcements.map(a => (
              <div key={a.id} className={`bg-card border rounded-xl p-4 ${a.priority === 'urgent' ? 'border-destructive/50' : a.priority === 'high' ? 'border-amber-400/50' : 'border-border'}`}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-foreground">{a.title}</h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${a.priority === 'urgent' ? 'bg-destructive/10 text-destructive' : a.priority === 'high' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-muted text-muted-foreground'}`}>
                    {a.priority}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{a.content}</p>
                <p className="text-[10px] text-muted-foreground mt-2">{new Date(a.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyState = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="text-center py-12 bg-muted/30 rounded-xl border border-border/50">
    <Icon size={32} className="mx-auto text-muted-foreground/40 mb-3" />
    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
);

export default AdminViewStudentPortalPage;
