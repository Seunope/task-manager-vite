export const initialSearchQuery = {
  searchTerm: '',
  tabTwoSearchTerm: '',
  fromDate: new Date().toISOString().split('T')[0],
  isToDate: false,
  toDate: new Date().toISOString().split('T')[0],
};

export const DOWNLOAD_FILE_TYPES = {
  csv: 'csv',
  pdf: 'pdf',
};
