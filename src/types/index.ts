// src/types/index.ts

export interface UserProfile {
  uid: string;
  name: string;
  phone: string;
  email?: string;
  age?: string;
  city?: string;
  state?: string;
  address?: string;
  source?: string;
  utmSource?: string;
  contacted?: boolean;
  createdAt?: Date;
}

export interface Lead {
  uid?: string;
  name: string;
  phone: string;
  email?: string;
  age?: string;
  city?: string;
  state?: string;
  address?: string;
  leadType: string;
  source?: string;
  utmSource?: string;
  utmCampaign?: string;
  contacted: boolean;
  notes?: string;
  createdAt: Date;
}

export interface Order {
  userId?: string;
  customerName: string;
  phone: string;
  address: string;
  amount: number;
  paymentMethod: 'razorpay' | 'COD';
  paymentStatus: 'paid' | 'pending' | 'failed';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  couponCode?: string;
  discountApplied?: number;
  orderStatus: 'placed' | 'confirmed' | 'shipped' | 'delivered';
  createdAt?: Date;
}

export interface Review {
  id?: string;
  userId: string;
  userName: string;
  rating: number;
  reviewText: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: Date;
}

export interface AffiliateRequest {
  id?: string;
  fullName: string;
  phone: string;
  instagramHandle: string;
  instagramFollowers?: number;
  facebookHandle?: string;
  facebookFollowers?: number;
  city: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  couponCode?: string;
  createdAt?: Date;
}

export interface Coupon {
  code: string;
  affiliateId: string;
  affiliateName: string;
  discountPercent: number;
  usageCount: number;
  totalRevenue: number;
  isActive: boolean;
  createdAt?: Date;
}
