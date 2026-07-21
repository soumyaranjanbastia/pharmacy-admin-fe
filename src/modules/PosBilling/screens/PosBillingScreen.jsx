import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import Button from '../../../components/Button';
import Loader from '../../../components/common/Loader';
import {
  otcQuickAddFavorites,
  sampleMedicinesCatalog,
  mockSubstituteMedicines,
  mockHeldBills,
  mockInitialOrderDetails,
  mockAvailableOffers,
  mockDefaultReferralCode,
  mockPrescriptionOcrData,
} from '../../../data/mockPosBilling';

// Local Modular Components
import PosBillingForm from '../components/PosBillingForm';
import PaymentSection from '../components/PaymentSection';
import BillPreviewCard from '../components/BillPreviewCard';
import OrderCompleteView from '../components/OrderCompleteView';
import BillSummarySidebar from '../components/BillSummarySidebar';

const Container = styled.div`
  display: flex;
  gap: 24px;
  padding: 28px;
  background-color: var(--background, #f4f7f6);
  min-height: calc(100vh - 70px);
  font-family: ${({ theme }) => theme?.fonts?.main || "'Inter', 'Roboto', sans-serif"};
  color: var(--text-main, #101828);
  position: relative;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 16px;
  }
`;

const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: var(--text-main, #101828);
  margin: 0;
`;

const SubTitleText = styled.p`
  font-size: 14px;
  color: var(--text-muted, #667085);
  margin: 4px 0 0 0;
`;

const PosBillingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [viewMode, setViewMode] = useState('billing');
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [currentOrderId, setCurrentOrderId] = useState(mockInitialOrderDetails.orderId);
  const [deliveryMethod, setDeliveryMethod] = useState('Self Pickup');
  const [patientSearchQuery, setPatientSearchQuery] = useState('');

  const [patientInfo, setPatientInfo] = useState({
    patientName: '',
    patientAge: '',
    doctorName: '',
    prescriptionDate: '',
    referredBy: '',
  });

  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState(mockInitialOrderDetails.couponCode);
  const [medSearchText, setMedSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.state?.fromOcr) {
      const ocrFields = mockPrescriptionOcrData.extractedFields;
      setPatientInfo({
        patientName: location.state.patientName || ocrFields.patientName?.value || '',
        patientAge: location.state.patientAge || ocrFields.age?.value || '',
        doctorName: location.state.doctorName || ocrFields.prescriberName?.value || '',
        prescriptionDate: location.state.prescriptionDate || ocrFields.issueDate?.value || '',
        referredBy: location.state.referredBy || '',
      });

      // Pure object mapping - zero hardcoded fallback values
      if (location.state.extractedDrugs?.length > 0) {
        const formattedItems = location.state.extractedDrugs.map((d) => ({
          id: d.id,
          name: d.name,
          price: d.price,
          stock: d.stock,
          qty: d.qty,
          isRx: true,
        }));
        setCartItems(formattedItems);
      }
    }
  }, [location.state]);

  const filteredCatalog = sampleMedicinesCatalog.filter((m) =>
    m.name.toLowerCase().includes(medSearchText.toLowerCase())
  );

  const handleAddMedicine = (med) => {
    const existingIndex = cartItems.findIndex((item) => item.name === med.name);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].qty += 1;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...med, qty: med.qty || 1 }]);
    }
    setMedSearchText('');
    setShowDropdown(false);
  };

  const handleUpdateQty = (id, delta) => {
    setCartItems(
      cartItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const gst = cartItems.length > 0 ? Math.round((subtotal * mockInitialOrderDetails.gstRate) / 100) : 0;
  const total = subtotal + gst;

  const handlePrintInvoice = () => {
    alert('Printing Invoice...');
    setViewMode('billing');
    setCartItems([]);
    setPatientInfo({ patientName: '', patientAge: '', doctorName: '', prescriptionDate: '', referredBy: '' });
    setCouponCode('');
    setCurrentOrderId('ORD-' + Math.floor(2000 + Math.random() * 8000));
  };

  if (loading) {
    return (
      <Container style={{ position: 'relative', minHeight: '80vh' }}>
        <Loader fullScreen={false} text="Loading POS Sale..." subText="Please wait a moment" />
      </Container>
    );
  }

  return (
    <Container>
      <MainSection>
        {/* Header */}
        <HeaderRow>
          <div>
            <Title>
              {viewMode === 'payment'
                ? 'Payment'
                : viewMode === 'preview'
                  ? 'Bill Preview'
                  : viewMode === 'completed'
                    ? ''
                    : 'POS Billing'}
            </Title>
            {viewMode === 'payment' && (
              <SubTitleText>Select the payment method for this order</SubTitleText>
            )}
          </div>

          {viewMode === 'billing' && (
            <Button variant="primary" onClick={() => navigate('/pos-billing/add-prescription')}>
              Add Prescription
            </Button>
          )}

          {viewMode !== 'billing' && viewMode !== 'completed' && (
            <Button variant="outline" onClick={() => setViewMode('billing')}>
              <ArrowLeft size={16} /> Back to POS
            </Button>
          )}
        </HeaderRow>

        {/* View Mode 1: Main POS Billing Form */}
        {viewMode === 'billing' && (
          <PosBillingForm
            patientSearchQuery={patientSearchQuery}
            setPatientSearchQuery={setPatientSearchQuery}
            patientInfo={patientInfo}
            setPatientInfo={setPatientInfo}
            medSearchText={medSearchText}
            setMedSearchText={setMedSearchText}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            filteredCatalog={filteredCatalog}
            cartItems={cartItems}
            handleAddMedicine={handleAddMedicine}
            handleUpdateQty={handleUpdateQty}
            handleRemoveItem={handleRemoveItem}
            mockSubstituteMedicines={mockSubstituteMedicines}
            otcQuickAddFavorites={otcQuickAddFavorites}
          />
        )}

        {/* View Mode 2: Payment Screen */}
        {viewMode === 'payment' && (
          <PaymentSection
            total={total}
            cartItems={cartItems}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            mockAvailableOffers={mockAvailableOffers}
            mockDefaultReferralCode={mockDefaultReferralCode}
          />
        )}

        {/* View Mode 3: Bill Preview Screen Component */}
        {viewMode === 'preview' && (
          <BillPreviewCard
            patientInfo={patientInfo}
            cartItems={cartItems}
            total={total}
            setViewMode={setViewMode}
          />
        )}

        {/* View Mode 4: Order Complete Screen Component */}
        {viewMode === 'completed' && (
          <OrderCompleteView
            currentOrderId={currentOrderId}
            total={total}
            paymentMethod={paymentMethod}
            deliveryMethod={deliveryMethod}
            onPrintInvoice={handlePrintInvoice}
          />
        )}
      </MainSection>

      {/* Right Sidebar Component */}
      {(viewMode === 'billing' || viewMode === 'payment') && (
        <BillSummarySidebar
          currentOrderId={currentOrderId}
          patientInfo={patientInfo}
          setPatientInfo={setPatientInfo}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          cartItems={cartItems}
          subtotal={subtotal}
          gst={gst}
          total={total}
          viewMode={viewMode}
          setViewMode={setViewMode}
          deliveryMethod={deliveryMethod}
          setDeliveryMethod={setDeliveryMethod}
          mockHeldBills={mockHeldBills}
        />
      )}
    </Container>
  );
};

export default PosBillingScreen;
