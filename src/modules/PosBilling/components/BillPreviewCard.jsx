import React from 'react';
import styled from 'styled-components';
import { FileText } from 'lucide-react';
import Button from '../../../components/Button';
import { mockInvoiceMeta } from '../../../data/mockPosBilling';

const PreviewCard = styled.div`
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 16px;
  padding: 32px;
  max-width: 800px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 20px;
`;

const InvoiceTitle = styled.h2`
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 4px 0;
`;

const InvoiceMeta = styled.p`
  font-size: 13px;
  color: #64748b;
  margin: 0 0 20px 0;
`;

const LineDivider = styled.hr`
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 16px 0;
`;

const PatientDetailsBox = styled.div`
  margin: 16px 0;
  
  .title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.8px;
    color: #64748b;
    margin-bottom: 8px;
  }
  .row {
    font-size: 14px;
    color: #1e293b;
    margin-bottom: 4px;
    span.label { color: #64748b; }
  }
`;

const TotalPayableBar = styled.div`
  border-top: 2px solid #3b82f6;
  border-bottom: 2px solid #3b82f6;
  padding: 14px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;

  span.label {
    font-size: 16px;
    font-weight: 800;
    color: #0f172a;
  }
  span.val {
    font-size: 20px;
    font-weight: 800;
    color: #0f172a;
  }
`;

const InvoiceFooter = styled.div`
  font-size: 12px;
  color: #64748b;
  line-height: 1.6;
`;

const BillPreviewCard = ({ patientInfo, cartItems, total, setViewMode }) => {
  return (
    <PreviewCard>
      <PreviewHeader>
        <FileText size={20} />
        <span>Bill Preview</span>
      </PreviewHeader>

      <InvoiceTitle>PHARMACY Invoice</InvoiceTitle>
      <InvoiceMeta>
        BILL ID: {mockInvoiceMeta.billId} | Date: {mockInvoiceMeta.date} | Time: {mockInvoiceMeta.time}
      </InvoiceMeta>

      <LineDivider />

      <PatientDetailsBox>
        <div className="title">PATIENT DETAILS</div>
        <div className="row"><span className="label">Name: </span>{patientInfo.patientName || '-'}</div>
        <div className="row"><span className="label">Age: </span>{patientInfo.patientAge || '-'}</div>
        <div className="row"><span className="label">Doctor: </span>{patientInfo.doctorName || '-'}</div>
      </PatientDetailsBox>

      <LineDivider />

      <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', letterSpacing: '0.8px', marginBottom: '12px' }}>
        MEDICINES PURCHASED
      </div>

      {cartItems.length === 0 ? (
        <p style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '13px' }}>
          No medicines in this bill
        </p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
            <span>{item.name} x {item.qty}</span>
            <span style={{ fontWeight: 600 }}>₹{item.price * item.qty}</span>
          </div>
        ))
      )}

      <TotalPayableBar>
        <span className="label">TOTAL AMOUNT PAYABLE:</span>
        <span className="val">₹{total > 0 ? total : 0}</span>
      </TotalPayableBar>

      <InvoiceFooter>
        <div>Thank you for your purchase!</div>
        <div>This bill is valid with the prescription provided.</div>
        <div>For queries, please contact: {mockInvoiceMeta.helpline}</div>
      </InvoiceFooter>

      <Button variant="outline" style={{ marginTop: '24px' }} onClick={() => setViewMode('payment')}>
        ← Back to Payment
      </Button>
    </PreviewCard>
  );
};

export default BillPreviewCard;
