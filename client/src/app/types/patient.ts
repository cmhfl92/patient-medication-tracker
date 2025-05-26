export interface PatientInfo {
  id: number;
  name: string;
  dob: string;
  email: string;
}

export interface PaginatedPatientsResponse {
  data: PatientInfo[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
