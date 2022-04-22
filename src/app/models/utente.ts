export interface Utente {
  id?:number;
  username: string;
  email: string;
  password?: string;
  nome?: string;
  cognome?: string;
  roles: [
    {
      roleName?: string;
    }
  ];
}
