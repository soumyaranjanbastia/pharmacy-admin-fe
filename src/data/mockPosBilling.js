export const otcQuickAddFavorites = [
  { id: 'otc-1', name: 'Paracetamol 500mg', price: 15, stock: 120, qty: 1 },
  { id: 'otc-2', name: 'Dolo 650mg', price: 30, stock: 85, qty: 1 },
  { id: 'otc-3', name: 'Cetirizine 10mg', price: 18, stock: 200, qty: 1 },
  { id: 'otc-4', name: 'Vitamin C 500mg', price: 45, stock: 90, qty: 1 },
  { id: 'otc-5', name: 'ORS Sachet', price: 22, stock: 150, qty: 1 },
  { id: 'otc-6', name: 'Digene 400mg', price: 35, stock: 60, qty: 1 },
];

export const sampleMedicinesCatalog = [
  { id: 'med-1', name: 'Paracetamol 500mg', price: 15, stock: 120, isRx: false },
  { id: 'med-2', name: 'Dolo 650mg', price: 30, stock: 85, isRx: false },
  { id: 'med-3', name: 'Cetirizine 10mg', price: 18, stock: 200, isRx: false },
  { id: 'med-4', name: 'Vitamin C 500mg', price: 45, stock: 90, isRx: false },
  { id: 'med-5', name: 'ORS Sachet', price: 22, stock: 150, isRx: false },
  { id: 'med-6', name: 'Digene 400mg', price: 35, stock: 60, isRx: false },
  { id: 'med-7', name: 'Amoxicillin 500mg', price: 85, stock: 40, isRx: true },
  { id: 'med-8', name: 'Azithromycin 250mg', price: 110, stock: 35, isRx: true },
  { id: 'med-9', name: 'Pantoprazole 40mg', price: 65, stock: 75, isRx: false },
  { id: 'med-10', name: 'Metformin 500mg', price: 40, stock: 100, isRx: true },
];

export const mockHeldBills = [
  { id: 'hb-1', name: 'Bill #1 - ₹00', amount: 0 },
];

export const mockInitialOrderDetails = {
  orderId: 'ORD-2401',
  orderType: 'Offline Order',
  patientName: '',
  patientAge: '',
  doctorName: '',
  prescriptionDate: '',
  referredBy: '',
  couponCode: 'AXER200',
  gstRate: 18,
};
