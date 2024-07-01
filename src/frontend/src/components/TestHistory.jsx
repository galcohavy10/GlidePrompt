import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path is correct
import { FaChevronRight } from 'react-icons/fa';

function TestHistory() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      const testCollection = collection(db, 'PromptTests');
      const testSnapshot = await getDocs(testCollection);
      const testList = testSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTests(testList);
    };

    fetchTests();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Test History</h1>
      {tests.map(test => (
        <div key={test.id} className="bg-white shadow-md p-4 rounded-lg mb-4">
          <h2 className="text-xl font-bold">{test.task}</h2>
          <p className="text-gray-600">{test.systemMessage}</p>
        </div>
      ))}
    </div>
  );
}

export default TestHistory;
