'use client';
// src/app/profile/page.tsx
import { useAuth } from '../../hooks/useAuth';
import { saveUserProfile } from '../../lib/firestore';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, userProfile } = useAuth();
  const [name, setName]       = useState('');
  const [age, setAge]         = useState('');
  const [city, setCity]       = useState('');
  const [state, setState]     = useState('');
  const [address, setAddress] = useState('');
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setAge(userProfile.age || '');
      setCity(userProfile.city || '');
      setState(userProfile.state || '');
      setAddress(userProfile.address || '');
    }
  }, [userProfile]);

  if (!user) {
    return (
      <div className="king-bg min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[#F5E6C8] mb-4">Please login to view your profile</p>
          <Link href="/" className="btn-gold py-3 px-8">Go Home</Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    if (!name.trim()) { toast.error('Name is required'); return; }
    setSaving(true);
    try {
      await saveUserProfile({
        uid: user.uid,
        name,
        phone: userProfile?.phone || '',
        email: userProfile?.email || '',
        age,
        city,
        state,
        address,
      });
      toast.success('Profile saved! ✓');
    } catch {
      toast.error('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="king-bg min-h-screen px-4 pt-4 pb-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-[#F5E6C8] text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'Cinzel, serif' }}>My Profile</h1>

        <div className="rounded-2xl p-5 space-y-4"
          style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.3)' }}>

          {[
            { label: 'Full Name *', value: name, setter: setName, placeholder: 'Your full name', type: 'text' },
            { label: 'Age',         value: age,  setter: setAge,  placeholder: 'Your age',       type: 'number' },
            { label: 'City',        value: city, setter: setCity, placeholder: 'Your city',      type: 'text' },
            { label: 'State',       value: state,setter: setState,placeholder: 'Your state',     type: 'text' },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-[#F5E6C8]/60 text-xs font-medium block mb-1">{field.label}</label>
              <input
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                type={field.type}
                className="input-field"
              />
            </div>
          ))}

          <div>
            <label className="text-[#F5E6C8]/60 text-xs font-medium block mb-1">Delivery Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full address with pincode"
              className="input-field"
              rows={3}
            />
          </div>

          <div className="rounded-xl p-3" style={{ background: 'rgba(212,160,23,0.08)' }}>
            <span className="text-[#D4A017] text-xs font-semibold">Registered Phone: </span>
            <span className="text-[#F5E6C8] text-xs font-mono">+91 {userProfile?.phone}</span>
          </div>

          <button onClick={handleSave} disabled={saving} className="btn-gold w-full py-3">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}
