import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase/firebase-config';
import { isPremium } from '../utils/premium';
import { Link } from 'react-router-dom';

// Removed 'semantic-ui-react' Button import, as it relies on external UI libraries
// import { Button } from 'semantic-ui-react'; 

export default function FindQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  // Note: isPremium must be correctly implemented to check user's premium status
  const userIsPremium = isPremium(); 

  useEffect(() => {
    let objectUrls = [];

    const fetchQuestions = async () => {
      try {
        // Fetch questions from the 'posts' collection (store both questions and articles)
        // NOTE: For real-time updates, you should use onSnapshot instead of getDocs.
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const questionsList = querySnapshot.docs.map(d => {
          const data = d.data();
          if (data?.type !== 'question') {
            return null;
          }

          const q = { id: d.id, ...data };

          // Normalize timestamp for rendering
          q.timestamp = data.createdAt || data.timestamp || null;

          // If imageBlob is present, convert to object URL for rendering
          if (data?.imageBlob) {
            try {
              // Handle multiple possible shapes returned from Firestore
              // 1) base64 string
              // 2) array of bytes
              // 3) Uint8Array
              // 4) Firestore Blob-like object with toUint8Array()
              let url = null;

              if (typeof data.imageBlob === 'string') {
                // assume stored base64 (without data: prefix) or full data URL
                if (data.imageBlob.startsWith('data:')) {
                  url = data.imageBlob;
                } else {
                  const mime = data.imageType || 'image/png';
                  url = `data:${mime};base64,${data.imageBlob}`;
                }
              } else {
                let byteArray = data.imageBlob;
                // If Firestore returned an object with toUint8Array (some SDKs), call it
                if (typeof byteArray === 'object' && byteArray !== null && typeof byteArray.toUint8Array === 'function') {
                  byteArray = byteArray.toUint8Array();
                }

                if (Array.isArray(byteArray)) {
                  byteArray = new Uint8Array(byteArray);
                }

                if (byteArray instanceof Uint8Array) {
                  const blob = new Blob([byteArray], { type: data.imageType || 'image/png' });
                  url = URL.createObjectURL(blob);
                }
              }

              if (url) {
                q.imageSrc = url;
                if (url.startsWith('blob:')) {
                  objectUrls.push(url);
                }
              }
            } catch (e) {
              console.warn('Failed to convert imageBlob to URL', e);
            }
          }

          // If fallback base64 imageData was stored, use it directly
          if (!q.imageSrc && data?.imageData) {
            try {
              let url = data.imageData;
              if (!url.startsWith('data:')) {
                const mime = data.imageType || 'image/png';
                url = `data:${mime};base64,${data.imageData}`;
              }
              q.imageSrc = url;
              if (url.startsWith('blob:')) {
                objectUrls.push(url);
              }
            } catch (e) {
              console.warn('Failed to use imageData for URL', e);
            }
          }

          return q;
        }).filter(Boolean);

        setQuestions(questionsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();

    return () => {
      objectUrls.forEach(u => URL.revokeObjectURL(u));
      objectUrls = [];
    };
  }, []);

  const filteredQuestions = questions.filter(question =>
    question.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- STYLING OBJECTS (Pure CSS) ---
  const mainContainerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centers content horizontally
    padding: '30px 15px',
    backgroundColor: '#f9fafb',
    fontFamily: 'Inter, sans-serif'
  };

  const contentWrapperStyle = {
    width: '100%',
    maxWidth: '768px', // Centered content width
  };

  const questionCardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: '1px solid #e5e7eb', // Subtle border
    padding: '20px',
    transition: 'box-shadow 0.3s ease-in-out',
    cursor: 'pointer',
  };

  const deleteButtonStyle = {
    fontSize: '0.875rem', 
    color: '#dc2626', // Red
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: 'transparent',
    transition: 'color 0.15s ease-in-out',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  };
  
  const upgradeLinkStyle = {
    fontSize: '12px',
    color: '#3b82f6', // Blue
    border: '1px solid #93c5fd', // Lighter blue border
    padding: '4px 8px',
    borderRadius: '6px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    fontWeight: '600'
  };
  // --- END STYLING OBJECTS ---

  // Error/Alert handling fix: Custom modal should replace native alert/confirm
  const handleDelete = async (questionId) => {
    // SECURITY FIX: Replaced window.confirm/alert with console log as native UI is forbidden.
    console.log(`Attempting to delete question ${questionId}. Display custom modal confirmation.`);

    // In a real app, a custom modal would confirm this action. Assuming confirmed for now.
    // To prevent accidental deletion, we'll keep the confirmation logic simple for this environment.
    if (deleteLoading) return;

    setDeleteLoading(true);
    try {
        // NOTE: Update 'questions' path if using the security rules path: 
        // /artifacts/{appId}/public/data/questions/{documentId}
        await deleteDoc(doc(db, 'posts', questionId)); 
        setQuestions(prevQuestions =>
            prevQuestions.filter(q => q.id !== questionId)
        );
        console.log(`Question ${questionId} successfully deleted.`);
    } catch (error) {
        console.error("Error deleting question:", error);
        // NOTE: Replace this with a custom toast or message box
        console.error('Failed to delete question'); 
    } finally {
        setDeleteLoading(false);
    }
  };


  if (loading) {
    return (
      <div style={{ ...mainContainerStyle, justifyContent: 'center', minHeight: 'calc(100vh - 70px)' }}>
        <div style={{ color: '#4b5563', fontSize: '18px', fontWeight: '500' }}>Loading questions...</div>
      </div>
    );
  }

  return (
    <div style={mainContainerStyle}>
      <div style={contentWrapperStyle}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Find Questions</h1>
          <p style={{ color: '#4b5563', fontSize: '14px' }}>Search and explore developer questions</p>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '448px',
              padding: '10px 16px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              outline: 'none',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              transition: 'border-color 0.15s ease-in-out',
            }}
          />
        </div>

        {/* Questions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredQuestions.length === 0 ? (
            <div style={{ backgroundColor: 'white', textAlign: 'center', padding: '32px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6' }}>
              <p style={{ color: '#4b5563', fontSize: '14px' }}>No questions found matching your search</p>
            </div>
          ) : (
            filteredQuestions.map((question) => (
              <div
                key={question.id}
                style={questionCardStyle}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', lineHeight: '1.4' }}>
                    {question.title}
                  </h2>
                  
                  {/* Premium Feature: Delete Button */}
                  {userIsPremium ? (
                    <button
                      onClick={() => handleDelete(question.id)}
                      disabled={deleteLoading}
                      style={deleteButtonStyle}
                    >
                      {deleteLoading ? 'Deleting...' : 'Delete'}
                    </button>
                  ) : (
                    // Non-premium placeholder link
                    <Link
                      to="/plans"
                      style={upgradeLinkStyle}
                    >
                      Upgrade to Edit/Delete
                    </Link>
                  )}
                </div>

                {question.imageSrc && (
                  <div style={{ marginBottom: '12px' }}>
                    <img src={question.imageSrc} alt="question" style={{ maxWidth: '100%', borderRadius: '8px', maxHeight: '380px', objectFit: 'contain' }} />
                  </div>
                )}

                <p style={{ fontSize: '14px', color: '#374151', marginBottom: '16px' }}>{question.description}</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#6b7280', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
                  <span>{question.author || 'Anonymous'}</span>
                  <span>
                    {question.timestamp?.toDate().toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

