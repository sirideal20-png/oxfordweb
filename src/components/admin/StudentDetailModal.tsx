import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  User, FileText, BarChart, Calendar, CreditCard, MessageCircle,
  Save, Plus, CheckCircle, Clock, XCircle, AlertCircle, Eye, KeyRound, Ban, ShieldCheck, Edit3
} from 'lucide-react';

const formatOxfordDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-GB', { timeZone: 'Europe/London' });

const formatOxfordDateTime = (dateStr: string) =>
  new Date(dateStr).toLocaleString('en-GB', { timeZone: 'Europe/London' });

const statusIcon = (status: string) => {
  switch (status) {
    case 'approved': case 'paid': case 'resolved': case 'present': return <CheckCircle size={12} className="text-emerald-500" />;
    case 'pending': case 'open': case 'under_review': case 'in_progress': return <Clock size={12} className="text-amber-500" />;
    case 'rejected': case 'overdue': case 'absent': case 'closed': return <XCircle size={12} className="text-destructive" />;
    default: return <AlertCircle size={12} className="text-muted-foreground" />;
  }
};

interface StudentDetailModalProps {
  student: any;
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const StudentDetailModal = ({ student, open, onClose, onRefresh }: StudentDetailModalProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [fees, setFees] = useState<any[]>([]);
  const [queries, setQueries] = useState<any[]>([]);
  const [updateRequests, setUpdateRequests] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [togglingBan, setTogglingBan] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  // Form states
  const [newCourse, setNewCourse] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [newCredits, setNewCredits] = useState('');
  const [newYear, setNewYear] = useState('');
  const [attCourse, setAttCourse] = useState('');
  const [attDate, setAttDate] = useState('');
  const [attStatus, setAttStatus] = useState('present');
  const [feeDesc, setFeeDesc] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [feeDue, setFeeDue] = useState('');

  const fetchStudentData = async (force = false) => {
    if (!student?.user_id || (loaded && !force)) return;
    const [apps, recs, att, fp, qs, ur] = await Promise.all([
      supabase.from('applications').select('*').eq('user_id', student.user_id).order('created_at', { ascending: false }),
      supabase.from('academic_records').select('*').eq('user_id', student.user_id).order('created_at', { ascending: false }),
      supabase.from('attendance').select('*').eq('user_id', student.user_id).order('date', { ascending: false }).limit(100),
      supabase.from('fee_payments').select('*').eq('user_id', student.user_id).order('created_at', { ascending: false }),
      supabase.from('student_queries').select('*').eq('user_id', student.user_id).order('created_at', { ascending: false }),
      supabase.from('profile_update_requests').select('*').eq('user_id', student.user_id).order('created_at', { ascending: false }),
    ]);
    setApplications(apps.data || []);
    setRecords(recs.data || []);
    setAttendance(att.data || []);
    setFees(fp.data || []);
    setQueries(qs.data || []);
    setUpdateRequests(ur.data || []);
    setLoaded(true);
  };

  // Fetch data when modal opens
  // Resolve profile picture URL
  useEffect(() => {
    const rawUrl = student?.profile_picture_url || '';
    if (!rawUrl) { setProfilePicUrl(null); return; }
    if (rawUrl.startsWith('http')) { setProfilePicUrl(rawUrl); return; }
    const { data } = supabase.storage.from('profile-pictures').getPublicUrl(rawUrl);
    setProfilePicUrl(data?.publicUrl || null);
  }, [student?.profile_picture_url]);

  useEffect(() => {
    if (open && student?.user_id) {
      setLoaded(false);
      fetchStudentData(true);
      supabase.functions.invoke('admin-user-management', {
        body: { action: 'get-users-auth-info', userIds: [student?.user_id] },
      }).then(({ data }) => {
        if (data?.users?.[student?.user_id]) {
          setIsBanned(data.users[student.user_id].banned);
        }
      });
    }
  }, [open, student?.user_id]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  const updateAppStatus = async (id: string, status: string, adminNotes?: string) => {
    const update: any = { status, reviewed_at: new Date().toISOString() };
    if (adminNotes !== undefined) update.admin_notes = adminNotes;
    await supabase.from('applications').update(update).eq('id', id);
    toast({ title: `Application ${status}` });
    setLoaded(false);
    fetchStudentData();
    onRefresh();
  };

  const addRecord = async () => {
    if (!newCourse.trim()) return;
    await supabase.from('academic_records').insert({ user_id: student.user_id, course_name: newCourse, course_code: newCode, grade: newGrade, credits: Number(newCredits) || 0, academic_year: newYear });
    setNewCourse(''); setNewCode(''); setNewGrade(''); setNewCredits(''); setNewYear('');
    toast({ title: 'Record added' });
    setLoaded(false);
    fetchStudentData();
    onRefresh();
  };

  const addAttendance = async () => {
    if (!attCourse.trim() || !attDate) return;
    await supabase.from('attendance').insert({ user_id: student.user_id, course_name: attCourse, date: attDate, status: attStatus });
    setAttCourse(''); setAttDate(''); setAttStatus('present');
    toast({ title: 'Attendance recorded' });
    setLoaded(false);
    fetchStudentData();
    onRefresh();
  };

  const addFee = async () => {
    if (!feeDesc.trim()) return;
    await supabase.from('fee_payments').insert({ user_id: student.user_id, description: feeDesc, amount: Number(feeAmount) || 0, due_date: feeDue || null });
    setFeeDesc(''); setFeeAmount(''); setFeeDue('');
    toast({ title: 'Fee record added' });
    setLoaded(false);
    fetchStudentData();
    onRefresh();
  };

  const respondToQuery = async (id: string, response: string, status: string) => {
    await supabase.from('student_queries').update({ admin_response: response, status }).eq('id', id);
    toast({ title: 'Response sent' });
    setLoaded(false);
    fetchStudentData();
    onRefresh();
  };

  const handleResetPassword = async () => {
    if (!student?.user_id) return;
    setResettingPassword(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-user-management', {
        body: { action: 'reset-password', userId: student.user_id },
      });
      if (error) {
        toast({ title: 'Failed to send reset', description: String(error), variant: 'destructive' });
      } else {
        toast({ title: 'Password reset email sent!', description: `Sent to ${student.email}` });
      }
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
    setResettingPassword(false);
  };

  const handleToggleBan = async () => {
    if (!student?.user_id) return;
    setTogglingBan(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-user-management', {
        body: { action: 'toggle-ban', userId: student.user_id },
      });
      if (error) {
        toast({ title: 'Error', description: String(error), variant: 'destructive' });
      } else {
        setIsBanned(data.banned);
        toast({ title: data.banned ? 'Account disabled' : 'Account enabled' });
        onRefresh();
      }
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
    setTogglingBan(false);
  };

  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User size={20} />
            {student.first_name} {student.last_name}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={() => { onClose(); navigate(`/admin/view-student/${student.user_id}`); }}>
              <Eye size={12} /> View Portal
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={handleResetPassword} disabled={resettingPassword}>
              <KeyRound size={12} /> {resettingPassword ? 'Sending...' : 'Reset Password'}
            </Button>
            <Button size="sm" variant={isBanned ? 'default' : 'destructive'} className="text-xs h-7 gap-1" onClick={handleToggleBan} disabled={togglingBan}>
              {isBanned ? <><ShieldCheck size={12} /> {togglingBan ? '...' : 'Enable Account'}</> : <><Ban size={12} /> {togglingBan ? '...' : 'Disable Account'}</>}
            </Button>
          </div>
        </DialogHeader>

        {/* Student Info Card */}
        {/* Profile Picture + Gender */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
            {profilePicUrl ? (
              <img src={profilePicUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-primary">{(student.first_name?.[0] || '')}{(student.last_name?.[0] || '')}</span>
            )}
          </div>
          <div>
            <p className="font-bold text-foreground flex items-center gap-2">
              {student.first_name} {student.last_name}
              {student.gender === 'male' && <span className="text-blue-500 text-lg">♂</span>}
              {student.gender === 'female' && <span className="text-pink-500 text-lg">♀</span>}
            </p>
            <p className="text-xs text-muted-foreground">{student.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-muted/50 rounded-lg p-4 text-sm">
          <div><span className="text-muted-foreground text-xs block">Father's Name</span><span className="font-medium text-foreground">{student.father_name || '—'}</span></div>
          <div><span className="text-muted-foreground text-xs block">Mother's Name</span><span className="font-medium text-foreground">{student.mother_name || '—'}</span></div>
          <div><span className="text-muted-foreground text-xs block">Phone</span><span className="font-medium text-foreground">{student.phone || '—'}</span></div>
          <div><span className="text-muted-foreground text-xs block">Gender</span><span className="font-medium text-foreground capitalize">{student.gender || '—'}</span></div>
          <div><span className="text-muted-foreground text-xs block">Marital Status</span><span className="font-medium text-foreground capitalize">{student.marital_status || '—'}</span></div>
          {student.marital_status === 'married' && <div><span className="text-muted-foreground text-xs block">Children</span><span className="font-medium text-foreground">{student.children || '—'}</span></div>}
          <div><span className="text-muted-foreground text-xs block">Last Qualification</span><span className="font-medium text-foreground">{student.last_qualification || '—'}</span></div>
          <div><span className="text-muted-foreground text-xs block">Date of Birth</span><span className="font-medium text-foreground">{student.date_of_birth || '—'}</span></div>
          <div><span className="text-muted-foreground text-xs block">Passport No.</span><span className="font-medium text-foreground">{student.passport_number || '—'}</span></div>
          <div><span className="text-muted-foreground text-xs block">Nationality</span><span className="font-medium text-foreground">{student.nationality || '—'}</span></div>
          <div><span className="text-muted-foreground text-xs block">Country</span><span className="font-medium text-foreground">{student.country || '—'}</span></div>
          <div><span className="text-muted-foreground text-xs block">Address</span><span className="font-medium text-foreground">{student.address || '—'}</span></div>
          <div><span className="text-muted-foreground text-xs block">Postal Code</span><span className="font-medium text-foreground">{student.postal_code || '—'}</span></div>
          <div><span className="text-muted-foreground text-xs block">Blood Group</span><span className="font-medium text-foreground">{student.blood_group || '—'}</span></div>
          <div><span className="text-muted-foreground text-xs block">Religion</span><span className="font-medium text-foreground">{student.religion || '—'}</span></div>
          <div><span className="text-muted-foreground text-xs block">Joined</span><span className="font-medium text-foreground">{formatOxfordDate(student.created_at)}</span></div>
        </div>

        <Tabs defaultValue="updates" className="mt-2">
          <TabsList className="w-full flex flex-wrap h-auto gap-1">
            <TabsTrigger value="updates" className="text-xs gap-1"><Edit3 size={12} /> Updates ({updateRequests.length})</TabsTrigger>
            <TabsTrigger value="applications" className="text-xs gap-1"><FileText size={12} /> Applications ({applications.length})</TabsTrigger>
            <TabsTrigger value="academics" className="text-xs gap-1"><BarChart size={12} /> Academics ({records.length})</TabsTrigger>
            <TabsTrigger value="attendance" className="text-xs gap-1"><Calendar size={12} /> Attendance ({attendance.length})</TabsTrigger>
            <TabsTrigger value="fees" className="text-xs gap-1"><CreditCard size={12} /> Fees ({fees.length})</TabsTrigger>
            <TabsTrigger value="queries" className="text-xs gap-1"><MessageCircle size={12} /> Queries ({queries.length})</TabsTrigger>
          </TabsList>

          {/* Profile Updates Tab */}
          <TabsContent value="updates" className="space-y-3 mt-3">
            {updateRequests.length === 0 && <p className="text-sm text-muted-foreground">No profile update requests.</p>}
            {[...updateRequests]
              .sort((a, b) => new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime())
              .map(r => {
                const changes = r.requested_changes as Record<string, { old: string; new: string }>;
                return (
                  <div key={r.id} className="bg-card border border-border rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-1 text-xs font-semibold capitalize">
                        {statusIcon(r.status)} {r.status}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {formatOxfordDateTime(r.updated_at || r.created_at)}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-foreground mb-1.5">Profile Update Request</p>
                    <div className="space-y-1">
                      <p className="text-xs">
                        <span className="font-medium text-blue-600 dark:text-blue-400">Submitted by User:</span>{' '}
                        <span className="text-muted-foreground">{formatOxfordDateTime(r.created_at)}</span>
                      </p>
                      {r.reviewed_at && (
                        <p className="text-xs">
                          <span className="font-medium text-foreground">{r.status === 'approved' ? 'Approved by Admin:' : r.status === 'rejected' ? 'Rejected by Admin:' : 'Reviewed by Admin:'}</span>{' '}
                          <span className="text-muted-foreground">{formatOxfordDateTime(r.reviewed_at)}</span>
                        </p>
                      )}
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2 mt-2 space-y-1">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Fields Changed</p>
                      {Object.entries(changes || {}).map(([field, vals]) => (
                        <div key={field} className="flex flex-col sm:flex-row sm:items-center gap-1 text-xs">
                          <span className="font-medium text-foreground capitalize min-w-[120px]">{field.replace(/_/g, ' ')}:</span>
                          <span className="text-destructive line-through">{vals.old || '(empty)'}</span>
                          <span className="text-muted-foreground">→</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{vals.new || '(empty)'}</span>
                        </div>
                      ))}
                    </div>
                    {r.admin_notes && <p className="text-[10px] text-primary mt-1">Admin Note: {r.admin_notes}</p>}
                  </div>
                );
              })}
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-3 mt-3">
            {applications.length === 0 && <p className="text-sm text-muted-foreground">No applications yet.</p>}
            {applications.map(app => (
              <AppCardInline key={app.id} app={app} onUpdate={updateAppStatus} />
            ))}
          </TabsContent>

          {/* Academics Tab */}
          <TabsContent value="academics" className="space-y-3 mt-3">
            <div className="bg-card border border-border rounded-lg p-3 space-y-2">
              <h4 className="text-xs font-semibold flex items-center gap-1"><Plus size={12} /> Add Record</h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <Input placeholder="Course Name" value={newCourse} onChange={e => setNewCourse(e.target.value)} className="text-xs h-8" />
                <Input placeholder="Code" value={newCode} onChange={e => setNewCode(e.target.value)} className="text-xs h-8" />
                <Input placeholder="Grade" value={newGrade} onChange={e => setNewGrade(e.target.value)} className="text-xs h-8" />
                <Input placeholder="Credits" value={newCredits} onChange={e => setNewCredits(e.target.value)} className="text-xs h-8" />
                <Input placeholder="Year" value={newYear} onChange={e => setNewYear(e.target.value)} className="text-xs h-8" />
              </div>
              <Button size="sm" onClick={addRecord} className="h-7 text-xs"><Save size={12} className="mr-1" /> Add</Button>
            </div>
            {records.length === 0 && <p className="text-sm text-muted-foreground">No records yet.</p>}
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-2 font-semibold">Course</th>
                    <th className="text-left p-2 font-semibold">Code</th>
                    <th className="text-left p-2 font-semibold">Grade</th>
                    <th className="text-left p-2 font-semibold">Credits</th>
                    <th className="text-left p-2 font-semibold">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map(r => (
                    <tr key={r.id} className="border-t border-border">
                      <td className="p-2">{r.course_name}</td>
                      <td className="p-2">{r.course_code || '—'}</td>
                      <td className="p-2 font-semibold">{r.grade || '—'}</td>
                      <td className="p-2">{r.credits}</td>
                      <td className="p-2">{r.academic_year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-3 mt-3">
            <div className="bg-card border border-border rounded-lg p-3 space-y-2">
              <h4 className="text-xs font-semibold flex items-center gap-1"><Plus size={12} /> Record Attendance</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Input placeholder="Course" value={attCourse} onChange={e => setAttCourse(e.target.value)} className="text-xs h-8" />
                <Input type="date" value={attDate} onChange={e => setAttDate(e.target.value)} className="text-xs h-8" />
                <select value={attStatus} onChange={e => setAttStatus(e.target.value)} className="border border-input rounded-md px-2 py-1 text-xs bg-background">
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                  <option value="excused">Excused</option>
                </select>
                <Button size="sm" onClick={addAttendance} className="h-7 text-xs"><Save size={12} className="mr-1" /> Save</Button>
              </div>
            </div>
            {attendance.length === 0 && <p className="text-sm text-muted-foreground">No attendance records.</p>}
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-2 font-semibold">Course</th>
                    <th className="text-left p-2 font-semibold">Date</th>
                    <th className="text-left p-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map(a => (
                    <tr key={a.id} className="border-t border-border">
                      <td className="p-2">{a.course_name}</td>
                      <td className="p-2">{a.date}</td>
                      <td className="p-2 capitalize flex items-center gap-1">{statusIcon(a.status)} {a.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Fees Tab */}
          <TabsContent value="fees" className="space-y-3 mt-3">
            <div className="bg-card border border-border rounded-lg p-3 space-y-2">
              <h4 className="text-xs font-semibold flex items-center gap-1"><Plus size={12} /> Add Fee</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Input placeholder="Description" value={feeDesc} onChange={e => setFeeDesc(e.target.value)} className="text-xs h-8" />
                <Input placeholder="Amount" type="number" value={feeAmount} onChange={e => setFeeAmount(e.target.value)} className="text-xs h-8" />
                <Input type="date" placeholder="Due Date" value={feeDue} onChange={e => setFeeDue(e.target.value)} className="text-xs h-8" />
                <Button size="sm" onClick={addFee} className="h-7 text-xs"><Save size={12} className="mr-1" /> Add</Button>
              </div>
            </div>
            {fees.length === 0 && <p className="text-sm text-muted-foreground">No fee records.</p>}
            {fees.map(f => (
              <div key={f.id} className="bg-card border border-border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-foreground">{f.description}</p>
                  <p className="text-[10px] text-muted-foreground">£{Number(f.amount).toFixed(2)} • {f.status} {f.due_date ? `• Due: ${f.due_date}` : ''}</p>
                </div>
                {f.status !== 'paid' && (
                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={async () => {
                    await supabase.from('fee_payments').update({ status: 'paid' }).eq('id', f.id);
                    setLoaded(false); fetchStudentData(); onRefresh();
                  }}>Mark Paid</Button>
                )}
              </div>
            ))}
          </TabsContent>

          {/* Queries Tab */}
          <TabsContent value="queries" className="space-y-3 mt-3">
            {queries.length === 0 && <p className="text-sm text-muted-foreground">No queries.</p>}
            {queries.map(q => (
              <QueryCardInline key={q.id} query={q} onRespond={respondToQuery} />
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

// Inline application card
const AppCardInline = ({ app, onUpdate }: { app: any; onUpdate: (id: string, status: string, notes?: string) => void }) => {
  const [notes, setNotes] = useState(app.admin_notes || '');
  return (
    <div className="bg-card border border-border rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between mb-1">
        <span className="flex items-center gap-1 text-xs font-semibold capitalize">
          {statusIcon(app.status)} {app.status.replace('_', ' ')}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {formatOxfordDateTime(app.updated_at || app.created_at)}
        </span>
      </div>
      <p className="text-xs font-bold text-foreground">Application: {app.program_name}</p>
      <div className="space-y-1">
        <p className="text-xs">
          <span className="font-medium text-blue-600 dark:text-blue-400">Submitted by User:</span>{' '}
          <span className="text-muted-foreground">{formatOxfordDateTime(app.created_at)}</span>
        </p>
        <p className="text-[10px] text-muted-foreground">Program Type: {app.program_type}</p>
        {app.reviewed_at && (
          <p className="text-xs">
            <span className="font-medium text-foreground">{app.status === 'approved' ? 'Approved by Admin:' : app.status === 'rejected' ? 'Rejected by Admin:' : 'Reviewed by Admin:'}</span>{' '}
            <span className="text-muted-foreground">{formatOxfordDateTime(app.reviewed_at)}</span>
          </p>
        )}
      </div>
      {app.personal_statement && <p className="text-[10px] text-muted-foreground bg-muted/50 p-2 rounded">{app.personal_statement}</p>}
      {app.admin_notes && <p className="text-[10px] text-primary">Admin Note: {app.admin_notes}</p>}
      <Input placeholder="Admin notes..." value={notes} onChange={e => setNotes(e.target.value)} className="text-xs h-7" />
      <div className="flex gap-1 flex-wrap">
        <Button size="sm" variant="outline" className="h-6 text-[10px] px-2" onClick={() => onUpdate(app.id, 'under_review', notes)}>Review</Button>
        <Button size="sm" className="h-6 text-[10px] px-2 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => onUpdate(app.id, 'approved', notes)}>Approve</Button>
        <Button size="sm" variant="destructive" className="h-6 text-[10px] px-2" onClick={() => onUpdate(app.id, 'rejected', notes)}>Reject</Button>
        <Button size="sm" variant="outline" className="h-6 text-[10px] px-2" onClick={() => onUpdate(app.id, 'waitlisted', notes)}>Waitlist</Button>
      </div>
    </div>
  );
};

// Inline query card
const QueryCardInline = ({ query, onRespond }: { query: any; onRespond: (id: string, response: string, status: string) => void }) => {
  const [response, setResponse] = useState(query.admin_response || '');
  return (
    <div className="bg-card border border-border rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between mb-1">
        <span className="flex items-center gap-1 text-xs font-semibold capitalize">
          {statusIcon(query.status)} {query.status}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {formatOxfordDateTime(query.updated_at || query.created_at)}
        </span>
      </div>
      <p className="text-xs font-bold text-foreground">Query: {query.subject}</p>
      <div className="space-y-1">
        <p className="text-xs">
          <span className="font-medium text-blue-600 dark:text-blue-400">Submitted by User:</span>{' '}
          <span className="text-muted-foreground">{formatOxfordDateTime(query.created_at)}</span>
        </p>
        {query.status === 'resolved' && query.updated_at && (
          <p className="text-xs">
            <span className="font-medium text-foreground">Resolved by Admin:</span>{' '}
            <span className="text-muted-foreground">{formatOxfordDateTime(query.updated_at)}</span>
          </p>
        )}
        {query.status === 'closed' && query.updated_at && (
          <p className="text-xs">
            <span className="font-medium text-foreground">Closed by Admin:</span>{' '}
            <span className="text-muted-foreground">{formatOxfordDateTime(query.updated_at)}</span>
          </p>
        )}
      </div>
      <p className="text-[10px] text-muted-foreground bg-muted/50 p-2 rounded">{query.message}</p>
      {query.admin_response && <p className="text-[10px] text-primary">Admin Response: {query.admin_response}</p>}
      <textarea value={response} onChange={e => setResponse(e.target.value)} placeholder="Type response..." rows={2} className="w-full border border-input rounded-md px-2 py-1 text-xs bg-background text-foreground resize-none" />
      <div className="flex gap-1">
        <Button size="sm" variant="outline" className="h-6 text-[10px] px-2" onClick={() => onRespond(query.id, response, 'in_progress')}>In Progress</Button>
        <Button size="sm" className="h-6 text-[10px] px-2" onClick={() => onRespond(query.id, response, 'resolved')}>Resolve</Button>
        <Button size="sm" variant="destructive" className="h-6 text-[10px] px-2" onClick={() => onRespond(query.id, response, 'closed')}>Close</Button>
      </div>
    </div>
  );
};

export default StudentDetailModal;
