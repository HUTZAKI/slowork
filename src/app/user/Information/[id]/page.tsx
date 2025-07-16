"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

interface UserProfile {
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    phoneNumber?: string;
    address?: string;
    province?: string;
    district?: string;
    subDistrict?: string;
    zipCode?: string;
    profilePicture?: string;
  };
  socialMedia?: {
    linkedin?: string;
    github?: string;
    website?: string;
    twitter?: string;
  };
  resume?: {
    url?: string;
    fileName?: string;
    uploadDate?: string;
  };
}

export default function InformationPage() {
  const { data: session } = useSession();
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session && userId) {
      fetch(`/api/user/information/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setProfile(data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load user data.");
          setLoading(false);
        });
    }
  }, [session, userId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setProfile((prev) => {
      const updated = { ...prev } as any;
      let current = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/user/information/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      alert("Failed to save.");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;
  if (!profile) return <div className="p-6 text-center text-red-500">Profile not found.</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-10 bg-gray-100 rounded-md">
      <h1 className="text-2xl font-bold mb-6">User Information</h1>

      {/* Personal Information Section */}
      <Section title="Personal Information">
        <Grid>
          <Input name="personalInfo.firstName" value={profile.personalInfo?.firstName} onChange={handleInputChange} placeholder="First Name" />
          <Input name="personalInfo.lastName" value={profile.personalInfo?.lastName} onChange={handleInputChange} placeholder="Last Name" />
          <Input type="date" name="personalInfo.dateOfBirth" value={profile.personalInfo?.dateOfBirth?.split("T")[0]} onChange={handleInputChange} placeholder="Date of Birth" />
          <Input name="personalInfo.phoneNumber" value={profile.personalInfo?.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" />
          <Input name="personalInfo.address" value={profile.personalInfo?.address} onChange={handleInputChange} placeholder="Address" />
          <Input name="personalInfo.province" value={profile.personalInfo?.province} onChange={handleInputChange} placeholder="Province" />
          <Input name="personalInfo.district" value={profile.personalInfo?.district} onChange={handleInputChange} placeholder="District" />
          <Input name="personalInfo.subDistrict" value={profile.personalInfo?.subDistrict} onChange={handleInputChange} placeholder="Sub-District" />
          <Input name="personalInfo.zipCode" value={profile.personalInfo?.zipCode} onChange={handleInputChange} placeholder="Zip Code" />
          <Input name="personalInfo.profilePicture" value={profile.personalInfo?.profilePicture} onChange={handleInputChange} placeholder="Profile Picture URL" />
        </Grid>
      </Section>

      {/* Social Media Section */}
      <Section title="Social Media">
        <Grid>
          <Input name="socialMedia.linkedin" value={profile.socialMedia?.linkedin} onChange={handleInputChange} placeholder="LinkedIn" />
          <Input name="socialMedia.github" value={profile.socialMedia?.github} onChange={handleInputChange} placeholder="GitHub" />
          <Input name="socialMedia.website" value={profile.socialMedia?.website} onChange={handleInputChange} placeholder="Website" />
          <Input name="socialMedia.twitter" value={profile.socialMedia?.twitter} onChange={handleInputChange} placeholder="Twitter" />
        </Grid>
      </Section>

      {/* Resume Section */}
      <Section title="Resume">
        <Grid>
          <Input name="resume.url" value={profile.resume?.url} onChange={handleInputChange} placeholder="Resume URL" />
          <Input name="resume.fileName" value={profile.resume?.fileName} onChange={handleInputChange} placeholder="File Name" />
          <Input type="date" name="resume.uploadDate" value={profile.resume?.uploadDate?.split("T")[0]} onChange={handleInputChange} placeholder="Upload Date" />
        </Grid>
      </Section>

      <div className="mt-6">
        <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

// 🧩 Helper Components
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <div className="p-4 bg-white border rounded-md">{children}</div>
  </div>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

const Input = ({ name, value, onChange, placeholder, type = "text" }: React.InputHTMLAttributes<HTMLInputElement> & { name: string }) => (
  <input
    type={type}
    name={name}
    value={value || ""}
    onChange={onChange}
    placeholder={placeholder}
    className="border border-gray-300 rounded px-3 py-2 w-full"
  />
);
