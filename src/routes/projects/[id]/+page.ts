import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// In a real implementation, you would load project data from a database or API
// This is just a placeholder to match the structure in the page component
export const load: PageLoad = ({ params }) => {
  // The actual loading would happen here
  // We'll let the page component handle the sample data for now
  
  return {
    id: params.id
  };
}; 