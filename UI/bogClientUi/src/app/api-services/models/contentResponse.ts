import { Link } from './link';

export interface ContentResponse {
  author: string;
  links: Link[];
  isPublished: boolean;
  updated: string | null;
  isDeleted: boolean;
  deleted: string | null;
  title: string;
  description: string;
  keyWords: string[];
  created: string;
  id: string;
}

