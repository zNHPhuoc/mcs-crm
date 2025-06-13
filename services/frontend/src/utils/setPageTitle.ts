export const setPageTitle = (title: string): void => {
  const baseTitle = import.meta.env.VITE_APP_TITLE || 'My Application';
  document.title = title ? `${title} | ${baseTitle}` : baseTitle;
};
