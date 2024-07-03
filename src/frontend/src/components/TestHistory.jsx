import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


function TestHistory({ onHistoryClick, toggleShowHistory }) {
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log("User ID: ", user.uid);
        fetchTests(user.uid);
      } else {
        console.error("User not logged in");
        setTests([]);
      }
    });

    const fetchTests = async (userId) => {
      try {
        setIsLoading(true);
        const testCollection = collection(db, 'PromptTests');
        const testSnapshot = await getDocs(testCollection);
        const filteredTests = testSnapshot.docs.filter(doc => doc.data().user === userId);
        console.log('User has ', filteredTests.length, ' tests');
        var testList = filteredTests.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: new Date(doc.data().timestamp).toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        }));
        // Sort tests by timestamp
        testList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setTests(testList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tests: ", error);
        setIsLoading(false);
      }
    };

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
      {/* Close button (red x)*/}
      <button 
        className="text-red-500 text-2xl absolute top-2 right-2"
        onClick={toggleShowHistory}
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-4">Test History</h2>
      {tests.length > 0 ? tests.map(test => (
        <div 
          key={test.id} 
          className="bg-white shadow-md p-2 rounded-lg mb-2 cursor-pointer hover:bg-gray-100"
          onClick={() => onHistoryClick(test)}
        >
          <h3 className="text-lg font-bold">{test.task}</h3>
          <p className="text-gray-600">{test.systemMessage.slice(0,50)}...</p>
          <span className="text-gray-600 text-sm">{test.timestamp}</span>
        </div>
      )) : isLoading ? <p>Loading...</p> : <p>No tests found</p>}
    </div>
  );
}

export default TestHistory;