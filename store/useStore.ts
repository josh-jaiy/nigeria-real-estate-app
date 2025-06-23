import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Types
export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'apartment' | 'duplex' | 'bungalow' | 'mansion' | 'commercial' | 'land';
  status: 'available' | 'rented' | 'sold' | 'maintenance' | 'inactive';
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage?: number;
  images: string[];
  amenities: string[];
  latitude?: number;
  longitude?: number;
  landlord?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  manager?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  viewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RentEasyApplication {
  id: string;
  propertyId: string;
  property?: Property;
  fullName: string;
  email: string;
  phoneNumber: string;
  bvn: string;
  monthlyIncome: number;
  employer: string;
  employerAddress: string;
  homeAddress: string;
  preferredDuration: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  applicationDate: string;
  approvedAt?: string;
  rejectedAt?: string;
  adminNotes?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  otherIncome?: number;
  monthlyExpenses?: number;
  bankName?: string;
  accountNumber?: string;
  riskAssessment?: {
    id: string;
    riskScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    assessmentFactors: string[];
  };
  paymentPlan?: PaymentPlan;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentPlan {
  id: string;
  applicationId: string;
  application?: RentEasyApplication;
  duration: number;
  annualRent: number;
  totalAmount: number;
  monthlyAmount: number;
  interestRate: number;
  status: 'pending' | 'active' | 'completed' | 'defaulted' | 'cancelled';
  startDate?: string;
  endDate?: string;
  firstPaymentDate?: string;
  totalPaid: number;
  paymentsCompleted: number;
  paymentsOverdue: number;
  allowEarlyPayment: boolean;
  allowPartialPayments: boolean;
  latePaymentPenaltyRate?: number;
  gracePeriodDays?: number;
  termsAndConditions?: string;
  specialConditions?: string;
  termsAccepted: boolean;
  termsAcceptedAt?: string;
  paymentSchedules?: PaymentSchedule[];
  createdAt: string;
  updatedAt: string;
}

export interface PaymentSchedule {
  id: string;
  paymentPlanId: string;
  status: 'active' | 'completed' | 'suspended' | 'cancelled';
  startDate: string;
  endDate: string;
  totalPayments: number;
  totalAmount: number;
  monthlyAmount: number;
  completedPayments: number;
  overduePayments: number;
  failedPayments: number;
  totalPaid: number;
  nextPaymentDate?: string;
  nextPaymentAmount?: number;
  scheduledPayments?: ScheduledPayment[];
  createdAt: string;
  updatedAt: string;
}

export interface ScheduledPayment {
  id: string;
  paymentScheduleId: string;
  paymentNumber: number;
  dueDate: string;
  amount: number;
  status: 'pending' | 'processing' | 'paid' | 'failed' | 'overdue' | 'cancelled' | 'refunded' | 'partial';
  paidAmount?: number;
  paidDate?: string;
  paymentMethod?: 'bank_transfer' | 'card_payment' | 'ussd' | 'mobile_money' | 'cash' | 'cheque' | 'online_banking';
  transactionId?: string;
  transactionReference?: string;
  paymentGateway?: string;
  bankReference?: string;
  lateFee?: number;
  isOverdue: boolean;
  daysLate: number;
  attemptCount: number;
  maxAttempts: number;
  lastAttemptDate?: string;
  lastAttemptError?: string;
  reminderSent: boolean;
  reminderCount: number;
  lastReminderDate?: string;
  autoPaymentEnabled: boolean;
  autoPaymentAttempted: boolean;
  allowPartialPayment: boolean;
  partialAmountPaid?: number;
  remainingAmount?: number;
  minimumPartialAmount?: number;
  paymentNotes?: string;
  adminNotes?: string;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  overview: {
    totalUsers: number;
    totalProperties: number;
    totalApplications: number;
    totalPaymentPlans: number;
    totalPayments: number;
    totalRevenue: number;
  };
  active: {
    activeUsers: number;
    availableProperties: number;
    pendingApplications: number;
    activePaymentPlans: number;
    paidPayments: number;
  };
  rates: {
    userActivationRate: number;
    propertyAvailabilityRate: number;
    applicationApprovalRate: number;
    paymentSuccessRate: number;
  };
}

// Store interface
interface AppState {
  // Properties
  properties: Property[];
  featuredProperties: Property[];
  selectedProperty: Property | null;
  propertyFilters: {
    search: string;
    type: string;
    city: string;
    state: string;
    minPrice: number;
    maxPrice: number;
    minBedrooms: number;
    maxBedrooms: number;
    amenities: string[];
  };
  
  // RentEasy
  applications: RentEasyApplication[];
  selectedApplication: RentEasyApplication | null;
  paymentPlans: PaymentPlan[];
  selectedPaymentPlan: PaymentPlan | null;
  scheduledPayments: ScheduledPayment[];
  
  // Dashboard
  dashboardStats: DashboardStats | null;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setProperties: (properties: Property[]) => void;
  setFeaturedProperties: (properties: Property[]) => void;
  setSelectedProperty: (property: Property | null) => void;
  updatePropertyFilters: (filters: Partial<AppState['propertyFilters']>) => void;
  resetPropertyFilters: () => void;
  
  setApplications: (applications: RentEasyApplication[]) => void;
  setSelectedApplication: (application: RentEasyApplication | null) => void;
  addApplication: (application: RentEasyApplication) => void;
  updateApplication: (id: string, updates: Partial<RentEasyApplication>) => void;
  
  setPaymentPlans: (plans: PaymentPlan[]) => void;
  setSelectedPaymentPlan: (plan: PaymentPlan | null) => void;
  addPaymentPlan: (plan: PaymentPlan) => void;
  updatePaymentPlan: (id: string, updates: Partial<PaymentPlan>) => void;
  
  setScheduledPayments: (payments: ScheduledPayment[]) => void;
  updateScheduledPayment: (id: string, updates: Partial<ScheduledPayment>) => void;
  
  setDashboardStats: (stats: DashboardStats) => void;
  
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Default filter state
const defaultFilters = {
  search: '',
  type: '',
  city: '',
  state: '',
  minPrice: 0,
  maxPrice: 0,
  minBedrooms: 0,
  maxBedrooms: 0,
  amenities: [],
};

// Create store
export const useStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        properties: [],
        featuredProperties: [],
        selectedProperty: null,
        propertyFilters: defaultFilters,
        
        applications: [],
        selectedApplication: null,
        paymentPlans: [],
        selectedPaymentPlan: null,
        scheduledPayments: [],
        
        dashboardStats: null,
        
        isLoading: false,
        error: null,
        
        // Actions
        setProperties: (properties) => set({ properties }),
        setFeaturedProperties: (featuredProperties) => set({ featuredProperties }),
        setSelectedProperty: (selectedProperty) => set({ selectedProperty }),
        updatePropertyFilters: (filters) => 
          set((state) => ({ 
            propertyFilters: { ...state.propertyFilters, ...filters } 
          })),
        resetPropertyFilters: () => set({ propertyFilters: defaultFilters }),
        
        setApplications: (applications) => set({ applications }),
        setSelectedApplication: (selectedApplication) => set({ selectedApplication }),
        addApplication: (application) => 
          set((state) => ({ 
            applications: [...state.applications, application] 
          })),
        updateApplication: (id, updates) =>
          set((state) => ({
            applications: state.applications.map((app) =>
              app.id === id ? { ...app, ...updates } : app
            ),
          })),
        
        setPaymentPlans: (paymentPlans) => set({ paymentPlans }),
        setSelectedPaymentPlan: (selectedPaymentPlan) => set({ selectedPaymentPlan }),
        addPaymentPlan: (plan) =>
          set((state) => ({
            paymentPlans: [...state.paymentPlans, plan],
          })),
        updatePaymentPlan: (id, updates) =>
          set((state) => ({
            paymentPlans: state.paymentPlans.map((plan) =>
              plan.id === id ? { ...plan, ...updates } : plan
            ),
          })),
        
        setScheduledPayments: (scheduledPayments) => set({ scheduledPayments }),
        updateScheduledPayment: (id, updates) =>
          set((state) => ({
            scheduledPayments: state.scheduledPayments.map((payment) =>
              payment.id === id ? { ...payment, ...updates } : payment
            ),
          })),
        
        setDashboardStats: (dashboardStats) => set({ dashboardStats }),
        
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        clearError: () => set({ error: null }),
      }),
      {
        name: 'nigeria-real-estate-store',
        partialize: (state) => ({
          propertyFilters: state.propertyFilters,
          // Only persist filters, not data that should be fresh
        }),
      }
    ),
    {
      name: 'nigeria-real-estate-store',
    }
  )
);
