import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Users, FileText, MessageCircle, Bell, BarChart, CreditCard,
  Calendar, LogOut, Plus, Save, Trash2, Shield, Eye, RotateCcw, Archive, Edit3, CheckCircle, XCircle, Clock,
  KeyRound, Ban, ShieldCheck, Headphones
} from 'lucide-react';
import StudentDetailModal from '@/components/admin/StudentDetailModal';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import { Checkbox } from '@/components/ui/checkbox';

const formatOxfordDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-GB', { timeZone: 'Europe/London' });

const formatOxfordDateTime = (dateStr: string) =>
  new Date(dateStr).toLocaleString('en-GB', { timeZone: 'Europe/London' });

const AdminDashboardPage = () => {
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [profiles, setProfiles] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [queries, setQueries] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [fees, setFees] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [detailStudent, setDetailStudent] = useState<any>(null);
  const [checkedStudents, setCheckedStudents] = useState<Set<string>>(new Set());
  const [deletedProfiles, setDeletedProfiles] = useState<any[]>([]);
  const [updateRequests, setUpdateRequests] = useState<any[]>([]);
  const [supportRequests, setSupportRequests] = useState<any[]>([]);
  const [authInfo, setAuthInfo] = useState<Record<string, { last_sign_in_at: string | null; banned: boolean }>>({});
  const [authInfoLoading, setAuthInfoLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // Form states
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annPriority, setAnnPriority] = useState('normal');

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate('/auth');
  }, [user, isAdmin, loading]);

  const fetchAll = async () => {
    setDataLoading(true);
    const [p, a, q, ann, r, att, f, dp, ur, sr] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('applications').select('*').order('created_at', { ascending: false }),
      supabase.from('student_queries').select('*').order('created_at', { ascending: false }),
      supabase.from('announcements').select('*').order('created_at', { ascending: false }),
      supabase.from('academic_records').select('*').order('created_at', { ascending: false }),
      supabase.from('attendance').select('*').order('date', { ascending: false }).limit(200),
      supabase.from('fee_payments').select('*').order('created_at', { ascending: false }),
      supabase.from('deleted_profiles').select('*').order('deleted_at', { ascending: false }),
      supabase.from('profile_update_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('support_requests').select('*').order('created_at', { ascending: false }),
    ]);
    setProfiles(p.data || []);
    setApplications(a.data || []);
    setQueries(q.data || []);
    setAnnouncements(ann.data || []);
    setRecords(r.data || []);
    setAttendance(att.data || []);
    setFees(f.data || []);
    setDeletedProfiles(dp.data || []);
    setUpdateRequests(ur.data || []);
    setSupportRequests(sr.data || []);
    setDataLoading(false);
    // Fetch auth info in background (don't block UI)
    if (p.data && p.data.length > 0) {
      fetchAuthInfo(p.data.map((pr: any) => pr.user_id));
    }
  };

  const fetchAuthInfo = async (userIds: string[]) => {
    if (userIds.length === 0) return;
    setAuthInfoLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-user-management', {
        body: { action: 'get-users-auth-info', userIds },
      });
      if (!error && data?.users) setAuthInfo(data.users);
    } catch { /* ignore */ }
    setAuthInfoLoading(false);
  };

  const handleToggleBan = async (userId: string) => {
    const { data, error } = await supabase.functions.invoke('admin-user-management', {
      body: { action: 'toggle-ban', userId },
    });
    if (error) {
      toast({ title: 'Error', description: String(error), variant: 'destructive' });
    } else {
      const banned = data?.banned;
      toast({ title: banned ? 'Account disabled' : 'Account enabled' });
      setAuthInfo(prev => ({ ...prev, [userId]: { ...prev[userId], banned } }));
    }
  };

  const handleAdminResetPassword = async (userId: string, email: string) => {
    const { data, error } = await supabase.functions.invoke('admin-user-management', {
      body: { action: 'reset-password', userId },
    });
    if (error) {
      toast({ title: 'Error', description: String(error), variant: 'destructive' });
    } else {
      toast({ title: 'Password reset email sent!', description: `Sent to ${email}` });
    }
  };

  useEffect(() => { if (user && isAdmin) fetchAll(); }, [user, isAdmin]);

  const toggleCheck = (userId: string) => {
    setCheckedStudents(prev => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId); else next.add(userId);
      return next;
    });
  };

  const toggleAllChecks = () => {
    if (checkedStudents.size === profiles.length) {
      setCheckedStudents(new Set());
    } else {
      setCheckedStudents(new Set(profiles.map(p => p.user_id)));
    }
  };

  const softDeleteSelected = async () => {
    if (checkedStudents.size === 0) return;
    const toDelete = profiles.filter(p => checkedStudents.has(p.user_id));
    // Insert into recycle bin
    const inserts = toDelete.map(p => ({
      original_user_id: p.user_id,
      email: p.email,
      first_name: p.first_name,
      last_name: p.last_name,
    }));
    await supabase.from('deleted_profiles').insert(inserts);
    // Delete from profiles
    for (const uid of checkedStudents) {
      await supabase.from('profiles').delete().eq('user_id', uid);
    }
    setCheckedStudents(new Set());
    toast({ title: `${toDelete.length} student(s) moved to recycle bin` });
    fetchAll();
  };

  const restoreProfile = async (dp: any) => {
    await supabase.from('profiles').insert({
      user_id: dp.original_user_id,
      email: dp.email,
      first_name: dp.first_name,
      last_name: dp.last_name,
    });
    await supabase.from('deleted_profiles').delete().eq('id', dp.id);
    toast({ title: 'Student restored' });
    fetchAll();
  };

  const permanentDelete = async (id: string) => {
    await supabase.from('deleted_profiles').delete().eq('id', id);
    toast({ title: 'Permanently deleted' });
    fetchAll();
  };

  const updateApplicationStatus = async (id: string, status: string, adminNotes?: string) => {
    const update: any = { status, reviewed_at: new Date().toISOString() };
    if (adminNotes !== undefined) update.admin_notes = adminNotes;
    await supabase.from('applications').update(update).eq('id', id);
    toast({ title: `Application ${status}` });
    fetchAll();
  };

  const respondToQuery = async (id: string, response: string, status: string) => {
    await supabase.from('student_queries').update({ admin_response: response, status }).eq('id', id);
    toast({ title: 'Response sent' });
    fetchAll();
  };

  const createAnnouncement = async () => {
    if (!annTitle.trim() || !annContent.trim()) return;
    await supabase.from('announcements').insert({ title: annTitle, content: annContent, published: true });
    setAnnTitle(''); setAnnContent(''); setAnnPriority('normal');
    toast({ title: 'Announcement published' });
    fetchAll();
  };

  const deleteAnnouncement = async (id: string) => {
    await supabase.from('announcements').delete().eq('id', id);
    toast({ title: 'Announcement deleted' });
    fetchAll();
  };

  // Add academic record
  const [newCourse, setNewCourse] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [newCredits, setNewCredits] = useState('');
  const [newYear, setNewYear] = useState('');

  const addRecord = async () => {
    if (!selectedStudent || !newCourse.trim()) return;
    await supabase.from('academic_records').insert({ user_id: selectedStudent, course_name: newCourse, course_code: newCode, grade: newGrade, credits: Number(newCredits) || 0, academic_year: newYear });
    setNewCourse(''); setNewCode(''); setNewGrade(''); setNewCredits(''); setNewYear('');
    toast({ title: 'Record added' });
    fetchAll();
  };

  // Add fee
  const [feeDesc, setFeeDesc] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [feeDue, setFeeDue] = useState('');

  const addFee = async () => {
    if (!selectedStudent || !feeDesc.trim()) return;
    await supabase.from('fee_payments').insert({ user_id: selectedStudent, description: feeDesc, amount: Number(feeAmount) || 0, due_date: feeDue || null });
    setFeeDesc(''); setFeeAmount(''); setFeeDue('');
    toast({ title: 'Fee record added' });
    fetchAll();
  };

  // Add attendance
  const [attCourse, setAttCourse] = useState('');
  const [attDate, setAttDate] = useState('');
  const [attStatus, setAttStatus] = useState('present');

  const addAttendance = async () => {
    if (!selectedStudent || !attCourse.trim() || !attDate) return;
    await supabase.from('attendance').insert({ user_id: selectedStudent, course_name: attCourse, date: attDate, status: attStatus });
    setAttCourse(''); setAttDate(''); setAttStatus('present');
    toast({ title: 'Attendance recorded' });
    fetchAll();
  };

  if (loading || dataLoading) return <div className="flex items-center justify-center min-h-screen"><p className="text-muted-foreground">Loading admin dashboard...</p></div>;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'academics', label: 'Academics', icon: BarChart },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'fees', label: 'Fees', icon: CreditCard },
    { id: 'queries', label: 'Queries', icon: MessageCircle },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'update_requests', label: `Updates (${updateRequests.filter(r => r.status === 'pending').length})`, icon: Edit3 },
    { id: 'support_requests', label: `Support (${supportRequests.filter(r => r.status === 'open').length})`, icon: Headphones },
    { id: 'recycle_bin', label: `Recycle Bin (${deletedProfiles.length})`, icon: Archive },
  ];

  const getStudentName = (userId: string) => {
    const p = profiles.find(pr => pr.user_id === userId);
    return p ? `${p.first_name} ${p.last_name}` : userId.slice(0, 8);
  };

  return (
    <div className="space-y-0 animate-fadeIn font-sans min-h-screen pb-12">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-8 px-6 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={28} className="text-amber-400" />
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-slate-300 text-sm">{profiles.length} students • {applications.length} applications</p>
            </div>
          </div>
          <Button size="sm" onClick={() => { signOut(); navigate('/'); }} className="bg-white/10 border border-white/30 text-white hover:bg-white/20">
            <LogOut size={14} className="mr-1" /> Sign Out
          </Button>
        </div>
      </div>

      <div className="border-b border-border bg-card">
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
        {/* Overview Analytics */}
        {activeTab === 'overview' && (
          <AdminAnalytics profiles={profiles} applications={applications} fees={fees} attendance={attendance} queries={queries} records={records} />
        )}

        {/* Student selector */}
        {['academics', 'attendance', 'fees'].includes(activeTab) && (
          <div className="mb-4">
            <label className="text-xs font-medium text-foreground block mb-1">Select Student</label>
            <select value={selectedStudent || ''} onChange={e => setSelectedStudent(e.target.value || null)} className="border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground w-full max-w-sm">
              <option value="">-- Choose a student --</option>
              {profiles.map(p => <option key={p.user_id} value={p.user_id}>{p.first_name} {p.last_name} ({p.email})</option>)}
            </select>
          </div>
        )}

        {/* Students */}
        {activeTab === 'students' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">All Students ({profiles.length})</h2>
              {checkedStudents.size > 0 && (
                <Button size="sm" variant="destructive" onClick={softDeleteSelected}>
                  <Trash2 size={14} className="mr-1" /> Delete {checkedStudents.size} Selected
                </Button>
              )}
            </div>
            <div className="bg-card border border-border rounded-xl overflow-hidden overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-3 w-8">
                      <Checkbox checked={checkedStudents.size === profiles.length && profiles.length > 0} onCheckedChange={toggleAllChecks} />
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">Sr.No.</th>
                    <th className="text-left p-3 font-semibold text-foreground">Name</th>
                    <th className="text-left p-3 font-semibold text-foreground">Email</th>
                    <th className="text-left p-3 font-semibold text-foreground">Contact</th>
                    <th className="text-left p-3 font-semibold text-foreground">Last Sign-In</th>
                    <th className="text-left p-3 font-semibold text-foreground">Status</th>
                    <th className="text-left p-3 font-semibold text-foreground">Signup Date</th>
                    <th className="text-left p-3 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map((p, index) => {
                    const info = authInfo[p.user_id];
                    const isBanned = info?.banned || false;
                    const lastSignIn = info?.last_sign_in_at ? formatOxfordDateTime(info.last_sign_in_at) : '—';
                    return (
                      <tr key={p.id} className={`border-t border-border hover:bg-muted/30 ${checkedStudents.has(p.user_id) ? 'bg-destructive/5' : ''} ${isBanned ? 'opacity-60' : ''}`}>
                        <td className="p-3" onClick={e => e.stopPropagation()}>
                          <Checkbox checked={checkedStudents.has(p.user_id)} onCheckedChange={() => toggleCheck(p.user_id)} />
                        </td>
                        <td className="p-3 font-medium text-foreground cursor-pointer" onClick={() => setDetailStudent(p)}>{index + 1}</td>
                        <td className="p-3 font-medium text-primary underline cursor-pointer" onClick={() => setDetailStudent(p)}>{p.first_name} {p.last_name}</td>
                        <td className="p-3 text-muted-foreground cursor-pointer" onClick={() => setDetailStudent(p)}>{p.email}</td>
                        <td className="p-3 text-muted-foreground">{p.phone || '—'}</td>
                        <td className="p-3 text-muted-foreground text-[10px]">{lastSignIn}</td>
                        <td className="p-3">
                          {isBanned ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-destructive/10 text-destructive"><Ban size={10} /> Disabled</span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"><ShieldCheck size={10} /> Active</span>
                          )}
                        </td>
                        <td className="p-3 text-muted-foreground">{formatOxfordDate(p.created_at)}</td>
                        <td className="p-3" onClick={e => e.stopPropagation()}>
                          <div className="flex gap-1">
                            <button title="Reset Password" onClick={() => handleAdminResetPassword(p.user_id, p.email)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors">
                              <KeyRound size={13} />
                            </button>
                            <button title={isBanned ? 'Enable Account' : 'Disable Account'} onClick={() => handleToggleBan(p.user_id)} className={`p-1.5 rounded-md hover:bg-muted transition-colors ${isBanned ? 'text-emerald-600 hover:text-emerald-700' : 'text-destructive hover:text-destructive'}`}>
                              {isBanned ? <ShieldCheck size={13} /> : <Ban size={13} />}
                            </button>
                            <button title="View Portal" onClick={() => { window.open(`/admin/view-student/${p.user_id}`, '_blank'); }} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors">
                              <Eye size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <StudentDetailModal student={detailStudent} open={!!detailStudent} onClose={() => setDetailStudent(null)} onRefresh={fetchAll} />

        {/* Applications */}
        {activeTab === 'applications' && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Applications ({applications.length})</h2>
            {applications.map(app => (
              <AppCard key={app.id} app={app} getStudentName={getStudentName} onUpdate={updateApplicationStatus} />
            ))}
          </div>
        )}

        {/* Academics */}
        {activeTab === 'academics' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Academic Records</h2>
            {selectedStudent && (
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2"><Plus size={14} /> Add Record for {getStudentName(selectedStudent)}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  <Input placeholder="Course Name" value={newCourse} onChange={e => setNewCourse(e.target.value)} className="text-sm" />
                  <Input placeholder="Code" value={newCode} onChange={e => setNewCode(e.target.value)} className="text-sm" />
                  <Input placeholder="Grade" value={newGrade} onChange={e => setNewGrade(e.target.value)} className="text-sm" />
                  <Input placeholder="Credits" value={newCredits} onChange={e => setNewCredits(e.target.value)} className="text-sm" />
                  <Input placeholder="Year" value={newYear} onChange={e => setNewYear(e.target.value)} className="text-sm" />
                </div>
                <Button size="sm" onClick={addRecord}><Save size={14} className="mr-1" /> Add</Button>
              </div>
            )}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Student</th>
                    <th className="text-left p-3 font-semibold">Course</th>
                    <th className="text-left p-3 font-semibold">Grade</th>
                    <th className="text-left p-3 font-semibold">Credits</th>
                    <th className="text-left p-3 font-semibold">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {records.filter(r => !selectedStudent || r.user_id === selectedStudent).map(r => (
                    <tr key={r.id} className="border-t border-border">
                      <td className="p-3 text-foreground">{getStudentName(r.user_id)}</td>
                      <td className="p-3">{r.course_name}</td>
                      <td className="p-3 font-semibold">{r.grade || '—'}</td>
                      <td className="p-3">{r.credits}</td>
                      <td className="p-3">{r.academic_year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Attendance */}
        {activeTab === 'attendance' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Attendance</h2>
            {selectedStudent && (
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2"><Plus size={14} /> Record Attendance</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Input placeholder="Course" value={attCourse} onChange={e => setAttCourse(e.target.value)} className="text-sm" />
                  <Input type="date" value={attDate} onChange={e => setAttDate(e.target.value)} className="text-sm" />
                  <select value={attStatus} onChange={e => setAttStatus(e.target.value)} className="border border-input rounded-md px-3 py-2 text-sm bg-background">
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                    <option value="excused">Excused</option>
                  </select>
                  <Button size="sm" onClick={addAttendance}><Save size={14} className="mr-1" /> Save</Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Fees */}
        {activeTab === 'fees' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Fee Payments</h2>
            {selectedStudent && (
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2"><Plus size={14} /> Add Fee</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Input placeholder="Description" value={feeDesc} onChange={e => setFeeDesc(e.target.value)} className="text-sm" />
                  <Input placeholder="Amount" type="number" value={feeAmount} onChange={e => setFeeAmount(e.target.value)} className="text-sm" />
                  <Input type="date" placeholder="Due Date" value={feeDue} onChange={e => setFeeDue(e.target.value)} className="text-sm" />
                  <Button size="sm" onClick={addFee}><Save size={14} className="mr-1" /> Add</Button>
                </div>
              </div>
            )}
            {fees.filter(f => !selectedStudent || f.user_id === selectedStudent).map(f => (
              <div key={f.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{f.description}</p>
                  <p className="text-[10px] text-muted-foreground">{getStudentName(f.user_id)} • £{Number(f.amount).toFixed(2)} • {f.status}</p>
                </div>
                <div className="flex gap-1">
                  {f.status !== 'paid' && <Button size="sm" variant="outline" onClick={async () => { await supabase.from('fee_payments').update({ status: 'paid' }).eq('id', f.id); fetchAll(); }}>Mark Paid</Button>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Queries */}
        {activeTab === 'queries' && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Student Queries ({queries.filter(q => q.status === 'open').length} open)</h2>
            {queries.map(q => (
              <QueryCard key={q.id} query={q} getStudentName={getStudentName} onRespond={respondToQuery} />
            ))}
          </div>
        )}

        {/* Announcements */}
        {activeTab === 'announcements' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Announcements</h2>
            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2"><Plus size={14} /> Create Announcement</h3>
              <Input placeholder="Title" value={annTitle} onChange={e => setAnnTitle(e.target.value)} className="text-sm" />
              <textarea placeholder="Content" value={annContent} onChange={e => setAnnContent(e.target.value)} rows={3} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground resize-none" />
              <div className="flex items-center gap-2">
                <select value={annPriority} onChange={e => setAnnPriority(e.target.value)} className="border border-input rounded-md px-3 py-2 text-sm bg-background">
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
                <Button size="sm" onClick={createAnnouncement}><Bell size={14} className="mr-1" /> Publish</Button>
              </div>
            </div>
            {announcements.map(a => (
              <div key={a.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.content?.slice(0, 80)}...</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{a.priority} • {formatOxfordDate(a.created_at)}</p>
                </div>
                <Button size="sm" variant="destructive" onClick={() => deleteAnnouncement(a.id)}><Trash2 size={14} /></Button>
              </div>
            ))}
          </div>
        )}

        {/* Update Requests */}
        {activeTab === 'update_requests' && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><Edit3 size={18} /> Profile Update Requests ({updateRequests.filter(r => r.status === 'pending').length} pending)</h2>
            {updateRequests.length === 0 && <p className="text-sm text-muted-foreground">No update requests.</p>}
            {updateRequests.map(req => {
              const changes = req.requested_changes as Record<string, { old: string; new: string }>;
              return (
                <div key={req.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{getStudentName(req.user_id)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {req.status === 'pending' && <span className="flex items-center gap-1 text-xs text-amber-500 font-medium"><Clock size={12} /> Pending</span>}
                      {req.status === 'approved' && <span className="flex items-center gap-1 text-xs text-emerald-500 font-medium"><CheckCircle size={12} /> Approved</span>}
                      {req.status === 'rejected' && <span className="flex items-center gap-1 text-xs text-destructive font-medium"><XCircle size={12} /> Rejected</span>}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-foreground">Profile Update Request</p>
                  <div className="space-y-1">
                    <p className="text-xs">
                      <span className="font-medium text-blue-600 dark:text-blue-400">Submitted by User:</span>{' '}
                      <span className="text-muted-foreground">{formatOxfordDateTime(req.created_at)}</span>
                    </p>
                    {req.reviewed_at && (
                      <p className="text-xs">
                        <span className="font-medium text-foreground">{req.status === 'approved' ? 'Approved by Admin:' : req.status === 'rejected' ? 'Rejected by Admin:' : 'Reviewed by Admin:'}</span>{' '}
                        <span className="text-muted-foreground">{formatOxfordDateTime(req.reviewed_at)}</span>
                      </p>
                    )}
                  </div>
                  {/* Show changes */}
                  <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Requested Changes</p>
                    {Object.entries(changes || {}).map(([field, vals]) => (
                      <div key={field} className="flex flex-col sm:flex-row sm:items-center gap-1 text-xs">
                        <span className="font-medium text-foreground capitalize min-w-[120px]">{field.replace(/_/g, ' ')}:</span>
                        <span className="text-destructive line-through">{vals.old || '(empty)'}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">{vals.new || '(empty)'}</span>
                      </div>
                    ))}
                  </div>
                  {req.status === 'pending' && (
                    <UpdateRequestActions requestId={req.id} userId={req.user_id} changes={changes} onRefresh={fetchAll} />
                  )}
                  {req.admin_notes && <p className="text-[10px] text-primary">Admin Note: {req.admin_notes}</p>}
                </div>
              );
            })}
          </div>
        )}

        {/* Support Requests */}
        {activeTab === 'support_requests' && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><Headphones size={18} /> Support Requests ({supportRequests.filter(r => r.status === 'open').length} open)</h2>
            {supportRequests.length === 0 && <p className="text-sm text-muted-foreground">No support requests yet.</p>}
            <div className="bg-card border border-border rounded-xl overflow-hidden overflow-x-auto">
              {supportRequests.length > 0 && (
                <table className="w-full text-xs">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold text-foreground">Ticket #</th>
                      <th className="text-left p-3 font-semibold text-foreground">Name</th>
                      <th className="text-left p-3 font-semibold text-foreground">Email</th>
                      <th className="text-left p-3 font-semibold text-foreground">Category</th>
                      <th className="text-left p-3 font-semibold text-foreground">Message</th>
                      <th className="text-left p-3 font-semibold text-foreground">Status</th>
                      <th className="text-left p-3 font-semibold text-foreground">Date</th>
                      <th className="text-left p-3 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supportRequests.map(sr => (
                      <tr key={sr.id} className="border-t border-border hover:bg-muted/30">
                        <td className="p-3">
                          <span className="font-mono text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{sr.ticket_number || '—'}</span>
                        </td>
                        <td className="p-3 font-medium text-foreground">{sr.name}</td>
                        <td className="p-3 text-muted-foreground">{sr.email}</td>
                        <td className="p-3"><span className="inline-block px-2 py-0.5 rounded-full bg-muted text-foreground text-[10px] font-semibold capitalize">{sr.category}</span></td>
                        <td className="p-3 text-muted-foreground max-w-[300px] truncate">{sr.message}</td>
                        <td className="p-3">
                          {sr.status === 'open' && <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"><Clock size={10} /> Open</span>}
                          {sr.status === 'in_progress' && <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"><MessageCircle size={10} /> In Progress</span>}
                          {sr.status === 'resolved' && <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"><CheckCircle size={10} /> Resolved</span>}
                        </td>
                        <td className="p-3 text-muted-foreground">{formatOxfordDateTime(sr.created_at)}</td>
                        <td className="p-3">
                          <div className="flex gap-1 flex-wrap">
                            {sr.status === 'open' && (
                              <Button size="sm" variant="outline" className="text-[10px]" onClick={async () => {
                                await supabase.from('support_requests').update({ status: 'in_progress' }).eq('id', sr.id);
                                toast({ title: 'Marked as in progress' }); fetchAll();
                              }}>In Progress</Button>
                            )}
                            {sr.status !== 'resolved' && (
                              <Button size="sm" className="text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white" onClick={async () => {
                                await supabase.from('support_requests').update({ status: 'resolved' }).eq('id', sr.id);
                                toast({ title: 'Marked as resolved' }); fetchAll();
                              }}><CheckCircle size={10} className="mr-1" /> Resolve</Button>
                            )}
                            <Button size="sm" variant="destructive" className="text-[10px]" onClick={async () => {
                              await supabase.from('support_requests').delete().eq('id', sr.id);
                              toast({ title: 'Request deleted' }); fetchAll();
                            }}><Trash2 size={10} /></Button>
                          </div>
                          {/* Admin Notes Input */}
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="Add response / notes…"
                              defaultValue={sr.admin_notes || ''}
                              onKeyDown={async (e) => {
                                if (e.key === 'Enter') {
                                  const val = (e.target as HTMLInputElement).value.trim();
                                  await supabase.from('support_requests').update({ admin_notes: val }).eq('id', sr.id);
                                  toast({ title: 'Admin notes saved' }); fetchAll();
                                }
                              }}
                              className="w-full mt-1 px-2 py-1 text-[10px] bg-muted border border-border rounded text-foreground placeholder:text-muted-foreground"
                            />
                            <p className="text-[9px] text-muted-foreground mt-0.5">Press Enter to save</p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Recycle Bin */}
        {activeTab === 'recycle_bin' && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><Archive size={18} /> Recycle Bin ({deletedProfiles.length})</h2>
            {deletedProfiles.length === 0 && <p className="text-sm text-muted-foreground">No deleted records.</p>}
            <div className="bg-card border border-border rounded-xl overflow-hidden overflow-x-auto">
              {deletedProfiles.length > 0 && (
                <table className="w-full text-xs">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold text-foreground">Name</th>
                      <th className="text-left p-3 font-semibold text-foreground">Email</th>
                      <th className="text-left p-3 font-semibold text-foreground">Passport</th>
                      <th className="text-left p-3 font-semibold text-foreground">Deleted At</th>
                      <th className="text-left p-3 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deletedProfiles.map(dp => (
                      <tr key={dp.id} className="border-t border-border">
                        <td className="p-3 font-medium text-foreground">{dp.first_name} {dp.last_name}</td>
                        <td className="p-3 text-muted-foreground">{dp.email}</td>
                        <td className="p-3 text-muted-foreground">{dp.passport_number || '—'}</td>
                        <td className="p-3 text-muted-foreground">{formatOxfordDate(dp.deleted_at)}</td>
                        <td className="p-3 flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => restoreProfile(dp)}><RotateCcw size={12} className="mr-1" /> Restore</Button>
                          <Button size="sm" variant="destructive" onClick={() => permanentDelete(dp.id)}><Trash2 size={12} /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Sub-components
const AppCard = ({ app, getStudentName, onUpdate }: { app: any; getStudentName: (id: string) => string; onUpdate: (id: string, status: string, notes?: string) => void }) => {
  const [notes, setNotes] = useState(app.admin_notes || '');
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">{app.program_name}</p>
          <p className="text-[10px] text-muted-foreground">{getStudentName(app.user_id)} • {app.program_type} • {formatOxfordDate(app.submitted_at)}</p>
        </div>
        <span className="text-xs font-medium capitalize px-2 py-1 rounded-full bg-muted text-foreground">{app.status.replace('_', ' ')}</span>
      </div>
      {app.personal_statement && <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">{app.personal_statement}</p>}
      <div className="flex items-center gap-2">
        <Input placeholder="Admin notes..." value={notes} onChange={e => setNotes(e.target.value)} className="text-xs flex-1" />
      </div>
      <div className="flex gap-1 flex-wrap">
        <Button size="sm" variant="outline" onClick={() => onUpdate(app.id, 'under_review', notes)}>Review</Button>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => onUpdate(app.id, 'approved', notes)}>Approve</Button>
        <Button size="sm" variant="destructive" onClick={() => onUpdate(app.id, 'rejected', notes)}>Reject</Button>
        <Button size="sm" variant="outline" onClick={() => onUpdate(app.id, 'waitlisted', notes)}>Waitlist</Button>
      </div>
    </div>
  );
};

const QueryCard = ({ query, getStudentName, onRespond }: { query: any; getStudentName: (id: string) => string; onRespond: (id: string, response: string, status: string) => void }) => {
  const [response, setResponse] = useState(query.admin_response || '');
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">{query.subject}</p>
          <p className="text-[10px] text-muted-foreground">{getStudentName(query.user_id)} • {query.status} • {formatOxfordDateTime(query.created_at)}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{query.message}</p>
      <textarea value={response} onChange={e => setResponse(e.target.value)} placeholder="Type response..." rows={2} className="w-full border border-input rounded-md px-3 py-2 text-xs bg-background text-foreground resize-none" />
      <div className="flex gap-1">
        <Button size="sm" variant="outline" onClick={() => onRespond(query.id, response, 'in_progress')}>In Progress</Button>
        <Button size="sm" onClick={() => onRespond(query.id, response, 'resolved')}>Resolve</Button>
        <Button size="sm" variant="destructive" onClick={() => onRespond(query.id, response, 'closed')}>Close</Button>
      </div>
    </div>
  );
};

const UpdateRequestActions = ({ requestId, userId, changes, onRefresh }: { requestId: string; userId: string; changes: Record<string, { old: string; new: string }>; onRefresh: () => void }) => {
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleApprove = async () => {
    // Apply changes to profile
    const updateData: Record<string, string> = {};
    Object.entries(changes || {}).forEach(([field, vals]) => {
      updateData[field] = vals.new;
    });
    await supabase.from('profiles').update(updateData).eq('user_id', userId);
    await supabase.from('profile_update_requests').update({ status: 'approved', admin_notes: notes, reviewed_at: new Date().toISOString() }).eq('id', requestId);
    toast({ title: 'Update approved and applied' });
    onRefresh();
  };

  const handleReject = async () => {
    await supabase.from('profile_update_requests').update({ status: 'rejected', admin_notes: notes, reviewed_at: new Date().toISOString() }).eq('id', requestId);
    toast({ title: 'Update request rejected' });
    onRefresh();
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <Input placeholder="Admin notes (optional)..." value={notes} onChange={e => setNotes(e.target.value)} className="text-xs flex-1" />
      <div className="flex gap-1">
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleApprove}>
          <CheckCircle size={12} className="mr-1" /> Approve
        </Button>
        <Button size="sm" variant="destructive" onClick={handleReject}>
          <XCircle size={12} className="mr-1" /> Reject
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
