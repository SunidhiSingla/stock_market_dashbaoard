const styles = {
  // FAQ specific styles
  faqContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px'
  },
  faqItem: {
    marginBottom: '16px',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  faqQuestion: {
    width: '100%',
    textAlign: 'left',
    padding: '20px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '8px'
  },
  faqQuestionExpanded: {
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0'
  },
  faqAnswer: {
    padding: '20px',
    fontSize: '14px',
    color: '#4B5563',
    borderTop: '1px solid #E5E7EB',
    '& p': {
      marginTop: 0,
      marginBottom: '16px'
    },
    '& ul': {
      paddingLeft: '20px',
      marginBottom: '16px'
    },
    '& li': {
      marginBottom: '8px'
    },
    '& h4': {
      marginTop: '16px',
      marginBottom: '8px',
      color: '#374151',
      fontSize: '16px'
    }
  },
  faqIcon: {
    fontSize: '24px',
    color: '#6B7280',
    marginLeft: '12px'
  },
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #dbeafe, #e0e7ff)',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  maxWidth: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '0 20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '8px'
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '16px'
  },
  searchBox: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '24px',
    marginBottom: '24px'
  },
  searchContainer: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none'
  },
  addButton: {
    padding: '12px 24px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: '500'
  },
  settingsButton: {
    padding: '12px 24px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: '500'
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed'
  },
  error: {
    backgroundColor: '#fef2f2',
    borderLeft: '4px solid #ef4444',
    padding: '12px 16px',
    borderRadius: '4px',
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  errorText: {
    color: '#b91c1c',
    margin: 0,
    fontSize: '14px'
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    overflow: 'auto',
    maxHeight: 'calc(100vh - 300px)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px'
  },
  thead: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#f9fafb',
    zIndex: 10
  },
  th: {
    padding: '16px 12px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#374151',
    borderBottom: '2px solid #e5e7eb',
    whiteSpace: 'nowrap'
  },
  thCategory: {
    backgroundColor: '#f3f4f6',
    color: '#1f2937',
    fontWeight: '700',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
    whiteSpace: 'nowrap'
  },
  scoreRow: {
    backgroundColor: '#fef3c7',
    fontWeight: '700',
    fontSize: '16px'
  },
  companyCell: {
    position: 'sticky',
    left: 0,
    backgroundColor: 'white',
    fontWeight: '600',
    boxShadow: '2px 0 4px rgba(0,0,0,0.05)',
    zIndex: 5
  },
  companyHeader: {
    position: 'sticky',
    left: 0,
    backgroundColor: '#f9fafb',
    zIndex: 15,
    boxShadow: '2px 0 4px rgba(0,0,0,0.05)'
  },
  removeButton: {
    padding: '6px 12px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '8px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  emptyText: {
    color: '#6b7280',
    fontSize: '18px',
    marginTop: '16px'
  },
  companyInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  companyName: {
    fontWeight: '600',
    color: '#111827'
  },
  companyDetails: {
    fontSize: '12px',
    color: '#6b7280'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflow: 'auto',
    width: '90%'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
    margin: 0
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#6b7280',
    padding: '4px'
  },
  weightSection: {
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '12px'
  },
  weightItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    padding: '8px',
    backgroundColor: '#f9fafb',
    borderRadius: '6px'
  },
  weightLabel: {
    fontSize: '14px',
    color: '#374151'
  },
  weightInput: {
    width: '80px',
    padding: '6px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px'
  },
  totalWeight: {
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '16px',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    marginBottom: '24px'
  },
  modalButtons: {
    display: 'flex',
    gap: '12px'
  },
  applyButton: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500'
  },
  resetButton: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500'
  }
};

export default styles;