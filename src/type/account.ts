import { bookkeepingList } from './bookkeeping';

interface userinfo {
  id: string;
  locale: string;
  name: string;
  email: string;
  picture: string;
  family_name: string;
  given_name: string;
  verified_email: boolean;
  createAt: number;
  bookkeeping?: bookkeepingList;
  currentBookkeeping?: { id: string; name: string };
}

export { userinfo };
