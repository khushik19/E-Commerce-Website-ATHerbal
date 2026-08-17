import {
  collection,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Lead, Order, Review, AffiliateRequest, Coupon, UserProfile } from '../types';

// ─── USER PROFILE ─────────────────────────────────────────────────────────────

export async function saveUserProfile(profile: UserProfile) {
  await setDoc(doc(db, 'users', profile.uid), {
    ...profile,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

// ─── LEADS ────────────────────────────────────────────────────────────────────

export async function saveLead(lead: Lead) {
  await addDoc(collection(db, 'leads'), {
    ...lead,
    createdAt: serverTimestamp(),
  });
}

export async function saveWhatsAppLead(data: {
  uid: string;
  name: string;
  phone: string;
  source: string;
  contacted: boolean;
  createdAt: Date;
}) {
  await addDoc(collection(db, 'leads'), {
    ...data,
    leadType: 'whatsapp',
    createdAt: serverTimestamp(),
  });
}

export async function getAllLeads() {
  const snap = await getDocs(
    query(collection(db, 'leads'), orderBy('createdAt', 'desc'))
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function markLeadContacted(leadId: string, notes: string) {
  await updateDoc(doc(db, 'leads', leadId), {
    contacted: true,
    contactedAt: serverTimestamp(),
    notes,
  });
}

// ─── ORDERS ───────────────────────────────────────────────────────────────────

export async function saveOrder(order: Partial<Order>) {
  const docRef = await addDoc(collection(db, 'orders'), {
    ...order,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserOrders(userId: string) {
  const snap = await getDocs(
    query(
      collection(db, 'orders'),
      where('userId', '==', userId)
    )
  );
  const docs = snap.docs.map(d => ({ id: d.id, ...d.data() as Order }));
  return docs.sort((a, b) => {
    const timeA = a.createdAt && 'seconds' in a.createdAt ? (a.createdAt as { seconds: number }).seconds : 0;
    const timeB = b.createdAt && 'seconds' in b.createdAt ? (b.createdAt as { seconds: number }).seconds : 0;
    return timeB - timeA;
  });
}

export async function getAllOrders() {
  const snap = await getDocs(collection(db, 'orders'));
  const docs = snap.docs.map(d => ({ id: d.id, ...d.data() as Order }));
  return docs.sort((a, b) => {
    const timeA = a.createdAt && 'seconds' in a.createdAt ? (a.createdAt as { seconds: number }).seconds : 0;
    const timeB = b.createdAt && 'seconds' in b.createdAt ? (b.createdAt as { seconds: number }).seconds : 0;
    return timeB - timeA;
  });
}

// ─── REVIEWS ──────────────────────────────────────────────────────────────────

export async function submitReview(review: Omit<Review, 'status'>) {
  await addDoc(collection(db, 'reviews'), {
    ...review,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
}

export async function getApprovedReviews() {
  const snap = await getDocs(
    query(
      collection(db, 'reviews'),
      where('status', '==', 'approved')
    )
  );
  const docs = snap.docs.map(d => ({ id: d.id, ...d.data() as Review }));
  return docs.sort((a, b) => {
    const timeA = a.createdAt && 'seconds' in a.createdAt ? (a.createdAt as { seconds: number }).seconds : 0;
    const timeB = b.createdAt && 'seconds' in b.createdAt ? (b.createdAt as { seconds: number }).seconds : 0;
    return timeB - timeA;
  });
}

export async function getAllReviews() {
  const snap = await getDocs(
    query(collection(db, 'reviews'), orderBy('createdAt', 'desc'))
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() as Review }));
}

export async function approveReview(reviewId: string) {
  await updateDoc(doc(db, 'reviews', reviewId), { status: 'approved' });
}

export async function deleteReview(reviewId: string) {
  await deleteDoc(doc(db, 'reviews', reviewId));
}

// ─── AFFILIATE ────────────────────────────────────────────────────────────────

export async function submitAffiliateRequest(data: Omit<AffiliateRequest, 'status'>) {
  await addDoc(collection(db, 'affiliate_requests'), {
    ...data,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
}

export async function getAllAffiliateRequests() {
  const snap = await getDocs(
    query(collection(db, 'affiliate_requests'), orderBy('createdAt', 'desc'))
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() as AffiliateRequest }));
}

export async function generateCouponCode(
  affiliateId: string,
  affiliateName: string,
  discountPercent: number
) {
  const nameCode = affiliateName.replace(/\s/g, '').toUpperCase().slice(0, 4);
  const code = `${nameCode}${discountPercent}`;

  await setDoc(doc(db, 'coupons', code), {
    code,
    affiliateId,
    affiliateName,
    discountPercent,
    usageCount: 0,
    totalRevenue: 0,
    isActive: true,
    createdAt: serverTimestamp(),
  });

  await updateDoc(doc(db, 'affiliate_requests', affiliateId), {
    status: 'approved',
    couponCode: code,
    approvedAt: serverTimestamp(),
  });

  return code;
}

export async function rejectAffiliateRequest(affiliateId: string) {
  await updateDoc(doc(db, 'affiliate_requests', affiliateId), {
    status: 'rejected',
  });
}

// ─── COUPONS ──────────────────────────────────────────────────────────────────

export async function validateCoupon(code: string): Promise<Coupon | null> {
  const snap = await getDoc(doc(db, 'coupons', code.toUpperCase()));
  if (!snap.exists()) return null;
  const data = snap.data() as Coupon;
  if (!data.isActive) return null;
  return data;
}

export async function getAllCoupons() {
  const snap = await getDocs(collection(db, 'coupons'));
  return snap.docs.map(d => ({ ...d.data() as Coupon }));
}

export async function incrementCouponUsage(code: string, orderAmount: number) {
  const ref = doc(db, 'coupons', code);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data();
    await updateDoc(ref, {
      usageCount: (data.usageCount || 0) + 1,
      totalRevenue: (data.totalRevenue || 0) + orderAmount,
    });
  }
}
