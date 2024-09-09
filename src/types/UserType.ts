export interface UserType {
  id: string;
  photoUrl?: string;
  birthDate: string;
  gender: 'Male' | 'Female' | 'Unknown';
  name: string;
  status: string;
  tg: string;
  uid: string;
}
