export const otcQuickAddFavorites = [
  { id: 'otc-1', name: 'Paracetamol 500mg', price: 15, stock: 120, qty: 1 },
  { id: 'otc-2', name: 'Dolo 650mg', price: 30, stock: 85, qty: 1 },
  { id: 'otc-3', name: 'Cetirizine 10mg', price: 18, stock: 200, qty: 1 },
  { id: 'otc-4', name: 'Vitamin C 500mg', price: 45, stock: 90, qty: 1 },
  { id: 'otc-5', name: 'ORS Sachet', price: 22, stock: 150, qty: 1 },
  { id: 'otc-6', name: 'Digene 400mg', price: 35, stock: 60, qty: 1 },
];

export const sampleMedicinesCatalog = [
  { id: 'med-1', name: 'Paracetamol 500mg', price: 8, stock: 25, isRx: false, code: 'M003', composition: 'Acetaminophen 500mg' },
  { id: 'med-2', name: 'Dolo 650mg', price: 30, stock: 85, isRx: false },
  { id: 'med-3', name: 'Cetirizine 10mg', price: 18, stock: 200, isRx: false },
  { id: 'med-4', name: 'Vitamin C 500mg', price: 45, stock: 90, isRx: false },
  { id: 'med-5', name: 'ORS Sachet', price: 22, stock: 150, isRx: false },
  { id: 'med-6', name: 'Digene 400mg', price: 35, stock: 60, isRx: false },
  { id: 'med-7', name: 'Amoxicillin 250mg', price: 12, stock: 40, isRx: true, composition: 'Amoxicillin 250mg' },
  { id: 'med-8', name: 'Alprazolam 0.5mg', price: 10, stock: 35, isRx: true, composition: 'Alprazolam 0.5mg' },
  { id: 'med-9', name: 'Pantoprazole 40mg', price: 65, stock: 75, isRx: false },
  { id: 'med-10', name: 'Metformin 500mg', price: 40, stock: 100, isRx: true },
];

export const mockSubstituteMedicines = [
  { id: 'sub-1', name: 'Crocin 500mg', price: 6, composition: 'Acetaminophen 500mg' },
  { id: 'sub-2', name: 'DOLO 500mg', price: 6, composition: 'Acetaminophen 500mg' },
];

export const mockHeldBills = [
  { id: 'hb-1', name: 'Bill #1', amount: 340 },
];

export const mockInitialOrderDetails = {
  orderId: 'ORD-2401',
  orderType: 'Walk-in',
  patientName: '',
  patientAge: '',
  doctorName: '',
  prescriptionDate: '',
  referredBy: '',
  couponCode: '',
  gstRate: 18,
};

export const mockAvailableOffers = [
  { id: 'off-1', name: 'Summer Sale 20%' },
  { id: 'off-2', name: 'FLAT50 Off' },
];

// Referral Code is EMPTY by default - no hardcoding
export const mockDefaultReferralCode = '';

export const mockPaymentMethods = [
  { id: 'Cash', title: 'Cash', sub: 'Counter payment' },
  { id: 'Card', title: 'Card', sub: 'Debit / Credit' },
  { id: 'UPI', title: 'UPI', sub: 'GPay / PhonePe' },
  { id: 'COD', title: 'COD', sub: 'Home delivery' },
];

export const mockInvoiceMeta = {
  billId: `BILL-${new Date().getFullYear()}-001`,
  date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
  helpline: '+91-XXXXXXXXXX',
};

// Walk-in Order Lifecycle (Straight single vertical line)
export const mockWalkInOrderLifecycle = [
  { id: 1, text: 'Walk-in', time: 'Earlier today', done: true },
  { id: 2, text: 'Rx Verified (Offline)', time: 'At order time', done: true },
  { id: 3, text: 'Medicines Selected', time: 'Just now', done: true },
  { id: 4, text: 'Payment Received', time: 'Just now', done: true },
  { id: 5, text: 'Packed', time: 'Just now', done: true },
  { id: 6, text: 'Delivered', time: 'Just now', done: false },
];

// Home Delivery / Online Order Lifecycle (Straight single vertical line matching Walk-in)
export const mockDeliveryOrderLifecycle = [
  { id: 1, text: 'Order Placed Online', time: 'Earlier today', done: true },
  { id: 2, text: 'Rx Verified (Online)', time: 'At order time', done: true },
  { id: 3, text: 'Medicines Selected', time: 'Just now', done: true },
  { id: 4, text: 'Payment Received', time: 'Just now', done: true },
  { id: 5, text: 'Packed', time: 'Just now', done: true },
  { id: 6, text: 'Ready for Pickup', time: 'Just now', done: true },
  { id: 7, text: 'Delivered', time: 'Est. 30-45 min', done: false },
];

export const mockPrescriptionOcrData = {
  orderId: 'Order #A261',
  fieldsNeedReviewCount: 2,
  extractedFields: {
    prescriberName: { value: 'Dr. Anil Sharma', confidence: 96 },
    age: { value: '25', confidence: 100 },
    patientName: { value: 'Ramesh Gupta', confidence: 98 },
    issueDate: { value: '2026-07-10', confidence: 88 },
  },
  extractedDrugs: [
    {
      id: 'ocr-drug-1',
      name: 'Amoxicillin 250mg',
      confidence: 94,
      dosage: '1 capsule, thrice daily × 5 days',
      qty: 15,
      price: 12,
      isLowConfidence: false,
    },
    {
      id: 'ocr-drug-2',
      name: 'Alprazolam 0.5mg',
      confidence: 58,
      dosage: '1 tablet, twice daily',
      qty: 10,
      price: 10,
      isLowConfidence: true,
      warningText: 'Low confidence — verify against original image',
    },
  ],
  originalDocument: {
    doctorName: 'DR. ANIL SHARMA, MD',
    regNo: 'Reg: KMC-48213 · Tel: 080-244199',
    patientInfo: 'Patient: Ramesh Gupta, 42Y',
    dateInfo: 'Date: 10/07/2026',
    rxItems: [
      { id: 1, title: '1. Cap Amoxicillin 250mg', details: 'TDS x 5 days (Qty XV)' },
      { id: 2, title: '2. Tab Alprazolam 0.5mg', details: 'BD (Qty X)' },
    ],
  },
};
