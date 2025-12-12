export type ProviderName = 'JIO' | 'AIRTEL' | 'VI' | 'BSNL';

export interface Plan {
  id: string;
  price: number;
  validity: string;
  data: string;
  calls: string;
  sms: string;
  description: string;
  category: 'POPULAR' | 'DATA_ONLY' | 'ANNUAL' | 'TOP_UP';
  ottBenefits?: string[];
}

export interface ProviderTheme {
  name: ProviderName;
  displayName: string;
  gradient: string;
  shadow: string;
  textColor: string;
  buttonColor: string;
  logoInitial: string;
}

export interface RechargeHistory {
  id: string;
  amount: number;
  mobileNumber: string;
  provider: string;
  date: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  referenceId: string;
  planDetails: {
    data: string;
    validity: string;
    calls: string;
  };
  userId: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface User {
  name: string;
  email: string;
  isAdmin?: boolean;
}