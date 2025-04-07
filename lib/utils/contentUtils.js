export const cleanNewsletterContent = (content) => {
  if (!content) return '';
  
  // Remove any script tags
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove any style tags
  content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Remove any iframe tags
  content = content.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  
  // Remove any potentially dangerous attributes
  content = content.replace(/on\w+="[^"]*"/g, '');
  content = content.replace(/on\w+='[^']*'/g, '');
  
  // Ensure all links open in new tab
  content = content.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');
  
  return content;
}; 