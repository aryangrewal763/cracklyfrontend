


import React, { useState,useContext, useRef } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { UserContext } from "../../UserContext";
import { Download, Star, Trophy } from 'lucide-react';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 50,
    alignItems: 'center',
    textAlign: 'center'
  },
  section: {
    marginBottom: 20,
    width: '100%'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 18,
    color: '#4B5563',
    marginBottom: 20
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginVertical: 15
  },
  courseName: {
    fontSize: 22,
    color: '#059669',
    marginBottom: 20
  },
  date: {
    fontSize: 16,
    color: '#6B7280'
  }
});

// PDF Certificate Component
const CertificatePDF = ({  
  username = 'Aryan Grewal',
  courseName = 'Interview Mastery', 
  completionDate = new Date() 
}) => {
  // Format date
  const {user,setUser} = useContext(UserContext);
  const formattedDate = completionDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <Text style={styles.title}>CRACKLY</Text>
          <Text style={styles.subtitle}>Interview Preparation Platform</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.subtitle, { fontSize: 24 }]}>
            Certificate of Completion
          </Text>
        </View>

        <View style={styles.section}>
          <Text>This is to certify that</Text>
          <Text style={styles.userName}>{username}</Text>
          <Text>has successfully completed the</Text>
          <Text style={styles.courseName}>{courseName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.date}>
            Completed on: {formattedDate}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={{ 
            fontSize: 12, 
            color: '#6B7280', 
            marginTop: 20 
          }}>
            Verification Code: {Math.random().toString(36).substring(2, 10).toUpperCase()}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

const CertificateDownloader = ({ 
  username = 'Aryan Grewal', 
  courseName = 'Interview Mastery', 
  completionDate = new Date() 
}) => {
  const [downloadOptions, setDownloadOptions] = useState({
    format: 'pdf',
    includeVerification: true
  });
  const {user,setUser} = useContext(UserContext);
  // Generate verification code
  const verificationCode = Math.random().toString(36).substring(2, 10).toUpperCase();

  const handleDownloadOptionChange = (e) => {
    const { name, type, checked, value } = e.target;
    setDownloadOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generateCertificate = async () => {
    try {
      const blob = await pdf(
        <CertificatePDF 
          userName={username}
          courseName={courseName}
          completionDate={completionDate}
        />
      ).toBlob();

      // Create download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Crackly_Certificate_${username.replace(/\s+/g, '_')}.pdf`;
      link.click();
    } catch (error) {
      console.error('Certificate generation error:', error);
      alert('Failed to generate certificate. Please try again.');
    }
  };

  return (
    <div className="mx-auto p-6 ">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Certificate Download Options
        </h2>

        {/* Preview Area */}
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Certificate Details</h3>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Course:</strong> {courseName}</p>
          <p><strong>Completion Date:</strong> {completionDate.toLocaleDateString()}</p>
        </div>

        {/* Download Options */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Download Preferences</h3>
          
          <div className="space-y-2">
            <div>
              <label htmlFor="format" className="block mb-1">
                File Format
              </label>
              <select 
                id="format"
                name="format"
                value={downloadOptions.format}
                onChange={handleDownloadOptionChange}
                className="w-full p-2 border rounded"
              >
                <option value="pdf">PDF</option>
              </select>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={generateCertificate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
        >
          <Download className="mr-2" />
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default CertificateDownloader;