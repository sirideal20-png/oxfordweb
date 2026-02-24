import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, CreditCard, FileText, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

interface AdminAnalyticsProps {
  profiles: any[];
  applications: any[];
  fees: any[];
  attendance: any[];
  queries: any[];
  records: any[];
}

const COLORS = [
  'hsl(210, 70%, 50%)',
  'hsl(150, 60%, 45%)',
  'hsl(45, 90%, 50%)',
  'hsl(0, 70%, 55%)',
  'hsl(270, 60%, 55%)',
  'hsl(180, 50%, 45%)',
];

const AdminAnalytics = ({ profiles, applications, fees, attendance, queries, records }: AdminAnalyticsProps) => {
  const stats = useMemo(() => {
    const totalStudents = profiles.length;
    const totalApplications = applications.length;

    // Application status breakdown
    const appStatusMap: Record<string, number> = {};
    applications.forEach(a => {
      const s = a.status || 'pending';
      appStatusMap[s] = (appStatusMap[s] || 0) + 1;
    });
    const applicationStatusData = Object.entries(appStatusMap).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));

    // Fee stats
    const totalRevenue = fees.filter(f => f.status === 'paid').reduce((sum, f) => sum + (Number(f.amount) || 0), 0);
    const pendingFees = fees.filter(f => f.status === 'pending');
    const pendingAmount = pendingFees.reduce((sum, f) => sum + (Number(f.amount) || 0), 0);
    const overdueFees = fees.filter(f => f.status === 'overdue');
    const overdueAmount = overdueFees.reduce((sum, f) => sum + (Number(f.amount) || 0), 0);

    const feeStatusData = [
      { name: 'Paid', value: fees.filter(f => f.status === 'paid').length },
      { name: 'Pending', value: pendingFees.length },
      { name: 'Overdue', value: overdueFees.length },
    ].filter(d => d.value > 0);

    // Queries breakdown
    const openQueries = queries.filter(q => q.status === 'open').length;
    const resolvedQueries = queries.filter(q => q.status === 'resolved' || q.status === 'closed').length;

    // Monthly enrollment (last 6 months)
    const now = new Date();
    const monthlyEnrollment = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
      const count = profiles.filter(p => {
        const cd = new Date(p.created_at);
        return cd.getMonth() === d.getMonth() && cd.getFullYear() === d.getFullYear();
      }).length;
      monthlyEnrollment.push({ month: monthStr, students: count });
    }

    // Monthly revenue (last 6 months)
    const monthlyRevenue = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
      const amount = fees.filter(f => {
        if (f.status !== 'paid') return false;
        const cd = new Date(f.created_at);
        return cd.getMonth() === d.getMonth() && cd.getFullYear() === d.getFullYear();
      }).reduce((sum, f) => sum + (Number(f.amount) || 0), 0);
      monthlyRevenue.push({ month: monthStr, revenue: amount });
    }

    // Program type breakdown from applications
    const programTypeMap: Record<string, number> = {};
    applications.forEach(a => {
      const t = a.program_type || 'other';
      programTypeMap[t] = (programTypeMap[t] || 0) + 1;
    });
    const programTypeData = Object.entries(programTypeMap).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));

    return {
      totalStudents, totalApplications, totalRevenue, pendingAmount, overdueAmount,
      openQueries, resolvedQueries,
      applicationStatusData, feeStatusData, monthlyEnrollment, monthlyRevenue, programTypeData,
      pendingFeesCount: pendingFees.length, overdueFeesCount: overdueFees.length,
    };
  }, [profiles, applications, fees, attendance, queries, records]);

  const statCards = [
    { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'text-blue-600' },
    { label: 'Applications', value: stats.totalApplications, icon: FileText, color: 'text-purple-600' },
    { label: 'Revenue Collected', value: `$${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-600' },
    { label: 'Pending Fees', value: `$${stats.pendingAmount.toLocaleString()}`, icon: CreditCard, color: 'text-amber-600' },
    { label: 'Overdue Fees', value: `$${stats.overdueAmount.toLocaleString()}`, icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Open Queries', value: stats.openQueries, icon: CheckCircle, color: 'text-cyan-600' },
  ];

  const renderCustomLabel = ({ name, percent }: any) =>
    percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : '';

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map(s => (
          <Card key={s.label} className="border-border">
            <CardContent className="p-4 flex flex-col items-center text-center gap-1">
              <s.icon size={22} className={s.color} />
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Enrollment Bar Chart */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Monthly Enrollment (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.monthlyEnrollment}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="students" fill="hsl(210, 70%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Application Status Pie */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Application Status</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            {stats.applicationStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={stats.applicationStatusData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={renderCustomLabel} labelLine={false}>
                    {stats.applicationStatusData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-sm py-12">No applications yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Revenue Bar Chart */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Monthly Revenue (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} formatter={(v: any) => [`$${Number(v).toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="hsl(150, 60%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fee Status Pie */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Fee Collection Status</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            {stats.feeStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={stats.feeStatusData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={renderCustomLabel} labelLine={false}>
                    {stats.feeStatusData.map((_, i) => (
                      <Cell key={i} fill={[COLORS[1], COLORS[2], COLORS[3]][i] || COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-sm py-12">No fee records yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Program Type Pie */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Applications by Program Type</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            {stats.programTypeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={stats.programTypeData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={renderCustomLabel} labelLine={false}>
                    {stats.programTypeData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-sm py-12">No applications yet</p>
            )}
          </CardContent>
        </Card>

        {/* Support queries summary */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Support Queries Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            {(stats.openQueries + stats.resolvedQueries) > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Open', value: stats.openQueries },
                      { name: 'Resolved', value: stats.resolvedQueries },
                    ].filter(d => d.value > 0)}
                    cx="50%" cy="50%" outerRadius={90} dataKey="value" label={renderCustomLabel} labelLine={false}
                  >
                    <Cell fill="hsl(45, 90%, 50%)" />
                    <Cell fill="hsl(150, 60%, 45%)" />
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-sm py-12">No queries yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
