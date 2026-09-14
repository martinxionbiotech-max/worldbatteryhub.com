export interface Props {
  title: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown>[];
  author?: string;
  dateModified?: string;
}
