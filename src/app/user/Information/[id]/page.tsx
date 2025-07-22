'use client'
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";

interface UserProfile {
  userId?: string;
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
  education?: Array<{
    level?: string;
    institution?: string;
    major?: string;
    gpa?: number;
    graduationYear?: number;
    isCurrentlyStudying?: boolean;
  }>;
  experience?: Array<{
    jobTitle?: string;
    company?: string;
    startDate?: string;
    endDate?: string;
    isCurrentJob?: boolean;
    description?: string;
    responsibilities?: string[];
  }>;
  skills?: Array<{
    name?: string;
    level?: string;
    category?: string;
  }>;
  languages?: Array<{
    name?: string;
    proficiency?: string;
  }>;
  certifications?: Array<{
    name?: string;
    issuer?: string;
    issueDate?: string;
    expiryDate?: string;
    credentialId?: string;
  }>;
  preferences?: {
    desiredJobCategory?: string[];
    desiredSalary?: {
      min?: number;
      max?: number;
      currency?: string;
    };
    preferredLocation?: string[];
    workType?: string[];
    availableStartDate?: string;
    willingToRelocate?: boolean;
  };
  portfolio?: Array<{
    title?: string;
    description?: string;
    url?: string;
    imageUrl?: string;
    technologies?: string[];
  }>;
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
  const { isAuthenticated } = useAuth();
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isAuthenticated && userId) {
      fetch(`/api/user/information/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setProfile(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load user data.");
          setLoading(false);
        });
    }
  }, [isAuthenticated, userId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const keys = name.split(".");

    setProfile((prev) => {
      const updated: UserProfile = { ...prev as UserProfile };
      let current: { [key: string]: any } = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = isNaN(Number(keys[i + 1])) ? {} : [];
        }
        current = current[keys[i]];
      }
      
      const finalKey = keys[keys.length - 1];
      let finalValue: any = value;
      
      if (type === "checkbox") {
        finalValue = checked;
      } else if (type === "number") {
        finalValue = value === "" ? undefined : Number(value);
      }
      
      current[finalKey] = finalValue;
      return updated;
    });
  };

  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [...(prev?.education || []), {
        level: "",
        institution: "",
        major: "",
        gpa: undefined,
        graduationYear: undefined,
        isCurrentlyStudying: false
      }]
    }));
  };

  const removeEducation = (index: number) => {
    setProfile(prev => ({
      ...prev,
      education: prev?.education?.filter((_, i) => i !== index)
    }));
  };

  const addExperience = () => {
    setProfile(prev => ({
      ...prev,
      experience: [...(prev?.experience || []), {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        isCurrentJob: false,
        description: "",
        responsibilities: []
      }]
    }));
  };

  const removeExperience = (index: number) => {
    setProfile(prev => ({
      ...prev,
      experience: prev?.experience?.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    setProfile(prev => ({
      ...prev,
      skills: [...(prev?.skills || []), {
        name: "",
        level: "",
        category: ""
      }]
    }));
  };

  const removeSkill = (index: number) => {
    setProfile(prev => ({
      ...prev,
      skills: prev?.skills?.filter((_, i) => i !== index)
    }));
  };

  const addLanguage = () => {
    setProfile(prev => ({
      ...prev,
      languages: [...(prev?.languages || []), {
        name: "",
        proficiency: ""
      }]
    }));
  };

  const removeLanguage = (index: number) => {
    setProfile(prev => ({
      ...prev,
      languages: prev?.languages?.filter((_, i) => i !== index)
    }));
  };

  const addCertification = () => {
    setProfile(prev => ({
      ...prev,
      certifications: [...(prev?.certifications || []), {
        name: "",
        issuer: "",
        issueDate: "",
        expiryDate: "",
        credentialId: ""
      }]
    }));
  };

  const removeCertification = (index: number) => {
    setProfile(prev => ({
      ...prev,
      certifications: prev?.certifications?.filter((_, i) => i !== index)
    }));
  };

  const addPortfolio = () => {
    setProfile(prev => ({
      ...prev,
      portfolio: [...(prev?.portfolio || []), {
        title: "",
        description: "",
        url: "",
        imageUrl: "",
        technologies: []
      }]
    }));
  };

  const removePortfolio = (index: number) => {
    setProfile(prev => ({
      ...prev,
      portfolio: prev?.portfolio?.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('profileData', JSON.stringify(profile));
      if (file) {
        formData.append('resume', file);
      }

      const res = await fetch(`/api/user/information/${userId}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setProfile(data);
      alert("Profile saved successfully!");
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Failed to save profile.");
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

      {/* Education Section */}
      <Section title="Education">
        {profile.education?.map((edu, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <Grid>
              <Input name={`education.${index}.level`} value={edu.level} onChange={handleInputChange} placeholder="Level (e.g., Bachelor)" />
              <Input name={`education.${index}.institution`} value={edu.institution} onChange={handleInputChange} placeholder="Institution" />
              <Input name={`education.${index}.major`} value={edu.major} onChange={handleInputChange} placeholder="Major" />
              <Input type="number" name={`education.${index}.gpa`} value={edu.gpa?.toString()} onChange={handleInputChange} placeholder="GPA" />
              <Input type="number" name={`education.${index}.graduationYear`} value={edu.graduationYear?.toString()} onChange={handleInputChange} placeholder="Graduation Year" />
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  name={`education.${index}.isCurrentlyStudying`} 
                  checked={edu.isCurrentlyStudying || false}
                  onChange={(e) => handleInputChange({ target: { name: e.target.name, value: e.target.checked.toString() }} as any)}
                  className="mr-2"
                />
                <label>Currently Studying</label>
              </div>
            </Grid>
            <button 
              onClick={() => removeEducation(index)} 
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        )) || <div className="text-gray-500">No education added yet.</div>}
        <button 
          onClick={addEducation} 
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Education
        </button>
      </Section>

      {/* Experience Section */}
      <Section title="Experience">
        {profile.experience?.map((exp, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <Grid>
              <Input name={`experience.${index}.jobTitle`} value={exp.jobTitle} onChange={handleInputChange} placeholder="Job Title" />
              <Input name={`experience.${index}.company`} value={exp.company} onChange={handleInputChange} placeholder="Company" />
              <Input type="date" name={`experience.${index}.startDate`} value={exp.startDate?.split("T")[0]} onChange={handleInputChange} placeholder="Start Date" />
              <Input type="date" name={`experience.${index}.endDate`} value={exp.endDate?.split("T")[0]} onChange={handleInputChange} placeholder="End Date" />
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  name={`experience.${index}.isCurrentJob`} 
                  checked={exp.isCurrentJob || false}
                  onChange={(e) => handleInputChange({ target: { name: e.target.name, value: e.target.checked.toString() }} as any)}
                  className="mr-2"
                />
                <label>Current Job</label>
              </div>
            </Grid>
            <textarea
              name={`experience.${index}.description`}
              value={exp.description || ""}
              onChange={handleInputChange}
              placeholder="Job Description"
              className="w-full mt-2 border border-gray-300 rounded px-3 py-2"
              rows={3}
            />
            <button 
              onClick={() => removeExperience(index)} 
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        )) || <div className="text-gray-500">No experience added yet.</div>}
        <button 
          onClick={addExperience} 
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Experience
        </button>
      </Section>

      {/* Skills Section */}
      <Section title="Skills">
        {profile.skills?.map((skill, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <Grid>
              <Input name={`skills.${index}.name`} value={skill.name} onChange={handleInputChange} placeholder="Skill Name" />
              <select 
                name={`skills.${index}.level`} 
                value={skill.level || ""} 
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value="">Select Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
              <Input name={`skills.${index}.category`} value={skill.category} onChange={handleInputChange} placeholder="Category" />
            </Grid>
            <button 
              onClick={() => removeSkill(index)} 
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        )) || <div className="text-gray-500">No skills added yet.</div>}
        <button 
          onClick={addSkill} 
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Skill
        </button>
      </Section>

      {/* Languages Section */}
      <Section title="Languages">
        {profile.languages?.map((lang, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <Grid>
              <Input name={`languages.${index}.name`} value={lang.name} onChange={handleInputChange} placeholder="Language" />
              <select 
                name={`languages.${index}.proficiency`} 
                value={lang.proficiency || ""} 
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value="">Select Proficiency</option>
                <option value="basic">Basic</option>
                <option value="conversational">Conversational</option>
                <option value="fluent">Fluent</option>
                <option value="native">Native</option>
              </select>
            </Grid>
            <button 
              onClick={() => removeLanguage(index)} 
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        )) || <div className="text-gray-500">No languages added yet.</div>}
        <button 
          onClick={addLanguage} 
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Language
        </button>
      </Section>

      {/* Certifications Section */}
      <Section title="Certifications">
        {profile.certifications?.map((cert, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <Grid>
              <Input name={`certifications.${index}.name`} value={cert.name} onChange={handleInputChange} placeholder="Certification Name" />
              <Input name={`certifications.${index}.issuer`} value={cert.issuer} onChange={handleInputChange} placeholder="Issuer" />
              <Input type="date" name={`certifications.${index}.issueDate`} value={cert.issueDate?.split("T")[0]} onChange={handleInputChange} placeholder="Issue Date" />
              <Input type="date" name={`certifications.${index}.expiryDate`} value={cert.expiryDate?.split("T")[0]} onChange={handleInputChange} placeholder="Expiry Date" />
              <Input name={`certifications.${index}.credentialId`} value={cert.credentialId} onChange={handleInputChange} placeholder="Credential ID" />
            </Grid>
            <button 
              onClick={() => removeCertification(index)} 
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        )) || <div className="text-gray-500">No certifications added yet.</div>}
        <button 
          onClick={addCertification} 
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Certification
        </button>
      </Section>

      {/* Preferences Section */}
      <Section title="Job Preferences">
        <Grid>
          <Input name="preferences.availableStartDate" value={profile.preferences?.availableStartDate?.split("T")[0]} onChange={handleInputChange} type="date" placeholder="Available Start Date" />
          <Input name="preferences.desiredSalary.min" value={profile.preferences?.desiredSalary?.min?.toString()} onChange={handleInputChange} type="number" placeholder="Min Salary" />
          <Input name="preferences.desiredSalary.max" value={profile.preferences?.desiredSalary?.max?.toString()} onChange={handleInputChange} type="number" placeholder="Max Salary" />
          <Input name="preferences.desiredSalary.currency" value={profile.preferences?.desiredSalary?.currency} onChange={handleInputChange} placeholder="Currency (THB)" />
          <div className="flex items-center">
            <input 
              type="checkbox" 
              name="preferences.willingToRelocate" 
              checked={profile.preferences?.willingToRelocate || false}
              onChange={(e) => handleInputChange({ target: { name: e.target.name, value: e.target.checked.toString() }} as any)}
              className="mr-2"
            />
            <label>Willing to Relocate</label>
          </div>
        </Grid>
      </Section>

      {/* Portfolio Section */}
      <Section title="Portfolio">
        {profile.portfolio?.map((item, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <Grid>
              <Input name={`portfolio.${index}.title`} value={item.title} onChange={handleInputChange} placeholder="Project Title" />
              <Input name={`portfolio.${index}.url`} value={item.url} onChange={handleInputChange} placeholder="Project URL" />
              <Input name={`portfolio.${index}.imageUrl`} value={item.imageUrl} onChange={handleInputChange} placeholder="Image URL" />
            </Grid>
            <textarea
              name={`portfolio.${index}.description`}
              value={item.description || ""}
              onChange={handleInputChange}
              placeholder="Project Description"
              className="w-full mt-2 border border-gray-300 rounded px-3 py-2"
              rows={3}
            />
            <button 
              onClick={() => removePortfolio(index)} 
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        )) || <div className="text-gray-500">No portfolio items added yet.</div>}
        <button 
          onClick={addPortfolio} 
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Portfolio Item
        </button>
      </Section>

      {/* Resume Section */}
      <Section title="Resume">
        <Grid>
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} className="file-input file-input-bordered w-full" />
          {profile?.resume?.url && (
            <p className="text-sm text-gray-600">
              Current Resume: <a href={profile.resume.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{profile.resume.fileName || "View Resume"}</a>
            </p>
          )}
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