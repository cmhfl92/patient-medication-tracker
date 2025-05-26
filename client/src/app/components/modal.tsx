import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import * as api from '../api/api';
interface PatientFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

export function PatientFormModal({
  open,
  onClose,
  onSave,
}: PatientFormModalProps) {
  const [name, setName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSave = async () => {
    if (name && dob && email)
      try {
        await api.createPatient(name, dob, email);
        setName('');
        setDob('');
        setEmail('');
        onSave(); //mutates when saved
      } catch (err) {
        console.log('Failed to add new patient from modal :(');
      }
  };

  if (!open) return null;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Patient</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Patient Name'
          fullWidth
          variant='outlined'
          value={name}
          onChange={e => setName(e.target.value)}
          sx={{
            width: '30rem',
          }}
        />
        <TextField
          autoFocus
          margin='dense'
          label='dob'
          fullWidth
          variant='outlined'
          value={dob}
          onChange={e => setDob(e.target.value)}
          sx={{
            width: '30rem',
            padding: '5px 0',
          }}
        />
        <TextField
          autoFocus
          margin='dense'
          label='email'
          fullWidth
          variant='outlined'
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{
            width: '30rem',
            padding: '5px 0',
          }}
        />
      </DialogContent>
      <DialogActions>
        <button
          className='ml-3 hidden rounded-lg bg-gray-100 px-2 py-0.5 font-semibold whitespace-nowrap text-slate-100 bg-sky-500 lg:block cursor-pointer'
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className='ml-3 hidden rounded-lg bg-gray-100 px-2 py-0.5 font-semibold whitespace-nowrap text-red-200 bg-red-600 lg:block cursor-pointer'
          onClick={onClose}
        >
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
}
