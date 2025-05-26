'use client';
import { useEffect, useState } from 'react';
import { PatientInfo } from '../types/patient';
import * as api from '../api/api';
import { PatientFormModal } from '../components/modal';

export default function Patient() {
  const [page, setPage] = useState<number>(1);
  const [patients, setPatients] = useState<PatientInfo[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    api
      .getPatients(page)
      .then(res => {
        setPatients(res.data);
        setTotalPages(res.totalPages);
      })
      .catch(console.error);
  }, [page]);

  return (
    <>
      <div className='overflow-hidden px-4 py-8 sm:px-8'>
        <button
          className='ml-3 hidden rounded-lg bg-gray-100 px-2 py-0.5 text-xs/6 font-semibold whitespace-nowrap text-gray-700 lg:block cursor-pointer float-right'
          onClick={openModal}
        >
          Add Patient
        </button>
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
            {patients.map(patient => (
              <tr key={patient.id}>
                <td className='border border-gray-200 p-4 pl-8 text-gray-500 dark:border-gray-600 dark:text-gray-400'>
                  {patient.id}
                </td>
                <td className='border border-gray-200 p-4 pl-8 text-gray-500 dark:border-gray-600 dark:text-gray-400'>
                  {patient.name}
                </td>
                <td className='border border-gray-200 p-4 pl-8 text-gray-500 dark:border-gray-600 dark:text-gray-400'>
                  {patient.dob}
                </td>
                <td className='border border-gray-200 p-4 pl-8 text-gray-500 dark:border-gray-600 dark:text-gray-400'>
                  {patient.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <span className='mt-6 flex justify-center gap-4 items-center'>
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className='rounded px-3 py-1 bg-gray-200 text-sm text-gray-800 disabled:opacity-50'
          >
            ⬅️ Previous
          </button>
          <span className='text-sm text-gray-600'>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className='rounded px-3 py-1 bg-gray-200 text-sm text-gray-800 disabled:opacity-50'
          >
            Next ➡️
          </button>
        </span>
        <PatientFormModal
          open={isModalOpen}
          onClose={closeModal}
          onSave={() => {
            api.getPatients(page).then(res => {
              setPatients(res.data);
              setTotalPages(res.totalPages);
            });
            closeModal();
          }}
        />
      </div>
    </>
  );
}
