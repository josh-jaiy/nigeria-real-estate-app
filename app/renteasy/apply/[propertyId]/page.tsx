'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  Home,
  User,
  Briefcase,
  CreditCard,
  FileText,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProperties } from '@/hooks/useProperties';
import { useRentEasy } from '@/hooks/useRentEasy';
import Image from 'next/image';

interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phoneNumber: string;
  homeAddress: string;
  
  // Financial Information
  monthlyIncome: string;
  otherIncome: string;
  monthlyExpenses: string;
  employer: string;
  employerAddress: string;
  bankName: string;
  accountNumber: string;
  bvn: string;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  
  // Preferences
  preferredDuration: string;
  additionalInfo: string;
}

const STEPS = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Employment', icon: Briefcase },
  { id: 3, title: 'Financial', icon: CreditCard },
  { id: 4, title: 'Emergency Contact', icon: Phone },
  { id: 5, title: 'Review', icon: FileText },
];

export default function RentEasyApplicationPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const { fetchProperty, selectedProperty } = useProperties();
  const { createApplication, isLoading, error, clearError } = useRentEasy();

  const propertyId = params.propertyId as string;
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [formData, setFormData] = useState<FormData>({
    fullName: user ? `${user.firstName} ${user.lastName}` : '',
    email: user?.email || '',
    phoneNumber: user?.phone || '',
    homeAddress: user?.address || '',
    monthlyIncome: '',
    otherIncome: '',
    monthlyExpenses: '',
    employer: '',
    employerAddress: '',
    bankName: '',
    accountNumber: '',
    bvn: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    preferredDuration: '12',
    additionalInfo: '',
  });

  // Fetch property details
  useEffect(() => {
    if (propertyId) {
      fetchProperty(propertyId);
    }
  }, [propertyId, fetchProperty]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (submitError) setSubmitError('');
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.fullName && formData.email && formData.phoneNumber && formData.homeAddress);
      case 2:
        return !!(formData.employer && formData.employerAddress && formData.monthlyIncome);
      case 3:
        return !!(formData.bvn && formData.bankName);
      case 4:
        return !!(formData.emergencyContactName && formData.emergencyContactPhone && formData.emergencyContactRelationship);
      case 5:
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const applicationData = {
        propertyId,
        ...formData,
        monthlyIncome: parseFloat(formData.monthlyIncome),
        otherIncome: formData.otherIncome ? parseFloat(formData.otherIncome) : undefined,
        monthlyExpenses: formData.monthlyExpenses ? parseFloat(formData.monthlyExpenses) : undefined,
        preferredDuration: parseInt(formData.preferredDuration),
      };

      await createApplication(applicationData);
      
      // Redirect to success page or applications list
      router.push('/renteasy/applications?success=true');
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="08012345678"
              />
            </div>
            <div>
              <Label htmlFor="homeAddress">Home Address *</Label>
              <Textarea
                id="homeAddress"
                value={formData.homeAddress}
                onChange={(e) => handleInputChange('homeAddress', e.target.value)}
                placeholder="Enter your current address"
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="employer">Employer/Company *</Label>
              <Input
                id="employer"
                value={formData.employer}
                onChange={(e) => handleInputChange('employer', e.target.value)}
                placeholder="Enter your employer name"
              />
            </div>
            <div>
              <Label htmlFor="employerAddress">Employer Address *</Label>
              <Textarea
                id="employerAddress"
                value={formData.employerAddress}
                onChange={(e) => handleInputChange('employerAddress', e.target.value)}
                placeholder="Enter your employer's address"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthlyIncome">Monthly Income (₦) *</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                  placeholder="500000"
                />
              </div>
              <div>
                <Label htmlFor="otherIncome">Other Income (₦)</Label>
                <Input
                  id="otherIncome"
                  type="number"
                  value={formData.otherIncome}
                  onChange={(e) => handleInputChange('otherIncome', e.target.value)}
                  placeholder="100000"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bvn">Bank Verification Number (BVN) *</Label>
              <Input
                id="bvn"
                value={formData.bvn}
                onChange={(e) => handleInputChange('bvn', e.target.value)}
                placeholder="12345678901"
                maxLength={11}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
                <Select value={formData.bankName} onValueChange={(value) => handleInputChange('bankName', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Access Bank">Access Bank</SelectItem>
                    <SelectItem value="GTBank">GTBank</SelectItem>
                    <SelectItem value="First Bank">First Bank</SelectItem>
                    <SelectItem value="UBA">UBA</SelectItem>
                    <SelectItem value="Zenith Bank">Zenith Bank</SelectItem>
                    <SelectItem value="Fidelity Bank">Fidelity Bank</SelectItem>
                    <SelectItem value="FCMB">FCMB</SelectItem>
                    <SelectItem value="Sterling Bank">Sterling Bank</SelectItem>
                    <SelectItem value="Union Bank">Union Bank</SelectItem>
                    <SelectItem value="Wema Bank">Wema Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder="1234567890"
                  maxLength={10}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="monthlyExpenses">Monthly Expenses (₦)</Label>
              <Input
                id="monthlyExpenses"
                type="number"
                value={formData.monthlyExpenses}
                onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                placeholder="200000"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
              <Input
                id="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                placeholder="Enter emergency contact name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
                <Input
                  id="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                  placeholder="08012345678"
                />
              </div>
              <div>
                <Label htmlFor="emergencyContactRelationship">Relationship *</Label>
                <Select 
                  value={formData.emergencyContactRelationship} 
                  onValueChange={(value) => handleInputChange('emergencyContactRelationship', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Parent">Parent</SelectItem>
                    <SelectItem value="Sibling">Sibling</SelectItem>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Friend">Friend</SelectItem>
                    <SelectItem value="Colleague">Colleague</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="preferredDuration">Preferred Duration (months)</Label>
              <Select 
                value={formData.preferredDuration} 
                onValueChange={(value) => handleInputChange('preferredDuration', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="18">18 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                  <SelectItem value="36">36 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                placeholder="Any additional information you'd like to share"
                rows={3}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Review Your Application</h3>
              <p className="text-gray-600">Please review all information before submitting</p>
            </div>

            {/* Property Summary */}
            {selectedProperty && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="h-5 w-5 mr-2" />
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    {selectedProperty.images && selectedProperty.images[0] && (
                      <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                        <Image
                          src={selectedProperty.images[0]}
                          alt={selectedProperty.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold">{selectedProperty.title}</h4>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedProperty.address}
                      </p>
                      <p className="text-lg font-bold text-blue-600">
                        {formatPrice(selectedProperty.price)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Application Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Name:</strong> {formData.fullName}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  <div><strong>Phone:</strong> {formData.phoneNumber}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Financial Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Monthly Income:</strong> ₦{parseInt(formData.monthlyIncome).toLocaleString()}</div>
                  <div><strong>Employer:</strong> {formData.employer}</div>
                  <div><strong>Duration:</strong> {formData.preferredDuration} months</div>
                </CardContent>
              </Card>
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-red-700">{submitError}</span>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="ml-4">
          <h1 className="text-2xl font-bold">RentEasy Application</h1>
          <p className="text-gray-600">Apply for flexible rent payment</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              {index < STEPS.length - 1 && (
                <div className={`w-full h-1 mx-2 ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        <Progress value={(currentStep / STEPS.length) * 100} className="h-2" />
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>{STEPS[currentStep - 1].title}</CardTitle>
          <CardDescription>
            Step {currentStep} of {STEPS.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {currentStep < STEPS.length ? (
          <Button
            onClick={nextStep}
            disabled={!validateStep(currentStep)}
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!validateStep(currentStep) || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        )}
      </div>
    </div>
  );
}
