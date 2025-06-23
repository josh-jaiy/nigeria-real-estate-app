import { useState, useCallback } from 'react';
import { rentEasyApi } from '@/lib/api';
import { useStore } from '@/store/useStore';
import { RentEasyApplication, PaymentPlan, ScheduledPayment } from '@/store/useStore';

export interface ApplicationFilters {
  status?: string;
  propertyId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaymentPlanFilters {
  status?: string;
  applicationId?: string;
  duration?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface ScheduledPaymentFilters {
  paymentScheduleId?: string;
  status?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
  isOverdue?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface UseRentEasyReturn {
  // Applications
  applications: RentEasyApplication[];
  selectedApplication: RentEasyApplication | null;
  
  // Payment Plans
  paymentPlans: PaymentPlan[];
  selectedPaymentPlan: PaymentPlan | null;
  
  // Scheduled Payments
  scheduledPayments: ScheduledPayment[];
  
  // State
  isLoading: boolean;
  error: string | null;
  
  // Application Actions
  createApplication: (applicationData: any) => Promise<RentEasyApplication>;
  fetchApplications: (filters?: ApplicationFilters) => Promise<void>;
  fetchApplication: (id: string) => Promise<RentEasyApplication | null>;
  updateApplicationStatus: (id: string, status: string, notes?: string) => Promise<void>;
  setSelectedApplication: (application: RentEasyApplication | null) => void;
  
  // Payment Plan Actions
  createPaymentPlan: (planData: any) => Promise<PaymentPlan>;
  fetchPaymentPlans: (filters?: PaymentPlanFilters) => Promise<void>;
  fetchPaymentPlan: (id: string) => Promise<PaymentPlan | null>;
  updatePaymentPlan: (id: string, planData: any) => Promise<PaymentPlan>;
  activatePaymentPlan: (id: string) => Promise<void>;
  fetchMyPlans: (userId: string) => Promise<PaymentPlan[]>;
  setSelectedPaymentPlan: (plan: PaymentPlan | null) => void;
  
  // Scheduled Payment Actions
  fetchScheduledPayments: (filters?: ScheduledPaymentFilters) => Promise<void>;
  fetchScheduledPayment: (id: string) => Promise<ScheduledPayment | null>;
  processPayment: (id: string, paymentData: any) => Promise<void>;
  updateScheduledPayment: (id: string, paymentData: any) => Promise<void>;
  fetchOverduePayments: () => Promise<ScheduledPayment[]>;
  fetchUpcomingPayments: (days?: number) => Promise<ScheduledPayment[]>;
  fetchPaymentHistory: (scheduleId: string) => Promise<ScheduledPayment[]>;
  
  // Utility Actions
  clearError: () => void;
}

export function useRentEasy(): UseRentEasyReturn {
  const {
    applications,
    selectedApplication,
    paymentPlans,
    selectedPaymentPlan,
    scheduledPayments,
    setApplications,
    setSelectedApplication,
    addApplication,
    updateApplication,
    setPaymentPlans,
    setSelectedPaymentPlan,
    addPaymentPlan,
    updatePaymentPlan,
    setScheduledPayments,
    updateScheduledPayment,
    isLoading,
    error,
    setLoading,
    setError,
    clearError,
  } = useStore();

  // Create application
  const createApplication = useCallback(async (applicationData: any): Promise<RentEasyApplication> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await rentEasyApi.createApplication(applicationData);
      const newApplication = response.data;
      
      addApplication(newApplication);
      return newApplication;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create application');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [addApplication, setLoading, setError]);

  // Fetch applications
  const fetchApplications = useCallback(async (filters: ApplicationFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await rentEasyApi.getApplications(filters);
      const { applications: data } = response.data;
      
      setApplications(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  }, [setApplications, setLoading, setError]);

  // Fetch single application
  const fetchApplication = useCallback(async (id: string): Promise<RentEasyApplication | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await rentEasyApi.getApplication(id);
      const application = response.data;
      
      setSelectedApplication(application);
      return application;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch application');
      return null;
    } finally {
      setLoading(false);
    }
  }, [setSelectedApplication, setLoading, setError]);

  // Update application status
  const updateApplicationStatus = useCallback(async (
    id: string, 
    status: string, 
    notes?: string
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await rentEasyApi.updateApplicationStatus(id, status, notes);
      const updatedApplication = response.data;
      
      updateApplication(id, updatedApplication);
      
      if (selectedApplication?.id === id) {
        setSelectedApplication(updatedApplication);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update application status');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [updateApplication, selectedApplication, setSelectedApplication, setLoading, setError]);

  // Create payment plan
  const createPaymentPlan = useCallback(async (planData: any): Promise<PaymentPlan> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await rentEasyApi.createPaymentPlan(planData);
      const newPlan = response.data;
      
      addPaymentPlan(newPlan);
      return newPlan;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create payment plan');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [addPaymentPlan, setLoading, setError]);

  // Fetch payment plans
  const fetchPaymentPlans = useCallback(async (filters: PaymentPlanFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await rentEasyApi.getPaymentPlans(filters);
      const { plans } = response.data;
      
      setPaymentPlans(plans);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch payment plans');
    } finally {
      setLoading(false);
    }
  }, [setPaymentPlans, setLoading, setError]);

  // Fetch single payment plan
  const fetchPaymentPlan = useCallback(async (id: string): Promise<PaymentPlan | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await rentEasyApi.getPaymentPlan(id);
      const plan = response.data;
      
      setSelectedPaymentPlan(plan);
      return plan;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch payment plan');
      return null;
    } finally {
      setLoading(false);
    }
  }, [setSelectedPaymentPlan, setLoading, setError]);

  // Update payment plan
  const updatePaymentPlanAction = useCallback(async (id: string, planData: any): Promise<PaymentPlan> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await rentEasyApi.updatePaymentPlan(id, planData);
      const updatedPlan = response.data;
      
      updatePaymentPlan(id, updatedPlan);
      
      if (selectedPaymentPlan?.id === id) {
        setSelectedPaymentPlan(updatedPlan);
      }
      
      return updatedPlan;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update payment plan');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [updatePaymentPlan, selectedPaymentPlan, setSelectedPaymentPlan, setLoading, setError]);

  // Activate payment plan
  const activatePaymentPlan = useCallback(async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await rentEasyApi.activatePaymentPlan(id);
      const activatedPlan = response.data;
      
      updatePaymentPlan(id, activatedPlan);
      
      if (selectedPaymentPlan?.id === id) {
        setSelectedPaymentPlan(activatedPlan);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to activate payment plan');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [updatePaymentPlan, selectedPaymentPlan, setSelectedPaymentPlan, setLoading, setError]);

  // Fetch my plans
  const fetchMyPlans = useCallback(async (userId: string): Promise<PaymentPlan[]> => {
    try {
      const response = await rentEasyApi.getMyPlans(userId);
      const plans = response.data;
      
      setPaymentPlans(plans);
      return plans;
    } catch (err: any) {
      console.error('Failed to fetch my plans:', err);
      return [];
    }
  }, [setPaymentPlans]);

  // Fetch scheduled payments
  const fetchScheduledPayments = useCallback(async (filters: ScheduledPaymentFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await rentEasyApi.getScheduledPayments(filters);
      const { payments } = response.data;
      
      setScheduledPayments(payments);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch scheduled payments');
    } finally {
      setLoading(false);
    }
  }, [setScheduledPayments, setLoading, setError]);

  // Fetch single scheduled payment
  const fetchScheduledPayment = useCallback(async (id: string): Promise<ScheduledPayment | null> => {
    try {
      const response = await rentEasyApi.getScheduledPayment(id);
      return response.data;
    } catch (err: any) {
      console.error('Failed to fetch scheduled payment:', err);
      return null;
    }
  }, []);

  // Process payment
  const processPayment = useCallback(async (id: string, paymentData: any): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await rentEasyApi.processPayment(id, paymentData);
      const updatedPayment = response.data;
      
      updateScheduledPayment(id, updatedPayment);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to process payment');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [updateScheduledPayment, setLoading, setError]);

  // Update scheduled payment
  const updateScheduledPaymentAction = useCallback(async (id: string, paymentData: any): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await rentEasyApi.updateScheduledPayment(id, paymentData);
      const updatedPayment = response.data;
      
      updateScheduledPayment(id, updatedPayment);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update scheduled payment');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [updateScheduledPayment, setLoading, setError]);

  // Fetch overdue payments
  const fetchOverduePayments = useCallback(async (): Promise<ScheduledPayment[]> => {
    try {
      const response = await rentEasyApi.getOverduePayments();
      return response.data;
    } catch (err: any) {
      console.error('Failed to fetch overdue payments:', err);
      return [];
    }
  }, []);

  // Fetch upcoming payments
  const fetchUpcomingPayments = useCallback(async (days: number = 7): Promise<ScheduledPayment[]> => {
    try {
      const response = await rentEasyApi.getUpcomingPayments(days);
      return response.data;
    } catch (err: any) {
      console.error('Failed to fetch upcoming payments:', err);
      return [];
    }
  }, []);

  // Fetch payment history
  const fetchPaymentHistory = useCallback(async (scheduleId: string): Promise<ScheduledPayment[]> => {
    try {
      const response = await rentEasyApi.getPaymentHistory(scheduleId);
      return response.data;
    } catch (err: any) {
      console.error('Failed to fetch payment history:', err);
      return [];
    }
  }, []);

  return {
    // State
    applications,
    selectedApplication,
    paymentPlans,
    selectedPaymentPlan,
    scheduledPayments,
    isLoading,
    error,
    
    // Application Actions
    createApplication,
    fetchApplications,
    fetchApplication,
    updateApplicationStatus,
    setSelectedApplication,
    
    // Payment Plan Actions
    createPaymentPlan,
    fetchPaymentPlans,
    fetchPaymentPlan,
    updatePaymentPlan: updatePaymentPlanAction,
    activatePaymentPlan,
    fetchMyPlans,
    setSelectedPaymentPlan,
    
    // Scheduled Payment Actions
    fetchScheduledPayments,
    fetchScheduledPayment,
    processPayment,
    updateScheduledPayment: updateScheduledPaymentAction,
    fetchOverduePayments,
    fetchUpcomingPayments,
    fetchPaymentHistory,
    
    // Utility Actions
    clearError,
  };
}
