'use client';
import { useEffect, useState } from 'react';
import { PatientInfo } from '../types/patient';
import * as api from '../api/api';

export default function Patient() {
  const [patients, setPatients] = useState<PatientInfo[]>([]);

  useEffect(() => {
    api.getPatients().then(setPatients).catch(console.error);
  });
  return (
    <>
      <div className='overflow-hidden px-4 py-8 sm:px-8'>
        <table className='w-full table-auto border-collapse text-sm'>
          <caption className='caption-top pb-4 text-lg text-gray-500 dark:text-gray-400'>
            Patients
          </caption>
          <thead>
            <tr>
              <th className='border border-gray-200 bg-gray-50 p-4 py-3 pl-8 text-left font-medium text-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200'>
                ID
              </th>
              <th className='border border-gray-200 bg-gray-50 p-4 py-3 pl-8 text-left font-medium text-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200'>
                Name
              </th>
              <th className='border border-gray-200 bg-gray-50 p-4 py-3 pl-8 text-left font-medium text-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200'>
                Date of Birth
              </th>
              <th className='border border-gray-200 bg-gray-50 p-4 py-3 pl-8 text-left font-medium text-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200'>
                Email
              </th>
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-gray-800'>
            <tr>
              <td className='border border-gray-200 p-4 pl-8 text-gray-500 dark:border-gray-600 dark:text-gray-400'>
                1
              </td>
              <td className='border border-gray-200 p-4 pl-8 text-gray-500 dark:border-gray-600 dark:text-gray-400'>
                Firstname, Lastname
              </td>
              <td className='border border-gray-200 p-4 pl-8 text-gray-500 dark:border-gray-600 dark:text-gray-400'>
                6-9-1964
              </td>
              <td className='border border-gray-200 p-4 pl-8 text-gray-500 dark:border-gray-600 dark:text-gray-400'>
                c@c.com
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
