'use client';

import { useEffect, useState } from 'react';
import { IoClose as Close } from "react-icons/io5";

interface Student {
  Name: string;
  Mobile: string;
  Email: string;
  Department: string;
  College: string;
}

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/excel-to-json');
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = students.filter((student) =>
      student.Email.toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
  };

  const handleReset = () => {
    setSearchQuery('');
    setFilteredStudents(students);
  };

  return (
    <div className="p-6 h-screen w-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Registered Student</h1>

      <div className="relative w-1/2 flex mx-auto items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by email"
          value={searchQuery}
          onChange={handleSearch}
          className="flex w-full border p-3 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition-all duration-200"
        />
        {
          searchQuery.length > 0 ? (
            <button onClick={handleReset} className="absolute right-1 text-white px-4 py-2 rounded-md" >
              <Close className='font-bold text-2xl text-black' />
            </button>
          ) : null
        }
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-content-center">
        {
          filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <div key={index} className="bg-white border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300" >
                <h2 className="text-xl font-semibold mb-2">{index + 1 + ') ' + student.Name}</h2>
                <p className="text-gray-600 mb-1">
                  <strong>Mobile:</strong> {student.Mobile}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Email:</strong> {student.Email}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Department:</strong> {student.Department}
                </p>
                <p className="text-gray-600">
                  <strong>College:</strong> {student.College}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3 mt-10">No students found with this email.</p>
          )
        }
      </div>
    </div>
  );
};

export default StudentsPage;
