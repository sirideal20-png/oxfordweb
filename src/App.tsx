import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AppLayout from "@/components/layout/AppLayout";
import HomePage from "@/pages/HomePage";
import ProgramsPage from "@/pages/ProgramsPage";
import ProgramDetailPage from "@/pages/ProgramDetailPage";
import MasterProgramDetailPage from "@/pages/MasterProgramDetailPage";
import PhdProgramDetailPage from "@/pages/PhdProgramDetailPage";
import DiplomaProgramDetailPage from "@/pages/DiplomaProgramDetailPage";
import CertificateProgramDetailPage from "@/pages/CertificateProgramDetailPage";
import TrainingProgramDetailPage from "@/pages/TrainingProgramDetailPage";
import AllProgramsPage from "@/pages/AllProgramsPage";
import AdmissionsPage from "@/pages/AdmissionsPage";
import PlacementExamPage from "@/pages/PlacementExamPage";
import VisitsPage from "@/pages/VisitsPage";
import AgentsPage from "@/pages/AgentsPage";
import VisaApplicationsPage from "@/pages/VisaApplicationsPage";
import RefundPolicyPage from "@/pages/RefundPolicyPage";
import TransferStudentsPage from "@/pages/TransferStudentsPage";
import FeeCalculatorPage from "@/pages/FeeCalculatorPage";
import AcademicCalendarPage from "@/pages/AcademicCalendarPage";
import EntryRequirementsPage from "@/pages/EntryRequirementsPage";
import FeesScholarshipsPage from "@/pages/FeesScholarshipsPage";
import CampusLifePage from "@/pages/CampusLifePage";
import SchoolsPage from "@/pages/SchoolsPage";
import EngineeringPage from "@/pages/schools/EngineeringPage";
import ComputingPage from "@/pages/schools/ComputingPage";
import HealthSciencesPage from "@/pages/schools/HealthSciencesPage";
import BusinessPage from "@/pages/schools/BusinessPage";
import LawPage from "@/pages/schools/LawPage";
import AgriculturePage from "@/pages/schools/AgriculturePage";
import AviationPage from "@/pages/schools/AviationPage";
import ArtsDesignPage from "@/pages/schools/ArtsDesignPage";
import LingualLiteracyPage from "@/pages/schools/LingualLiteracyPage";
import TransactionsPage from "@/pages/TransactionsPage";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import OnlineRegistrationPage from "@/pages/transactions/OnlineRegistrationPage";
import OnlinePaymentPage from "@/pages/transactions/OnlinePaymentPage";
import OBSPortalPage from "@/pages/transactions/OBSPortalPage";
import LMSPage from "@/pages/transactions/LMSPage";
import LibraryPage from "@/pages/transactions/LibraryPage";
import WebmailPage from "@/pages/transactions/WebmailPage";
import SupportDeskPage from "@/pages/transactions/SupportDeskPage";
import DocumentAppPage from "@/pages/transactions/DocumentAppPage";
import OnlineLibraryPage from "@/pages/transactions/OnlineLibraryPage";
import OnlineBooksPage from "@/pages/transactions/OnlineBooksPage";
import HobbyCoursesPage from "@/pages/transactions/HobbyCoursesPage";
import CloudSystemPage from "@/pages/transactions/CloudSystemPage";
import HowToDoItPage from "@/pages/transactions/HowToDoItPage";
import AccommodationPage from "@/pages/transactions/AccommodationPage";
import StudentPrinterPage from "@/pages/transactions/StudentPrinterPage";
import StudentPortalPage from "@/pages/StudentPortalPage";
import AcademicCalendarPortalPage from "@/pages/student-portal/AcademicCalendarPortalPage";
import ExamSchedulePage from "@/pages/student-portal/ExamSchedulePage";
import StudentInfoSystemPage from "@/pages/student-portal/StudentInfoSystemPage";
import TuitionFeeInquiryPage from "@/pages/student-portal/TuitionFeeInquiryPage";
import OrientationPage from "@/pages/student-portal/OrientationPage";
import GradingSystemPage from "@/pages/student-portal/GradingSystemPage";
import RegulationsPage from "@/pages/student-portal/RegulationsPage";
import StudentCouncilPage from "@/pages/student-portal/StudentCouncilPage";
import MakeupExamsPage from "@/pages/student-portal/MakeupExamsPage";
import StudentHandbookPage from "@/pages/student-portal/StudentHandbookPage";
import MigrationPage from "@/pages/student-portal/MigrationPage";
import AlumniPage from "@/pages/AlumniPage";
import SupportPage from "@/pages/SupportPage";
import AuthPage from "@/pages/AuthPage";
import StudentDashboardPage from "@/pages/StudentDashboardPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminViewStudentPortalPage from "@/pages/AdminViewStudentPortalPage";
import AboutUsPage from "@/pages/AboutUsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
          <Route path="/about" element={<AppLayout><AboutUsPage /></AppLayout>} />
          <Route path="/programs" element={<AppLayout><AllProgramsPage /></AppLayout>} />
          <Route path="/programs/:type" element={<AppLayout><ProgramsPage /></AppLayout>} />
          <Route path="/programs/bachelor-degree/:slug" element={<AppLayout><ProgramDetailPage /></AppLayout>} />
          <Route path="/programs/master-degree/:slug" element={<AppLayout><MasterProgramDetailPage /></AppLayout>} />
          <Route path="/programs/ph.d-degree/:slug" element={<AppLayout><PhdProgramDetailPage /></AppLayout>} />
          <Route path="/programs/diploma-programs/:slug" element={<AppLayout><DiplomaProgramDetailPage /></AppLayout>} />
          <Route path="/programs/diploma-programmes/:slug" element={<AppLayout><DiplomaProgramDetailPage /></AppLayout>} />
          <Route path="/programs/certificates/:slug" element={<AppLayout><CertificateProgramDetailPage /></AppLayout>} />
          <Route path="/programs/trainings/:slug" element={<AppLayout><TrainingProgramDetailPage /></AppLayout>} />
          <Route path="/admissions" element={<AppLayout><AdmissionsPage /></AppLayout>} />
          <Route path="/admissions/placement-exam" element={<AppLayout><PlacementExamPage /></AppLayout>} />
          <Route path="/admissions/visits" element={<AppLayout><VisitsPage /></AppLayout>} />
          <Route path="/admissions/agents" element={<AppLayout><AgentsPage /></AppLayout>} />
          <Route path="/admissions/visa-applications" element={<AppLayout><VisaApplicationsPage /></AppLayout>} />
          <Route path="/admissions/refund-policy" element={<AppLayout><RefundPolicyPage /></AppLayout>} />
          <Route path="/admissions/transfer-students" element={<AppLayout><TransferStudentsPage /></AppLayout>} />
          <Route path="/admissions/fee-calculator" element={<AppLayout><FeeCalculatorPage /></AppLayout>} />
          <Route path="/admissions/entry-requirements" element={<AppLayout><EntryRequirementsPage /></AppLayout>} />
          <Route path="/admissions/fees-scholarships" element={<AppLayout><FeesScholarshipsPage /></AppLayout>} />
          <Route path="/admissions/academic-calendar" element={<AppLayout><AcademicCalendarPage /></AppLayout>} />
          <Route path="/campus-life" element={<AppLayout><CampusLifePage /></AppLayout>} />
          <Route path="/schools" element={<AppLayout><SchoolsPage /></AppLayout>} />
          <Route path="/schools/eng" element={<AppLayout><EngineeringPage /></AppLayout>} />
          <Route path="/schools/cs" element={<AppLayout><ComputingPage /></AppLayout>} />
          <Route path="/schools/health" element={<AppLayout><HealthSciencesPage /></AppLayout>} />
          <Route path="/schools/bus" element={<AppLayout><BusinessPage /></AppLayout>} />
          <Route path="/schools/law" element={<AppLayout><LawPage /></AppLayout>} />
          <Route path="/schools/agri" element={<AppLayout><AgriculturePage /></AppLayout>} />
          <Route path="/schools/avia" element={<AppLayout><AviationPage /></AppLayout>} />
          <Route path="/schools/arts" element={<AppLayout><ArtsDesignPage /></AppLayout>} />
          <Route path="/schools/lingual" element={<AppLayout><LingualLiteracyPage /></AppLayout>} />
          <Route path="/transactions" element={<AppLayout><ProtectedRoute><TransactionsPage /></ProtectedRoute></AppLayout>} />
          <Route path="/transactions/online-registration" element={<AppLayout><ProtectedRoute><OnlineRegistrationPage /></ProtectedRoute></AppLayout>} />
          <Route path="/transactions/online-payment" element={<AppLayout><ProtectedRoute><OnlinePaymentPage /></ProtectedRoute></AppLayout>} />
          <Route path="/transactions/obs-portal" element={<AppLayout><ProtectedRoute><OBSPortalPage /></ProtectedRoute></AppLayout>} />
          <Route path="/transactions/lms" element={<AppLayout><ProtectedRoute><LMSPage /></ProtectedRoute></AppLayout>} />
          <Route path="/transactions/library" element={<AppLayout><ProtectedRoute><LibraryPage /></ProtectedRoute></AppLayout>} />
          <Route path="/transactions/webmail" element={<AppLayout><ProtectedRoute><WebmailPage /></ProtectedRoute></AppLayout>} />
          <Route path="/transactions/support-desk" element={<AppLayout><ProtectedRoute><SupportDeskPage /></ProtectedRoute></AppLayout>} />
          <Route path="/transactions/document-app" element={<AppLayout><ProtectedRoute><DocumentAppPage /></ProtectedRoute></AppLayout>} />
          <Route path="/transactions/online-library" element={<AppLayout><ProtectedRoute><OnlineLibraryPage /></ProtectedRoute></AppLayout>} />
          <Route path="/transactions/online-books" element={<AppLayout><ProtectedRoute><OnlineBooksPage /></ProtectedRoute></AppLayout>} />
          <Route path="/transactions/hobby-courses" element={<AppLayout><ProtectedRoute><HobbyCoursesPage /></ProtectedRoute></AppLayout>} />
          <Route path="/transactions/cloud-system" element={<AppLayout><ProtectedRoute><CloudSystemPage /></ProtectedRoute></AppLayout>} />
          <Route path="/transactions/how-to-do-it" element={<AppLayout><ProtectedRoute><HowToDoItPage /></ProtectedRoute></AppLayout>} />
          <Route path="/transactions/accommodation" element={<AppLayout><ProtectedRoute><AccommodationPage /></ProtectedRoute></AppLayout>} />
          <Route path="/transactions/student-printer" element={<AppLayout><ProtectedRoute><StudentPrinterPage /></ProtectedRoute></AppLayout>} />
          <Route path="/student-portal" element={<AppLayout><ProtectedRoute><StudentPortalPage /></ProtectedRoute></AppLayout>} />
          <Route path="/student-portal/academic-calendar" element={<AppLayout><ProtectedRoute><AcademicCalendarPortalPage /></ProtectedRoute></AppLayout>} />
          <Route path="/student-portal/exam-schedule" element={<AppLayout><ProtectedRoute><ExamSchedulePage /></ProtectedRoute></AppLayout>} />
          <Route path="/student-portal/student-info-system" element={<AppLayout><ProtectedRoute><StudentInfoSystemPage /></ProtectedRoute></AppLayout>} />
          <Route path="/student-portal/tuition-fee-inquiry" element={<AppLayout><ProtectedRoute><TuitionFeeInquiryPage /></ProtectedRoute></AppLayout>} />
          <Route path="/student-portal/orientation" element={<AppLayout><ProtectedRoute><OrientationPage /></ProtectedRoute></AppLayout>} />
          <Route path="/student-portal/grading-system" element={<AppLayout><ProtectedRoute><GradingSystemPage /></ProtectedRoute></AppLayout>} />
          <Route path="/student-portal/regulations" element={<AppLayout><ProtectedRoute><RegulationsPage /></ProtectedRoute></AppLayout>} />
          <Route path="/student-portal/student-council" element={<AppLayout><ProtectedRoute><StudentCouncilPage /></ProtectedRoute></AppLayout>} />
          <Route path="/student-portal/make-up-exams" element={<AppLayout><ProtectedRoute><MakeupExamsPage /></ProtectedRoute></AppLayout>} />
          <Route path="/student-portal/student-handbook" element={<AppLayout><ProtectedRoute><StudentHandbookPage /></ProtectedRoute></AppLayout>} />
          <Route path="/student-portal/migration" element={<AppLayout><ProtectedRoute><MigrationPage /></ProtectedRoute></AppLayout>} />
          <Route path="/alumni" element={<AppLayout><AlumniPage /></AppLayout>} />
          <Route path="/support" element={<AppLayout><SupportPage /></AppLayout>} />
          <Route path="/auth" element={<AppLayout><AuthPage /></AppLayout>} />
          <Route path="/dashboard" element={<AppLayout><ProtectedRoute><StudentDashboardPage /></ProtectedRoute></AppLayout>} />
          <Route path="/admin" element={<AppLayout><ProtectedRoute><AdminDashboardPage /></ProtectedRoute></AppLayout>} />
          <Route path="/admin/view-student/:userId" element={<ProtectedRoute><AdminViewStudentPortalPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
