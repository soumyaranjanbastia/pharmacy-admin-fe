import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import AddMedicineToInventory from '../components/AddMedicineToInventory';
import AddStock from '../components/AddStock';
import ViewMedicineDetails from '../components/ViewMedicineDetails';
import {
  Plus,
  Filter,
  Download,
  Eye,
  X,
  Search,
  AlertTriangle,
  Boxes,
  ArrowLeftRight,
  ClipboardList,
  BarChart3,
  MapPin,
  Upload,
  Calendar,
  Info,
  DollarSign,
  Tag,
  Warehouse,
  PlusCircle,
  FileText
} from 'lucide-react';

// Initial Mock Inventory Data
const initialMedicines = [
  {
    id: 'M001',
    name: 'Metformin HCl 500mg',
    code: 'M001',
    rxNeeded: 'Yes',
    composition: 'Metformin HCl 500mg',
    category: 'Antidiabetic',
    batch: 'MF2024B',
    qty: 284,
    expiry: '2026-03',
    status: 'OK', // 'OK', 'LOW', 'No Stock', 'EXPIRING'
    mrp: 42,
    manufacturer: 'GSK India',
    purchaseCost: '₹30 / 10 tabs',
    unit: 'Strip / 10 tabs',
    hsnCode: '30049099',
    bin: 'B2401',
    history: [
      { date: '2026-07-10', type: 'Initial stock', qty: 200, batch: 'MF2024B', note: 'Opening Stock' },
      { date: '2026-07-15', type: 'Purchase intake', qty: 84, batch: 'MF2024B', note: 'Direct supplier intake' }
    ]
  },
  {
    id: 'M002',
    name: 'Atorvastatin 10mg',
    code: 'M002',
    rxNeeded: 'Yes',
    composition: 'Atorvastatin 10mg',
    category: 'Cardiovascular',
    batch: 'AT2024C',
    qty: 12,
    expiry: '2026-03',
    status: 'LOW',
    mrp: 42,
    manufacturer: 'Pfizer',
    purchaseCost: '₹28 / 10 tabs',
    unit: 'Strip / 10 tabs',
    hsnCode: '30049099',
    bin: 'B2402',
    history: [
      { date: '2026-07-01', type: 'Initial stock', qty: 100, batch: 'AT2024C', note: 'Opening Stock' },
      { date: '2026-07-12', type: 'Dispensed (POS)', qty: -88, batch: 'AT2024C', note: 'POS Billing ORD-2304' }
    ]
  },
  {
    id: 'M003',
    name: 'Amoxicillin 250mg',
    code: 'M003',
    rxNeeded: 'Yes',
    composition: 'Amoxicillin 250mg',
    category: 'Antidiabetic',
    batch: 'AM2024D',
    qty: 0,
    expiry: '2026-03',
    status: 'No Stock',
    mrp: 42,
    manufacturer: 'Abbott',
    purchaseCost: '₹25 / 10 tabs',
    unit: 'Strip / 10 tabs',
    hsnCode: '30049099',
    bin: 'B2403',
    history: [
      { date: '2026-07-02', type: 'Initial stock', qty: 50, batch: 'AM2024D', note: 'Opening Stock' },
      { date: '2026-07-18', type: 'Dispensed (POS)', qty: -50, batch: 'AM2024D', note: 'POS Billing ORD-2309' }
    ]
  },
  {
    id: 'M004',
    name: 'Metformin HCl 500mg',
    code: 'M004',
    rxNeeded: 'No',
    composition: 'Metformin HCl 500mg',
    category: 'Antidiabetic',
    batch: 'MF2024B',
    qty: 284,
    expiry: '2026-03',
    status: 'EXPIRING',
    mrp: 42,
    manufacturer: 'GSK India',
    purchaseCost: '₹30 / 10 tabs',
    unit: 'Strip / 10 tabs',
    hsnCode: '30049099',
    bin: 'B2404',
    history: [
      { date: '2026-07-05', type: 'Initial stock', qty: 284, batch: 'MF2024B', note: 'Opening Stock' }
    ]
  }
];

const InventoryScreen = () => {
  const [medicines, setMedicines] = useState(initialMedicines);
  const [activeTab, setActiveTab] = useState('Stock Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL'); // 'ALL', 'LOW', 'NO_STOCK', 'EXPIRING', 'REORDER'

  // Modal States
  const [isAddMedicineOpen, setIsAddMedicineOpen] = useState(false);
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedMed, setSelectedMed] = useState(null);

  // Form States — Add Medicine
  const [newMedForm, setNewMedForm] = useState({
    name: '',
    rxNeeded: 'Yes',
    composition: '',
    category: 'Antidiabetic',
    manufacturer: '',
    purchaseCost: '',
    unit: '',
    batch: '',
    hsnCode: '0',
    bin: '',
    expiry: '',
    qty: 0,
    mrp: 0.00,
    margin: 0.00
  });

  // Form States — Add Stock
  const [newStockForm, setNewStockForm] = useState({
    batch: '',
    hsn: '',
    qty: 0,
    expiry: '',
    mrp: 0.00,
    supplier: '',
    discount: 0.00,
    note: ''
  });

  // Dynamic Statistics
  const stats = useMemo(() => {
    const totalSKUs = medicines.length;
    const lowStock = medicines.filter(m => m.status === 'LOW').length;
    const outOfStock = medicines.filter(m => m.status === 'No Stock').length;
    const nearExpiry = medicines.filter(m => m.status === 'EXPIRING').length;
    const reorderNeeded = medicines.filter(m => m.qty < 20).length; // Custom reorder logic (qty < 20)

    return { totalSKUs, lowStock, outOfStock, nearExpiry, reorderNeeded };
  }, [medicines]);

  // Filtered Inventory List
  const filteredMedicines = useMemo(() => {
    return medicines.filter(m => {
      // 1. Search Query Match
      const matchesSearch = 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.batch && m.batch.toLowerCase().includes(searchQuery.toLowerCase())) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // 2. Status Card filter
      switch (filterType) {
        case 'LOW':
          return m.status === 'LOW';
        case 'NO_STOCK':
          return m.status === 'No Stock';
        case 'EXPIRING':
          return m.status === 'EXPIRING';
        case 'REORDER':
          return m.qty < 20;
        case 'ALL':
        default:
          return true;
      }
    });
  }, [medicines, searchQuery, filterType]);

  // Handle Add Medicine Save
  const handleSaveMedicine = (e) => {
    e.preventDefault();
    if (!newMedForm.name || !newMedForm.batch) {
      alert('Please fill out all required fields marked with *');
      return;
    }

    const calculatedStatus = newMedForm.qty === 0 
      ? 'No Stock' 
      : newMedForm.qty < 15 
        ? 'LOW' 
        : 'OK';

    const newMed = {
      id: `M00${medicines.length + 1}`,
      code: `M00${medicines.length + 1}`,
      name: newMedForm.name,
      rxNeeded: newMedForm.rxNeeded,
      composition: newMedForm.composition || newMedForm.name,
      category: newMedForm.category,
      batch: newMedForm.batch,
      qty: Number(newMedForm.qty),
      expiry: newMedForm.expiry || '2026-12',
      status: calculatedStatus,
      mrp: Number(newMedForm.mrp) || 0,
      manufacturer: newMedForm.manufacturer || 'Generic Corp',
      purchaseCost: newMedForm.purchaseCost || `₹${Number(newMedForm.mrp) * 0.7} / unit`,
      unit: newMedForm.unit || 'Strip / 10 tabs',
      hsnCode: newMedForm.hsnCode || '30049099',
      bin: newMedForm.bin || 'A101',
      history: [
        { 
          date: new Date().toISOString().split('T')[0], 
          type: 'Initial stock', 
          qty: Number(newMedForm.qty), 
          batch: newMedForm.batch, 
          note: 'Opening Stock added via Inventory Manager' 
        }
      ]
    };

    setMedicines([...medicines, newMed]);
    setIsAddMedicineOpen(false);
    // Reset Form
    setNewMedForm({
      name: '',
      rxNeeded: 'Yes',
      composition: '',
      category: 'Antidiabetic',
      manufacturer: '',
      purchaseCost: '',
      unit: '',
      batch: '',
      hsnCode: '0',
      bin: '',
      expiry: '',
      qty: 0,
      mrp: 0.00,
      margin: 0.00
    });
  };

  // Handle Add Stock Confirm
  const handleConfirmStockIntake = (e) => {
    e.preventDefault();
    if (!newStockForm.batch || !newStockForm.qty) {
      alert('Please fill out all required fields *');
      return;
    }

    const updatedMeds = medicines.map(m => {
      if (m.id === selectedMed.id) {
        const addedQty = Number(newStockForm.qty);
        const newQty = m.qty + addedQty;
        const newHistory = [
          ...m.history,
          {
            date: new Date().toISOString().split('T')[0],
            type: 'Purchase intake',
            qty: addedQty,
            batch: newStockForm.batch,
            note: newStockForm.note || `Intake from supplier. Disc: ${newStockForm.discount}%`
          }
        ];

        let newStatus = m.status;
        if (newQty > 15) {
          newStatus = 'OK';
        } else if (newQty > 0) {
          newStatus = 'LOW';
        } else {
          newStatus = 'No Stock';
        }

        return {
          ...m,
          batch: newStockForm.batch,
          qty: newQty,
          status: newStatus,
          mrp: Number(newStockForm.mrp) || m.mrp,
          expiry: newStockForm.expiry || m.expiry,
          hsnCode: newStockForm.hsn || m.hsnCode,
          history: newHistory
        };
      }
      return m;
    });

    setMedicines(updatedMeds);
    setIsAddStockOpen(false);
    // Reset Form
    setNewStockForm({
      batch: '',
      hsn: '',
      qty: 0,
      expiry: '',
      mrp: 0.00,
      supplier: '',
      discount: 0.00,
      note: ''
    });
  };

  return (
    <Container>
      {/* Header Area */}
      <HeaderSection>
        <PageTitle>Inventory</PageTitle>
        <AddMedButton onClick={() => setIsAddMedicineOpen(true)}>
          <Plus size={16} /> Add Medicine
        </AddMedButton>
      </HeaderSection>

      {/* Tabs */}
      <TabsContainer>
        {[
          { label: 'Stock Overview', icon: Boxes },
          { label: 'Alerts', icon: AlertTriangle, badge: 5 },
          { label: 'Transfers', icon: ArrowLeftRight },
          { label: 'Audit / Count', icon: ClipboardList },
          { label: 'Reports', icon: BarChart3 },
          { label: 'Bin Location', icon: MapPin },
          { label: 'Bulk Upload', icon: Upload }
        ].map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.label;
          return (
            <TabButton key={idx} $isActive={isActive} onClick={() => setActiveTab(tab.label)}>
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.badge && <TabBadge>{tab.badge}</TabBadge>}
            </TabButton>
          );
        })}
      </TabsContainer>

      {/* Active Tab View */}
      {activeTab === 'Stock Overview' ? (
        <>
          {/* Statistics summary cards */}
          <StatsContainer>
            <StatCard $type="total" $isActive={filterType === 'ALL'} onClick={() => setFilterType('ALL')}>
              <div className="value">{stats.totalSKUs}</div>
              <div className="label">Total SKUs</div>
            </StatCard>
            <StatCard $type="low" $isActive={filterType === 'LOW'} onClick={() => setFilterType('LOW')}>
              <div className="value">{stats.lowStock}</div>
              <div className="label">Low Stock</div>
            </StatCard>
            <StatCard $type="out" $isActive={filterType === 'NO_STOCK'} onClick={() => setFilterType('NO_STOCK')}>
              <div className="value">{stats.outOfStock}</div>
              <div className="label">Out of Stock</div>
            </StatCard>
            <StatCard $type="expiry" $isActive={filterType === 'EXPIRING'} onClick={() => setFilterType('EXPIRING')}>
              <div className="value">{stats.nearExpiry}</div>
              <div className="label">Near Expiry</div>
            </StatCard>
            <StatCard $type="reorder" $isActive={filterType === 'REORDER'} onClick={() => setFilterType('REORDER')}>
              <div className="value">{stats.reorderNeeded}</div>
              <div className="label">Reorder Needed</div>
            </StatCard>
          </StatsContainer>

          {/* Search, Filter & Actions Row */}
          <FilterRow>
            <SearchBox>
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search medicine, batch, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBox>

            <ActionButtonGroup>
              <SecondaryButton>
                <Filter size={14} /> Filter
              </SecondaryButton>
              <SecondaryButton>
                <Download size={14} /> Export
              </SecondaryButton>
            </ActionButtonGroup>
          </FilterRow>

          {/* Medicines Grid Table */}
          <TableContainer>
            <InventoryTable>
              <thead>
                <tr>
                  <th>MEDICINE</th>
                  <th>CATEGORY</th>
                  <th>BATCH</th>
                  <th>QTY</th>
                  <th>EXPIRY</th>
                  <th>STATUS</th>
                  <th>MRP</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicines.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
                      No medicines found matching the active filters or search query.
                    </td>
                  </tr>
                ) : (
                  filteredMedicines.map((med) => (
                    <tr key={med.id}>
                      <td>
                        <MedCell>
                          <div className="name">{med.name}</div>
                          <div className="sub-info">
                            <span className="code">{med.code}</span>
                            {med.rxNeeded === 'Yes' && <RxBadge>Rx</RxBadge>}
                          </div>
                        </MedCell>
                      </td>
                      <td>{med.category}</td>
                      <td><code style={{ fontSize: '12px' }}>{med.batch || '-'}</code></td>
                      <td style={{ fontWeight: 600 }}>{med.qty}</td>
                      <td>{med.expiry}</td>
                      <td>
                        <StatusIndicator $status={med.status}>
                          {med.status === 'No Stock' ? 'No Stock' : med.status}
                        </StatusIndicator>
                      </td>
                      <td>₹{med.mrp}</td>
                      <td>
                        <ActionCellGroup>
                          <ViewBtn onClick={() => { setSelectedMed(med); setIsViewDetailsOpen(true); }}>
                            <Eye size={14} /> View
                          </ViewBtn>
                          <AddStockRowBtn onClick={() => { setSelectedMed(med); setIsAddStockOpen(true); }}>
                            + Stock
                          </AddStockRowBtn>
                        </ActionCellGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </InventoryTable>
          </TableContainer>
        </>
      ) : (
        <PlaceholderContainer>
          <Info size={32} style={{ color: '#007664', marginBottom: '12px' }} />
          <h3>{activeTab} Screen</h3>
          <p>This module section is currently under development. Please check back later.</p>
        </PlaceholderContainer>
      )}

      {/* --- Add Medicine Modal --- */}
      <AddMedicineToInventory
        isOpen={isAddMedicineOpen}
        onClose={() => setIsAddMedicineOpen(false)}
        newMedForm={newMedForm}
        setNewMedForm={setNewMedForm}
        onSave={handleSaveMedicine}
      />

      {/* --- Add Stock Modal --- */}
      <AddStock
        isOpen={isAddStockOpen}
        onClose={() => setIsAddStockOpen(false)}
        selectedMed={selectedMed}
        newStockForm={newStockForm}
        setNewStockForm={setNewStockForm}
        onConfirm={handleConfirmStockIntake}
      />

      {/* --- View Details Modal --- */}
      <ViewMedicineDetails
        isOpen={isViewDetailsOpen}
        onClose={() => setIsViewDetailsOpen(false)}
        selectedMed={selectedMed}
        onAddStockClick={(med) => {
          setSelectedMed(med);
          setIsAddStockOpen(true);
        }}
      />
    </Container>
  );
};

export default InventoryScreen;

// --- Styled Components ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl || '20px'};
  padding: 8px 4px;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.display || '28px'};
  font-weight: ${({ theme }) => theme.fontWeights.bold || '700'};
  color: ${({ theme }) => theme.colors.text || '#2D3748'};
`;

const AddMedButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary || '#007664'};
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: ${({ theme }) => theme.borders.radiusMd || '8px'};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0, 118, 100, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark || '#1A4B4B'};
    transform: translateY(-1px);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight || '#E2E8F0'};
  overflow-x: auto;
  gap: 16px;
  margin-bottom: 8px;

  &::-webkit-scrollbar {
    height: 4px;
  }
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 6px;
  border: none;
  background: transparent;
  color: ${props => props.$isActive ? (props.theme.colors.primary || '#007664') : (props.theme.colors.textLight || '#718096')};
  font-size: 14px;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.$isActive ? (props.theme.colors.primary || '#007664') : 'transparent'};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary || '#007664'};
  }
`;

const TabBadge = styled.span`
  background-color: #E53E3E;
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  line-height: 1;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  background-color: #ffffff;
  border: 1px solid ${props => props.$isActive ? (props.theme.colors.primary || '#007664') : 'rgba(0, 0, 0, 0.05)'};
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.$isActive ? '0 4px 10px rgba(0, 118, 100, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.02)'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary || '#007664'};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
  }

  .value {
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 4px;
  }

  .label {
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
  }

  ${props => {
    switch (props.$type) {
      case 'low':
        return `
          border-left: 4px solid #B7791F;
          .value { color: #B7791F; }
        `;
      case 'out':
        return `
          border-left: 4px solid #E53E3E;
          .value { color: #E53E3E; }
        `;
      case 'expiry':
        return `
          border-left: 4px solid #D97706;
          .value { color: #D97706; }
        `;
      case 'reorder':
        return `
          border-left: 4px solid #3182CE;
          .value { color: #3182CE; }
        `;
      default:
        return `
          border-left: 4px solid #007664;
          .value { color: #007664; }
        `;
    }
  }}
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 8px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  max-width: 450px;

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
  }

  input {
    width: 100%;
    padding: 10px 16px 10px 38px;
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.colors.borderLight || '#E2E8F0'};
    border-radius: 8px;
    outline: none;
    background-color: #ffffff;
    transition: all 0.2s ease;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary || '#007664'};
      box-shadow: 0 0 0 3px rgba(0, 118, 100, 0.1);
    }
  }
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.borderLight || '#E2E8F0'};
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary || '#007664'};
    border-color: ${({ theme }) => theme.colors.primary || '#007664'};
  }
`;

const TableContainer = styled.div`
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.borderLight || '#E2E8F0'};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.01);
`;

const InventoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th {
    background-color: #f8fafc;
    color: #64748b;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 14px 18px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight || '#E2E8F0'};
    text-transform: uppercase;
  }

  td {
    padding: 14px 18px;
    font-size: 13px;
    color: #1e293b;
    border-bottom: 1px solid #f1f5f9;
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover td {
    background-color: #f8fafc;
  }
`;

const MedCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .name {
    font-weight: 600;
    color: #1e293b;
    font-size: 14px;
  }

  .sub-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .code {
    font-size: 11px;
    color: #94a3b8;
  }
`;

const RxBadge = styled.span`
  background-color: #F3E8FF;
  color: #7C3AED;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 4px;
  border-radius: 4px;
`;

const StatusIndicator = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;

  ${props => {
    switch (props.$status) {
      case 'OK':
        return `
          background-color: #E6F4EA;
          color: #137333;
        `;
      case 'LOW':
        return `
          background-color: #FEFCBF;
          color: #B7791F;
        `;
      case 'No Stock':
        return `
          background-color: #FFF5F5;
          color: #E53E3E;
        `;
      case 'EXPIRING':
        return `
          background-color: #FFE8D6;
          color: #D97706;
        `;
      default:
        return `
          background-color: #E2E8F0;
          color: #475569;
        `;
    }
  }}
`;

const ActionCellGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ViewBtn = styled.button`
  background: transparent;
  border: 1px solid #cbd5e1;
  color: #475569;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #1e293b;
    border-color: #94a3b8;
    background-color: #f1f5f9;
  }
`;

const AddStockRowBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.primary || '#007664'};
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark || '#1A4B4B'};
  }
`;

const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.borderLight || '#E2E8F0'};
  border-radius: 12px;
  padding: 60px 20px;
  text-align: center;
  color: #475569;

  h3 {
    margin-bottom: 6px;
    color: #1e293b;
  }

  p {
    font-size: 13px;
    color: #64748b;
  }
`;

// --- Modal Styled Components ---

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(2px);
  padding: 20px;
`;

const ModalWrapper = styled.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
`;

const ModalHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .title-desc {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .icon-title {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .icon-wrapper {
        color: ${({ theme }) => theme.colors.primary || '#007664'};
        display: flex;
      }
    }

    h2 {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
    }

    p {
      font-size: 12px;
      color: #64748b;
    }
  }
`;

const CloseIconButton = styled.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  padding: 4px;
  border-radius: 6px;

  &:hover {
    background-color: #f1f5f9;
    color: #475569;
  }
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const FormContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  padding: 0 24px 24px 24px;
  overflow-y: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SectionHeader = styled.h3`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  color: #94a3b8;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 8px;
  margin-bottom: 4px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 11px;
    font-weight: 700;
    color: #475569;
    letter-spacing: 0.5px;
  }

  input, select {
    padding: 10px 12px;
    font-size: 13px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    outline: none;
    background-color: #ffffff;
    width: 100%;
    transition: all 0.2s ease;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary || '#007664'};
      box-shadow: 0 0 0 3px rgba(0, 118, 100, 0.1);
    }
  }

  input::placeholder {
    color: #cbd5e1;
  }
`;

const FormTwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const ModalFooter = styled.div`
  background-color: #f8fafc;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f1f5f9;

  .footer-notice {
    font-size: 12px;
    color: #64748b;
    font-weight: 500;
  }

  .btn-group {
    display: flex;
    gap: 12px;
  }
`;

const CancelButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  color: #475569;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    border-color: #94a3b8;
  }
`;

const SubmitButton = styled.button`
  background-color: #007664;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #005a4c;
  }
`;

// --- View Details Modal Specific components ---

const ViewModalBody = styled.div`
  padding: 20px 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  .info-block {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .lbl {
      font-size: 11px;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .val {
      font-size: 13px;
      color: #1e293b;
      font-weight: 600;
      display: flex;
      align-items: center;
    }
  }
`;

const StockStatusSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  text-align: center;

  .metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid #e2e8f0;

    &:last-child {
      border-right: none;
    }

    .num {
      font-size: 16px;
      font-weight: 700;
      color: #007664;
    }

    .lbl {
      font-size: 10px;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
`;

const LedgerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  h3 {
    font-size: 14px;
    font-weight: 700;
    color: #1e293b;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 6px;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-left: 16px;

    &::after {
      content: '';
      position: absolute;
      top: 6px;
      bottom: 6px;
      left: 4px;
      width: 1px;
      background-color: #cbd5e1;
    }
  }
`;

const TimelineItem = styled.div`
  display: flex;
  position: relative;
  padding-bottom: 16px;

  &:last-child {
    padding-bottom: 0;
  }

  .bullet {
    position: absolute;
    left: -15px;
    top: 4px;
    width: 7px;
    height: 7px;
    background-color: #007664;
    border-radius: 50%;
    z-index: 2;
  }

  .timeline-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;

    .header {
      display: flex;
      justify-content: space-between;
      gap: 16px;

      .type {
        font-weight: 700;
        color: #1e293b;
      }

      .date {
        color: #94a3b8;
      }
    }

    .details {
      color: #475569;
    }

    .note {
      font-style: italic;
      color: #64748b;
      font-size: 11px;
    }
  }
`;
